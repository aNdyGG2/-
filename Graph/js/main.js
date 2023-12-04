function f(x) {
    return Math.tan(x);
}

function g(x) {
    return Math.cos(x);
}

window.onload = function () {
    var WIN = {
        left: -10,
        bottom: -10,
        width: 20,
        height: 20
    };

    var graph = new Graph({
        id: 'canvas',
        width: 700,
        height: 700,
        WIN: WIN,
        callbacks: { wheel: wheel }
    });

    function wheel(event) {
        var zoomStep = 0.2;
        var delta = (event.wheelDelta > 0) ? -zoomStep : zoomStep;
        if (WIN.width + delta > 0) {
            WIN.width += delta;
            WIN.height += delta;
            WIN.left -= delta / 2;
            WIN.bottom -= delta / 2;
            render();
        }
    }

    function drawAxes(color = "#2A2A2A") {
        var axesWidth = 2;
        var markupLenght = 0.2;
        var arrowLenght = 0.05;
        var top = WIN.bottom + WIN.height;
        var right = WIN.left + WIN.width;
        graph.line(0, WIN.bottom, 0, top, color, axesWidth);
        graph.line(WIN.left, 0, right, 0, color, axesWidth);
        for (var i = 1; i < right; i++) {
            graph.line(i, -markupLenght, i, markupLenght, color);
        }
        for (var i = 1; i < top; i++) {
            graph.line(-markupLenght, i, markupLenght, i, color);
        }
        for (var i = -1; i > WIN.left; i--) {
            graph.line(i, -markupLenght, i, markupLenght, color);
        }
        for (var i = -1; i > WIN.bottom; i--) {
            graph.line(-markupLenght, i, markupLenght, i, color);
        }
        var arrowOffset = arrowLenght * WIN.width / 2;
        graph.line(0, top, arrowOffset, top - arrowOffset, color, axesWidth);
        graph.line(0, top, -arrowOffset, top - arrowOffset, color, axesWidth);
        graph.line(right, 0, right - arrowOffset, arrowOffset, color, axesWidth);
        graph.line(right, 0, right - arrowOffset, -arrowOffset, color, axesWidth);
    }

    function drawCells(color = "#AAAAAA") {
        var top = WIN.bottom + WIN.height;
        var right = WIN.left + WIN.width;
        for (var i = 1; i < right; i++) {
            graph.line(i, WIN.bottom, i, top, color);
        }
        for (var i = 1; i < top; i++) {
            graph.line(WIN.left, i, right, i, color);
        }
        for (var i = -1; i > WIN.left; i--) {
            graph.line(i, WIN.bottom, i, top, color);
        }
        for (var i = -1; i > WIN.bottom; i--) {
            graph.line(WIN.left, i, right, i, color);
        }
    }

    function printFunction(func, lineWidth = 2, color = "#4B4B4B") {
        var precision = 1000;
        var x = WIN.left;
        var dx = WIN.width / precision;
        while (x <= WIN.width - WIN.left) {
            if (Math.abs(func(x) - func(x + dx)) >= WIN.height) {
                x += dx;
                continue;
            }
            graph.line(x, func(x), x + dx, func(x + dx), color, lineWidth);
            x += dx;
        }
    }

    function printFunctionText(f) {
        var text = f.toString();
        text = text.substr(
            text.indexOf('return'), text.length
        )
            .replaceAll('return', '')
            .replaceAll('\n', '')
            .replaceAll(' ', '')
            .replaceAll(';}', '')
            .replaceAll('}', '')
            .replaceAll(';', '');
        graph.text(1.2, f(1), 'y = ' + text);
    }

    function render() {
        graph.clear()
        drawCells();
        drawAxes();

        printFunction(g, 2, 'red');
        printFunctionText(g);

        /*for (var i = 0; i < objects.length; i++) {
            func = objects[i];
            printFunction(func.f, func.width, func.color);
        }*/
    }

    render();
}

const funcs = [
    {f:(x) => x*x,
        color: '#f0f',
        width: 2 
    }
];

function render() {
    graph.clear();
    printOXY();
    funcs.forEach(func => func && printFunction(func.f, func.color, func.width))
}
const ui = new UI({addFunction, delFunction});
function addFunction(f, num){
    funcs[num]={
        f,
        color:'#f23',
        width:s
    };
    render();
}

function delFunction(num){
    funcs[num]=null;
    render();
}


