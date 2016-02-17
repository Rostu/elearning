$( init );
function init() {
    $('#info3').show();

    var arr = [["alternative Energie(n)",1], ["Bedarf",3], ["herkömmliche Energie(n)",1], ["Ressourcen",1], ["Solarenergie",1], ["Wasserkraft",1],["Strömungsenergie",1], ["Windkraft",1], ["umweltschonend",3], ["Photovoltaik",1], ["energieerzeugende Betriebe",0], ["Sonnenenergie",1],
        ["Investition",0], ["umgewandelt",2], ["Sonneneinstrahlung",2], ["elektrische Energie",2], ["Energie gewinnen",0], ["Energieerzeugung",0] ,["Rotationsenergie",2], ["Laufwasserkraftwerke",0], ["Speicherkraftwerke",0],  ["unerschöpflich",3], ["staatlich gefördert",3],
        ["wetterabhängig",3], ["tagesabhängig",3], ["jahreszeitabhängig",3], ["erzeugt",0], ["Windströmung",2], ["umweltfreundlich(er)",0], ["Generator",0] ,["Turbine(n)",0], ["Umwandlung",2], ["Energiegewinnung", 0], ["kinetische Energie",2], ["teuer",3], ["(lange) Nutzungsphase",3],
        ["Niederdruckanlage(n)",0], ["gespeichert",3], ["Reserve",0], ["Spitzenlastzeiten",3]];
    var counterQuelle = 0;
    var counterForm = 0;
    var counterEigenschaften = 0;

    arr = shuffle(arr);

    arr.forEach(function(elem){

        switch(elem[1]) {
            case 1:
                counterQuelle++;
                break;
            case 2:
                counterForm++;
                break;
            case 3:
                counterEigenschaften++;
                break;
        }


        var inline_text = elem[0];
        var inline_id = elem[1];

        var div = jQuery('<div/>', {
            class: 'token',
            id: inline_id,
            html: inline_text
        });
        div.draggable({
            containment: '#wrapper',
            revert: true,
            helper: myHelper
        });
        $("#Vorgabe").append(div);
    });

    $('#Energiequelle').droppable( {
        hoverClass: "ui-state-hover",
        drop: handleDropEvent
    });
    $('#Energieform').droppable( {
        hoverClass: "ui-state-hover",
        drop: handleDropEvent
    });
    $('#Eigenschaften').droppable( {
        hoverClass: "ui-state-hover",
        drop: handleDropEvent
    });

    function clickHandler(id) {

        switch(id) {
            case "Frage1":
                alert("hier fehlen noch: "+ counterQuelle + " Wörter");
                break;
            case "Frage2":
                alert("hier fehlen noch: "+ counterForm + " Wörter");
                break;
            case "Frage3":
                alert("hier fehlen noch: "+ counterEigenschaften+ " Wörter");
                break;
        }

    }
    //Wenn man auf Fragzeichen klickt wird, dann wird diese aufgerufen?
    $(".Frage").on('click',function(){
        clickHandler(this.id);
        //console.log(this.id); lässt in der Konsole die Ausführung testen
    });
    function handleDropEvent( event, ui ) {
        //test if correct token dropped on correct box (attr token id and attr .Antwort int)
        //if correct
        if(ui.draggable.attr("id") == $(this).attr("int")) {
            //console.log($(this).attr("int"));
            if ($(this).attr("int") === "1"){
                counterQuelle--;
            }
            if ($(this).attr("int") === "2"){
                counterForm--;
            }
            if ($(this).attr("int") === "3"){
                counterEigenschaften--;
            }

              //console.log($(ui.draggable).text());
            $(this).append("<div class='answerToken'>"+$(ui.draggable).text()+"</div>");

            removeNoticeIfPresent();
            //change the color of the token and their border to green
            ui.draggable.css("color", "#02D64A");
            ui.draggable.css("border", "solid 1px #02D64A");
            //delete the helper and remove the draggable option from the token
            ui.helper.fadeOut();
            ui.draggable.draggable( 'disable' );
            //raise points
            raisepoints();
            //if not correct
        }else{
            //raise faults change color of token to red
            raisefaults();
            ui.draggable.css("color", "#A91211");
            ui.draggable.css("border", "solid 1px #A91211");
            removeNoticeIfPresent();
            $('#info3').append("<p>Das war nicht richtig. Probier es ruhig noch einmal.</p>");
        }
    };
    //$("#r1").attr("r",45);

    function myHelper( event ) {
        var text = $(this).text();
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: text
        });
    };
};