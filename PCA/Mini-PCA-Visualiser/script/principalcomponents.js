function pcaIntro() {
    Plotly.purge("graph");

    flowerTypeSplit.push(originalFlowerDataSet.findIndex(vector => vector[vector.length-1] == 'versicolor'));
    flowerTypeSplit.push(originalFlowerDataSet.findIndex(vector => vector[vector.length-1] == 'virginica'));

    originalFlowerDataSet.forEach(vector => {
        vector.pop();
    });

    var dataInfo = normaliseData(originalFlowerDataSet);
    normalisedData = dataInfo[0]; meanVector = dataInfo[1]; stdDevVector = dataInfo[2];

    covarianceM = covarianceMatrix(normalisedData);
    eigs = numeric.eig(covarianceM);
    for (var i = 0; i < covarianceM.length; i++) {
        partialCovarianceMatrix.push([]);
        for (var j = 0; j < covarianceM.length; j++) {
            partialCovarianceMatrix[i][j] = 'Cov (' + shortenedParameterTitles[i] + ', ' + shortenedParameterTitles[j] + ')';
        }
    }

    var order = numeric.linspace(0, eigs.E.x.length-1, eigs.E.x.length).sort((i, j) => {
        return (eigs.lambda.x[j] - eigs.lambda.x[i]);
    });

    var eigenvectors = [];
    for (var i = 0; i < eigs.E.x.length; ++i) {
        eigenvectors.push(transposeMatrix(eigs.E.x)[order[i]]);
    }

    transformationMatrix = transposeMatrix(eigenvectors);
    newdata = math.multiply(normalisedData, transformationMatrix);

    var totalEigs = eigs.lambda.x.reduce((e1, e2) => e1 + e2, 0);
    for(var i = 0; i < eigs.lambda.x.length; ++i) {
        importancePC.push(Math.round(100 * eigs.lambda.x[order[i]]/totalEigs));
    }


    eigenvectorsSetup();

}


function eigenvectorsSetup() {

    var pcs = document.getElementById('aController') == null ? 3 : parseFloat(document.getElementById('aController').value);

    const plotPrincipleComponentGraph = () => {

        var scatter = pcs == 3 ? 'scatter3d' : 'scatter';

        var data = [
            
            {
                x : transposeMatrix(newdata)[0].slice(0, flowerTypeSplit[0]), y : transposeMatrix(newdata)[1].slice(0, flowerTypeSplit[0]), z : transposeMatrix(newdata)[2].slice(0, flowerTypeSplit[0]),
                name: 'Adjusted Setosa Data',
                mode: 'markers',
                type: scatter,
                marker: {
                    size: 5
                }
            },
            {
                x : transposeMatrix(newdata)[0].slice(flowerTypeSplit[0], flowerTypeSplit[1]), y : transposeMatrix(newdata)[1].slice(flowerTypeSplit[0], flowerTypeSplit[1]), z : transposeMatrix(newdata)[2].slice(flowerTypeSplit[0], flowerTypeSplit[1]),
                name: 'Adjusted Versicolor Data',
                mode: 'markers',
                type: scatter,
                marker: {
                    size: 5
                }
            },
            {
                x : transposeMatrix(newdata)[0].slice(flowerTypeSplit[1]), y : transposeMatrix(newdata)[1].slice(flowerTypeSplit[1]), z : transposeMatrix(newdata)[2].slice(flowerTypeSplit[1]),
                name: 'Adjusted Virginica Data',
                mode: 'markers',
                type: scatter,
                marker: {
                    size: 5
                }
            },
            {
                x : numeric.linspace(-8, 8, 1000), y : numeric.linspace(0, 0, 1000), z : numeric.linspace(0, 0, 1000),
                name: 'PC 1',
                mode: 'markers',
                type: scatter,
                marker: {
                    size: 2
                }
            },
            {
                x : numeric.linspace(0, 0, 1000), y : numeric.linspace(-8, 8, 1000), z : numeric.linspace(0, 0, 1000),
                name: 'PC 2',
                mode: 'markers',
                type: scatter,
                marker: {
                    size: 2
                }
            },
            pcs == 3 ? {
                x : numeric.linspace(0, 0, 1000), y : numeric.linspace(0, 0, 1000), z : numeric.linspace(-8, 8, 1000),
                name: 'PC 3',
                mode: 'markers',
                type: scatter,
                marker: {
                    size: 2
                }
            } : {},

        ];
    
        var layout = {
            width: document.getElementById('graph').offsetWidth-40,
            height: document.getElementById('graph').offsetWidth-40,
            autosize: true
        };  
    
        Plotly.newPlot('graph', data, layout);

    };

    plotPrincipleComponentGraph();
    document.getElementById('aController').onchange = () => {
        pcs = parseFloat(document.getElementById('aController').value); 
        document.getElementById('aControllerDisplay').innerText = pcs; 
        plotPrincipleComponentGraph();
    };

}

function main() {
    initGuidance(['pcslider', 'graph'])
    pcaIntro();
}

$(document).ready(main);