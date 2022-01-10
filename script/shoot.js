var score = 0;
let started = 0;
$(document).ready(function() {
    checkGameSound();
    started = 0;
    $('#gameSection').mousedown(function() {
        if (started)
            hitSound();
    })
    $('#TP3').mousedown(function() {
        if (started) {
            update();
            $('#T3').css('animation', 'collapse 0.5s forwards');
            setTimeout(function() {
                $('#T3').css('animation', 'recover 1s forwards');
            }, 2000);
        }

    });
    $('#TP2').mousedown(function() {
        if (started) {
            update();
            $('#T2').css('animation', 'collapse 0.5s forwards');
            setTimeout(function() {
                $('#T2').css('animation', 'recover 1s forwards');
            }, 2000);
        }

    });
    $('#TP1').mousedown(function() {
        if (started) {
            update();
            $('#T1').css('animation', 'collapse 0.5s forwards');
            setTimeout(function() {
                $('#T1').css('animation', 'recover 1s forwards');
            }, 2000);
        }

    });
    $('#soundButton').click(function() {
        checkGameSound();
    })
    $('#startButton').click(function() {
        checkGameSound();
        started = 1;
        $('#titleSection').css('display', 'none');
        document.getElementById('bgm').play();
    })
});

function hitSound() {
    document.getElementById('hit').currentTime = 0;
    document.getElementById('hit').play();
}

function update() {
    ++score;
    $('#UIText').html((score + '/20'));
    if (score == 20) {
        started = 0;
        $('#Win').css('display', 'block');
        document.getElementById('bgm').pause();
    }
}


function checkGameSound() {
    if (getSoundState() != "1") {
        document.getElementById('bgm').muted = true;
        document.getElementById('hit').muted = true;
    } else {
        document.getElementById('bgm').muted = false;
        document.getElementById('hit').muted = false;
    }
}