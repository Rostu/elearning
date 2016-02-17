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
