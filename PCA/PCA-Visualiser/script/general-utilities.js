var activeButtonQueueDataset = [];
var activeButtonQueueCovariance = [];
var parameterTitles = ['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'];
var shortenedParameterTitles = ['SL', 'SW', 'PL', 'PW'];
var extraTextp1 = false;
var extraTextp3 = false;
var flowerTypeSplit = [];

// This is called when any of the parameter buttons are pressed
// We discern which button is pressed from the id attribute

function setupButtons(fx) {
    var buttons = [];                                                    

    for (var i = 0; i < parameterTitles.length; ++i) {
        buttons.push(document.createElement("button"));
    }

    for (var i = 0; i < buttons.length; ++i) {
        buttons[i].innerHTML = parameterTitles[i];
        buttons[i].id = parameterTitles[i];
        buttons[i].onclick = (i) => { fx(i) };
        document.getElementById('params').appendChild(buttons[i]);
    }

}

function clearTemporaryDivisions() {
    document.getElementById('graph1').innerHTML = "";
    document.getElementById('graph2').innerHTML = "";
    document.getElementById('params').innerHTML = "";
    document.getElementById('information').innerHTML = "";
    extraTextp1 = false;
    extraTextp3 = false;
    document.getElementsByClassName('covariance_matrix')[0].style.display = "none";
    document.getElementsByClassName('transformation3')[0].style.display = "none";
    document.getElementsByClassName('transformation2')[0].style.display = "none";
    document.getElementById('transformationmaths').style.display = 'none';
    document.getElementsByClassName('explained_variance_maths')[0].style.display = "none";
    document.getElementById('explainedvariancemaths').style.display = "none";
    document.getElementById('covariancematrix').style.display = "none";
    document.getElementById('reconstructionControls').style.display = "none";
    document.getElementById('reconstructionmaths').style.display = "none";
}

function adjustSizing() {
    document.getElementById('information').style.fontSize = '130%';
    document.getElementById('graph1').style.fontSize = '130%';
    document.getElementById('graph2').style.fontSize = '130%';
    document.getElementById('transformationmaths').style.fontSize = '130%';
    document.getElementById('explainedvariancemaths').style.fontSize = '130%';
    document.getElementById('reconstructionmaths').style.fontSize = '130%';
    document.getElementById('transformationmaths').style.backgroundColor = 'lightblue';
    document.getElementById('reconstructionmaths').style.backgroundColor = 'lightblue';
    document.getElementById('explainedvariancemaths').style.backgroundColor = 'lightblue';
    document.getElementById('covariancematrix').style.backgroundColor = 'lightblue';
    document.getElementById('covariancematrix').style.fontSize = '130%';

    document.getElementsByClassName('covariance_matrix')[0].style.fontSize = '130%';
    document.getElementsByClassName('transformation3')[0].style.fontSize = '130%';
    document.getElementsByClassName('transformation2')[0].style.fontSize = '130%';
}