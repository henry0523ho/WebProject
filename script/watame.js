let state = 0;
var oneSecond;
var userANS = -1;
let ANS;
let ANSImg = ['sissor', 'stone', 'paper'];
$(document).ready(function() {
    checkGameSound();
    $('#startButton').click(function() {
        startGame();
    });
    $('#paper').click(function() {
        if (7 < state && state <= 26) {
            userANS = 2;
            updateUserANS();
        }
    })
    $('#sissor').click(function() {
        if (7 < state && state <= 26) {
            userANS = 0;
            updateUserANS();
        }
    })
    $('#stone').click(function() {
        if (7 < state && state <= 26) {
            userANS = 1;
            updateUserANS();
        }
    })
    $('#soundButton').click(function() {
        checkGameSound();
    })
    $('#retryButton').click(function() {
        state = 0;
        userANS = -1;
        updateUserANS();
        $('#finishSection').css('display', 'none');
        document.getElementById('watameBgm').pause();
        document.getElementById('watameBgm').currentTime = 0;
        $('#picture').css('background-image', 'url(../../src/watame/watame0.webp)');
        $('#herANS').css('background-image', 'url(../../src/watame/unknown.webp)');
        startGame();
    })
});

function updateUserANS() {
    for (let i = 0; i < 3; ++i) {
        let id = "#" + ANSImg[i];
        if (i == userANS) {
            $(id).css('border', '5px solid rgb(41, 255, 12)');
        } else {
            $(id).css('border', '0px solid black');
        }
    }
}

function startGame() {
    $('#titleSection').css('display', 'none');
    document.getElementById('watameBgm').play();
    ANS = Math.floor(Math.random() * 3);
    oneSecond = window.setInterval(everyCycle, 500);
}


function everyCycle() {

    if (7 < state && state <= 26) {
        changeWatame();
    } else if (state > 26) {
        $('#herANS').css('background-image', 'url(../../src/watame/' + ANSImg[ANS] + '.webp)');
    }
    if (state == 29) {
        clearInterval(oneSecond);
        finishGame();
    }

    ++state;
}

function changeWatame() {
    let newUrl = "../../src/watame/watame";
    $('#picture').css('background-image', 'url(' + newUrl + (state % 4) + '.webp)');
    if (state % 2) {
        $('#herANS').css('border', '5px solid white');
        $('#herANS').css('animation-name', 'rotate');
        $('#herANS').css('animation-duration', '0.5s');
    } else {
        $('#herANS').css('border', '0px solid rgb(41, 255, 12)');
        $('#herANS').css('animation-name', 'none');
    }

}

function checkGameSound() {
    if (getSoundState() != "1") {
        document.getElementById('watameBgm').muted = true;
    } else {
        document.getElementById('watameBgm').muted = false;
    }
}

function calculateResult() {
    if (userANS == -1) {
        return -1;
    }
    let ret = userANS - ANS;
    if (ret == 0) {
        return 0;
    }
    if (ret > 0) {
        if (ret == 2) return 2;
        else return 1;
    } else {
        if (ret == -2) return 1;
        else return 2;
    }
}

function finishGame() {
    let result = calculateResult();
    let finishText = "";
    if (result == -1) {
        finishText = "哈 你沒出拳 算我贏了";
    } else if (result == 0) {
        finishText = "平手";
    } else if (result == 1) {
        finishText = "你贏了";
    } else if (result == 2) {
        finishText = "你輸了";
    }
    $('#finishText').html(finishText);
    $('#finishSection').css('display', 'block');
}