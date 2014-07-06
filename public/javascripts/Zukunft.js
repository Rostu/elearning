
$( init );
function init() {
    var id=0;
    var testarray = [true,true,false,true];
    testarray.forEach(function(entry) {
        if(entry){
        console.log(entry);}
    });
    $("div[class=inline]").each(function() {
        $(this).attr('id',id).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
        id++;
    });
    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });
    function handleDropEvent( event, ui ) {
        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            text: ui.draggable.context.textContent
        });
        $("#Antwortbox").append(div);
        div.click(clickhandler);
        ui.draggable.css('color','red');
        ui.draggable.draggable('disable');
    };
    function myHelper( event ) {
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: $(this).context.innerHTML
        });
    };
    function clickhandler() {
        $("div[class=inline.ui-draggable][id="+this.id+"]").draggable("enable");
        $("div[class=inline.ui-draggable][id="+this.id+"]").css('color','black');
        $(this).remove();
    };
};