var WIN_WIDTH = 1024,
    WIN_HEIGHT = 480,
    COLOR = '#0072e3',
    MARGIN_TOP = 100,
    MARGIN_LEFT = 100,
    TIME = new Date().getTime() + 24 * 60 * 60 * 1000,
    RADIUS = 4;

var _second = 1000,
    _minute = _second * 60,
    _hour = _minute * 60,
    _day = _hour * 24;
var curTime = TIME - new Date();
curTime < 0 ? 0 : curTime;
var cTimeD, cTimeH, cTimeM, cTimeS;

var colors = ['#FFD700', '#FF4040', '#C0FF3E', '#4876FF', '#32CD32', '#BF3EFF', '#E0FFFF', '#6959CD'];
var ball = {
    x: 100,
    y: 200,
    vx: 4,
    vy: -10,
    g: 3
}
var balls = [];
window.onload = function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
    canvas.width = WIN_WIDTH;
    canvas.height = WIN_HEIGHT;

    calculateTime();
    setInterval(function() {
        render(context);
        update()
    }, 50)
}

function update() {
    var nTime = TIME - new Date(),
        nTimeD = parseInt(nTime / _day),
        nTimeH = nTimeD * 24 + Math.floor(nTime / _hour) % 24,
        nTimeM = Math.floor((nTime % _hour) / _minute),
        nTimeS = Math.floor((nTime % _minute) / _second);


    if (cTimeS != nTimeS) {

        if (parseInt(cTimeH / 10) != parseInt(nTimeH / 10)) {
            addBall(MARGIN_LEFT, MARGIN_TOP, parseInt(nTimeH / 10));
        }
        if (parseInt(cTimeH % 10) != parseInt(nTimeH % 10)) {
            cTimeH = nTimeH;
            addBall(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(nTimeH % 10));
        }
        if (parseInt(cTimeM / 10) != parseInt(nTimeM / 10)) {
            addBall(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(nTimeM / 10));
        }
        if (parseInt(cTimeM % 10) != parseInt(nTimeM % 10)) {
            cTimeM = nTimeM;
            addBall(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(nTimeM % 10));
        }
        if (parseInt(cTimeS / 10) != parseInt(nTimeS / 10)) {
            addBall(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(nTimeS / 10));
        }
        cTimeS = nTimeS;
        addBall(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nTimeS % 10));
    }
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        var ab = balls[i];
        ab.x += ab.vx;
        ab.y += ab.vy;
        ab.vy += ab.g;

        if (ab.y + RADIUS >= WIN_HEIGHT) {
            ab.vy = -ab.vy * 0.75;
        }

        if (ab.x + RADIUS > 0 && ab.x - RADIUS < WIN_WIDTH) {
            balls[cnt] = ab;
            cnt++;
        }
    }
    balls.splice(cnt - 1, balls.length - cnt);

}

function calculateTime() {
    cTimeD = parseInt(curTime / _day);
    cTimeH = cTimeD * 24 + Math.floor(curTime / _hour) % 24;
    cTimeM = Math.floor((curTime % _hour) / _minute);
    cTimeS = Math.floor((curTime % _minute) / _second);
}

function render(cxt) {

    cxt.clearRect(0, 0, WIN_WIDTH, WIN_HEIGHT);

    var h = cTimeH,
        m = cTimeM,
        s = cTimeS;

    drawDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(h / 10), cxt);
    drawDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(h % 10), cxt);
    drawDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    drawDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(m / 10), cxt);
    drawDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(m % 10), cxt);
    drawDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    drawDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(s / 10), cxt);
    drawDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(s % 10), cxt);

    drawBall(cxt);
}

function drawDigit(x, y, num, cxt) {

    cxt.fillStyle = COLOR;
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                x1 = x + j * 2 * (RADIUS + 1);
                y1 = y + i * 2 * (RADIUS + 1);
                cxt.arc(x1, y1, RADIUS, 2 * Math.PI, false);
                cxt.closePath();

                cxt.fill();
            }
        }
    }

}

function drawBall(cxt) {
    for (var i = 0; i < balls.length; i++) {
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 2 * Math.PI, false);
        cxt.closePath();
        cxt.fillStyle = balls[i].color;
        cxt.fill();
    }
    console.log(balls.length);
}


function addBall(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aball = {
                    x: x + j * 2 * (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.floor(Math.random() * 1000)) * 4,
                    vy: -8,
                    color: colors[Math.floor(Math.random() * 8)]
                }

                balls.push(aball)
            }
        }
    }
}