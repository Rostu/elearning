/**
 * Created by David on 03.08.2014.
 */
$(document).ready(function() {
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