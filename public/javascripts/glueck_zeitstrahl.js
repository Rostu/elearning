/**
 * Created by Ich on 31.03.2015.
 */
$(document).ready(function() {

    var data = ["vor ein paar Monaten","letzte Woche","eine Minute später","kurz darauf","in der folgenden halben Stunde"];
    var display_data = shuffle(data);
    var i = 1;
    display_data.forEach(function(elem){
        var div = jQuery('<div/>', {
            class: 'token',
            id: i,
            html: elem
        });
        i++;
        $(div).appendTo('#Token_area' ).draggable({
            containment: '#wrapper',
            drag: handleDragEvent,
            revert: true});

    })

    $('#line').droppable( {
        drop: handleDropEvent
    });

    function handleDropEvent( event, ui ) {
        var div = jQuery('<div/>', {
            class: 'antworttoken',
            html:ui.draggable.context.textContent,
            id: ui.draggable.context.textContent
        });
        $('#zeit').append(div);
        //div.click(clear);
        check(ui.draggable.context.textContent);

    }

    function handleDragEvent( event, ui ) {

    }

    function check(id){
        console.log($("#"+id).position());
    }

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
    }

});