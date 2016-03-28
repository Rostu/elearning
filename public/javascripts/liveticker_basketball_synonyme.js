/**
 * Created by MeLex on 14.01.2016.
 */
$(document).ready(function() {
    $('#info3').show();
// falsche Antworten
    var testarray = [
        //Case 1
        "eine Auszeit nehmen",
        "den Ball auf den Korb werfen",
        "das Spiel ist zu Ende",
        //Case 3
        "einen Spieler auswechseln",
        "mit einem Wurf Punkte machen",
        "mit einem verletzten Fuß spielen",
        //Case 2
        "eine Aktion zum Ende bringen",
        "einen Spielerwechsel machen",
        "der Schiedsrichter pfeift das Spiel ab",
        //Case 4
        "mit dem Schiedsrichter streiten",
        "die Zuschauer sind zu laut",
        "eine Pause machen"
    ];
    // korrekten Antworten
    var array = [
        "den Ball einem Mitspieler zuspielen", //Case 1
        "etwas gelingt nicht",                 //Case 3
        "einen Wurf nicht treffen",            //Case 2
        "einen Freiwurf treffen"               //Case 4
    ];

    // Kommentare
    var infos =[
        //Case 1
        "eine Auszeit nehmen",
        "den Ball auf den Korb werfen",
        "das Spiel ist zu Ende",
        //Case 3
        "einen Spieler auswechseln",
        "mit einem Wurf Punkte machen",
        "mit einem verletzten Fuß spielen",
        //Case 2
        "eine Aktion zum Ende bringen",
        "einen Spielerwechsel machen",
        "der Schiedsrichter pfeift das Spiel ab",
        //Case 4
        "mit dem Schiedsrichter streiten",
        "die Zuschauer sind zu laut",
        "eine Pause machen"
        ];

    var error_case1 = 'Deine Antwort ist leider nicht richtig. Schau dir diese noch einmal an. Tipp: Spieler A bedient den Spieler B, indem er ihm den Ball passt.';
    var error_case2 = 'Deine Antwort ist leider nicht richtig. Schau dir diese noch einmal an. Tipp: Ein Spieler wirft aber der Ball landet nicht im Korb. Er hat den Wurf vergeben.';
    var error_case3 = 'Deine Antwort ist leider nicht richtig. Schau dir diese noch einmal an. Tipp:  Bayern München gewann bisher alle Spiele zu Hause. Warum sollte es auch heute nicht funktionieren?';
    var error_case4 = 'Deine Antwort ist leider nicht richtig. Schau dir diese noch einmal an. Tipp:  Renfoe wirft, sein Versuch landet aber nicht im Korb.';
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
                if(infos[$.inArray(txt,testarray)] === 'eine Auszeit nehmen' ||
                   infos[$.inArray(txt,testarray)] === 'den Ball auf den Korb werfen' ||
                   infos[$.inArray(txt,testarray)] === 'das Spiel ist zu Ende' ){
                    makeNotice(error_case1);
                }
                //Case 3
                else
                if(infos[$.inArray(txt,testarray)] === 'einen Spieler auswechseln' ||
                   infos[$.inArray(txt,testarray)] === 'mit einem Wurf Punkte machen' ||
                   infos[$.inArray(txt,testarray)] === 'mit einem verletzten Fuß spielen'){
                    makeNotice(error_case3);
                }
                //Case 2
                else
                if(infos[$.inArray(txt,testarray)] === 'eine Aktion zum Ende bringen' ||
                   infos[$.inArray(txt,testarray)] === 'einen Spielerwechsel machen' ||
                   infos[$.inArray(txt,testarray)] === 'der Schiedsrichter pfeift das Spiel ab'){
                    makeNotice(error_case2);
                }
                //Case 4
                else
                if(infos[$.inArray(txt,testarray)] === 'mit dem Schiedsrichter streiten' ||
                   infos[$.inArray(txt,testarray)] === 'die Zuschauer sind zu laut' ||
                   infos[$.inArray(txt,testarray)] === 'eine Pause machen'){
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


