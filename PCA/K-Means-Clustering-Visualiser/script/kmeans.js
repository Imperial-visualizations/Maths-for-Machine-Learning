//Global Initial Parameters:
var setosa = 'setosa';
var versicolor = 'versicolor';
var virginica = 'virginica';
var flower_set = [[5.1,3.5,1.4,0.2,setosa],
    [4.9,3.0,1.4,0.2,setosa],
    [4.7,3.2,1.3,0.2,setosa],
    [4.6,3.1,1.5,0.2,setosa],
    [5.0,3.6,1.4,0.2,setosa],
    [5.4,3.9,1.7,0.4,setosa],
    [4.6,3.4,1.4,0.3,setosa],
    [5.0,3.4,1.5,0.2,setosa],
    [4.4,2.9,1.4,0.2,setosa],
    [4.9,3.1,1.5,0.1,setosa],
    [5.4,3.7,1.5,0.2,setosa],
    [4.8,3.4,1.6,0.2,setosa],
    [4.8,3.0,1.4,0.1,setosa],
    [4.3,3.0,1.1,0.1,setosa],
    [5.8,4.0,1.2,0.2,setosa],
    [5.7,4.4,1.5,0.4,setosa],
    [5.4,3.9,1.3,0.4,setosa],
    [5.1,3.5,1.4,0.3,setosa],
    [5.7,3.8,1.7,0.3,setosa],
    [5.1,3.8,1.5,0.3,setosa],
    [5.4,3.4,1.7,0.2,setosa],
    [5.1,3.7,1.5,0.4,setosa],
    [4.6,3.6,1.0,0.2,setosa],
    [5.1,3.3,1.7,0.5,setosa],
    [4.8,3.4,1.9,0.2,setosa],
    [5.0,3.0,1.6,0.2,setosa],
    [5.0,3.4,1.6,0.4,setosa],
    [5.2,3.5,1.5,0.2,setosa],
    [5.2,3.4,1.4,0.2,setosa],
    [4.7,3.2,1.6,0.2,setosa],
    [4.8,3.1,1.6,0.2,setosa],
    [5.4,3.4,1.5,0.4,setosa],
    [5.2,4.1,1.5,0.1,setosa],
    [5.5,4.2,1.4,0.2,setosa],
    [4.9,3.1,1.5,0.1,setosa],
    [5.0,3.2,1.2,0.2,setosa],
    [5.5,3.5,1.3,0.2,setosa],
    [4.9,3.1,1.5,0.1,setosa],
    [4.4,3.0,1.3,0.2,setosa],
    [5.1,3.4,1.5,0.2,setosa],
    [5.0,3.5,1.3,0.3,setosa],
    [4.5,2.3,1.3,0.3,setosa],
    [4.4,3.2,1.3,0.2,setosa],
    [5.0,3.5,1.6,0.6,setosa],
    [5.1,3.8,1.9,0.4,setosa],
    [4.8,3.0,1.4,0.3,setosa],
    [5.1,3.8,1.6,0.2,setosa],
    [4.6,3.2,1.4,0.2,setosa],
    [5.3,3.7,1.5,0.2,setosa],
    [5.0,3.3,1.4,0.2,setosa],
    [7.0,3.2,4.7,1.4,versicolor],
    [6.4,3.2,4.5,1.5,versicolor],
    [6.9,3.1,4.9,1.5,versicolor],
    [5.5,2.3,4.0,1.3,versicolor],
    [6.5,2.8,4.6,1.5,versicolor],
    [5.7,2.8,4.5,1.3,versicolor],
    [6.3,3.3,4.7,1.6,versicolor],
    [4.9,2.4,3.3,1.0,versicolor],
    [6.6,2.9,4.6,1.3,versicolor],
    [5.2,2.7,3.9,1.4,versicolor],
    [5.0,2.0,3.5,1.0,versicolor],
    [5.9,3.0,4.2,1.5,versicolor],
    [6.0,2.2,4.0,1.0,versicolor],
    [6.1,2.9,4.7,1.4,versicolor],
    [5.6,2.9,3.6,1.3,versicolor],
    [6.7,3.1,4.4,1.4,versicolor],
    [5.6,3.0,4.5,1.5,versicolor],
    [5.8,2.7,4.1,1.0,versicolor],
    [6.2,2.2,4.5,1.5,versicolor],
    [5.6,2.5,3.9,1.1,versicolor],
    [5.9,3.2,4.8,1.8,versicolor],
    [6.1,2.8,4.0,1.3,versicolor],
    [6.3,2.5,4.9,1.5,versicolor],
    [6.1,2.8,4.7,1.2,versicolor],
    [6.4,2.9,4.3,1.3,versicolor],
    [6.6,3.0,4.4,1.4,versicolor],
    [6.8,2.8,4.8,1.4,versicolor],
    [6.7,3.0,5.0,1.7,versicolor],
    [6.0,2.9,4.5,1.5,versicolor],
    [5.7,2.6,3.5,1.0,versicolor],
    [5.5,2.4,3.8,1.1,versicolor],
    [5.5,2.4,3.7,1.0,versicolor],
    [5.8,2.7,3.9,1.2,versicolor],
    [6.0,2.7,5.1,1.6,versicolor],
    [5.4,3.0,4.5,1.5,versicolor],
    [6.0,3.4,4.5,1.6,versicolor],
    [6.7,3.1,4.7,1.5,versicolor],
    [6.3,2.3,4.4,1.3,versicolor],
    [5.6,3.0,4.1,1.3,versicolor],
    [5.5,2.5,4.0,1.3,versicolor],
    [5.5,2.6,4.4,1.2,versicolor],
    [6.1,3.0,4.6,1.4,versicolor],
    [5.8,2.6,4.0,1.2,versicolor],
    [5.0,2.3,3.3,1.0,versicolor],
    [5.6,2.7,4.2,1.3,versicolor],
    [5.7,3.0,4.2,1.2,versicolor],
    [5.7,2.9,4.2,1.3,versicolor],
    [6.2,2.9,4.3,1.3,versicolor],
    [5.1,2.5,3.0,1.1,versicolor],
    [5.7,2.8,4.1,1.3,versicolor],
    [6.3,3.3,6.0,2.5,virginica],
    [5.8,2.7,5.1,1.9,virginica],
    [7.1,3.0,5.9,2.1,virginica],
    [6.3,2.9,5.6,1.8,virginica],
    [6.5,3.0,5.8,2.2,virginica],
    [7.6,3.0,6.6,2.1,virginica],
    [4.9,2.5,4.5,1.7,virginica],
    [7.3,2.9,6.3,1.8,virginica],
    [6.7,2.5,5.8,1.8,virginica],
    [7.2,3.6,6.1,2.5,virginica],
    [6.5,3.2,5.1,2.0,virginica],
    [6.4,2.7,5.3,1.9,virginica],
    [6.8,3.0,5.5,2.1,virginica],
    [5.7,2.5,5.0,2.0,virginica],
    [5.8,2.8,5.1,2.4,virginica],
    [6.4,3.2,5.3,2.3,virginica],
    [6.5,3.0,5.5,1.8,virginica],
    [7.7,3.8,6.7,2.2,virginica],
    [7.7,2.6,6.9,2.3,virginica],
    [6.0,2.2,5.0,1.5,virginica],
    [6.9,3.2,5.7,2.3,virginica],
    [5.6,2.8,4.9,2.0,virginica],
    [7.7,2.8,6.7,2.0,virginica],
    [6.3,2.7,4.9,1.8,virginica],
    [6.7,3.3,5.7,2.1,virginica],
    [7.2,3.2,6.0,1.8,virginica],
    [6.2,2.8,4.8,1.8,virginica],
    [6.1,3.0,4.9,1.8,virginica],
    [6.4,2.8,5.6,2.1,virginica],
    [7.2,3.0,5.8,1.6,virginica],
    [7.4,2.8,6.1,1.9,virginica],
    [7.9,3.8,6.4,2.0,virginica],
    [6.4,2.8,5.6,2.2,virginica],
    [6.3,2.8,5.1,1.5,virginica],
    [6.1,2.6,5.6,1.4,virginica],
    [7.7,3.0,6.1,2.3,virginica],
    [6.3,3.4,5.6,2.4,virginica],
    [6.4,3.1,5.5,1.8,virginica],
    [6.0,3.0,4.8,1.8,virginica],
    [6.9,3.1,5.4,2.1,virginica],
    [6.7,3.1,5.6,2.4,virginica],
    [6.9,3.1,5.1,2.3,virginica],
    [5.8,2.7,5.1,1.9,virginica],
    [6.8,3.2,5.9,2.3,virginica],
    [6.7,3.3,5.7,2.5,virginica],
    [6.7,3.0,5.2,2.3,virginica],
    [6.3,2.5,5.0,1.9,virginica],
    [6.5,3.0,5.2,2.0,virginica],
    [6.2,3.4,5.4,2.3,virginica],
    [5.9,3.0,5.1,1.8,virginica]];

var param_titles = ['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'];
var f_index = [];

function kmeansIntro() {
    Plotly.purge("graph1");
    document.getElementById('graph1').innerText = "\n\nAn introduction to K Means Clustering. \n\n If there's any preamble we can put it here, otherwise this landing page can be removed.";
    
    f_index.push(flower_set.findIndex(vector => vector[vector.length-1] == versicolor));
    f_index.push(flower_set.findIndex(vector => vector[vector.length-1] == virginica));

    flower_set.forEach(vector => {
        vector.pop();
        vector.pop();
    });

}

function kmeansDemo() {
    var xs = []; ys = []; zs = []; //ts = [];
    flower_set.forEach(vector => {
        xs.push(vector[0]);
        ys.push(vector[1]);
        zs.push(vector[2]);
        //ts.push(vector[3]);
    });

    // shuffle
    flower_set.sort(() => Math.random() - 0.5);

    var k = 3;
    var partitions_old = []; var partitions = []; var means = [];


    for(var i = 0; i < k; ++i) {
        partitions.push([]);
        partitions_old.push([]);
    }

    // Forgy method initialise

    means = flower_set.slice(0, k);

    const euclidianSquareDistance = function(xs, ys) {
        console.assert(xs.length == ys.length);
        var ds = [];
        for (var i = 0; i < xs.length; ++i) {
            ds.push(xs[i] - ys[i]);
        }
        var dist = ds.map(x => x * x).reduce((a, b) => a + b, 0);
        return dist;
            
    };


    const assignment = function() {
        flower_set.forEach(vector => {
            var distances_to_means = means.map(mean => euclidianSquareDistance(vector, mean));
            var is = numeric.linspace(0, k-1, k);

            var partition = is.reduce((i, j) => distances_to_means[j] < distances_to_means[i] ? j : i, 0);
            partitions[partition].push(vector);
        });
    };

    const update = function() {
        partitions_old = partitions.copyWithin(0, partitions.length);
        for (var i = 0; i < k; ++i) {
            for (var j = 0; j < flower_set[0].length; ++j) {
                means[i][j] = 0;
                partitions[i].forEach(set => {
                    means[i][j] += set[j];
                });
                means[i][j] /= partitions[i].length;
            }
        }
    };

    const compareArrays = function(xs, ys) {

        if (xs.length != ys.length) {
            return false;
        } 

        for (var i = 0; i < xs.length; ++i) {
            for (var j = 0; j < xs[0].length; ++j) {
                if (xs[i][j] != ys[i][j]) return false;
            }
        }
        return true;
    };


    for (var i = 0; i < 4; ++i) {
        assignment();
        update();
    }

    var pxs = [];
    var pys = [];
    var pzs = [];
    


    for (var partition = 0; partition < partitions.length; ++partition) {
        pxs.push([]);
        pys.push([]);
        pzs.push([]);
        partitions[partition].forEach(vector => {
            pxs[partition].push(vector[0]);
            pys[partition].push(vector[1]);
            pzs[partition].push(vector[2]);
        })
    }

    pxs[0] = pxs[0].slice(1);
    pxs[1] = pxs[1].slice(1);
    pxs[2] = pxs[2].slice(1);

         
    var data1 = [
        {
            x:xs.slice(0, f_index[0]), y:ys.slice(0, f_index[0]), z:zs.slice(0, f_index[0]),
            name: setosa,
            mode: 'markers',
            type: 'scatter3d',
            marker: {
                size: 5,
            }
        },
        {
            x:xs.slice(f_index[0], f_index[1]), y:ys.slice(f_index[0], f_index[1]), z:zs.slice(f_index[0], f_index[1]),
            name: versicolor,
            mode: 'markers',
            type: 'scatter3d',
            marker: {
                size: 5,
            }
        },
        {
            x:xs.slice(f_index[1]), y:ys.slice(f_index[1]), z:zs.slice(f_index[1]),
            name: virginica,
            mode: 'markers',
            type: 'scatter3d',
            marker: {
                size: 5,
            }
        }
    ];

    var layout = {
        scene: {
            xaxis:{title: param_titles[0]},
            yaxis:{title: param_titles[1]},
            zaxis:{title: param_titles[2]},
            },
        autosize: false,
        width: document.getElementById('graph1').offsetWidth,
        height: document.getElementById('graph1').offsetWidth,
        margin: {
         l: 0,
         r: 0,
         b: 50,
         t: 50,
         pad: 4
        },
        grid: {rows: 1, columns: 1, pattern: 'independent'},
    };	
         
    var data2 = [
        {
            x:pxs[0], y: pys[0], z: pzs[0],
            name: 'G1',
            mode: 'markers',
            type: 'scatter3d',
            marker: {
                size: 5,
            }
        },
        {
            x:pxs[1], y: pys[1], z: pzs[1],
            name: 'G2',
            mode: 'markers',
            type: 'scatter3d',
            marker: {
                size: 5,
            }
        },
        {
            x:pxs[2], y: pys[2], z: pzs[2],
            name: 'G3',
            mode: 'markers',
            type: 'scatter3d',
            marker: {
                size: 5,
            }
        }
    ];

    Plotly.newPlot('graph1', data1, layout);
    Plotly.newPlot('graph2', data2, layout);


}

// This is called when any of the parameter buttons are pressed
// We discern which button is pressed from the id attribute set priorly

function setupButtons(fx) {
    var buttons = [];                                                    

    for (var i = 0; i < param_titles.length; ++i) {
        buttons.push(document.createElement("button"));
    }

    for (var i = 0; i < buttons.length; ++i) {
        buttons[i].innerHTML = param_titles[i];
        buttons[i].id = param_titles[i];
        buttons[i].onclick = function(i) { fx(i) };
        document.getElementById('graph1').appendChild(buttons[i]);
    }
}


function varianceDemo() {
    
    
}


function switchTab(tabName) {

    switch(tabName) {
        case 'Dataset':
            kmeansDemo();
            break;
        case 'Variance':
            varianceDemo();
            break;
    }

}
  
$(document).ready(kmeansIntro); 