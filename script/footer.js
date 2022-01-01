$(document).ready(function() {
    checkSound();
    $('#docButton').click(function() {
        window.location.href = "../src/網站介面.pptx";
    });
    $('#soundButton').click(function() {
        checkSound();
        if (getSoundState() == '1') {
            setSoundMute();
        } else {
            setSoundPlay();
        }
        checkSound();
    });
});

function checkSound() {
    if (getSoundState() == '1') {
        // document.getElementById('soundButton').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="currentColor" class="bi bi-volume-down-fill" viewBox="0 0 16 16"><path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zm3.025 4a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z"/></svg>';
        $('#soundButton').html('<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="currentColor" class="bi bi-volume-down-fill" viewBox="0 0 16 16"><path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zm3.025 4a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z"/></svg>');
    } else {
        // document.getElementById('soundButton').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/></svg>';
        $('#soundButton').html('<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/></svg>');
    }
}

function setSoundGame() {
    let sound = JSON.parse(localStorage.getItem('sound'));
    sound['env'] = '1';
    localStorage.setItem('sound', JSON.stringify(sound));
}

function setSoundNormal() {
    let sound = JSON.parse(localStorage.getItem('sound'));
    sound['env'] = '0';
    localStorage.setItem('sound', JSON.stringify(sound));
}

function setSoundMute() {
    let sound = JSON.parse(localStorage.getItem('sound'));
    sound['state'] = '0';
    localStorage.setItem('sound', JSON.stringify(sound));
}

function setSoundPlay() {
    let sound = JSON.parse(localStorage.getItem('sound'));
    sound['state'] = '1';
    localStorage.setItem('sound', JSON.stringify(sound));
}

function getSoundState() {
    let sound = JSON.parse(localStorage.getItem('sound'));
    return sound['state'];
}