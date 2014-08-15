/**
 * Created by s2daalft on 15.08.2014.
 */
$(document).ready(function() {
    var state = 0;
    $('#balken').click(function() {
        switch(state) {
            case 0: state = 1; break;
            case 3: animation(); break;
            default: state = 0;
        }
        console.log(state);
    });
    $('#check').click(function() {
        switch(state) {
            case 2: state = 3; break;
            default: state = 0;
        }
        console.log(state);
    });
    $('#hilfe').click(function() {
        switch(state) {
            case 1: state = 2; break;
            default: state = 0;
        }
        console.log(state);
    });

    function animation () {
        var img = "<img id='woingenau' src='../images/woingenau.png'>";
        $('body').append(img);
        $('#woingenau').animate({left:"+=360"}, 5000, "easeInOutCubic", function() {
            $(this).hide("fade");
        });
    }
});