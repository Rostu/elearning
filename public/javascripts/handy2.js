/**
 * Created by David on 06.08.2014.
 */
$(document).ready(function() {
    //$('#info1').show().html("<a href='#' id='check' class='redlink'>Prüfen</a>");
    var a = [];
    var b = [];
    a[1] = "bekommen";
    b[1] = "empfangen";
    a[2] = "löschen";
    b[2] = "loeschen";
    a[3] = "laden";
    a[4] = "absagen";
    a[5] = "senden";
    a[6] = "voll";
    a[7] = "schließen";
    b[7] = "schliessen";

    $('input').focusout(function() {
        //check the field just if there is entered anything
        if(!($(this).val() === "")) {
            var index = this.id.substring(1);
            var val = $(this).val();

            if (a[index] === val) {
                //add the class right
                mark(0,$(this));
                $(this).prop('disabled', true);
                raisepoints();
            } else {
                if (b[index] === val) {
                    //add the class right
                    mark(0,$(this));
                    $(this).prop('disabled', true);
                    raisepoints();
                } else {
                    mark(1, $(this));
                    raisefaults();
                }
            }
        }
    });


    function mark(i,e) {
        if(i === 1){var c = "wrong" }
        if(i === 0){var c = "right" }
        if (e.hasClass("right") || e.hasClass("wrong")){
            console.log("has class");
            e.removeClass();
            e.addClass(c);
        }else{e.addClass(c);console.log("had no class");}
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