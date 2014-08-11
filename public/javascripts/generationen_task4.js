/**
 * Created by David on 03.08.2014.
 */
$(document).ready(function() {

    var testarray = ["etw. (auseinander) schneiden", "sich annähern", "Ausruhen", "Anziehen", "Sich verbiegen", "Schießen", "PC in die Garage auslagern", "Abstellplatz für PC", "konstanter Reichtum (Besitz)", "aufrechter Stand", "reinigen", "streicheln"];
    var array = ["Abstand vergrößern","Anstrengen","Gehen","etw./jmd. (ab-)setzen [um Ruhe zu haben]","Ausdauer","streiten"];
    var infos =["Auseinanderschneiden bedeutet etwas mit einer Schere oder ähnlichem im konkreten Wortsinn zu trennen; „Lebenswelten“ ist ein abstrakter Begriff, also nichts, was sich auseinanderschneiden lässt.",
        "auseinanderklaffen lässt sich in auseinander + klaffen zerteilen. „auseinander“ bedeutet sich entfernen von jemandem oder etwas, also das Gegenteil von „sich annähern“",
        "Wenn ich mich nicht ins Zeug lege, dann ruhe ich mich aus. Ausruhen ist das Gegenteil von ins Zeug legen.",
        "hier wurdest du aufs Glatteis geführt: Anziehen hat nichts mit „ins Zeug legen“ zu tun. Man kann beispielsweise Kleidung anziehen.",
        "Das bedeutet sich verformen oder krümmen, bzw. verändern.",
        "Schießen ist ein Verb mit der Bedeutung jmd. töten, feuern, knallen und passt somit von der Wortbedeutung nicht zum Satz.",
        "Wenn man etwas (PC) von einer Stelle weg an eine andere verlagert (Garage). Hier ist nicht das „verlagern“ gemeint sondern das „zur Ruhe kommen“.",
        "einen Abstellplatz für den PC bezeichnet das Gegenteil von  „Jugendlichen vor dem PC platzieren.“",
        "„konstant“ würde zwar zu Stehvermögen passen. Dennoch ist dieses Wort in Verbindung mit „Reichtum“ darauf bezogen, dass man dauerhaft Vermögenswerte oder Besitz ansammelt. Reichtum ist kein Mittel zur Erlernung von Disziplin und Erfolg.",
        "aufrechtes Stehen bezieht sich eher auf den physischen Aspekt und ist ebenso kein Mittel zur Erlernung von Disziplin und Erfolg.",
        "„reinigen“ bedeutet etwas säubern bzw. Schmutz oder Flecken von etwas entfernen.",
        "„streicheln“ bezeichnet ein Verb „mit leichten, gleitenden Bewegungen der Hand sanft, liebkosend berühren“"
    ];
    $('.mco').toArray().map(function(e) {
        var b = [];
        b.push(array.shift());
        b.push(testarray.shift());
        b.push(testarray.shift());
        b = shuffle(b);

    });
    $('#check').click(function() {
        $('.mco').toArray().map(function(e) {
            $(e).children('input').toArray().map(function(f) {
                if($(f).is(':checked')) {
                    // TODO Validierung
                    /*
                        Reihenfolge der Antworten flexibilisieren (random)
                        (im Moment ist immer Antwort 1 richtig, daher hier eine recht einfache Validierung)

                        Validierung überarbeiten
                     */
                    if(($(f).attr('id').substring(2,3)==1)) {
                        marktrue($(e));
                        return true;
                    }
                    markfalse($(e));
                }
            });
        });
    });

    $('#weiter').click(function() {
        $('#check').click();
        if ($('.wrong').toArray().length == 0) {
            alert("Gut gemacht! Weiter so!");
            // TODO neue seite laden
            //document.location.href = "/generationen_ende";
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