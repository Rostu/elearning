$( init );
function init() {
    var id=0;


    $("div[id=inline]").each(function() {
        //console.log(this);
        $(this).data('id',id).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
        id++;
        console.log($(this).data('id'));
        console.log($(this).data('technik'));
    });

$('#Antwortbox').droppable( {
    drop: handleDropEvent
    } );
function handleDropEvent( event, ui ) {
    $("#Antwortbox").append('<div id="token">Klima</div>')
    $('#draggie').remove()
    ui.draggable.css('color','red');
    ui.draggable.draggable('disable');
    }
function myHelper( event ) {
    return '<div id="draggie">Klima</div>';
    }
}