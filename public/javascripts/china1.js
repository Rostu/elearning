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
                           { "id": 18, "class": 3, "text": "Studierende" },
                           { "id": 19, "class": 1, "text": "Studienaufenthalte"} ];

    function applyWords( wordArray, group ) {
        // Takes an array of hashes, containing an id, a text and a boolean variable "fits"
        // and makes all words in that array draggable in the DOCUMENT

        // for each textbox
        $.each( $( "#Textbox p" ), function( x ) {
            var original_text = $(this).html()
            
            // for each keyword
            $.map( wordArray, function( n ) {
                var regex = new RegExp( n['text'], "g");
                
                var replaceString = "<div id=\"" + group + "\"><div id=\""
                    + n['id'] + "\" class=\"inline ui-draggable\" style=\"color: #666666\">"
                    + n['text'] + "</div></div>";

                // replace phrase if found
                original_text = original_text.replace(regex, replaceString);
            });

            $(this).html( original_text );
        });
    };

    applyWords( evaluation, "correct" );
    
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
        $( "#Antwortbox" ).append( div ).append( "<br />" );
        $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','grey');
    };

    function clear(){
        $(".inline.ui-draggable[id="+this.id+"]").draggable("enable").css('color','black');
        $(this).remove();
    }

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
    
    $(".inline").each(function() {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
    });

    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });
};
