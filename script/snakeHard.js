var arrowKey;
var gameFrame;
var frameDuration;
const gameWidth = 21;
const gameHeight = 17;
var score = 1;
var fruit;
var dirX = [0, 0, 1, 0, -1];
var dirY = [0, -1, 0, 1, 0];
var snakeDir;
var gameAble;
$(document).ready(function() {
    checkGameSound();
    $(window).keydown(function(e) { checkKey(e) });
    $('#startButton').click(function() {
        document.getElementById('bgm').play();
        $('#startScreen').css('display', 'none');
        $('#countDown').css('display', 'block');
        $('#countDownText').html('3');
        setTimeout(function() {
            $('#countDownText').html('2');
        }, 1000);
        setTimeout(function() {
            $('#countDownText').html('1');
        }, 2000);
        setTimeout(function() {
            $('#countDown').css('display', 'none');
            init();
        }, 3000);

    });
    $('#soundButton').click(function() {
        checkGameSound();
    })
});



class Queue {
    constructor() {
        this.queue = [];
    }
    enqueue(val) {
        this.queue.unshift(val)
    }
    dequeue() {
        return this.queue.pop()
    }
    print() {
        console.log(this.queue);
    }
    getFirst() {
        return Number(this.queue[0]);
    }
    getNum(idx) {
        return Number(this.queue[idx]);
    }
    getLen() {
        return Number(this.queue.length);
    }
}

var snakeX, snakeY;

function getId(y, x) {
    let ret = "P";
    if (y < 10) ret += '0' + y;
    else ret += y;
    if (x < 10) ret += '0' + x;
    else ret += x;
    return ret;
}

function init() {
    flashAll();
    init_snake();
    init_fruit();
    initMap();
    arrowKey = 1;
    frameDuration = 100;
    gameFrame = window.setInterval(everyCycle, frameDuration);
}

function init_fruit() {
    let x, y;
    let check = true;
    while (check) {
        y = Math.floor(Math.random() * gameHeight);
        x = Math.floor(Math.random() * gameWidth);
        check = false;
        for (let i = 0; i < snakeX.getLen(); ++i) {
            if (x == snakeX.getNum(i) && y == snakeY.getNum(i)) {
                check = true;
                break;
            }
        }
    }
    fruit = { y: y, x: x };
}

function init_snake() {
    let j = Math.floor(gameWidth / 2);
    let i = Math.floor(gameHeight / 2);
    snakeX = new Queue;
    snakeX.enqueue(j);
    snakeX.enqueue(j);
    snakeX.enqueue(j);
    snakeY = new Queue;
    snakeY.enqueue(i + 2);
    snakeY.enqueue(i + 1);
    snakeY.enqueue(i);
}

function initMap() {
    let html = "";
    for (let i = 0; i < gameHeight; ++i) {
        for (let j = 0; j < gameWidth; ++j) {
            let id = getId(i, j);
            html += '<div class="gameCell" id="' + id + '" style="animation:flashGround 1s infinite alternate"></div>';
        }
    }
    $('#gameBoard').html(html);
}

function clearMap() {
    for (let i = 0; i < gameHeight; ++i) {
        for (let j = 0; j < gameWidth; ++j) {
            let id = "#" + getId(i, j);
            $(id).css('background-color', 'green');
            $(id).css('background-image', 'none');
            $(id).css("animation", "none");
            $(id).css('animation', 'flashGround 1s infinite alternate');
        }
    }
}

function move_snake() {
    if (arrowKey != 0) {
        snakeDir = arrowKey;
        let newX = Number(snakeX.getNum(0) + dirX[arrowKey]);
        let newY = Number(snakeY.getNum(0) + dirY[arrowKey]);
        if (newX < 0 || newX >= gameWidth || newY < 0 || newY >= gameHeight) {
            endGame(0);
        }
        if (hitBody(newY, newX)) {
            endGame(0);
        }
        if (!eatFruit(newY, newX)) {
            snakeX.dequeue();
            snakeY.dequeue();
        }


        snakeX.enqueue(newX);
        snakeY.enqueue(newY);
    }
}

function showFruit() {
    let id = "#" + getId(fruit.y, fruit.x);
    $(id).css('animation', 'flashFruit 1s infinite alternate,flashGround 1s infinite alternate');
    $(id).css("background-image", "url('../../src/snake/book.webp')");
}

function showSnake() {
    for (let i = 0; i < snakeX.getLen(); ++i) {
        let id = "#" + getId(snakeY.getNum(i), snakeX.getNum(i));
        if (i == 0) {
            $(id).css("animation", "none");
            $(id).css("background-color", "navy");
        } else {
            $(id).css("animation", "none");
            $(id).css("animation", "rainbow 0.5s infinite alternate");
        }
    }
}
let lastKey = 0;

function eatFruit(y, x) {
    let ret = false;
    if (y == fruit.y && x == fruit.x) {
        document.getElementById('getPoint').play();
        ++score;
        showScore();
        if (score == 10) {
            endGame(1);
        }
        init_fruit();
        ret = true;
    }
    return ret;
}

function checkKey(e) {
    var event = window.event ? window.event : e;

    switch (event.keyCode) {
        case 38:
            if (snakeDir == 3) break;
            arrowKey = 1;
            break;
        case 39:
            if (snakeDir == 4) break;
            arrowKey = 2;
            break;
        case 40:
            if (snakeDir == 1) break;
            arrowKey = 3;
            break;
        case 37:
            if (snakeDir == 2) break;
            arrowKey = 4;
            break;
        case 32:
            if (arrowKey == 0) {
                arrowKey = lastKey;
                $('#stopScreen').css('display', 'none');
                document.getElementById('bgm').play();
                gameFrame = window.setInterval(everyCycle, frameDuration);
            } else {
                lastKey = arrowKey;
                arrowKey = 0;
                endGame(2);

            }
            break;
        default:
            break;
    }
}


let cnt = 0;

function everyCycle() {
    if (score >= 10) endGame(1);
    move_snake();
    clearMap();
    if (cnt % 1 == 0) {
        moveFruit();
    }
    showFruit();
    showSnake();
    ++cnt;
}

function moveFruit() {
    let x, y;
    let check = false;
    let MFDir = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; ++i) {
        let mFDir = (i + MFDir) % 4 + 1;
        x = fruit.x + dirX[mFDir];
        y = fruit.y + dirY[mFDir];
        if (x < gameWidth && x >= 0 && y < gameHeight && y >= 0) {
            for (let i = 0; i < snakeX.getLen(); ++i) {
                if (x == snakeX.getNum(i) && y == snakeY.getNum(i)) {
                    check = true;
                    break;
                }
            }
        } else { check = true; continue; }


        if (check == false) { break; }
    }
    if (check == false) fruit = { y: y, x: x };
}

function hitBody(y, x) {
    let ret = false;
    for (let i = 0; i < snakeX.getLen(); ++i) {
        if (y == snakeY.getNum(i) && x == snakeX.getNum(i)) {
            ret = true;
            break;
        }
    }
    return ret;
}

function showScore() {
    $('#score').html("Level:" + score);
}

function endGame(x) {
    document.getElementById('bgm').pause();
    clearInterval(gameFrame);
    $('#stopScreen').css('display', 'block');
    let endText = ""
    if (x == 0) {
        document.getElementById('die').play();
        endText = "窩不會~";
    } else if (x == 1) {
        document.getElementById('getPoint').play();
        endText = "怎麼可能 一定只是運起好而已";
    } else if (x == 2) {
        endText = "暫停";

    }
    $('#stopText').html(endText);

}

function checkGameSound() {
    if (getSoundState() != "1") {
        document.getElementById('bgm').muted = true;
        document.getElementById('getPoint').muted = true;
        document.getElementById('die').muted = true;
    } else {
        document.getElementById('bgm').muted = false;
        document.getElementById('getPoint').muted = false;
        document.getElementById('die').muted = false;
    }
}

function flashAll() {
    $('body').css('animation', 'flashBack 1s infinite alternate');
    $('#score').css('animation', 'flashScore 1s infinite alternate');
    $('#gameBoard').css('animation', 'flashBorder 1s infinite alternate');
}