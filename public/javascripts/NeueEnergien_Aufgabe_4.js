$( init );
function init() {
    $('#info1').show();
    $('#info1').append("<a id='infolink1' class='redlink' href='#'>Das ist ein Info-Link</a>");

    var r_length = 0;
    var arr = $(".receiveToken");
    arr = shuffle(arr);

    arr.each(function() {
        //alert($(this).text());

        $(this).droppable({
            tolerance: 'touch',
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

        $("#Wort").append(div);

        $(this).text("________________");
    });

    function handleDropEvent( event, ui ) {
        console.log(ui.draggable.attr("id"));
        console.log($(this).attr("id"));
        if(ui.draggable.attr("id") == $(this).attr("id"))
        {
            $(this).text(ui.draggable.context.textContent);
            r_length++;

            $(this).css("color", "#02D64A");
            $(this).css("background-color", "transparent");
            $(this).css("font-weight", "bold");

            ui.helper.fadeOut();
            ui.draggable.remove();
            raisepoints();
        }else{
            raisefaults();
            $(ui.draggable).css("background-color", "red");
        }
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
};
