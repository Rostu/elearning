/**
 * Created by MeLex on 14.01.2016.
 */
$(document).ready(function() {
    $('#info3').show();

    var testarray = ["gerne Wurst essen", "nur vegetarisch essen", "Wurst ist ungesund", "oft mit dem Zug fahren", "gut Karten spielen können", "immer den Weg zum Bahnhof finden", "eine schmutziger Hand haben", "ein guter Handwerker sein", "gerne Handball spielen", "gute Augen haben", "eine Brille tragen", "gut Fußball spielen können"];
    var array = ["um alles spielen","die Initiative übernehmen","selbst über eine Sache entscheiden zu können","etwas gut erkennen"];
    var infos =["Auseinanderschneiden bedeutet etwas mit einer Schere oder Ähnlichem im konkreten Wortsinn zu trennen; 'Lebenswelten' ist ein abstrakter Begriff, also nichts, was sich auseinanderschneiden lässt.",
        "auseinanderklaffen lässt sich in auseinander + klaffen zerteilen. 'auseinander' bedeutet sich entfernen von jemandem oder etwas, also das Gegenteil von 'sich annähern'",
        "Wenn ich mich nicht ins Zeug lege, dann ruhe ich mich aus. Ausruhen ist das Gegenteil von ins Zeug legen.",
        "hier wurdest du aufs Glatteis geführt: Anziehen hat nichts mit 'ins Zeug legen' zu tun. Man kann beispielsweise Kleidung anziehen.",
        "Das bedeutet sich verformen oder krümmen, bzw. verändern.",
        "Schießen ist ein Verb mit der Bedeutung jmd. töten, feuern, knallen und passt somit von der Wortbedeutung nicht zum Satz.",
        "Wenn man etwas (PC) von einer Stelle weg an eine andere verlagert (Garage). Hier ist nicht das 'verlagern' gemeint sondern das 'zur Ruhe kommen'.",
        "einen Abstellplatz für den PC bezeichnet das Gegenteil von  'Jugendlichen vor dem PC platzieren.'",
        "'konstant' würde zwar zu Stehvermögen passen. Dennoch ist dieses Wort in Verbindung mit 'Reichtum' darauf bezogen, dass man dauerhaft Vermögenswerte oder Besitz ansammelt. Reichtum ist kein Mittel zur Erlernung von Disziplin und Erfolg.",
        "aufrechtes Stehen bezieht sich eher auf den physischen Aspekt und ist ebenso kein Mittel zur Erlernung von Disziplin und Erfolg.",
        "'reinigen' bedeutet etwas säubern bzw. Schmutz oder Flecken von etwas entfernen.",
        "'streicheln' bezeichnet ein Verb 'mit leichten, gleitenden Bewegungen der Hand sanft, liebkosend berühren'"
    ];
    var j = 0;
    var shiftarray = testarray.slice();
    $('.mco').toArray().map(function(e) {
        var b = [];
        b.push(array.shift());
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
                makeNotice(infos[$.inArray(txt,testarray)]);
            } else {
                removeNoticeIfPresent();
                marktrue($(this));
                disableall(this.name);
                raisepoints();
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
            //document.location.href = "generationen_ende";
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


