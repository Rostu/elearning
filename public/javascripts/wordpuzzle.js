
$(document).ready(function(){
    $(".throbber")[0].style.display = "block";
    var ubs;
    var correctCards = 0;
    var wortarray = [];
    var wahr = false;

    $.getJSON("/ubdata", function (data) {
        $(".throbber")[0].style.display = "none";
        ubs = data.inhalt;

        $( init );
        function init() {

            // Hide the success message
            $('#successMessage').hide();
            $('#successMessage').css( {
                left: '580px',
                top: '250px',
                width: 0,
                height: 0
            } );

            // Reset the game
            correctCards = 0;
            $('#cardPile').html( '' );
            $('#cardSlots').html( '' );

            // Create the pile of shuffled cards
            var numbers = [];
            for (var i= 0; i<ubs.length; i++){
                numbers.push(i);
            }
            numbers.sort( function() { return Math.random() - .5 } );

            for ( var i=0; i<ubs.length; i++ ) {
                $('<div>'+  ubs[numbers[i]] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
                    containment: '#content',
                    stack: '#cardPile div',
                    cursor: 'move',
                    revert: true
                } );
            }
            $('#cardPile').css('height', '100%');

            // Create the card slots

            for ( var i=1; i<=ubs.length; i++ ) {
                $('<div>' + "card" + '</div>').data( 'number', i ).attr( 'id', i ).appendTo( '#cardSlots' ).droppable( {
                    accept: '#cardPile div',
                    hoverClass: 'hovered',
                    drop: handleCardDrop
                } );
            }
        }

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

            var index;
            for (var i = 0; i < wortarray.length; i++) {
                if (wortarray[i][0] == slotId) {
                    index = i;
                    wortarray.splice(index, 1);
                    break;
                }
            }
            //Anpassen aller Kartenpositionen nach drop
            wortarray.push([slotId, cardId]);
            wortarray.forEach(function(index){
                var pos1 = $('#'+index[0]);
                var pos2 = $('#'+index[1]);
                pos2.position({of: pos1,my: 'left top', at: 'left top' } );
            });

            //Sortiert das Hilfsarray für die Korrekt-abfrage
            wortarray.sort((function(index){
                return function(a, b){
                    return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
                };
            })(0));

            for ( var i=0; i<=wortarray.length; i++ ) {
                if (wortarray[i] === "card"+i ){
                    wahr = true;
                }else {wahr = false}
            };
            console.log(wahr);
            }

            // If all the cards have been placed correctly then display a message
            // and reset the cards for another go



});});



