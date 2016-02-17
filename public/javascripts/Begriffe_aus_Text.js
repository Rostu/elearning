$( init );
function init() {
    $('#info1').show();
    var id = 0;
    var punkte = 0;
    var anzBegriffe = 0;
    var id_speicher = [];
    var testarray = [["Spielzeit", 1],
        ["Saisonspiele", 1],
        ["Spiel", 1],
        ["Spieler", 1],
        ["Bank", 1],
        ["Linie", 1],
        ["Mittellinie", 1],
        ["Pause", 1],
        ["Auszeit", 1],
        ["Foul, technisches Foul", 1],
        ["Team", 1],
        ["Trainer", 1],
        ["Heimspiel", 1],
        ["Ball", 1],
        ["Punkte, Punkt", 1],
        ["Pass", 1],
        ["Einwurf", 1],
        ["Playoffs", 2],
        ["Parkett", 2],
        ["Distanz", 2],
        ["Dreier", 2],
        ["Freiwürfe",2],
        ["Viertel", 2],
        ["Brett", 2],
        ["Ring", 2],
        ["Korb", 2],
        ["Rebound", 2],
        ["Korbleger", 2],
        ["Wurf, Würfe", 2],
        ["Schlusssirene", 2],
        ["Schlussviertel", 2],
        ["Defense", 3],
        ["Steal", 3],
        ["Guard", 3],
        ["Center", 3],
        ["Zone", 3],
        ["Coast-to-Coast", 3],
        ["Fastbreak", 3],
        ["Crunchtime", 3],
        ["auswärts", 3],
        ["foult, gefoult", 3],
        ["verwandelt", 3],
        ["gleicht ... aus", 3],
        ["kontert", 3],
        ["trifft doppelt", 3]
    ];
    var i = 0;
    var infos = [];
    var r_length = 0;
    var w_length = 0;
    var fb1 = 0;
    var fb2 = 0;

    document.getElementById("Ergebnis").addEventListener("click", myFunction);

    $(".inline").each(function () {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper
        });
    });

    $('#Antwortbox').droppable({
        drop: handleDropEvent
    });

    function handleDropEvent(event, ui) {
        var flag = '';
        var textinhalt = ui.draggable.context.textContent;
        var textinfos = "";
        textinhalt = textinhalt.replace(',', '');
        textinhalt = textinhalt.replace('.', '');
        textinhalt = textinhalt.replace('"', '');

        for (i = 0; i < infos.length; i++) {
            if (infos[i][0] === textinhalt && infos[i][1] != "") {
                textinfos = infos[i][1]
            }
        }
        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>" + textinhalt + "</p><div id='" + ui.draggable.attr('id') + "' class='hide'><p>" + textinfos + "</p><a target='_blank' href='http://www.dwds.de/?qu=" + ui.draggable.context.textContent + "'>DWDS</a><p><a target='_blank' href='http://http://www.duden.de/suchen/dudenonline/" + ui.draggable.context.textContent + "'>DUDEN</a></p></div>"
        });
        div.click(enlarge);

        $("#Antwortbox").bind("contextmenu", function (e) {
            return false;
        });
        for (i = 0; i < testarray.length; i++) {

            if (testarray[i][0] === textinhalt) {
                punkte = punkte + testarray[i][1];
                anzBegriffe++;
                $(div).data('korrekt', true);
                $(div).css('background', '#02D64A').css("color", "#005E9C");
                raisepoints();
                flag = 'X';
                $("#Antwortbox").append(div);
            }
        }
        if (flag === '') {
            $(div).data('korrekt', false);
            $(div).css('background', '#A91211');
            $(div).css('color', '#ECECEC');
            raisefaults();
            div.mousedown(clear);
            alert("Das ist leider kein Basketballbegriff. Versuche es mit einem anderen Ausdruck.");
        }
        $(".hide[id=" + ui.draggable.attr('id') + "]").toggle();
        $(".inline.ui-draggable[id=" + ui.draggable.attr('id') + "]").draggable("disable").css('color', 'red');

    };

    function myHelper(event) {
        var textinhalt = $(this).context.innerHTML;
        textinhalt = textinhalt.replace(',', '');
        textinhalt = textinhalt.replace('.', '');
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: textinhalt
        });
    };

    function clear(ev) {
        if (ev.which == 3) {
            $(".inline.ui-draggable[id=" + this.id + "]").draggable("enable").css('color', 'black');
            if ($(this).data('korrekt') == true) {
                decreasepoints();
                console.log("Punkte reduziert")
            } else {
            }
            $(".token[id=" + this.id + "]").remove();
        }
    }

    function enlarge() {
        $(".hide[id=" + $(this).attr('id') + "]").toggle();
    };

    function myFunction() {
        document.getElementById("Ergebnis").innerHTML = "Überprüfen: " + punkte + " Punkte";
        if(punkte < '45') alert("Sehr gut! Finde noch ein paar Sportbegriffe mehr.");
        else if(punkte === '86') alert("Super! Du hast alle Begriffe gefunden.");
        else alert("Fast perfekt! Du hast " + anzBegriffe + " Sportbegriffe gefunden. Wenn du magst, kannst du noch mehr finden.");
    };
}