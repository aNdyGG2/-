function Graph(options) {
    options = options || {};
    var id = options.id;
    var width = options.width || 300;
    var height = options.height || 300;
    var WIN = options.WIN || {};
    var canvas;
    if (id) {
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(canvas);
    }
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    var callbacks = options.callbacks;
    canvas.addEventListener('wheel', callbacks.wheel);
    var PI2 = 2 * Math.PI;

    function xs(x) {
        return (x - WIN.left) / WIN.width * canvas.width;
    }

    function ys(y) {
        return (-y + (WIN.bottom + WIN.height)) / WIN.height * canvas.height;
    }

    this.clear = function () {
        context.fillStyle = '#efe';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    this.line = function (x1, y1, x2, y2, color, width) {
        context.beginPath();
        context.strokeStyle = color || '#f00';
        context.lineWidth = width || 1;
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.stroke();
        context.closePath();
    }

    this.point = function (x, y, color, size) {
        context.beginPath();
        context.strokeStyle = color || '#f00';
        context.arc(xs(x), ys(y), size || 2, 0, PI2);
        context.stroke();
        context.closePath();
    }

    this.text = function (x, y, text, color) {
        context.font = "24px arial";
        context.fillStyle = color || '#000';
        context.fillText(text, xs(x), ys(y));
    }
}