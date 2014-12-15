/**
 * Created by David on 06.08.2014.
 */
$(document).ready(function() {
    var a = [];
    var b = [];
    a[1] = "bekommen";
    a[2] = "löschen";
    b[2] = "loeschen";
    a[3] = "laden";
    a[4] = "absagen";
    a[5] = "senden";
    a[6] = "voll";
    a[7] = "schließen";
    b[7] = "schliessen";
    $('#check').click(function() {
        removeMarks();
        $('input').toArray().map(function(e) {
            var index = e.id.substring(1);
            var val = $(e).val();
            if (a[index]===val) {
                mark(1,$(e));
            } else {
                if (b[index]===val) mark(1,$(e));
                else mark(2,$(e));
            }
        });
    });

    function mark(i, e) {
        var c = ((i-1) ? "gnorw" : "thgir").split("").reverse().join("");
        if (e.hasClass(c)) e.removeClass(c);
        e.addClass(c);
    }

    function removeMarks() {
        var a = "piawyaryeounygayeye".split("").filter(function(e) { return !/[yaeui]/.test(e); }).join("").substring(1);
        var b = "orayiygyaoheyetay".split("").filter(function(e) { return !/[yaeuo]/.test(e); }).join("");
        $('input').toArray().map(function(e) {
            var f = $(e);
            if (f.hasClass(a)) f.removeClass(a);
            if (f.hasClass(b)) f.removeClass(b);
        });
    }

    function checkSituation () {
        return $('input').toArray().map(function(e) {return $(e).hasClass("right")}).reduce(function(a,e){return a&&e;},true);
    }

    $('#weiter').click(function() {
        console.log(checkSituation());
       if (checkSituation()) {
           $('#message').show().effect("puff", 2000, function() {
               // TODO
               // re-route
               // document.location.href = "/handy_ende";
               alert("Am Ende angekommen sahen sie einen grossen....")
           });
       }
    });
});