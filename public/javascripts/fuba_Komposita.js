/**
 * Created by julianebredack on 07.02.16.
 */

/**
 * Created by MeLex on 20.01.2016.
 */


$( init );
function init() {
    $('#info1').show();
    var r_length = 0;
    var arr = $(".inline");
    arr = shuffle(arr);

    var this_list = [];
    var ui_draggable_list = [];
    var j = 0;
    var count = 0;

    arr.each(function() {
        $(this).droppable({
            hoverClass: "ui-state-hover",
            drop: handleDropEvent
        });

        var inline_text = $(this).text();
        var inline_id = $(this).attr("id");

        var div = jQuery('<div/>', {
            class: 'token',
            id: inline_id,
            html: inline_text
        });
        div.draggable({
            containment: '#wrapper',
            revert: true
            //helper: myHelper
        });

        $("#Antwortbox").append(div);

        $(this).text("________________");
    });

    function handleDropEvent( event, ui ) {
        this_list[j] =  $(this);
        ui_draggable_list[j] = ui.draggable;
        j++;

        $(this).text(ui.draggable.context.textContent);
        r_length++;

        ui.helper.fadeOut();
        ui.draggable.remove();
    };

    function myHelper( event ) {
        var text = $(this).text();
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: text
        });
    };


    function shuffle(array) {
        var counter = array.length, temp, index;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    };

    document.getElementById("Ergebnis").addEventListener("click", myFunction);
    function myFunction() {

        for (i = 0; i < this_list.length; i++) {

            if (this_list[i].attr("id") === ui_draggable_list[i].attr("id")) {
                this_list[i].css("background-color", "green");
                count++;
                raisepoints();

            } else {
                inline_text = ui_draggable_list[i].text();
                inline_id = ui_draggable_list[i].attr("id");

                var div = jQuery('<div/>', {
                    class: 'token',
                    id: inline_id,
                    html: inline_text
                });
                div.draggable({
                    containment: '#wrapper',
                    revert: true
                    //helper: myHelper
                });

                $("#Antwortbox").append(div);
                this_list[i].text("________________");

                this_list[i].css("hoverClass", "ui-state-hover");
                this_list[i].droppable({
                    hoverClass: "ui-state-hover",
                    drop: handleDropEvent
                });
                raisefaults();
            }
        }

        //Message
        if (count === 11) alert("Super! Du hast alles richtig gemacht! Auf zur nächsten Aufgabe!");
        else if (count > 5 && count < 11) alert("Sehr gut! Du hast die meisten Wörter richtig zusammengesetzt. Weiter so!");
        else alert("Richtig: Das war schon ein guter Anfang. Probiere es weiter!");

        //Init context
        this_list = [];
        ui_draggable_list = [];
        j = 0;

    };
};