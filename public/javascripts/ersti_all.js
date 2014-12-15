/*
 * Written by David
 */

// Global map
var map = [];

// Saves the score for a given task
function setScore(task, score) {
    map[normalize(task)] = score;
}

// Returns the score for a given task
function getScore(task) {
    return map[normalize(task)];
}

/* Normalizes task names
 * so that each call to the above methods
 * functions as expected, even if the
 * task names are indicated in different manners
 *
 * The fall-through in the switch cases is intended
 */
function normalize(name) {
    switch(name) {
        case "1":
        case "1a":
        case "t1":
        case "t1a":
        case "task1":
        case "task1a":
            return "task1";

        case "2":
        case "2a":
        case "t2":
        case "t2a":
        case "task2":
        case "task2a":
            return "task2a";

        case "2b":
        case "t2b":
        case "task2b":
            return "task2b";

        case "2c":
        case "t2c":
        case "task2c":
            return "task2c";

        case "3":
        case "3a":
        case "t3":
        case "t3a":
        case "task3":
        case "task3a":
            return "task3a";

        case "3b":
        case "t3b":
        case "task3b":
            return "task3b";

        case "3c":
        case "t3c":
        case "task3c":
            return "task3c";

        case "4":
        case "4a":
        case "t4":
        case "t4a":
        case "task4":
        case "task4a":
            return "task4";

        default: return "unknown";
    }
}

// Calculates the global score over all tasks
// in this chapter ('ersti')
function calculateGlobalScore () {
    return 0;
}

function test() {
    return 42;
}

$(document).ready(function() {
    if(/end$/.test(document.location.href)) {
        $('#task1').append(getScore("t1"));
        $('#task2').append(getScore("t2"));
        $('#task2b').append(getScore("t2b"));
        $('#task2c').append(getScore("t2c"));
        $('#task3').append(getScore("t3"));
        $('#task3b').append(getScore("t3b"));
        $('#task3c').append(getScore("t3c"));
        $('#task4').append(getScore("t4"));

        $('#test').append(test());
    } else if (/k4#?$/.test(document.location.href)) {

        var a = [87,72,69,82,69,73,83,84,72,69,70,73,83,72];
        var i = 0;
        var f1 = "<img src='../images/rbfish1.png' class='rbf' id='rbf1'/>";
        var f2 = "<img src='../images/rbfish2.png' class='rbf' id='rbf2'/>";
        var p = [[-211, 200],[-111, 300],[0, 200],[100, 300],[214,402],[415,298],[539,426],[720,336],[830,462],[930,345],[1065,450],[1207,378],[1268,442],[1400, 500]];
        $(this).keydown(function(k) {
            if (i === a.length) function1();
            i = (k.which === a[i]) ? i+1 : 0;
        });
        function function1 () {
            var c = $('.container');
            var b = $('body');
            b.css({'pointer-events':'none'});
            c.append($(f1));
            document.activeElement.blur();
            $('#rbf1').animate({left:"+=60"}, 5000, "easeInOutCubic", function() {
                $('#rbf1').animate({left:"-=100px"}, 4000, "easeOutCirc", function() {
                    $('#rbf1').remove();
                    c.append($(f2));
                    $("#rbf2").animate({
                        crSpline: $.crSpline.buildSequence(p)
                    }, 20000, function() {
                        $('#rbf2').remove();
                        b.css({'pointer-events':'auto'});
                    });
                });
            });

        }
    }
});