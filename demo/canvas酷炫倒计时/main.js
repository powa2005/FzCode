var WIN_WIDTH = 1024,
    WIN_HEIGHT = 480,
    COLOR = '#ccc',
    MARGIN_TOP = 100,
    MARGIN_LEFT = 100,
    TIME = 24 * 60 * 60,
    RADIUS = 4;


window.onload = function(){
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
    canvas.width = WIN_WIDTH;
    canvas.height = WIN_HEIGHT;

    setInterval(function(){
        render(context);
        TIME--;
        update()
    },1000)
}

function update(){

}

function render(cxt){

    cxt.clearRect(0, 0, WIN_WIDTH, WIN_HEIGHT);

    var h = parseInt(TIME / 3600), 
        m = parseInt((TIME - h * 60 * 60) / 60), 
        s = TIME - h * 60 * 60 - m * 60;

    drawDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(h/10), cxt);
    drawDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(h%10), cxt);
    drawDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    drawDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(m/10), cxt);
    drawDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(m%10), cxt);
    drawDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    drawDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(s/10), cxt);
    drawDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(s%10), cxt);
}

function drawDigit(x, y, num, cxt){
    
    cxt.fillStyle = COLOR;
    for(var i=0; i<digit[num].length; i++){
        for(var j=0; j<digit[num][i].length; j++){
            if(digit[num][i][j] == 1){
                cxt.beginPath();
                x1 = x + j * 2 *(RADIUS + 1);
                y1 = y + i * 2 *(RADIUS + 1); 
                cxt.arc(x1, y1, RADIUS, 2*Math.PI, false);
                cxt.closePath();

                cxt.fill();
            }
        }
    }
   
}