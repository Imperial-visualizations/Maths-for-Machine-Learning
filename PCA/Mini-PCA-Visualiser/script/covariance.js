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


    covarianceSetup();

}

function covarianceSetup() {

    document.getElementById('graph').innerHTML = "<table class='matrix'><tbody><tr><tr><tr><tr></tbody></table>";
    
    setupButtons((selected) => {

        if (activeButtonQueueCovariance.length == 2) {
            activeButtonQueueCovariance = []
        }
        activeButtonQueueCovariance.push(parameterTitles.findIndex(title => title == selected.srcElement.id));
    
        var covariance = covarianceM[activeButtonQueueCovariance[0]][activeButtonQueueCovariance[1]];
        partialCovarianceMatrix[activeButtonQueueCovariance[0]][activeButtonQueueCovariance[1]] = Math.round(covariance*100)/100;

        var covarianceTableHtml = "<table class='matrix' align='center'><tbody>";
        for (var i = 0; i < covarianceM.length; i++) {
            covarianceTableHtml += "<tr>";
            for (var j = 0; j < covarianceM[i].length; j++) {
                covarianceTableHtml += "<td>" + partialCovarianceMatrix[i][j] + "</td>";
            }
            covarianceTableHtml += "</tr>";
        }
        covarianceTableHtml += "</tbody></table>";

        document.getElementById('graph').innerHTML = covarianceTableHtml;


        document.getElementById('covinfo').innerText = parameterTitles[activeButtonQueueCovariance[0]] + " and " +
                                                                parameterTitles[activeButtonQueueCovariance[1]] + "'s covariance:\n" + 
                                                                "X = " + parameterTitles[activeButtonQueueCovariance[0]] + ", " +
                                                                "Y = " + parameterTitles[activeButtonQueueCovariance[1]] + "\n" +
                                                                "Cov(X, Y) = " + covariance + "\n\n";
    
    });

}

function main() {
    initGuidance(['information', 'graph'])
    pcaIntro();
}

$(document).ready(main);