var WIN_WIDTH = 320,
    WIN_HEIGHT = 480,
    COLOR = '#0072e3',
    BLOCK_WIDTH = 80,
    BLOCK_HEIGHT = 120;

var block_path = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 1, 0]
]

var blocks = [];

var test = 0;

var p = {};

window.onload = function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
    canvas.width = WIN_WIDTH;
    canvas.height = WIN_HEIGHT;

    // var interval = setInterval(function() {
    //     console.log(test);
    //     if(test > 100){
    //         clearInterval(interval);
    //         return;
    //     }
    //     drawBlock(context);
    //     update();
    //     test ++ ;
    // }, 25)
    render(context)

    //添加事件响应
    canvas.addEventListener('click', function(e) {
        p = getEventPosition(e);
        console.log(p)
        reDraw(p, context);
    }, false);
}

function update() {

    for (var i = 0; i < blocks.length; i++) {
        blocks[i].y += 12;
    }

}



function drawBlock(cxt) {
    for (var i = 0; i < blocks.length; i++) {
        cxt.beginPath();
        cxt.moveTo(blocks[i].x, blocks[i].y);
        cxt.fillStyle = blocks[i].color;
        cxt.strokeStyle = '#000';
        cxt.lineWidth = 0.2;
        cxt.lineTo(blocks[i].x + BLOCK_WIDTH, blocks[i].y);
        cxt.lineTo(blocks[i].x + BLOCK_WIDTH, blocks[i].y + BLOCK_HEIGHT);
        cxt.lineTo(blocks[i].x, blocks[i].y + BLOCK_HEIGHT);
        cxt.lineTo(blocks[i].x, blocks[i].y);
        cxt.stroke();
        cxt.fill();
        cxt.closePath();

    }
}


function reDraw(p, cxt) {
    for (var i = 0; i < blocks.length; i++) {
        cxt.beginPath();
        cxt.moveTo(blocks[i].x, blocks[i].y);
        cxt.fillStyle = blocks[i].color;
        cxt.strokeStyle = '#000';
        cxt.lineWidth = 0.2;
        cxt.lineTo(blocks[i].x + BLOCK_WIDTH, blocks[i].y);
        cxt.lineTo(blocks[i].x + BLOCK_WIDTH, blocks[i].y + BLOCK_HEIGHT);
        cxt.lineTo(blocks[i].x, blocks[i].y + BLOCK_HEIGHT);
        cxt.lineTo(blocks[i].x, blocks[i].y);
        cxt.stroke();
        cxt.fill();
        cxt.closePath();

        if (p && cxt.isPointInPath(p.x, p.y)) {
            var interval = setInterval(function() {
                drawBlock(cxt);
                update();
                test ++ ;
                if(test > 10){
                    block_path.shift([0,1,0,0]);
                    for (var i = 0; i < block_path.length; i++) {
                        for (var j = 0; j < block_path[i].length; j++) {
                            var color = "#fff";
                            if (block_path[i][j] == 1) {
                                color = "#000";
                            }
                            var block = {
                                id: i + j,
                                line: i,
                                x: BLOCK_WIDTH * j,
                                y: BLOCK_HEIGHT * i - BLOCK_HEIGHT,
                                color: color
                            }
                            blocks.push(block);
                        }
                    }
                    test = 0;
                    clearInterval(interval);
                    return;
                }
            }, 25)
        }
    }
}



function render(cxt) {

    for (var i = 0; i < block_path.length; i++) {
        for (var j = 0; j < block_path[i].length; j++) {
            var color = "#fff";
            if (block_path[i][j] == 1) {
                color = "#000";
            }
            var block = {
                id: i + j,
                line: i,
                x: BLOCK_WIDTH * j,
                y: BLOCK_HEIGHT * i - BLOCK_HEIGHT,
                color: color
            }
            blocks.push(block);
        }
    }
    drawBlock(cxt)
}


function getEventPosition(ev) {
    var x, y;
    if (ev.layerX || ev.layerX == 0) {
        x = ev.layerX;
        y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
        x = ev.offsetX;
        y = ev.offsetY;
    }
    return {
        x: x,
        y: y
    };
}