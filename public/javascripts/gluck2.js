/**
 * Created by David on 05.08.2014.
 */

$(document).ready(function() {
    var hidden = true;
    var input = $('input');
    var socket = io.connect('/');
    input.toArray().map(function(e) {
        $(e).css({'width':((e.value.length + 1) * 10) + 'px'});
    });
    input.on("keyup", function() {
        $(this).css({'width':((this.value.length + 1) * 10) + 'px'});
    });
    input.on("blur", function() {
        if ($(this).val()) {
            var val = $(this).val();
            socket.emit("userinput", {word:val,field:this.id});
        }
    });

    var msg = ["","",
        "Das ist nicht die richtige Wortklasse!",
        "Das ist nicht das richtige Genus!",
        "Das ist nicht der richtige Kasus!",
        "Das ist nicht der richtige Numerus!",
        "",
        "Das sieht nicht richtig aus...",
        "Das ist nicht das richtige Tempus",
        "Das ist nicht die richtige Person",
        "Das ist nicht die richtige Form",
        "",
        "Das ist leider nicht richtig..."
    ];

    socket.on('update', function(data) {
        var field = $("#"+data.field);
        var attr = data["attr"];
        switch(attr.status) {
            case 1:
                unmark(field);
                break;
            case 2: // wrong wordclass
                markwrong(field);
                makeNotice(msg[2],attr.gold,field);
                break;
            case 3: // wrong gender
                markwrong(field);
                makeNotice(msg[3],attr.gold,field);
                break;
            case 4: // wrong case
                markwrong(field);
                makeNotice(msg[4],attr.gold,field);
                break;
            case 5: // wrong number
                markwrong(field);
                makeNotice(msg[5],attr.gold,field);
                break;
            case 6: // nid plausible
                unmark(field);
                break;
            case 7: // nid wrong
                markwrong(field);
                makeNotice(msg[7],attr.gold,field);
                break;
            case 8: // wrong tense
                markwrong(field);
                makeNotice(msg[8],attr.gold,field);
                break;
            case 9: // wrong person
                markwrong(field);
                makeNotice(msg[9],attr.gold,field);
                break;
            case 10: // wrong form
                markwrong(field);
                makeNotice(msg[10],attr.gold,field);
                break;
            case 11: // not checked
                unmark(field);
                break;
            case 12: // general wrong
                markwrong(field);
                makeNotice(msg[12],"irgendwas",field);
                break;
            default: break;
        }
    });

    function makeNotice (msg, target, field) {
        var sel = $('#m'+field.attr("id"));
        if (sel.length) sel.remove();
        $('#Antwortbox').append($("<div class='message' id='m"+ field.attr("id") +"'>"
                + "<p class='dhead'><a href='http://www.duden.de/rechtschreibung/" + field.val() + "' target='_blank'>" + field.val() + "</a></p>"
                +    "<p class='dbody'>"
                + msg
                +    "</p><p class='dbody'>"
                +       "Hier gehört " + resolve(target) + " hin."
                +    "</p>"
                + "</div>"
        ));
    }

    function markwrong (elem) {
        if ($('#message').is(':hidden')) {
            $('#message').show("puff");
        }
        if (elem.hasClass("right")) elem.removeClass("right");
        elem.addClass("wrong");
    }

    function unmark(elem) {
        if (elem.hasClass("wrong")) elem.removeClass("wrong");
        var note = $('#m' + elem.attr("id"));
        if (note.length) {
            note.remove();
        }
        if (!$('#Antwortbox').children('.message').toArray().length) {
            $('#message').hide("puff");
        }
    }

    function resolve(t) {
        switch(t) {
            case "noun": return "ein <a href='http://www.duden.de/rechtschreibung/Nomen' target='_blank'>Nomen/Substantiv</a>";
            case "verb": return "ein <a href='http://www.duden.de/rechtschreibung/Verb' target='_blank'>Verb</a>";
            case "adverb": return "ein <a href='http://www.duden.de/rechtschreibung/Adverb' target='_blank'>Adverb</a>";
            case "adjective": return "ein <a href='http://www.duden.de/rechtschreibung/Adjektiv' target='_blank'>Adjektiv</a>";
            case "fem": return "ein <a href='http://www.duden.de/rechtschreibung/Genus' target='_blank'>weibliches Nomen</a>";
            case "mas": return "ein <a href='http://www.duden.de/rechtschreibung/Genus' target='_blank'>männliches Nomen</a>";
            case "neu": return "ein <a href='http://www.duden.de/rechtschreibung/Genus' target='_blank'>sächliches Nomen</a>";
            case "nom": return "ein Wort im <a href='http://www.duden.de/rechtschreibung/Nominativ' target='_blank'>Nominativ</a>";
            case "akk": return "ein Wort im <a href='http://www.duden.de/rechtschreibung/Akkusativ' target='_blank'>Akkusativ</a>";
            case "dat": return "ein Wort im <a href='http://www.duden.de/rechtschreibung/Dativ' target='_blank'>Dativ</a>";
            case "gen": return "ein Wort im <a href='http://www.duden.de/rechtschreibung/Genitiv' target='_blank'>Genitiv</a>";
            case "sin": return "ein Wort im <a href='http://www.duden.de/rechtschreibung/Singular' target='_blank'>Singular</a>";
            case "plu": return "ein Wort im <a href='http://www.duden.de/rechtschreibung/Plural' target='_blank'>Plural</a>";
            case "prä": return "ein Verb im <a href='http://www.duden.de/rechtschreibung/Praesens' target='_blank'>Präsens</a>";
            case "prt": return "ein Verb im <a href='http://www.duden.de/rechtschreibung/Praeteritum' target='_blank'>Präteritum</a>";
            case "kj1": return "ein Verb im <a href='http://deutsch.lingolia.com/de/grammatik/verben/konjunktiv/konjunktiv-1' target='_blank'>Konjunktiv 1</a>";
            case "kj2": return "ein Verb im <a href='http://deutsch.lingolia.com/de/grammatik/verben/konjunktiv/konjunktiv-2' target='_blank'>Konjunktiv 2</a>";
            case "1": return "ein Verb in der <a href='http://www.cafe-lingua.de/deutsche-grammatik/grammatische-person.php' target='_blank'>ersten Person</a>";
            case "2": return "ein Verb in der <a href='http://www.cafe-lingua.de/deutsche-grammatik/grammatische-person.php' target='_blank'>zweiten Person</a>";
            case "3": return "ein Verb in der <a href='http://www.cafe-lingua.de/deutsche-grammatik/grammatische-person.php' target='_blank'>dritten Person</a>";
            case "pa1": return "ein <a href='http://grammatik.woxikon.de/deutsche-partizipien.php' target='_blank'>Verbalpartizip</a>";
            case "pa2": return "ein <a href='http://grammatik.woxikon.de/deutsche-partizipien.php' target='_blank'>Verbalpartizip</a>";
            case "inf": return "ein Verb im <a href='http://www.duden.de/rechtschreibung/Infinitiv' target='_blank'>Infinitiv</a>";
            case "eiz": return "ein Verb im <a href='http://de.wikipedia.org/wiki/Kommaregeln#Erweiterter_Infinitiv' target='_blank'>erweiterten Infinitiv</a>";
            case "imp": return "ein Verb im <a href='http://www.duden.de/rechtschreibung/Imperativ' target='_blank'>Imperativ</a>";
            default: return t;
        }
    }

    var flag;

    $('#weiter').click(function() {
        if (flag) {
            document.location.href = "/glueck";
        } else {
            if ($('#Antwortbox').children('.message').toArray().length) {
                $.jqDialog.confirm("Das Gedicht enthält noch Fehler. Trotzdem weiterfahren?",
                function() {textify();},
                function() {});
            } else {
                textify();
            }
            $('#weiter').html("<a href='#'>ZURÜCK</a>");
        }
    });

    function textify () {
        $('input').toArray().map(function(input) {
            var val = $(input).val();
            $(input).after(" "+val+" ");
            $(input).remove();
        });
        flag = true;
    }
});