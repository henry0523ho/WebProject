function getSection() {
    return "#S" + state;
}

function checkStorySound() {
    if (getSoundState() != "1") {
        document.getElementById('soundEffect').muted = true;
    } else {
        document.getElementById('soundEffect').muted = false;
    }
}