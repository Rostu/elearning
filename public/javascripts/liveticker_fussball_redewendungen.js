/**
 * Created by julianebredack on 20.01.16.
 */

$(document).ready(function() {
    $('#info3').show();
// falsche Antworten
    var testarray = [
    //Case 1
    "gerne Wurst essen", "nur vegetarisch essen", "Wurst ist ungesund",
    // Case 3
    "oft mit dem Zug fahren", "gut Karten spielen können", "immer den Weg zum Bahnhof finden",
    // Case 2
    "eine schmutzige Hand haben", "ein guter Handwerker sein", "gerne Handball spielen",
    // Case 4
    "gute Augen haben", "eine Brille tragen", "gut Fußball spielen können"
    ];

    //korrekte Antworten
    var array = ["um alles spielen",                             //Case 1
                 "sich entfalten können",                        //Case 3
                 "selbst über eine Sache entscheiden zu können", //Case 2
                 "etwas gut erkennen"                           // Case 4
    ];

    // Kommentare
    var infos =[
        //Case 1
        "gerne Wurst essen",
        "nur vegetarisch essen",
        "Wurst ist ungesund",
        //Case 3
        "oft mit dem Zug fahren",
        "gut Karten spielen können",
        "immer den Weg zum Bahnhof finden",
        //Case 2
        "eine schmutzige Hand haben",
        "ein guter Handwerker sein",
        "gerne Handball spielen",
        //Case 4
        "gute Augen haben",
        "eine Brille tragen",
        "gut Fußball spielen können"
        ];

    //Feedback
    var error_case1 = 'Deine Antwort ist leider nicht richtig. Schau dir diese noch einmal an. Tipp: Bayer Leverkusen spielt gegen den AS Monaco. In diesem Spiel geht es um die Wurst. Bayer spielt um alles. Sie müssen das Spiel gewinnen.';
    var error_case2 = 'Deine Antwort ist leider nicht richtig. Schau dir diese noch einmal an. Tipp: Gewinnt Bayer Leverkusen das Spiel, werden sie Gruppensieger. Sie müssen nicht auf andere Mannschaften schauen und haben alles in eigener Hand.';
    var error_case3 = 'Deine Antwort ist leider nicht richtig. Schau dir diese noch einmal an. Tipp: Obwohl Bayer Leverkusen öfter im Ballbesitz ist, lässt AS Monaco nicht zu, dass sie das Spiel bestimmen.';
    var error_case4 = 'Deine Antwort ist leider nicht richtig. Schau dir diese noch einmal an. Tipp: Ein Spieler sieht seinen Mitspieler. Er hat ein Auge auf ihn und legt ihm den Ball auf.';
    var j = 0;
    var vier_richtige = 0;




    var shiftarray = testarray.slice();
    $('.mco').toArray().map(function(e) {
        var b = [];

        b.push(array.shift());
        b.push(shiftarray.shift());
        b.push(shiftarray.shift());
        b.push(shiftarray.shift());

        b = shuffle(b);
        var app = $(e);
        for (var i = 0; i < b.length; i++) {
            app.append(createInput(e, i+j));
            app.append(createLabel(b[i], i+j));
            app.append("<br/>");
            j++;
        }
        j++;
    });

    function createInput(mco, i) {
        return '<input type="radio" name="n' + mco.id + '" id="c' + i + '">';
    }

    function createLabel(text, i) {
        return "<label for='c" + i + "'>" + text + "</label>";
    }
    $('input').on("click", function(){
        if($(this).is(':checked')){
            var txt = $('label[for=' + this.id + ']').text();
            if ($.inArray(txt, testarray)>-1) {
                markfalse($(this));
                raisefaults();
                //Case 1
                if(infos[$.inArray(txt,testarray)] === 'gerne Wurst essen' ||
                    infos[$.inArray(txt,testarray)] === 'nur vegetarisch essen' ||
                    infos[$.inArray(txt,testarray)] === 'Wurst ist ungesund' ){
                    makeNotice(error_case1);
                }
                //Case 3
                else
                if(infos[$.inArray(txt,testarray)] === 'oft mit dem Zug fahren' ||
                    infos[$.inArray(txt,testarray)] === 'gut Karten spielen können' ||
                    infos[$.inArray(txt,testarray)] === 'immer den Weg zum Bahnhof finden'){
                    makeNotice(error_case3);
                }
                //Case 2
                else
                if(infos[$.inArray(txt,testarray)] === 'eine schmutzige Hand haben' ||
                    infos[$.inArray(txt,testarray)] === 'ein guter Handwerker sein' ||
                    infos[$.inArray(txt,testarray)] === 'gerne Handball spielen'){
                    makeNotice(error_case2);
                }
                //Case 4
                else
                if(infos[$.inArray(txt,testarray)] === 'gute Augen haben' ||
                    infos[$.inArray(txt,testarray)] === 'eine Brille tragen' ||
                    infos[$.inArray(txt,testarray)] === 'gut Fußball spielen können'){
                    makeNotice(error_case4);
                }
            }
            else {
                removeNoticeIfPresent();
                marktrue($(this));
                disableall(this.name);
                raisepoints();
                vier_richtige++;
                if(vier_richtige === 4){
                    makeNotice('Super! Du hast alles richtig gemacht! Auf zur nächsten Aufgabe!');
                }
                else {
                    makeNotice('Prima!');
                }
            }
        }
    });

    function disableall(name){
        $("input[name='"+name+"']").attr('disabled','disabled');
    }

    function makeNotice(what) {
        removeNoticeIfPresent();
        var obj = "<p>" + what + "</p>";
        $('#info3').append(obj);
    }

    function removeNoticeIfPresent() {
        var obj = $('#info3 p');
        if (obj.length) {
            obj.detach();
        }
    }

    $('#weiter').click(function() {
        $('#check').click();
        if ($('.wrong').toArray().length == 0) {
            alert("Gut gemacht! Weiter so!");
            // TODO neue seite laden

        }
    });

    function markfalse(elem) {
        if (elem.hasClass("wrong")) return;
        if (elem.hasClass("right")) elem.removeClass("right");
        elem.addClass("wrong");
    }

    function marktrue(elem) {
        if (elem.hasClass("right")) return;
        if (elem.hasClass("wrong")) elem.removeClass("wrong");
        elem.addClass("right");
    }
});


