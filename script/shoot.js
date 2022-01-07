var ScreenWidth = window.innerWidth;
var ScreenHeight = window.innerHeight;
var score = 0;

$(document).ready(function() {
    startGame();
    $('#target').click(function() {
        ++score;
        $('#UI').html(("<h1>" + score + "/20</h1>"))
        $('#target').css('animation-name', 'hit');
        setTimeout(function() {
            let x = Math.floor(Math.random() * ScreenWidth);
            let y = Math.floor(Math.random() * ScreenHeight);
            console.log(x, y);
            while (y > ScreenHeight - 100) {
                y = Math.floor(Math.random() * ScreenHeight);
            }
            while (x > ScreenWidth - 100) {
                x = Math.floor(Math.random() * ScreenWidth);
            }
            y -= ScreenHeight / 10;
            $('#target').css('top', y);
            $('#target').css('left', x);
            $('#target').css('animation-name', 'none');
        }, 1001);
        if (score == 3) {
            $('#Win').css('display', 'block');
        }
    });


});

function startGame() {
    let x = Math.floor(Math.random() * ScreenWidth);
    let y = Math.floor(Math.random() * ScreenHeight);
    y -= ScreenHeight / 10;
    console.log(x, y);
    $('#target').css('top', 0);
    $('#target').css('left', 0);
}