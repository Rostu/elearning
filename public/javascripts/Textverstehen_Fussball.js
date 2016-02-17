/**
 * Created by julianebredack on 16.01.16.
 */

$( init );
function init() {
    $('#info1').show();
    var id=0;
    var punkte = 0;
    var anzBegriffe = 0;
    var id_speicher = [];
    var testarray = [["Ecke", 1],
        ["Champions League", 1],
        ["AS Monaco", 1],
        ["Bayer 04 Leverkusen", 1],
        ["Bayer Leverkusen", 1],
        ["Tor", 1],
        ["Trainer", 1],
        ["Ball", 1],
        ["Spiel", 1],
        ["Stadion", 1],
        ["Schiedsrichter", 1],
        ["Dribbling", 1],
        ["Leverkusenern", 1],
        ["Schuss", 1],
        ["Linie", 1],
        ["rennt", 1],
        ["Partie", 1],
        ["Halbzeit", 1],
        ["Fuß", 1],
        ["gefoult", 1],
        ["offensiv", 1],
        ["Gelbe Karte", 1],
        ["Taktisches Foul", 1],
        ["Pause", 1],
        ["Defensive", 1],
        ["Torchance", 1],
        ["Offensivfouls", 1],
        ["Drei Punkte", 2],
        ["Gelb", 2],
        ["Spieltag", 2],
        ["Gruppensieg", 2],
        ["Gegenspieler", 2],
        ["Ausgleich", 2],
        ["Anpfiff", 2],
        ["Torraumszenen", 2],
        ["Spielanteile", 2],
        ["Ausgleich", 2],
        ["Elfmeter", 2],
        ["Freistoß", 2],
        ["Zweikämpfe", 2],
        ["Kugel", 2],
        ["gelb", 2],
        ["köpft", 2],
        ["Wechsel", 2],
        ["Gäste", 2],
        ["Spielerwechsel", 2],
        ["Taktisch", 2],
        ["weiterspielen", 2],
        ["Diagonalschuss", 2],
        ["Schlusspfiff", 2],
        ["Vorrunde", 3],
        ["linken Flügel", 3],
        ["Werkself", 3],
        ["Abschlag", 3],
        ["Latte", 3],
        ["Gelegenheit", 3],
        ["Gebälk", 3],
        ["Vorlage", 3],
        ["Sechzehner", 3],
        ["Klärungsversuch", 3],
        ["Durchgang", 3],
        ["Überlegenheit", 3],
        ["flankt", 3],
        ["Hinterhalt", 3],
        ["Konter", 3],
        ["nachgespielt", 3],
        ["Abschluss", 3],
        ["fährt den Arm aus", 3],
        ["leicht abseitsverdächtiger Position", 3]
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
            alert("Das ist leider kein Fußballbegriff. Versuche es mit einem anderen Ausdruck.");
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
        if(punkte < '64') alert("Sehr gut! Finde noch ein paar Sportbegriffe mehr.");
        else if(punkte === '127') alert("Super! Du hast alle Begriffe gefunden.");
        else alert("Fast perfekt! Du hast " + anzBegriffe + " Sportbegriffe gefunden. Wenn du magst, kannst du noch mehr finden.");
    };
}