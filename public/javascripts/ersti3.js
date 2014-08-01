/**
 * Created by David on 23.07.2014.
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
            t3w.push(makeDiv(t3w2[i], i+t3w1.length));
        }
        //t3w = shuffle(t3w);

        for (i = 0; i < t3w.length; i++) {
            cont.append(t3w[i]);
        }

        $('.word').draggable({revert: "invalid"});

        $('.target').droppable({drop: function(e,ui) {
            $(ui.draggable).attr("style","").addClass("revertable").attr("style","position:relative").appendTo($(this));

        }});
        $(document).on("contextmenu",".revertable",function(e){
            var ct = $(e.currentTarget);
            if (ct.hasClass("markfalse")) ct.removeClass("markfalse");
            var p = $(ct.parent()[0]);
            cont.append(ct.removeClass("revertable").detach());
            return false;
        });


    } else // not 3, therefore 3b or 3c
    {
        if (/.+?3b$/.test(whereami)) {
            var c = [];
            var a = ["doof", "dumm", "hirnlos", "idiotisch"];
            a.map(function (e) {
                c.push(e + "e");
                c.push(e + "en");
            });
            a = a.concat(c);
            c = [];
            var b = ["albern", "begriffsstutzig", "beschränkt", "bieder", "borniert", "dösig", "dusselig", "einfältig", "eng", "flach", "gottverlassen", "grün", "kindisch"];
            b.map(function (e) {
                c.push(e + "e");
                c.push(e + "en")
            });
            b = b.concat(c);
            c = [];

            $('#check').on("click", function () {

                var w1 = $('#w1');
                var w2 = $('#w2');
                var w3 = $('#w3');
                var w4 = $('#w4');
                var v1 = w1.val();
                var v2 = w2.val();
                var v3 = w3.val();
                var v4 = w4.val();
                if ($.inArray(v1, a) > -1) {
                    markTrue(w1);
                } else {
                    if ($.inArray(v1, b) > -1) {
                        markAlmost(w1);
                    } else {
                        markFalse(w1);
                    }
                }

                if ($.inArray(v2, a) > -1) {
                    markTrue(w2);
                } else {
                    if ($.inArray(v2, b) > -1) {
                        markAlmost(w2);
                    } else {
                        markFalse(w2);
                    }
                }

                if ($.inArray(v3, a) > -1) {
                    markTrue(w3);
                } else {
                    if ($.inArray(v3, b) > -1) {
                        markAlmost(w3);
                    } else {
                        markFalse(w3);
                    }
                }

                if ($.inArray(v4, a) > -1) {
                    markTrue(w4);
                } else {
                    if ($.inArray(v4, b) > -1) {
                        markAlmost(w4);
                    } else {
                        markFalse(w4);
                    }
                }

            });

            $('#weiter').on('click', function () {
                $('#check').click();
                if (validateData()) {
                    var wrong = $('.markalmost').length + $('.markfalse').length;
                    var right = $('.marktrue').length;
                    var percent = right/(right+wrong);
                    setScore("3b", percent);
                    $('#message').show().effect("puff", 2000, function() {
                        document.location.href = "/ersti_task3c";
                    });
                }
            });
            // might come in handy. not of use atm
            function arrayequal(a, b) {
                for (var i = 0; i < a.length; i++) {
                    if ($.inArray(a[i], b) === -1) {
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

                showHint($("p.h" + elem.attr("id").substring(1)), elem.val(), 1);
            }

            function markFalse(elem) {
                removeAllMarks(elem);
                hideHints(elem);
                elem.addClass("markfalse");
                showHint($("p.c" + elem.attr("id").substring(1)), elem.val(), 2);
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

            function hideHints(e) {
                var ph = $("p.h" + e.attr("id").substring(1));
                var pc = $("p.c" + e.attr("id").substring(1));
                if (!ph.hasClass("invisible")) {
                    ph.addClass("invisible");
                }
                if (!pc.hasClass("invisible")) {
                    pc.addClass("invisible");
                }
            }

            function showHint(e, w, t) {
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
        } else {
            var ac = ["wesentliche", "zentrale", "grundlegende", "wichtige", "entscheidende"];
            var bc = ["aktuelle", "unangenehme", "umstrittene", "rhetorische", "heikle", "soziale", "strittige", "kritische", "technische"];
            var cc = [
                "Eine aktuelle Frage ist eine Frage, die sich mit der Aktualität beschäftigt.",
                "Eine unangenehme Frage ist für den Gefragten unangenehm. Er möchte darauf nicht antworten.",
                "Eine umstrittene Frage ist eine Frage, bei der sich die Leute streiten, welche Antwort richtig ist.",
                "Eine rhetorische Frage gilt als Stilmittel der Rhetorik. Auf eine rhetorische Frage erwartet der Fragende keine (informative) Antwort, sondern es geht ihm dabei um die verstärkende Wirkung seiner Aussage.",
                "Eine heikle Frage ist eine Frage zu kritischen, schwer erfragbaren Bereichen der Befragten, wie zum Beispiel Fragen zu Verbrechen, Sexualität, Schulden und Einkommen.",
                "Eine soziale Frage ist eine Frage, die sich mit der Gesellschaft und ihrer Struktur beschäftigt.",
                "Eine strittige Frage ist eine Frage, bei der sich die Leute streiten, welche Antwort richtig ist.",
                "Eine kritische Frage ist eine negativ beurteilende oder eine negative Beurteilung enthaltende Frage.",
                "Eine technische Frage bezieht sich auf die Technik."
            ];
            $('#weiter3c').click(function() {
                if(check3c()) {
                    var wrong = $('.plainw').length;
                    var right = $('.passive').length;
                    var percent = right/(right+wrong);
                    setScore("3c", percent);
                    $('#message').show().effect("puff", 2000, function() {
                        document.location.href = "/ersti_task4";
                    });
                }
            });
            var dc = [];
            for (var ic = 0; ic < ac.length; ic++) {
                dc.push(makeDiv(ac[ic], ic));
            }

            for (ic = 0; ic < bc.length; ic++) {
                dc.push(makeDiv(bc[ic], ic));
            }

            dc = shuffle(dc);

            for (ic = 0; ic < dc.length; ic++) {
                $('#conta').append(dc[ic]);
            }
            $('.word').draggable({revert: 'invalid'});
            $('.target').droppable({drop: function(e,ui) {
                var id = $(this).attr("id");
                var dd = ui.draggable;
                if (/^t.{3,4}/.test(id)) {
                    if (dd.hasClass("sol")) return;
                    dd.addClass("sol");
                } else {
                    if (dd.hasClass("plainw")) {
                        unmodify(dd);
                    }
                    if (!dd.hasClass("sol")) return;
                    dd.removeClass("sol");
                }
            }});
            function check3c() {
                $('.sol').toArray().map(function(m) {
                    var t = $(m).text();
                    if ($.inArray(t, ac) > -1) {
                        $(m).addClass("passive");
                    } else {
                        $('#expl').removeClass('invisible').effect("highlight");
                        modify($(m));
                    }
                });
                return ($('.passive').length == 4) && ($('.plainw').length == 0);
            }

            function modify(m) {
                m.tooltip({ items: ".word" , content: cc[m.attr("id").substring(1)-1]});
                m.addClass("plainw");
            }

            function unmodify(m) {
                m.removeClass("plainw");
                m.tooltip("option", "disabled", true);
            }
        }
    }
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
});

function validate () {
    var syn = $('#synonym');
    var ant = $('#antonym');
    // 10 of 14
    //var b1 = /anregend/.test(jvalidate($(syn[0])));
    // 10 of 15
    //var b2 = /öde/.test(jvalidate($(ant[0])));

    var b3 = (kvalidate($('.worddrag')).length < 10);

    if (!b3) {
        showModal("Bitte ordne mehr Wörter zu!");
    }

    var c = lvalidate(syn, ant);
    console.log("c "+ c );
    var p1 = fun1(syn);
    var p2 = fun1(ant);
    console.log(p1);
    console.log(p2);
    function fun1 (a) {
        return !(a.children('.word').toArray().map(function (e) {
            return $(e).hasClass("markfalse") ? 0 : 1;
        }).reduce(function (a, e) {
            return a + e;
        },0) < 10);
    }

    if (b3 && c && p1 && p2) {
        $('#message').show().effect("puff", 2000, function() {
            var unassigned = kvalidate($('.worddrag')).length;
            var wrong = $('.markfalse').toArray().length;
            var total = $('.word').toArray().length;
            var percent = (total-(unassigned+wrong))/total;
            setScore("3", percent);
            window.location.href = "/ersti_task3b";
        });
    }
}

function jvalidate(c) {
    return c.children('.word').toArray().map(function(e){return $(e).text();}).join("");
}

function kvalidate(d) {
    return $(d[0]).children().toArray();
}

function lvalidate(s,a) {
    var b1 = fun2($(s), 0);
    var b2 = fun2($(a), 1);

    function fun2 (a, i) {

        return a.children(".word").toArray().map(function(e) {
            if (i !== 0) {

                if(e.id.substring(1) < 14) {

                    markFalse($(e));
                    return false;
                }
                return true;
            } else {

                if(e.id.substring(1) > 14) {

                    markFalse($(e));
                    return false;
                }
                return true;
            }

        }).reduce(function(a,e) {return a&&e;}, true);
    }
    return b1 && b2;
}

function showModal(msg) {
    alert(msg);
}

function validateData() {
    return $('.marktrue').length > 2;
}

function reload() {
    location.reload();
}

function markFalse (elem) {
    elem.addClass("markfalse");
}