/**
 * Created by s2daalft on 23.07.2014.
 */
// TASK 3

$(document).ready(function() {
    var whereami = document.location.href;
    if (/.+?task3$/.test(whereami)) {
        var t3w1 = ["anregend",  "ansprechend",  "einnehmend",  "einträglich",  "entwaffnend",  "erstaunlich",  "ertragreich",  "gewinnbringend",  "informativ",  "lohnend",  "reizvoll",  "unterhaltsam",  "vielsagend",  "wissenswert"];
        var t3w2 = ["alltäglich",  "belanglos",  "einfallslos", "einschläfernd",  "eintönig",  "ermüdend",  "fade",  "langweilig", "monoton",  "öde",  "phantasielos",  "reizlos",  "trist",  "unbedeutend",  "unwichtig"];
        var cont = $('.worddrag');
        var t3w = [];

        for (var i = 0; i < t3w1.length; i++) {
            t3w.push(makeDiv(t3w1[i], i));
        }
        for (i = 0; i < t3w2.length; i++) {
            t3w.push(makeDiv(t3w2[i], i));
        }
        //t3w = shuffle(t3w);

        for (i = 0; i < t3w.length; i++) {
            cont.append(t3w[i]);
        }

        $('.word').draggable({revert: "invalid"});

        $('.target').droppable({drop: function(e,ui) {
            $(ui.draggable).attr("style","").appendTo($(this));

        }});

        function makeDiv(a, i) {
            return "<div class='word' id='w"+ (i+1) +"'>" + a + "</div>";
        }

        function shuffle(array) {
            var counter = array.length, temp, index;
            while (counter > 0) {
                index = Math.floor(Math.random() * counter);
                counter--;
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        }
    } else // not 3, therefore 3b or 3c
    {
        var c = [];
        var a = ["doof", "dumm", "hirnlos", "idiotisch"];
        a.map(function(e) {c.push(e+"e");c.push(e+"en");});
        a = a.concat(c);
        c = [];
        var b = ["albern",  "begriffsstutzig",  "beschränkt",  "bieder", "borniert",  "dösig", "dusselig",  "einfältig",  "eng",  "flach",  "gottverlassen",  "grün", "kindisch"];
        b.map(function(e) {c.push(e+"e");c.push(e+"en")});
        b = b.concat(c);
        c = [];
        $('#weiter').on("click", function() {
            var w1 = $('#w1');
            var w2 = $('#w2');
            var w3 = $('#w3');
            var w4 = $('#w4');
            var v1 = w1.val();
            var v2 = w2.val();
            var v3 = w3.val();
            var v4 = w4.val();
            if ($.inArray(v1,a) > -1) {
                markTrue(w1);
            } else {
                if ($.inArray(v1,b) > -1) {
                    markAlmost(w1);
                } else {
                    markFalse(w1);
                }
            }

            if ($.inArray(v2,a) > -1) {
                markTrue(w2);
            } else {
                if ($.inArray(v2,b) > -1) {
                    markAlmost(w2);
                } else {
                    markFalse(w2);
                }
            }

            if ($.inArray(v3,a) > -1) {
                markTrue(w3);
            } else {
                if ($.inArray(v3,b) > -1) {
                    markAlmost(w3);
                } else {
                    markFalse(w3);
                }
            }

            if ($.inArray(v4,a) > -1) {
                markTrue(w4);
            } else {
                if ($.inArray(v4,b) > -1) {
                    markAlmost(w4);
                } else {
                    markFalse(w4);
                }
            }
        });

        // might come in handy. not of use atm
        function arrayequal(a,b) {
            for (var i = 0; i < a.length; i++) {
                if ($.inArray(a[i],b)===-1) {
                    return false;
                }
            }
            return true;
        }

        function markTrue(elem) {
            removeAllMarks(elem);
            hideHints(elem);
            elem.addClass("marktrue");
        }

        function markAlmost(elem) {
            removeAllMarks(elem);
            hideHints(elem);
            elem.addClass("markalmost");

            showHint($("p.h"+elem.attr("id").substring(1)), elem.val(), 1);
        }

        function markFalse(elem) {
            removeAllMarks(elem);
            hideHints(elem);
            elem.addClass("markfalse");
            showHint($("p.c"+elem.attr("id").substring(1)), elem.val(), 2);
        }

        function removeAllMarks(e) {
            if (e.hasClass("markfalse")) {
                e.removeClass("markfalse");
            }
            if (e.hasClass("markalmost")) {
                e.removeClass("markalmost");
            }
            if (e.hasClass("marktrue")) {
                e.removeClass("marktrue");
            }
        }

        function hideHints (e) {
            var ph = $("p.h"+e.attr("id").substring(1));
            var pc = $("p.c"+e.attr("id").substring(1));
            if (!ph.hasClass("invisible")) {
                ph.addClass("invisible");
            }
            if (!pc.hasClass("invisible")) {
                pc.addClass("invisible");
            }
        }

        function showHint (e, w, t) {
            e.removeClass("invisible");
            if (t == 1) {
                e.text(w + " ist zwar ein Synonym zu 'dämlich', allerdings passt es in diesem Kontext nicht.");
            }
            if (t == 2) {
                if (w) {
                e.html(w + " ist leider kein Synonym von 'dämlich'. Schaue auch im <a href='http://www.duden.de/suchen/dudenonline/" + w + "' target='_blank'>Duden</a> nach!");
                } else {
                    e.text("Bitte fülle das Feld aus!");
                }
            }

        }
    }
});

function validate () {
    var syn = $('#synonym');
    var ant = $('#antonym');
    var b1 = /anregend/.test(jvalidate($(syn[0])));
    var b2 = /öde/.test(jvalidate($(ant[0])));
    var b3 = !(kvalidate($('.worddrag')).length);
    if (!b3) {
        showModal("Bitte ordne alle Wörter zu!");
    }
    var b4 = ivalidate(kvalidate(syn));
    var b5 = ivalidate(kvalidate(ant));
    if (b1 && b2 && b3 && b4 && b5) {
        window.location.href = "/ersti_task3b";
    }
}

function ivalidate(b) {
    return b.reduce(function(a,e){
        if($.inArray(e.id, a) > -1){
            return false;
        }
        a.push(e.id);
        return a;
    },[]);
}

function jvalidate(c) {
    return c.children('.word').toArray().map(function(e){return $(e).text();}).join("");
}

function kvalidate(d) {
    return $(d[0]).children().toArray();
}

function showModal(msg) {
    alert(msg);
}
