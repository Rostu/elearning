
$( init );
function init() {

    $(".inline").each(function() {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
    });

    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });

    function handleDropEvent( event, ui ) {
        var textinhalt = ui.draggable.context.textContent;
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            text: textinhalt
        });
        div.click(clear);
        $("#Antwortbox").append(div);
        $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','grey');
    };

    function myHelper( event ) {
        var textinhalt = $(this).context.innerHTML;
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: textinhalt
        });
    };

    function clear(){
        $(".inline.ui-draggable[id="+this.id+"]").draggable("enable").css('color','black');
        $(this).remove();
    }


};