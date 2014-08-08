
$(document).ready(function(){

    var aktuell = 1;

    $(".wortbox").each(function(){
        $(this).toggle();
    });
    $(".wortbox[id=1]").toggle();

    $("#weiter").click(next);

    function next(){
        $(".wortbox[id="+aktuell+"]").slideUp().toggle(function(){


        });
    }

});
