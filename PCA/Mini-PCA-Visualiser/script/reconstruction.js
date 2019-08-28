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


    resultSetup();

}


function resultSetup() {
    
    var randomButton = document.getElementsByClassName("randomButton")[0];

    var pcSlider = document.getElementById('aController');
    var pcs = parseFloat(pcSlider.value);

    var pcsNewData;
    var pcsTransformationMatrix;
    var recomputedData;

    const recomputationOfData = () => {
        pcsNewData = [];
        pcsTransformationMatrix = [];
        for (var i = 0; i < pcs; ++i) {
            pcsNewData.push(transposeMatrix(newdata)[i]);
            pcsTransformationMatrix.push(transformationMatrix[i]);
        }

        pcsNewData = transposeMatrix(pcsNewData);

        recomputedData = math.multiply(pcsNewData, pcsTransformationMatrix);
        recomputedData = transposeMatrix(recomputedData);

        for (var i = 0; i < recomputedData.length; ++i) {
            recomputedData[i] = recomputedData[i].map(x => (x * stdDevVector[i]) + meanVector[i]);
        }

        recomputedData = transposeMatrix(recomputedData);
    };

    recomputationOfData();

    pcSlider.onchange = () => {
        pcs = parseFloat(pcSlider.value);
        document.getElementById('aControllerDisplay').innerText = pcs;
        recomputationOfData();    
    }

    randomButton.onclick = () => {
        var randPoint = Math.floor((Math.random() * originalFlowerDataSet.length));

        var data = [
            {
                x: parameterTitles,
                y: originalFlowerDataSet[randPoint],
                name: 'Original Data',
                type: 'bar'
            }, {
                x: parameterTitles,
                y: recomputedData[randPoint],
                name: 'Reconstructed Data',
                type: 'bar'
            }
        ];
        Plotly.newPlot('graph', data, {barmode: 'group'});    
    };
}

function main() {
    initGuidance(["pcslider"]);
    pcaIntro();
}
$(document).ready(main);