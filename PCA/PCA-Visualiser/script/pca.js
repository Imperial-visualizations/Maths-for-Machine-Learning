
// TODO: iFrame

function pcaIntro() {
    Plotly.purge("graph1");

    adjustSizing();

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


    switchTab('Dataset');

}

function datasetVisualisation() {

    transposeData = transposeMatrix(originalFlowerDataSet);
    
    var data = [
        {
            type: 'parcoords',
            pad: [80,80,80,80],
            line: {
                colorscale: [[0, 'red'], [0.5, 'green'], [1, 'blue']],
            },
            
            dimensions: [{
                range: [4,8],
                constraintrange: [5, 5.5],
                label: parameterTitles[0],
                values: transposeData[0]
            }, {
                range: [2, 4.5],
                label: parameterTitles[1],
                values: transposeData[1]
            }, {
                label: parameterTitles[2],
                range: [1, 7],
                values: transposeData[2]
            }, {
                label: parameterTitles[3],
                range: [0, 2.5],
                values: transposeData[3]
            }]
        }
    ];

              
        Plotly.newPlot('graph1', data), {width: document.getElementById('graph1').offsetWidth};

        document.getElementById('information').innerText = "\n\nHumans are generally very bad at interpreting data in more than three dimensions." + 
                                                            "We can attempt to visualise data by tabulating it in a spreadsheet or by Parallel Coordinate Plots as " +
                                                            "done to the left for our data, the Fischer-Iris Dataset which we will use throughout this suite. \n\nSlide the slider up and down to look down different data points. " +
                                                            "You can probably tell that it is really quite hard to discern any important features from the data like this! \n\n" +
                                                            "We will look at Principle Component Analysis " +
                                                            "as a way of successfully reducing the dimensionality of this data in a manner that most preserves the " +
                                                            "meaning of, or the patterns within, it.\n\n Select two parameter titles below to try and find " +
                                                            "some kind of conclusive relationship between all the variables. It's hard!\n\n";
        
        const graphWithParamsDataset = (selected) => {


            if (activeButtonQueueDataset.length == 2) {
                activeButtonQueueDataset = []
            }
            
            activeButtonQueueDataset.push(parameterTitles.findIndex(title => title == selected.srcElement.id));
        
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
                width: document.getElementById('graph2').offsetWidth,
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
        
            Plotly.newPlot('graph2', data, layout);
        
            if (!extraTextp1) {
                document.getElementById('information').innerText += "As you can see, even exploring data in just four dimensions can be difficult, if not impossible. "  +
                                                                "There's alot of not so relevant relationships.\n\n"
                extraTextp1 = true;
            }
        }

        setupButtons(graphWithParamsDataset);
}


function covarianceSetup() {

    document.getElementsByClassName('covariance_matrix')[0].style.display = "block";
    document.getElementById('information').innerText = "\n\nCovariance is defined as the joint variability of two random variables.\n\n" +
                                                        "As Covariance can only be calculated between two variables, we compute a Covariance matrix " +
                                                        "to represent the covariances between all the permutations of two random variables. We can do so for the " +
                                                        "same dataset here. \n\nThe first step is to center the data around 0 by subtracting each " +
                                                        "data point by the mean. As we are trying to only analyse the most relevant relationships, pairs of attributes " +
                                                        "with very positive or negative covariance will be of interest as this suggests some sort " +
                                                        "of relationship between dimensions.\n\nCompute some covariances in our sample data below.\n\n";
    
    setupButtons((selected) => {

        if (activeButtonQueueCovariance.length == 2) {
            activeButtonQueueCovariance = []
        }
        activeButtonQueueCovariance.push(parameterTitles.findIndex(title => title == selected.srcElement.id));
    
        var covariance = covarianceM[activeButtonQueueCovariance[0]][activeButtonQueueCovariance[1]];
        partialCovarianceMatrix[activeButtonQueueCovariance[0]][activeButtonQueueCovariance[1]] = Math.round(covariance*100)/100;

        var covarianceTableHtml = "<table class='matrix'><tbody>";
        for (var i = 0; i < covarianceM.length; i++) {
            covarianceTableHtml += "<tr>";
            for (var j = 0; j < covarianceM[i].length; j++) {
                covarianceTableHtml += "<td>" + partialCovarianceMatrix[i][j] + "</td>";
            }
            covarianceTableHtml += "</tr>";
        }
        covarianceTableHtml += "</tbody></table>";

        document.getElementById('covariance_matrix').innerHTML = covarianceTableHtml;


        document.getElementById('information').innerText = "\n\nCovariance is defined as the joint variability of two random variables.\n\n" +
                                                            "As Covariance can only be calculated between two variables, we compute a Covariance matrix " +
                                                            "to represent the covariances between all the permutations of two random variables. We can do so for the " +
                                                            "same dataset here. \n\nThe first step is to center the data around 0 by subtracting each " +
                                                            "data point by the mean. As we are trying to only analyse the most relevant, pairs of attributes with very positive " +
                                                            "or negative covariance will be of interest as this suggests some sort of relationship between dimensions." +
                                                            "\n\nCompute the covariances between attributes of the normalised dataset by picking two points below.\n\n";
        document.getElementById('information').innerText += parameterTitles[activeButtonQueueCovariance[0]] + " and " +
                                                                parameterTitles[activeButtonQueueCovariance[1]] + "'s covariance:\n" + 
                                                                "X = " + parameterTitles[activeButtonQueueCovariance[0]] + ", " +
                                                                "Y = " + parameterTitles[activeButtonQueueCovariance[1]] + "\n" +
                                                                "Cov(X, Y) = " + covariance + "\n\n";
    
    });

}

function eigenvectorsSetup() {
    document.getElementById('information').innerHTML = "<br><br><a href=\"/home/adi/Desktop/Physics-Visualizations/visuals_maths/Eigenvectors/index.html\">Click here for a quick primer about Eigenvectors.</a>" +
                                                       "<p1><br><br>Since the covariance matrix is square, we can calculate the eigenvectors and eigenvalues for this matrix. " +
                                                       "These are rather important, as they tell us useful information about our data as you will find out." + 
                                                       "<br><br>Choose the number of principle components with the slider - what do you notice about how the adjusted data behaves with respect to the Principle Component axes?<br><br>";

    var data = [{
        x: ['PC1', 'PC2', 'PC3', 'PC4'],
        y: importancePC,
        type: 'bar',
        text: importancePC.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.6,
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    }];

    var layout = {
        title: 'Explained Variance of the 4 principle components in flower dataset (%)'
    };

    Plotly.newPlot('graph2', data, layout);
    document.getElementsByClassName('explained_variance_maths')[0].style.display = "block";
    
    const graphWithParamsEigenvectors = () => {
    
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
                width: document.getElementById('graph1').offsetWidth,
                height: document.getElementById('graph1').offsetWidth,
                autosize: true
            };  
        
            Plotly.newPlot('graph1', data, layout);
            var matrixClass = pcs == 3 ? 'transformation3' : 'transformation2';

            document.getElementsByClassName('transformation3')[0].style.display = "none";
            document.getElementsByClassName('transformation2')[0].style.display = "none";
            document.getElementsByClassName(matrixClass)[0].style.display = "block";
        };
    
        plotPrincipleComponentGraph();

        if (!extraTextp3) {            

            document.getElementById('information').innerHTML += "<label class=\"sliderTitle\">Number of Principle Components:&nbsp;<span id=\"aControllerDisplay\" data-unit=\"\">3</span> </label><label class=\"slider\"><input id=\"aController\" class=\"inputs\" type=\"range\" value=\"3\" min=\"2\" max=\"3\" step=\"1\"/></label>"; 
            pcs = parseFloat(document.getElementById('aController').value); 
            plotPrincipleComponentGraph();
            document.getElementById('information').innerHTML +=  "It seems that one of these principle components seems to somewhat goes through the middle of the cloud of data points, like a line of best fit. " +
                                                                    "<br><br>The second principle component, and so on give us other, less important, patterns in the data, and so on. This makes sense! The vectors correspond to the most important eigenvectors (as determined by the magnitude of their eigenvalues) " +
                                                                    "of the covariance matrix, which itself encodes the relationships between all the data attributes.<br><br>" +
                                                                    "The rest of the steps involve transforming the data so that it is expressed in terms of these lines into the adjusted data. The 2/3 dimension subspace or the reduced dataset to be computed is obtained by " +
                                                                    "multiplying the feature vector containing all the used principle component vectors by the transpose of normalised dataset matrix as illustrated below the plot. The feature vector is a \"projection matrix\". <br><br>" + 
                                                                    "We can more easily now see two things: similar flowers cluster together and which attribute of the data is most responsible for this clustering. The adjusted data " +
                                                                    "above demonstrates this.<br><br></p1>";
            document.getElementById('aController').onchange = () => {
                pcs = parseFloat(document.getElementById('aController').value); 
                document.getElementById('aControllerDisplay').innerText = pcs; 
                plotPrincipleComponentGraph();
            };

            extraTextp3 = true;
        }

    };

    graphWithParamsEigenvectors();

}

function resultSetup() {
    
    document.getElementById('information').innerText = "\n\nPCA computes eigenvectors of the covariance matrix and sorts them by their eigenvalues (amount of explained variance). The normalised data can then be projected onto these principal axes to yield principal components. For the purposes of dimensionality reduction, one can keep only a subset of principal components and discard the rest. " +
                                                       "If we seek to reconstruct our original data, what do you expect to find? \n\n" +
                                                       "If you try and reconstruct random datapoints using some number of Principal Components by playing around with the button and slider on the left, you will see that the reconstructed data does not correspond perfectly to the original data - there are errors. " +
                                                       "\n\nAdditionally, the fewer principal components used in order to compress the data, the worse the data reconstruction is - however this difference is not by alot - cast your mind back to the explained variance chart to think why this is. " +
                                                       "This intuitively makes sense as we are retaining more of the information by using more principal components, but for a more complete mathematical understanding of what's going on click the button below: " +
                                                       "It turns out PCA in this form has many applications that extend beyond normal statistical analysis, especially in Computer Vision and Image Processing, where images are encoded as multidimensional matrices of pixel values.\n\n" +
                                                       "PCA can be used for lossy Image Compression using the dimensionality reduction and then feature recomputation we've discussed. It is known as the KL transform. \n\n" +
                                                       "PCA can also be used in Computer Vision for things like finding patterns in images including things like facial recognition.\n\n" + 
                                                       "The greyscale image below is encoded as a 512 by 512 data matrix. If one performs PCA on it and tries to reconstruct the image using the first 50 Principal Components we generate the image on the right. We can see some data is not recovered in the reconstructed photo's quality.";
                                            
    document.getElementById('information').innerHTML += "<img src='/home/adi/Desktop/Javascript-Maths-Tidbits/PCA-Visualiser/lenaPCA.png' style='width:100%; height:40%' alt='Lena Compression Image'>";
    document.getElementById('reconstructionControls').style.display = 'block';
    var randomButton = document.getElementsByClassName("randomButton")[0];

    var pcSlider = document.getElementById('principalComponents');
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
        document.getElementById('principalComponentsDisplay').innerText = pcs;
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
        Plotly.newPlot('graph1', data, {barmode: 'group'});    
    };
}

function switchTab(tabName) {

    clearTemporaryDivisions()

    switch(tabName) {
        case 'Dataset':
            datasetVisualisation();
            break;
        case 'Covariance':
            covarianceSetup();
            break;
        case 'Eigenvectors':
            eigenvectorsSetup();    
            break;
        case 'Result':
            resultSetup();
            break;
    }

}


  
$(document).ready(pcaIntro); 