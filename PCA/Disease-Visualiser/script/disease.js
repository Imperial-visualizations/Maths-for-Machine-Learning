//Global Initial Parameters:
var initialPoint = [1.5, 1.5];
var layout = {
    sliders: [{
      pad: {t: 30},
      currentvalue: {
        xanchor: 'right',
        prefix: 'color: ',
        font: {
          color: '#888',
          size: 20
        }
      },
      steps: [{
        label: 'red',
        method: 'restyle',
        args: ['line.color', 'red']
      }, {
        label: 'green',
        method: 'restyle',
        args: ['line.color', 'green']
      }, {
        label: 'blue',
        method: 'restyle',
        args: ['line.color', 'blue']
      }]
    }],
    width: 600, height: 600,
    margin: {l:30, r:30, t:10, b:30},
    hovermode: "closest",
    showlegend: false,
    xaxis: {range: [-15, 15], zeroline: true, title: "x"},
    yaxis: {range: [-225, 225], zeroline: true, title: "y"},
    aspectratio: {x:1, y:1}
  };

var currentPoint = initialPoint;

var face_diameter = 10;
var canvas_width = 500;
var canvas_height = 500;
var grid = [];
var col = 100;
let r, g, b;
let slider;
var slide;
var n;
var rand;

 //Plot
/**
 * Resets and plots initial area element or basis vectors of plane polar.
 * @param {string} type - basis vectors or area element
 */

class People {
    constructor(x, y, diameter, state) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.state = state; 
    }

    display() {
        circle(this.x, this.y, this.diameter);
    }
}

function setup() {
    var canvas = createCanvas(canvas_width, canvas_height);
    background(0);
    canvas.parent('visualisation');
    slider = createSlider(-10, 10, 400);
    slider.parent('graph');
    slider.position(50, 500);
    slide = 10;
    initGraph();

}

// TODO: add parameter to this function that takes into account graph
function disease(i, j, rand) {
    this.i = i/20;
    this.j = j/20;

    if (n <= 0) {
        r = g = b = 0;    
        return;
    }

    rand = Math.random();
    if (rand < 0.5) {
        r = g = 230;
        b = 0;
        --n;
    } else {
        r = g = b = 0;
    }

    if (n == (canvas_height/20 * canvas_width/20) - ((canvas_height/20 * j) + (canvas_width/20 * i))) {
        r = g = 230;
        b = 0;
        --n;
    }
    
}

function draw() {

    stroke(51);
    strokeWeight(2);
    n = Math.floor((computefx(slide) / 100) * canvas_width * canvas_height / 400);
    rand = Math.random();
    for (var i = 20; i < canvas_height; i = i + 20) {
        var row = [];
        for (var j = 20; j < canvas_width; j = j + 20) {
            disease(i, j, rand);
            fill(r, g, b);
            var p = new People(i, j, face_diameter, 2);
            p.display();
            row.push(p);
        }
        grid.push(row);
    }

    slide = slider.value();

    updatePlot();
}

function computefx(x) {
    return x * x;
}

function computeQuadratic(final_x) {

    var xs = numeric.linspace(-10, final_x, (final_x + 10) * 20);
    var ys = numeric.linspace(-10, final_x, (final_x + 10) * 20);


    for(var i = 0; i < ys.length; ++i) {
        ys[i] = computefx(ys[i]);
    }

    var data = [{
        x: xs,
        y: ys,
        type: 'scatter'
    }];

    return data;
}

function initGraph(type) {
    Plotly.purge("graph");

    document.getElementById('graph').style.position = "absolute";
    document.getElementById('graph').style.left = 0;
    document.getElementById('graph').style.top = 30;

    data = computeQuadratic(slide);

    Plotly.newPlot('graph', data);

    return;
}


/** updates the plot according to the slider controls. */
function updatePlot() {
    var data = [];
    // NB: updates according to the active tab
    document.getElementById('graph').style.position = "absolute";
    document.getElementById('graph').style.left = 0;
    document.getElementById('graph').style.top = 30;

    data = computeQuadratic(slide);

    Plotly.animate(
        'graph',
        {data: data},
        {
            fromcurrent: true,
            transition: {duration: 0,},
            frame: {duration: 0, redraw: false,},
            mode: "afterall"
        }
    );
}