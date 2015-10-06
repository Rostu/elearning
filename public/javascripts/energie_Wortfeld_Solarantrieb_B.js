$(document).ready(function() {
    $('span.bold').click(function () {
        toggleStartOverlay();
        $(".bold_info").css("display","none");
        switch (this.id) {
            case "1":
                $(".bold_info#metapher").toggle();
                break;
        }

    });

    $('#info3').show();
    var r_length = 0;

    var arr1 = [
        ["das Auto (die Autos)",1],
        ["das Fahrzeug (die Fahrzeuge)",1],
        ["das Gefährt (die Gefährte)",1],
        ["das Solarauto (die Solarautos)",3],
        ["der Rennwagen (die Rennwagen)",3],
        ["der fahrende Pfannkuchen (die fahrenden Pfannkuchen)",2],
        ["das Solarmobil (die Solarmobile)",3],
        ["der Solarschleicher (die Solarschleicher)",2],
        ["das Solartaxi (die Solartaxis)",3]];

    var arr2 = [
        ["der Personenkrafwagen (PKW)(die Personenkraftwagen)",1],
        ["die Limousine",3],
        ["das Elektroauto (die Elektroautos)",3],
        ["das Schiff (die Schiffe)",2],
        ["die Schrottkarre/Schrottkiste (die Schrotkarren) ",2],
        ["das Automobil (die Automobile)",1],
        ["das Polizeiauto (die Polizeiautos)",3],
        ["der Streifenwagen (die Streifenwagen)",3],
        ["der Krankenwagen/Rettungswagen (die Krankenwagen)",3],


    ];

    arr1 = shuffle(arr1);
    arr2 = shuffle(arr2);

    arr1.forEach(function(elem) {

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
        $("#Vorgabe1").append(div);
    });
    arr2.forEach(function(elem) {

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
        $("#Vorgabe2").append(div);
    });


    $(".Antwort").droppable({
        hoverClass: "ui-state-hover",
        drop: handleDropEvent
    });
    function handleDropEvent( event, ui ) {
        //test if correct token dropped on correct box (attr token id and attr .Antwort int)
        //if correct
        if(ui.draggable.attr("id") == $(this).attr("int"))
        {
            removeNoticeIfPresent();
            //change the color of the token and their border to green
            ui.draggable.css("background-color", "#02D64A");
            ui.draggable.css("border", "solid 1px #02D64A");
            //delete the helper and remove the draggable option from the token and add the correct text to the box
            ui.helper.fadeOut();
            ui.draggable.draggable( 'disable' );
            $(this).append(ui.draggable);
            //raise points
            raisepoints();
            //if not correct

        }else{
            //raise faults change color of token to red
            raisefaults();
            ui.draggable.css("background-color", "#A91211");
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





});