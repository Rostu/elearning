/*
  The only Thing which had to be adjusted for all the china programs was
  the "handleDropEvent" function.

  The remaining functionality is obtained via the "beyeran_lib.js".
*/

var handleDropEvent = function ( event, ui ) {
    // Handles the functionallity of dropping a word into the box and
    // changing it's color if wrong or wright
    var textinhalt        = ui.draggable.context.textContent;
    var evaluationString  = ui.draggable.context.firstChild.id;
    var correct_p;  // was the selection correct?

    // check wheater the selection was correct
    if (evaluationString == "correct")
    {
        correct_p = true;
    }
    else if (evaluationString == "wrong")
    {
        correct_p = false;
    };

    // create div to drop
    var div = jQuery('<div/>', {
        class: 'token',
        id: ui.draggable.attr('id'),
        text: textinhalt
    });

    // adding abilities to the div
    textinhalt = textinhalt.replace(',','');
    textinhalt = textinhalt.replace('.','');


    // add and visualy display correctness of the div
    if (correct_p == true)
    {
        $( "#Antwortbox" ).append( div.animate({backgroundColor: "#0f0"}, 2000) ).append( "<br />" );
        raisepoints();
    }
    else if (correct_p == false)
    {
        div.click(clear);
        $( "#Antwortbox" ).append( div.animate({backgroundColor: "#f00"}, 2000) ).append( "<br />" );
        raisefaults();
    }
    
    $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','#777777');
};

////////////////////////////////////////////////////////////////////////////////
// main function
////////////////////////////////////////////////////////////////////////////////
var init = function () {
    // apply correct words to text
    loadWords( "javascripts/china_correct_words.json", "group" );
    loadWords( "javascripts/china_wrong_words.json", "group" );
    
    // make a dropfield
    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });
};

// needs to be a jquery argument
$( init );

