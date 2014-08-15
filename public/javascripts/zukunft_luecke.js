$( init );
function init() {

    var r_length = 0;
    var arr = $(".inline");
    arr = shuffle(arr);

    arr.each(function() {
        //alert($(this).text());

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
            revert: true
            //helper: myHelper
        });

        $("#Antwortbox").append(div);

        $(this).text("________________");
    });

    function handleDropEvent( event, ui ) {
        if(ui.draggable.attr("id") == $(this).attr("id"))
        {
            $(this).text(ui.draggable.context.textContent);
            r_length++;

            $(this).css("color", "green");
            $(this).css("background-color", "transparent");

            ui.helper.fadeOut();
            ui.draggable.remove();

            update_balken();
        }
        else
        {
            //alert("No Ragrets!");
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

    function update_balken(){
        //console.log($('#balken_innen1'));
        $('#balken_innen1').css('width',r_length*12.7059);
        //$('#balken_innen2').css('width',w_length*4);
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
    };
};