////////////////////////////////////////////////////////////////////////////////
// drag and drop functionallity
////////////////////////////////////////////////////////////////////////////////
var handleDropEvent = function ( event, ui ) {
    // Handles the functionallity of dropping a word into the box and
    // changing it's color if wrong or wright
    var synonyms   = ui.draggable.context.firstChild.id;
    var textinhalt = ui.draggable.context.textContent + ": " + synonyms;
    
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

    $( "#Antwortbox" ).append( div ).append( "<br />" );
    
    $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','#777777');
};

////////////////////////////////////////////////////////////////////////////////
// tooltip functionallity
////////////////////////////////////////////////////////////////////////////////
var applyToolTip = function( wordArray  ) {
    // Takes an array of hashes, containing an id, a text and a boolean variable
    // and makes all words in that array draggable in the DOCUMENT
    // for each textbox. This function is basically very similar to the one found
    // inside "china_lib.js" but this one is way more specific because of the
    // tooltip functionallity

    $.map( wordArray, function( n ) {
        var regex = new RegExp( n.term, "g");
            
        var replaceString = "<div id=\"" + n.id + "\" class=\"normalTip inline ui-draggable\""
            + " title=\"" + n.explain + "\" style=\"text-decoration: none\">"
            + "<div id=\"" + n.synonyms.join() + "\">" + n.term + "</div></div>";
            
        // replace phrase if found - seems weird and unintuitive? Welcome to
        // jquery.
        $("#Textbox").html($("#Textbox").html().replace( regex, replaceString ));
    });
};

var makeToolTip = function ( jsonpath ) {
    // Takes a path to a fitting JSON file and creates tool tips for the words
    // found and the file with the explainations found in the file
    $.getJSON( jsonpath, function ( json ) {
        var wordArray = [];

        // load words
        $.each( json.words, function( obj, content ) {
            wordArray.push( content );
        });

        // add tool tips
        applyToolTip( wordArray );

        // add drag and drop
        $(".inline").each(function() {
            $(this).draggable(
                {
                    containment: '#page',
                    revert: true,
                    helper: myHelper
                }
            );
        });
    });
}

////////////////////////////////////////////////////////////////////////////////
// main function
////////////////////////////////////////////////////////////////////////////////
var init = function () {
    makeToolTip( "javascripts/china_additional_words.json" );

    // add tooltip
    $(function() {
        $( document ).tooltip();
    });
    
    // make a dropfield
    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });
}

$( init );
