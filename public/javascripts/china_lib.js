////////////////////////////////////////////////////////////////////////////////
// loading and applying words
////////////////////////////////////////////////////////////////////////////////
var applyWords = function( wordArray, group, extend ) {
    // Takes an array of hashes, containing an id, a text and a boolean variable "fits"
    // and makes all words in that array draggable in the DOCUMENT
    // for each textbox
    $.each( $( "#Textbox p" ), function( x ) {
        var original_text = $(this).html()
        // for each keyword
        $.map( wordArray, function( n ) {
            var regex = new RegExp( n['text'], "g");

            if (extend == true)
            {
                var replaceString = "<div id=\"" + n.id + "\" class=\"inline ui-draggable\""
                    + " style=\"color: #333333\"><div id=\"" + n.answer + "\">"
                    + n.text + "</div></div>";
            }
            else if (extend == false)
            {
                var replaceString = "<div id=\"" + n.id + "\" class=\"inline ui-draggable\""
                    + " style=\"color: #333333\"><div id=\"" + group + "\">"
                    + n.text + "</div></div>";
            }
            
            // replace phrase if found
            original_text = original_text.replace(regex, replaceString);
        });
        $(this).html( original_text );
    });
};

var loadWords = function( jsonpath, group, extend ) {
    // Loads a JSON file from the given part and returns it's objects.
    // These function is used to obtain the words for the lecture. Since
    // JQuery's mysterious scope, the drop event must be passed as well.
    $.getJSON( jsonpath, function( json ) {
        var wordArray = [];
        
        $.each( json.words, function( obj, content ) {            
            wordArray.push( content );
        });
        
        // strangely there seems no way to escape the
        // "getJSON" scope. So "applyWords" must be
        // called inside it.
        
        applyWords( wordArray, group, extend );

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

function clear(){
    $(".inline.ui-draggable[id="+this.id+"]").draggable("enable").css('color','black');
    $(this).remove();
}

var applyToAnswers = function( fn ) {
    // Takes a unary function and assings is to every anwser box
    var answerArray = [ "#Antwortbox1", "#Antwortbox2", "#Antwortbox3", "#Antwortbox4" ];
    $.map( answerArray, fn);
};
