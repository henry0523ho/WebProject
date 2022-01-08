let TWidth;
let THeight;
let TK;
let pistonState = [0, 0, 0];
let checkPoint = 0;
let ANS = [
    [0, 0, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 0],
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 0]
];
let trumpetStates = [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
];
let trumpetSounds = [
    'Bb4',
    'B4',
    'C4',
    'Db4',
    'D4',
    'Eb4',
    'E4',
    'F4',
    'Gb4',
    'G4',
    'Ab4',
    'A4',
    'Bb5'
];
let ANSSounds = [
    'Bb4',
    'C4',
    'D4',
    'Eb4',
    'F4',
    'G4',
    'A4',
    'Bb5'
];
$(document).ready(function() {
    checkPoint = 0;
    // $('#sheetMusicGraph').attr('height', window.innerHeight * 0.4);
    drawPistons();
    $('#piston1').click(function() {
        pistonState[0] = 1 ^ pistonState[0];
        drawPistons();
    });
    $('#piston2').click(function() {
        pistonState[1] = 1 ^ pistonState[1];
        drawPistons();
    });
    $('#piston3').click(function() {
        pistonState[2] = 1 ^ pistonState[2];
        drawPistons();
    });
    $('#mouthPiece').click(function() {
        console.log('sound');
        playTrumpet();
    });
});



function checkPistonState() {
    return pistonState[0] == ANS[checkPoint][0] && pistonState[1] == ANS[checkPoint][1] && pistonState[2] == ANS[checkPoint][2];
}

function playTrumpet() {
    checkGameSound();
    if (checkPistonState()) {
        $('#trumpetScale').attr('src', "../../src/trumpet/" + ANSSounds[checkPoint] + ".mp3");
        document.getElementById('trumpetScale').play();
        let note = "#note";
        note += ANSSounds[checkPoint];
        $(note).attr('stroke', 'green').attr('fill', 'green');
        ++checkPoint;
    } else {
        let note = "#note";
        note += ANSSounds[checkPoint];
        $(note).attr('stroke', 'red').attr('fill', 'red');
        $('#trumpetScale').attr('src', "../../src/trumpet/trumpetFail.wav");
        document.getElementById('trumpetScale').play();
        $(note).attr('stroke', 'red').attr('fill', 'red');
    }
    if (checkPoint == 8) {
        setTimeout(winGame, 1500);
    } else {
        showHint();
    }
}

function showHint() {
    for (let i = 0; i < 3; ++i) {
        let fingerName = "#Finger";
        fingerName += (i + 1);
        if (ANS[checkPoint][i] == 0) {
            $(fingerName).html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>');
        } else {
            $(fingerName).html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>');
        }
    }
}

function winGame() {
    $('#UI').css('display', 'block');
    $('#trumpetScale').attr('src', "../../src/trumpet/win.m4a");
    document.getElementById('trumpetScale').play();
}


function drawPistons() {
    TWidth = $('#instrumentBody').width();
    THeight = $('#instrumentBody').height();
    TK = TWidth / 1200;
    if (pistonState[0] == 1) {
        $('#piston1').attr('src', '../../src/trumpet/PistonIn.png').css('width', 34 * TK).css('left', 453 * TK).css('top', -385 * TK);
    } else {
        $('#piston1').attr('src', '../../src/trumpet/Piston.png').css('width', 34 * TK).css('left', 453 * TK).css('top', -413 * TK);
    }
    if (pistonState[1] == 1) {
        $('#piston2').attr('src', '../../src/trumpet/PistonIn.png').css('width', 34 * TK).css('left', 468 * TK).css('top', -385 * TK);
    } else {
        $('#piston2').attr('src', '../../src/trumpet/Piston.png').css('width', 34 * TK).css('left', 468 * TK).css('top', -413 * TK);
    }
    if (pistonState[2] == 1) {
        $('#piston3').attr('src', '../../src/trumpet/PistonIn.png').css('width', 34 * TK).css('left', 481 * TK).css('top', -385 * TK);
    } else {
        $('#piston3').attr('src', '../../src/trumpet/Piston.png').css('width', 34 * TK).css('left', 481 * TK).css('top', -413 * TK);
    }
    $('#mouthPiece').css('width', 130 * TK).css('height', 60 * TK).css('left', -70 * TK).css('top', -355 * TK);

}

function checkGameSound() {
    if (getSoundState() == "0") {
        document.getElementById('trumpetScale').muted = true;
    } else {
        document.getElementById('trumpetScale').muted = false;
    }
}