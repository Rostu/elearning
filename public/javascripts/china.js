$( init );
function init() {
    var evaluation = [ { "id": 0, "class": 3, "text": "Austauschstudent" },
                       { "id": 1, "class": 1, "text": "BWL" },
                       { "id": 2, "class": 3, "text": "Student" },
                       { "id": 3, "class": 1, "text": "Banking and Finance" },
                       { "id": 4, "class": 2, "text": "Fachhochschule" },
                       { "id": 5, "class": 2, "text": "Summer School" },
                       { "id": 6, "class": 4, "text": "Partnerhochschule" },
                       { "id": 7, "class": 2, "text": "Universität" },
                       { "id": 8, "class": 3, "text": "Absolvent" },
                       { "id": 9, "class": 1, "text": "Angewandte Wirtschaftssprachen" },
                       { "id": 10, "class": 4, "text": "Frontalunterricht" },
                       { "id": 11, "class": 4, "text": "Auswendiglernen" },
                       { "id": 12, "class": 4, "text": "Vorlesungsinhalte" },
                       { "id": 13, "class": 3, "text": "Professor" },
                       { "id": 14, "class": 4, "text": "Diskussionen" },
                       { "id": 15, "class": 3, "text": "Lehrperson" },
                       { "id": 16, "class": 4, "text": "Lektüre" },
                       { "id": 17, "class": 2, "text": "TU München" },
                       { "id": 18, "class": 3, "text": "Studierende" } ];
    
    var applyToAnswers = function( fn ) {
        // Takes a unary function and assings is to every anwser box
        var answerArray = [ "#Antwortbox1", "#Antwortbox2", "#Antwortbox3", "#Antwortbox4" ];
        
        $.map( answerArray, fn);
    };
    
    // assign drop behaviour
    applyToAnswers( function( id ) {
        $( id ).droppable( {
            drop: handleDropEvent
        })
    });
    
    function handleDropEvent( event, ui ) {
        var textinhalt = ui.draggable.context.textContent;

        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            text: textinhalt
        });

        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        
        div.click(clear);

        // get drop id and append it to where it was dropped
        var draggedDivId  = $(this).closest('div').attr('id');
        var answerDragged = parseInt( draggedDivId.slice(-1) );

        var realAnswer    = ($.grep( evaluation, function( n ) {
            return n['id'] == parseInt( ui.draggable.attr('id') )
        }))[0]["class"];

        // attach the elements
        $( "#" + draggedDivId ).append( div ).append( "<br />" );        
        $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','grey');

        // is right?
        var rightAnswered;
        
        if (answerDragged = realAnswer) {
            rightAnswered = true;
        } else {
            rightAnswered = false;
        }
    };

    function myHelper( event ) {
        var textinhalt = $(this).context.innerHTML;

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

    
    $(".inline").each(function() {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
    });
};
