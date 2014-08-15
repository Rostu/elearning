/*
  The only Thing which had to be adjusted for all the china programs was
  the "handleDropEvent" function.

  The remaining functionality is obtained via the "beyeran_lib.js".
*/
function handleDropEvent( event, ui ) {
    // drop event
    // These function is used to obtain the words for the lecture. Since
    // JQuery's mysterious scope, the drop event must be passed as well.
    var textinhalt = ui.draggable.context.textContent;
    
    var div = jQuery('<div/>', {
        class: 'token',
        id:     ui.draggable.attr('id'),
        text: textinhalt
    });
        
    textinhalt = textinhalt.replace(',','');
    textinhalt = textinhalt.replace('.','');
        
    div.click(clear);

    // get drop id and append it to where it was dropped
    var draggedDivId = $(this).closest('div').attr('id');
    var answerDragged = parseInt( draggedDivId.slice(-1) );
    var realAnswer    = ui.draggable.context.firstChild.id;
    
    // is right?
    var correct_p;
        
    if (answerDragged == realAnswer) {
        correct_p = true;
    } else {
        correct_p = false;
    }

    // attach the elements
    if (correct_p == true)
    {
        $( "#Antwortbox_ww_" + answerDragged ).append( div.animate({backgroundColor: "#0f0"}, 2000) ).append( "<br />" );
    }
    else if (correct_p == false)
    {
        $( "#Antwortbox_ww_" + answerDragged ).append( div.animate({backgroundColor: "#f00"}, 2000) ).append( "<br />" );
    }
    
    $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','grey');
};

////////////////////////////////////////////////////////////////////////////////
// main function
////////////////////////////////////////////////////////////////////////////////
function init() {
    loadWords( "/javascripts/wertewandel1_words.json", "correct", true );

    // add droppfields
    $.map( [ "#Antwortbox_ww_1", "#Antwortbox_ww_2" ], function( id ) {
        console.log( id );
        $( id ).droppable( {
            drop: handleDropEvent
        });
    });
};

$( init );
