var underMap = [];
var upMap = [];
var firstClick = true;
let yDir = [-1, -1, 0, 1, 1, 1, 0, -1];
let xDir = [0, 1, 1, 1, 0, -1, -1, -1];
var flags = 6;
$(document).ready(function() {
    init();
    drawBoard();
    $('#retryButton').click(function() {
        $('#winUI').css('display', 'none');
        flags = 6;
        init();
        drawBoard();
    })
});

function initMouse() {
    document.addEventListener('contextmenu', event => event.preventDefault());
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            let id = "#P";
            id += i;
            id += j;
            $(id).mousedown(function(ev) {
                ev.preventDefault();
                switch (ev.which) {
                    case 1:
                        playerClick(i, j, 1);
                        break;
                    case 2:
                        break;
                    case 3:
                        playerClick(i, j, 2);
                        break;
                    default:
                        console.log("mouse");
                }
            })
        }
    }
}

function init() {
    flags = 6;
    updateFlags();
    upMap = [];
    underMap = [];
    let fullHTML = "";
    for (let i = 0; i < 8; ++i) {
        let emptyArrA = [];
        let emptyArrB = [];
        for (let j = 0; j < 8; ++j) {
            let id = "P";
            id += i;
            id += j;
            fullHTML += '<div class="chunk" id="' + id + '"></div>';
            emptyArrA.push(0);
            emptyArrB.push(0);
        }
        underMap.push(emptyArrA);
        upMap.push(emptyArrB);
    }
    $('#gameBoard').html(fullHTML);
    let cnt = 0;
    while (cnt < 6) {
        let y = Math.floor(Math.random() * 8);
        let x = Math.floor(Math.random() * 8);
        if (underMap[y][x] == 1) continue;
        underMap[y][x] = -1;
        ++cnt;
    }
    fillNumber();
    initMouse();
}

function fillNumber() {

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            if (underMap[i][j] == -1) continue;
            let cnt = 0;
            for (let k = 0; k < 8; ++k) {
                let y = i;
                let x = j;
                if (0 <= y + yDir[k] && y + yDir[k] < 8) {
                    y += yDir[k];
                } else {
                    continue;
                }
                if (0 <= x + xDir[k] && x + xDir[k] < 8) {
                    x += xDir[k];
                } else {
                    continue
                }

                if (underMap[y][x] == -1) {
                    ++cnt;
                }

            }
            underMap[i][j] = cnt;
        }
    }
}

function drawBoard() {
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            let id = "#P";
            id += i;
            id += j;
            if (upMap[i][j] == 0) {
                $(id).css('background-color', '#777777');
                $(id).html("");
            } else if (upMap[i][j] == 1) {
                if (underMap[i][j] != 0) {
                    if (underMap[i][j] == -1) {
                        $(id).html('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-brightness-low-fill" viewBox="0 0 16 16"> <path d = "M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8.5 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707zm-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707zm7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707zM3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707z" / ></svg>');
                    } else {
                        $(id).html('<h1>' + underMap[i][j] + '</h1>');
                    }
                }
                $(id).css('color', 'black');
                $(id).css('background-color', '#555555');
                $(id).css('border', '3px solid black');
                $(id).css('padding', '10px');
                $(id).css('box-shadow', 'inset 0 0 0 5px #444444');
            } else if (upMap[i][j] == 2) {
                $(id).css('background-color', '#777777');
                $(id).html('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16"><path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/></svg>');
                $(id).css('color', 'red');
                $(id).css('padding', '5px');
            }
        }
    }
}

function playerClick(y, x, k) {

    if (k == 1) {
        if (firstClick == true) {
            while (underMap[y][x] != 0) {
                init();
            }
            firstClick = false;
        }
        if (upMap[y][x] != 2) {
            upMap[y][x] = 1;
            if (underMap[y][x] == 0) openSpace(y, x);
        }
    } else if (k == 2) {
        if (upMap[y][x] == 0 && flags) {
            upMap[y][x] = 2;
            --flags;
        } else if (upMap[y][x] == 2) {
            upMap[y][x] = 0;
            ++flags;
        }
        updateFlags();
    }
    drawBoard();
    if (checkWin()) {
        winUI(1);
    } else {
        if (underMap[y][x] == -1 && k == 1) {
            allBoom();
            winUI(2);
        }
    }
}

function updateFlags() {
    $('#flags').html(flags);
}

function allBoom() {
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            if (underMap[i][j] == -1) upMap[i][j] = 1;
        }
    }
    drawBoard();
}

function winUI(x) {
    if (x == 1) {
        $('#winText').html("恭喜完成");
        $('#winUI').css('display', 'block');
    } else if (x == 2) {
        $('#winText').html("你被炸死了");
        $('#winUI').css('display', 'block');
    }
}

function openSpace(y, x) {
    // console.log(y, x);
    upMap[y][x] = 1;
    for (let k = 0; k < 8; ++k) {
        let i = y;
        let j = x;
        if (0 <= i + yDir[k] && i + yDir[k] < 8) {
            i += yDir[k];
        } else {
            continue;
        }
        if (0 <= j + xDir[k] && j + xDir[k] < 8) {
            j += xDir[k];
        } else {
            continue
        }

        if (underMap[i][j] == 0 && upMap[i][j] == 0) {
            openSpace(i, j);
        } else if (underMap[i][j] != -1 && upMap[i][j] == 0) {
            upMap[i][j] = 1;
        }
    }
}

function checkWin() {
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            if (underMap[i][j] == -1 && upMap[i][j] == 2) {
                continue;
            } else if (upMap[i][j] == 1) {
                continue;
            }
            return false;
        }
    }
    return true;
}