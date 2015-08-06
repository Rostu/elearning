$(document).ready(function() {
    var  corrects=["0","3","4","5","6","8","12","13","14","15","20","22","23","24","25","26","27","31","33","34","40"];
    $('#info3').show();
    $('#info3').append("<p><b>Info: Was sind Fahrzeuge?</b></br></br>Die deutsche Sprache verfügt über eine Vielzahl an Wörtern, die denselben Inhalt auf unter<wbr>schiedliche Weise wiedergeben. Die folgende Aufgabe soll dir eine Vielzahl an Benennungs<wbr>möglichkeiten für den Begriff 'Fahrzeug' aufzeigen.</p>");


    $('span.candidate').click(function () {
        if((corrects.indexOf($(this).attr("id"))>=0) && (!$(this).hasClass("correct"))&& (!$(this).hasClass("false"))) {
            $(this).addClass("correct");
            raisepoints();
        }else if((!$(this).hasClass("correct"))&& (!$(this).hasClass("false"))  ){
            raisefaults();
            $(this).addClass("false");
        }
    });

});