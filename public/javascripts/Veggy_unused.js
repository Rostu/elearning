/* Lückentext */


function replaceUmlauts ( text )
{
    text = text.replace(/ä/g,"ae");
    text = text.replace(/ö/g,"oe");
    text = text.replace(/ü/g,"ue");
    text = text.replace(/Ä/g,"Ae");
    text = text.replace(/Ö/g,"Oe");
    text = text.replace(/Ü/g,"Ue");
    text = text.replace(/ß/g,"ss");
    return text;
}

function validate ( sender )
{
    var err_msg = new Array ( 'Folgende Felder enthalten Fehler:\n' );
    var error = false;

    /* Antwort 1 prüfen */
    field = document.forms[sender.name].antwort1;
    if ( field.value != "Sonntagsbraten" )
    {
        error = true;
        err_msg.push ( 'Frage 1' );
        field.style.border="1px solid #ff0000";
    }
    else
    {
        field.style.border="1px solid #000000";
    }

    /* Antwort 2 prüfen */
    field = document.forms[sender.name].antwort2;
    modifiedAnswer = replaceUmlauts ( field.value );
    if ( modifiedAnswer != "nur Gemuese im Kopf" )
    {
        error = true;
        err_msg.push('Frage 2');
        field.style.border="1px solid #ff0000";
    }
    else
    {
        field.style.border="1px solid #000000";
    }

    /* Antwort 3 prüfen */
    field = document.forms[sender.name].antwort3;
    if ( field.value != "richtig dicke Luft" )
    {
        error = true;
        err_msg.push('Frage 3');
        field.style.border="1px solid #ff0000";
    }
    else
    {
        field.style.border="1px solid #000000";
    }

    /* Antwort 4 prüfen */
    field = document.forms[sender.name].antwort4;
    if ( field.value != "zum Himmel stinkt" )
    {
        error = true;
        err_msg.push('Frage 4');
        field.style.border="1px solid #ff0000";
    }
    else
    {
        field.style.border="1px solid #000000";
    }

/* im Fehlerfall werden hier die gesammelten Fehlermeldungen verarbeitet und angezeigt. */
    if ( error )
    {
        err_msg = err_msg.join ('\n\xB7 ');
        //alert ( err_msg );
    }
    else
    {
        alert ( 'Alles richtig!' );
    }
}




/* Drag&Drop */

$( init );
function init()
{
    var id=0;
    var id_speicher = [];
    var testarray = [[false],[true],[false],[true],[true],[false],[false],[false],[true],[false],[false],[false],[false],[false],[true],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[true],[true],[true],[false],[false],[false],[false],[false],[false],[false],[true],[false],[true],[true],[false],[false],[false],[false],[false],[true],[false],[true],[false],[false],[true],[false],[true],[true],[true],[true],[true],[true],[true],[true],[true],[false],[true],[true],[false],[false],[false],[true],[false],[true],[true],[true],[true],[true],[true],[false],[true],[true],[false],[true],[true],[false],[false],[false],[true],[true],[false],[false],[false],[false],[true],[false],[false],[false],[true],[true],[true],[true],[false],[false],[true],[false],[false],[false],[true],[true],[false],[true],[false],[false]];
    var i = 0;

    $(".inline").each(function()
    {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
    });

    $('#Antwortbox1').droppable( {
        drop: handleDropEvent
    });
    $('#Antwortbox2').droppable( {
        drop: handleDropEvent
    });
    $('#Antwortbox3').droppable( {
        drop: handleDropEvent
    });

    function handleDropEvent( event, ui )
    {
        var textinhalt = ui.draggable.context.textContent;
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');

        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+textinhalt+"</p><div id='"+ui.draggable.attr('id') +"' class='hide'><p>Das ist ein kleiner Testtext. An dieser Stelle soll dann eine kurze erläuterung zu dem Wort erscheinen.</p><a target='_blank' href='http://www.duden.de/suchen/dudenonline/"+ui.draggable.context.textContent+"'>INFO-Link</a><p><button id='"+ui.draggable.attr('id')+"'>löschen</button></p></div>"
        });
        div.click(enlarge);
        $(div).data('korrekt',testarray[i][0]);
        i++;
        $(this).append(div);
        $(":button[id="+ui.draggable.attr('id') +"]").click(clear);
        $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
        $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','red');
    };

    function myHelper( event )
    {
        var textinhalt = $(this).context.innerHTML;
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: textinhalt
        });
    };

    function clear()
    {
        console.log("es passiert");
        $(".inline.ui-draggable[id="+this.id+"]").draggable("enable").css('color','black');
        $(".token[id="+this.id+"]").remove();
    }

    function enlarge()
    {
        $(".hide[id=" +$(this).attr('id')+"]").toggle();
    };

};