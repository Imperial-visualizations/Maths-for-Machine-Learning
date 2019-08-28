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


    datasetVisualisation();

}

function datasetVisualisation() {
    const graphWithParamsDataset = (selected) => {


        if (selected == null || activeButtonQueueDataset.length == 2) {
            activeButtonQueueDataset = []
        }
        
        if (selected != null) {
            activeButtonQueueDataset.push(parameterTitles.findIndex(title => title == selected.srcElement.id));
        }

        var xs = []; var ys = [];
        originalFlowerDataSet.forEach(vector => {
            xs.push(vector[activeButtonQueueDataset[0]]); ys.push(vector[activeButtonQueueDataset[1]]);
        });
    
        var data = [
            {
                x : xs.slice(0, flowerTypeSplit[0]), y : ys.slice(0, flowerTypeSplit[0]),
                mode: 'markers',
                type: 'scatter',
                name: 'Setosa Data'
            },
            {
                x : xs.slice(flowerTypeSplit[0], flowerTypeSplit[1]), y : ys.slice(flowerTypeSplit[0], flowerTypeSplit[1]),
                mode: 'markers',
                type: 'scatter',
                name: 'Versicolor Data'
            },
            {
                x : xs.slice(flowerTypeSplit[1]), y : ys.slice(flowerTypeSplit[1]),
                mode: 'markers',
                type: 'scatter',
                name: 'Virginica Data'
            }
        ]
    
        var layout = {
            width: document.getElementById('graph').offsetWidth,
            title: {
                text: parameterTitles[activeButtonQueueDataset[0]] + ' vs ' + parameterTitles[activeButtonQueueDataset[1]],
                font: {
                  size: 18
                },
                xref: 'paper',
                x: 0.05,
              },
              xaxis: {
                title: {
                  text: parameterTitles[activeButtonQueueDataset[0]],
                  font: {
                    size: 12,
                    color: '#7f7f7f'
                  }
                },
              },
              yaxis: {
                title: {
                  text: parameterTitles[activeButtonQueueDataset[1]],
                  font: {
                    size: 12,
                    color: '#7f7f7f'
                  }
                }
              }
        };
    
        Plotly.newPlot('graph', data, layout);
    }
    graphWithParamsDataset(null);
    setupButtons(graphWithParamsDataset);
}

function main() {
    initGuidance(['information'])
    pcaIntro();
}

$(document).ready(main);