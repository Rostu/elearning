$(document).ready(function(){
    $(".throbber")[0].style.display = "block";

    $( init );
    function init() {
        function handleCardDrop( event, ui ) {
            var slotNumber = $(this).data( 'number' );
            var slotId = this.id;
            var cardNumber = ui.draggable.data( 'number' );
            var cardId = ui.draggable.attr( 'id' );
            var objectwidth = ui.draggable.width();
            //dropelement wird in der breite dem dragelement angepasst
            $(this).width(objectwidth);
            ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
            ui.draggable.draggable( 'option', 'revert', false );



    };

});