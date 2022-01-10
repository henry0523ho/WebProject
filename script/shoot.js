var score = 0;

$(document).ready(function() {
    $('#TP3').mousedown(function() {
        update();
        $('#T3').css('animation', 'collapse 0.5s forwards');
        setTimeout(function() {
            $('#T3').css('animation', 'recover 1s forwards');
        }, 2000);
    });
    $('#TP2').mousedown(function() {
        update();
        $('#T2').css('animation', 'collapse 0.5s forwards');
        setTimeout(function() {
            $('#T2').css('animation', 'recover 1s forwards');
        }, 2000);
    });
    $('#TP1').mousedown(function() {
        update();
        $('#T1').css('animation', 'collapse 0.5s forwards');
        setTimeout(function() {
            $('#T1').css('animation', 'recover 1s forwards');
        }, 2000);
    });

});


function update() {
    ++score;
    $('#UIText').html((score + '/20'));
    if (score == 20) {
        $('#Win').css('display', 'block');
    }
}