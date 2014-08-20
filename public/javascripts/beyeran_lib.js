////////////////////////////////////////////////////////////////////////////////
// loading and applying words
////////////////////////////////////////////////////////////////////////////////
var applyWords = function( wordArray, addition ) {
    // Takes an array of hashes, containing an id, a text and a boolean variable "fits"
    // and makes all words in that array draggable in the DOCUMENT
    
    // for each textbox
    $.each( $("#Textbox p"), function( p ) {
        var original_html = $(this).html();

        // for each keyword
        $.map( wordArray, function( n ) {
            var regex = new RegExp( n['text'], "g");

            var replaceString = "<div id=\"" + n.id + "\" class=\"inline ui-draggable\""
                + " style=\"color: #333333\"><div id=\"" + n[addition] + "\">"
                + n.text + "</div></div>";
            
            // replace phrase if found
            original_html = original_html.replace( regex, replaceString );
        });
        $(this).html( original_html );
    });
};

var loadWords = function( jsonpath, addition ) {
    // Loads a JSON file from the given part and returns it's objects.
    // These function is used to obtain the words for the lecture. Since
    // JQuery's mysterious scope, the drop event must be passed as well.
    $.getJSON( jsonpath, function( json ) {
        var wordArray = [];
        
        $.map( json.words, function( content ) {            
            wordArray.push( content );
        });
        
        // strangely there seems no way to escape the
        // "getJSON" scope. So "applyWords" must be
        // called inside it.
        
        applyWords( wordArray, addition );

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

var applyToAnswers = function( fn, answerArray ) {
    // Takes a unary function and assings is to every anwser box
    $.map( answerArray, fn);
};

////////////////////////////////////////////////////////////////////////////////
// helping functions
////////////////////////////////////////////////////////////////////////////////
function shuffle(array) {
    var counter = array.length, temp, index;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
};

var update_balken_closure = function () {
    var r_length = 0;

    function addit() {
        r_length += 1;
        
        //console.log($('#balken_innen1'));
        $('#balken_innen1').css('width',r_length*10.2857);
        //$('#balken_innen2').css('width',w_length*4);
    }
}

