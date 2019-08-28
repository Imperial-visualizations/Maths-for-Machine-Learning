//Global Initial Parameters:
var initialPoint = [1.5, 1.5];
var layout = {
    width: 600, height: 600,
    margin: {l:30, r:30, t:10, b:30},
    hovermode: "closest",
    showlegend: false,
    xaxis: {range: [-15, 15], zeroline: true, title: "x"},
    yaxis: {range: [-225, 225], zeroline: true, title: "y"},
    aspectratio: {x:1, y:1}
};
var currentPoint = initialPoint;

//Plot
/**
 * Resets and plots initial area element or basis vectors of plane polar.
 * @param {string} type - basis vectors or area element
 */

function computeQuadratic(a, b, c) {
    var xs = numeric.linspace(-15, 15, 200);
    var ys = numeric.linspace(-15, 15, 200);

    for(var i = 0; i < ys.length; ++i) {
        ys[i] = (a * ys[i] * ys[i]) + (b * ys[i]) + c;
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

    var a = parseFloat(document.getElementById('aController').value);
    var b = parseFloat(document.getElementById('bController').value);
    var c = parseFloat(document.getElementById('cController').value);
    data = computeQuadratic(a, b, c);

    Plotly.newPlot('graph', data, layout);
    return;
}


/** updates the plot according to the slider controls. */
function updatePlot() {
    var data = [];
    // NB: updates according to the active tab

    var a = parseFloat(document.getElementById('aController').value);
    var b = parseFloat(document.getElementById('bController').value);
    var c = parseFloat(document.getElementById('cController').value);
    data = computeQuadratic(a, b, c);

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

function main() {
    /*Jquery*/ //NB: Put Jquery stuff in the main not in HTML
    $("input[type=range]").each(function () {
        var displayEl;
        /*Allows for live update for display values*/
        $(this).on('input', function(){
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#"+$(this).attr("id") + "Display").text( $(this).val() + $("#"+$(this).attr("id") + "Display").attr("data-unit") );
            updatePlot(); //Updating the plot is linked with display (Just My preference)
        
        });

    });

    /*Tabs*/
    $(function() {
        $('ul.tab-nav li a.button').click(function() {
            var href = $(this).attr('href');
            $('li a.active.button', $(this).parent().parent()).removeClass('active');
            $(this).addClass('active');
            $('.tab-pane.active', $(href).parent()).removeClass('active');
            $(href).addClass('active');

            initGraph(href); //re-initialise when tab is changed
            return false;
        });
    });

    //The First Initialisation - I use 's' rather than 'z' :p
    initGraph("#basis");
}
$(document).ready(main); //Load main when document is ready.