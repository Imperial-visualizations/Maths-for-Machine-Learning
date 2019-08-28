//Global Initial Parameters:
var initialPoint = [1.5, 1.5];
var layout = {
    width: 600, height: 400,
    margin: {l:30, r:30, t:30, b:30},
    hovermode: "closest",
    showlegend: false,
    xaxis: {range: [-50, 50], zeroline: true, title: "x"},
    yaxis: {range: [-250, 250], zeroline: true, title: "y"},
    aspectratio: {x:1, y:1}
};
var currentPoint = initialPoint;

//Plot
/**
 * Resets and plots initial area element or basis vectors of plane polar.
 * @param {string} type - basis vectors or area element
 */

function computeQuadratic(a, b, c) {
    var xs = numeric.linspace(-4, 4, 64);
    var ys = numeric.linspace(-4, 4, 64);

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

function computeDerivative(token) {
    
    var i = 0;
    var n;
    var a;

    while(i < token.length) {

        if (token.slice(i, i+2) == "**") {
            n = token[i+2];
            n += token.slice(i+3, token.length);
            ++i;
        }
        ++i;
    }

    a = token[0];
    var i = 1;
    while(!isNaN(token[i])) {
        a += token[i];
        ++i;
    }

    if (a == "+") {
        a = "1";
    } else if (a == "-") {
        a = "-1";
    } 

    a = parseFloat(a) * parseFloat(n);
    n = parseFloat(n) - 1;

    var derivative = a.toString(10) + "(x" + "**" + n.toString(10)+ ")";
    return derivative;

}

function tokeniseExps(expression) {
    var tokens = [];
    var i = 0;
    var curr = "";
    while(i < expression.length) {
        
        if (expression[i] == "+" || expression[i] == "-") {
            //deal with signs later
            curr += expression[i];
            ++i;
        } else if (expression[i] == " ") {
            if (curr != "+") {
                tokens.push(curr);
                curr = "";
            }
            ++i;
        } else {
            // could be a number, **, symbol
            curr += expression[i];
            ++i;
        }
        
        if (i == expression.length) {
            tokens.push(curr);
            curr = "";
        }

    }

    return tokens;
}

function firstDerivative(formula) {

    if (formula == "0") {
        return "0";
    }

    if (formula[0] != '+' || formula[0] != '-') {
        formula = "+" + formula;
    }

    var tokens = tokeniseExps(formula);
    var derivedTokens = [];

    tokens.forEach(token => {
        if (token != "") {
            derivedTokens.push(computeDerivative(token));
        }
    });

    var derivative = derivedTokens[0];

    derivedTokens.slice(1, derivedTokens.length).forEach(d => {
        derivative += " + " + d;
    });

    return derivative;
}

function nthDerivative(formula, n) {
    var derivative;
    for(var i = 0; i < n; ++i) {
        derivative = firstDerivative(formula);
        formula = derivative;
    }
    return formula;
}

function generateGraphData(expression, derivative, n) {

    var xs = numeric.linspace(-50, 50, 2500);
    var ysExpression = numeric.linspace(-50, 50, 2500);
    var ysDerivative = numeric.linspace(-50, 50, 2500);

    for(var i = 0; i < ysExpression.length; ++i) {
        var x = xs[i];
        ysExpression[i] = eval(expression);
    }

    // var find = '(';
    // var re = new RegExp(find, 'g');

    derivative = derivative.replace("(", " * (");

    // for (var i = 0; i < variables; ++i) {
    //     derivative = derivative.replace("(", " * (");
    // }

    for(var i = 0; i < ysDerivative.length; ++i) {
        var x = xs[i];
        ysDerivative[i] = eval(derivative);
        if (ysDerivative[i] == NaN) {
            ysDerivative[i] = 0;
        }
    }

    var data = [{
        x: xs,
        y: ysExpression,
        type: 'scatter',
        name: 'f(x)'
    },
    {
        x: xs,
        y: ysDerivative,
        type: 'scatter',
        name: 'f' + n.sup() + '(x)'
    }];

    return data;
}

function initGraph(type) {
    Plotly.purge("graph");

    var n = parseFloat(document.getElementById('aController').value);

    var formula = document.getElementById('aInput').value;
    var nthderivative = nthDerivative(formula, n);
    var data = generateGraphData(formula, nthderivative, n.toString(10));

    Plotly.newPlot('graph', data, layout);

    return;
}


/** updates the plot according to the slider controls. */
function updatePlot() {
    
    var data = [];

    var n = parseFloat(document.getElementById('aController').value);
    var formula = document.getElementById('aInput').value;
    var nthderivative = nthDerivative(formula, n);
    data = generateGraphData(formula, nthderivative, n.toString(10));

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

    initGraph("#basis");
}
$(document).ready(main); //Load main when document is ready.