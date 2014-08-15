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
            
        var replaceString = "<div id=\"" + n.id + "\" class=\"inline ui-draggable\">"
            + "<a href=\"#\" class=\"normalTip\" title=\"" + n.explain + "\">"
            + n.term + "</a></div>";
            
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

        $.each( json.words, function( obj, content ) {
            wordArray.push( content );
        });

        applyToolTip( wordArray );
    });
}

////////////////////////////////////////////////////////////////////////////////
// main function
////////////////////////////////////////////////////////////////////////////////
var init = function () {
    makeToolTip( "/javascripts/china_additional_words.json" );

    $(function() {
        $( document ).tooltip();
    });
}

$( init );
