var gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var step = 0;
$(document).ready(function() {
    gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    step = 0;
    for (let i = 1; i <= 9; ++i) {
        let id = "#P";
        id += i;
        $(id).click(function() {
            playerPlay(i);
        });
    }
});

function placeMark(x, m) {

    if (gameBoard[x - 1] == 0) {
        gameBoard[x - 1] = m;
        ++step
        return true;
    }
    return false;
}

function drawBoard() {
    for (let i = 0; i < 9; ++i) {
        let id = "#P";
        id += i + 1;
        if (gameBoard[i] == 0) {
            $(id).html("");
        } else if (gameBoard[i] == 1) {
            $(id).html('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>');
        } else if (gameBoard[i] == 2) {
            $(id).html('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg>');
        }
    }
}

function delay(n) {
    return new Promise(function(resolve) {
        setTimeout(resolve, n * 1000);
    });
}

function computerPlay() {
    while (true) {
        let position = Math.floor(Math.random() * 9)
        if (gameBoard[position] == 0) {
            gameBoard[position] = 2;
            return true;
        }
    }
    return false;
}

function checkWin() {
    for (let i = 0; i < 3; ++i) {
        if (gameBoard[0 + 3 * i] == gameBoard[1 + 3 * i] && gameBoard[1 + 3 * i] == gameBoard[2 + 3 * i] && gameBoard[0 + 3 * i] != 0) {
            return gameBoard[0 + 4 * i];
        }
        if (gameBoard[i] == gameBoard[i + 3] && gameBoard[i + 3] == gameBoard[i + 6] && gameBoard[i] != 0) {
            return gameBoard[i];
        }
    }
    if (gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[9] && gameBoard[0] != 0) {
        return gameBoard[0];
    }
    if (gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6] && gameBoard[2] != 0) {
        return gameBoard[2];
    }
    return 0;

}

async function playerPlay(i) {
    if (placeMark(i, 1)) {
        drawBoard();
        let winner = checkWin()
        if (winner == 0) {
            delay(10);
            computerPlay();
            drawBoard();
            winner = checkWin();
            if (winner != 0) {
                winUI(winner);
            }
        } else {
            winUI(winner);
        }
    }
}

function winUI(x) {
    let text = "";
    if (x == 1) {
        text += "玩家獲勝";
    } else {
        text += "電腦獲勝";
    }
    $('#winText').html(text);
    $('#winUI').css('display', 'block');
}