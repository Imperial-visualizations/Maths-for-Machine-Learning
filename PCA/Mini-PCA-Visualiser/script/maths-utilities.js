var normalisedData;
var covarianceM;
var eigs;
var partialCovarianceMatrix = [];
var importancePC = [];
var transformationMatrix;
var newdata;
var meanVector;
var stdDevVector;

function dotProduct(xs, ys) {
    console.assert(xs.length == ys.length);
    return  numeric.linspace(0, xs.length-1, xs.length)
           .map(i => xs[i] * ys[i])
           .reduce((x, y) => x + y, 0);
}

function transposeMatrix(xs) {
    var transpose = [];
    xs[0].forEach(() => transpose.push([]));
    for (var i = 0; i < xs.length; ++i) {
        for (var j = 0; j < xs[i].length; ++j) {
            transpose[j].push(xs[i][j]);
        }
    }
    return transpose;
}

function normaliseData(data) {
    var means = []; var stdDevs = [];
    var transpose = transposeMatrix(data);
    for (var i = 0; i < transpose.length; ++i) {
        means[i] = transpose[i].reduce((x,y) => x+y, 0) / transpose[i].length;
        stdDevs[i] = Math.sqrt(transpose[i].map(x => (x - means[i]) ** 2).reduce((x,y) => x+y, 0) / (transpose[i].length - 1));
        for (var j = 0; j < transpose[i].length; ++j) {
            transpose[i][j] = (transpose[i][j] - means[i]) / stdDevs[i];
        }
    }
    return [transposeMatrix(transpose), means, stdDevs];
}

function covarianceMatrix(normalisedData) {
    var matrix = [[], [], [], []];
    var transpose = transposeMatrix(normalisedData);
    for (var i = 0; i < transpose.length; ++i) {
        for (var j = 0; j < transpose.length; ++j) {
            matrix[i].push(dotProduct(transpose[i], transpose[j]) / (transpose[i].length - 1));
        }
    }
    return matrix;
}

function scalarProduct(lambda, xs) {
    return xs.map(x => x * lambda);
}

function plotNormalGraph(xs, mean, stdDev) {
    var xs = numeric.linspace(-35,35,6000);
    var ys = [];
    const normalY = (x, mean, stdDev) => Math.exp((-0.5) * Math.pow((x - mean) / stdDev, 2));

    xs.forEach(x => {
        ys.push(normalY(x, mean, stdDev));
    });

    var data = [
        {
            x : xs, y : ys,
            mode: 'markers',
            type: 'scatter',
            marker: {
                size: 3
            }
        }
    ];

    Plotly.newPlot('graph2', data);
}

