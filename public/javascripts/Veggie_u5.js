/* Drag&Drop für Umweltschützer*/

$( init );
function init()
{
    var id=0;

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

        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+textinhalt+"</p>"
        });
        div.click(clear);
        i++;
        $(this).append(div);
        $(":button[id="+ui.draggable.attr('id') +"]").click(clear);
        $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
        $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','blue');
    };

    function myHelper( event )
    {
        var textinhalt = $(this).context.innerHTML;
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: textinhalt
        });
    };

    function clear()
    {
        $(".inline.ui-draggable[id="+this.id+"]").draggable("enable").css('color','black');
        $(".token[id="+this.id+"]").remove();
    }

    function enlarge()
    {
        $(".hide[id=" +$(this).attr('id')+"]").toggle();
    };

};

function validate ()
{
    var results = { "Masttiere":         1,
        "geschlachtet":                  1,
        "Unterernährung":                2,
        "Weltbevölkerung zu vergiften":  2,
        "die Wasserverschmutzung (50%)":  3,
        "die Grundwasserverseuchung (50%)":  3,
        "das Ozonloch":                 3,
        "Temperaturerhöhung (20%-25%)": 3,
        "Pestizide":                    3  };

    var counter    = [0,0,0]; 		// ermittelte Anzahl der Antworten pro Antwortbox
    var counterRef = [2,2,5]; 		// erwartete Anzahl der Antworten pro Antwortbox
    var boxKorrekt = [0,0,0];		// ermittelte Anzahl der korrekten Antworten pro Antwortbox
    var numberOfGivenResults = 0;   // Anzahl der vom Nutzer zugeordneten Begriffe
    var numberOfCorrectResults = 9; // Anzahl der richtigen Antworten
    var counterCheck = true;		// gibt an, ob zu jeder Antwort die richtige Anzahl an erwarteten Antworten vorhanden ist
    var resultsCheck = true;		// gibt an, ob zu jeder Antwort die richtigen Antworten gegeben wurden

    for ( var j = 1; j <= counter.length; j++ )		// jede Antwortbox einzeln prüfen
    {
        for ( var i = 0; i < document.getElementById ( 'Antwortbox' + j ).children.length; i++ )
        {
            if ( document.getElementById ( 'Antwortbox' + j ).children[i].nodeName == "DIV" )
            {
                counter[j-1]++;
                numberOfGivenResults++;
                for ( var z = 0; z < document.getElementById ( 'Antwortbox' + j ).children[i].children.length; z++ )
                {
                    if ( document.getElementById ( 'Antwortbox' + j ).children[i].children[z].nodeName == "P" )
                    {
                        var begriff = document.getElementById ('Antwortbox' + j ).children[i].children[z].textContent;

                        if ( results[begriff] == j )
                        {
                            boxKorrekt[j-1]++;
                            document.getElementById ( document.getElementById ('Antwortbox' + j ).children[i].id ).style.color="green";
                        }
                        else
                        {
                            document.getElementById ( document.getElementById ('Antwortbox' + j ).children[i].id ).style.color="red";
                        }
                    }
                }
            }
        }
        if ( counter[j-1] != counterRef[j-1] )
        {
            counterCheck = false;
        }
        if ( boxKorrekt[j-1] != counterRef[j-1] )
        {
            resultsCheck = false;
        }
    }

    if ( counterCheck && resultsCheck )
    {
        alert ( 'Glückwunsch! Du hast alles richtig zugeordnet!' );
    }
    else if ( counterCheck || ( numberOfGivenResults == numberOfCorrectResults ) )
    {
        alert ( 'Überdenke nochmal deine Zuordnung!' );
    }
    else
    {
        alert ( 'Nicht fertig! Es wurde nicht zu jeder Definition ein Begriff zugeordnet oder eine Box enthält nicht die erwartete Anzahl an Begriffen!' );
    }


}
