////////////////////////////////////////////////////////////////////////////////
// loading and applying words
////////////////////////////////////////////////////////////////////////////////
var applyWords = function( wordArray, group ) {
    // Takes an array of hashes, containing an id, a text and a boolean variable "fits"
    // and makes all words in that array draggable in the DOCUMENT
    // for each textbox
    $.each( $( "#Textbox p" ), function( x ) {
        var original_text = $(this).html()
        // for each keyword
        $.map( wordArray, function( n ) {
            var regex = new RegExp( n['text'], "g");
            var replaceString = "<div id=\"" + n.id + "\" class=\"inline ui-draggable\""
                + " style=\"color: #333333\"><div id=\"" + group + "\">"
                + n.text + "</div></div>";
            // replace phrase if found
            original_text = original_text.replace(regex, replaceString);
        });
        $(this).html( original_text );
    });
};

var loadWords = function( jsonpath, group ) {
    // Loads a JSON file from the given part and returns it's objects.
    // These function is used to obtain the words for the lecture.
    $.getJSON( jsonpath, function( json ) {
        var wordArray = [];
        
        $.each( json.words, function( obj, content ) {            
            wordArray.push( content );
        });
        
        // strangely there seems no way to escape the
        // "getJSON" scope. So "applyWords" must be
        // called inside it.
        
        applyWords( wordArray, group );

        // make the words draggable:
        // I'd prefer this outside, but it would be out
        // of scope... again!
        $(".inline").each(function() {
            $(this).draggable(
                {
                    containment: '#page',
                    revert: true,
                    helper: myHelper
                }
            );
        });
    })
};

////////////////////////////////////////////////////////////////////////////////
// handle drag & drop events
////////////////////////////////////////////////////////////////////////////////
var clear = function () {
    $(".inline.ui-draggable[id="+this.id+"]").draggable("enable").css('color','black');
    $(this).remove();
}

var myHelper = function ( event ) {
    var textinhalt = $(this).context.textContent;

    textinhalt = textinhalt.replace(',','');
    textinhalt = textinhalt.replace('.','');

    return jQuery('<div/>', {
        class: 'draggie',
        id: $(this).attr('id'),
        text: textinhalt
    });
};

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
    } else if (evaluationString == "wrong")
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
    div.click(clear);

    // add and visualy display correctness of the div
    if (correct_p == true)
    {
        $( "#Antwortbox" ).append( div.animate({backgroundColor: "#0f0"}, 2000) ).append( "<br />" );
    }
    else if (correct_p == false)
    {
        $( "#Antwortbox" ).append( div.animate({backgroundColor: "#f00"}, 2000) ).append( "<br />" );
    }
    
    $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','#777777');
};

////////////////////////////////////////////////////////////////////////////////
// main function
////////////////////////////////////////////////////////////////////////////////
var init = function () {
    // apply correct words to text
    loadWords( "/javascripts/china_correct_words.json", "correct" );
    loadWords( "/javascripts/china_wrong_words.json", "wrong" );

    // make a dropfield
    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });
};

// needs to be a jquery argument
$( init );
