////////////////////////////////////////////////////////////////////////////////
// place words
////////////////////////////////////////////////////////////////////////////////
var applyTo = function( jsonpath, fn ) {
    // This funciton is merely a wrapper because of "getJSONs" scope:
    // the real placement is done in the function passed as "fn".
    $.getJSON( jsonpath, function( json ) {
        var questArray = [];
        
        $.map( json.words, function( content ) {
            questArray.push( content );
        });
        
        fn( questArray );

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
    });
}

var placeQuestions = function( questions ) {
    // Places the question on the website
    var original_html = $( "#Antwortbox" ).html();
    
    // clean the text
    shuffle($( ".inline" )).each( function() {
        
        // make droppable
        $(this).droppable({
            hoverClass: "ui-state-hover",
            drop: handleDropEvent
        });

        var inline_text = $(this).text();
        var inline_id = $(this).attr("id");
        
        var replaceString = "<div id=\"" + inline_id + "\" class=\"boxes inline ui-draggable\""
            + "><div id=\"" + inline_id + "\">"
            + " " + inline_text + " " + "</div></div>";
        
        original_html += replaceString + "<br /><br />";
        
        $(this).text( " _________ " );
    });
    
    $( "#Antwortbox" ).html( original_html );
};

////////////////////////////////////////////////////////////////////////////////
// drop event
////////////////////////////////////////////////////////////////////////////////
var handleDropEvent = function ( event, ui ) {
    // drop event

    // These function is used to obtain the words for the lecture. Since
    // JQuery's mysterious scope, the drop event must be passed as well.

    // .... see "zukunft_luecke" - Thanks Robert!
    if ( ui.draggable.attr("id") == $(this).attr("id") )
    {
        var textinhalt = ui.draggable.context.textContent;

        $(this).text(ui.draggable.context.textContent);

        $(this).css("color", "green");
        $(this).css("background-color", "transparent");

        ui.helper.fadeOut();
        ui.draggable.remove();
        
        update_balken();
    }
};

////////////////////////////////////////////////////////////////////////////////
// main function
////////////////////////////////////////////////////////////////////////////////
var init = function() {
    var update_balken = update_balken_closure();
    
    applyTo( "/javascripts/wertewandel4_words.json", placeQuestions );
    
    // add droppfields
    $.map( [ "#0", "#1", "#2", "#3",
             "#4", "#5", "#6", "#7",
             "#8", ], function( id ) {

        $( id ).droppable( {
            drop: handleDropEvent
        });
    });
}

$( init );
