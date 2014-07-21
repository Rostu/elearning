/* Drag&Drop für Mediziner*/

$( init );
function init()
{
    var id=0;

    var testarray = [[false],[true],[false],[true],[true],[false],[false],[false],
        [true],[false],[false],[false],[false],[false],[true],[false],
        [false],[false],[false],[false],[false],[false],[false],[false],
        [false],[false],[false],[false],[true],[true],[true],[false],
        [false],[false],[false],[false],[false],[false],[true],[false],
        [true],[true],[false],[false],[false],[false],[false],[true],
        [false],[true],[false],[false],[true],[false],[true],[true],
        [true],[true],[true],[true],[true],[true],[true],[false],
        [true],[true],[false],[false],[false],[true],[false],[true],
        [true],[true],[true],[true],[true],[false],[true],[true],
        [false],[true],[true],[false],[false],[false],[true],[true],
        [false],[false],[false],[false],[true],[false],[false],[false],
        [true],[true],[true],[true],[false],[false],[true],[false],
        [false],[false],[true],[true],[false],[true],[false],[false]];

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
            html: "<p>"+textinhalt+"</p><div id='"+ui.draggable.attr('id') +"' class='hide'><a target='_blank' href='http://www.duden.de/suchen/dudenonline/"+ui.draggable.context.textContent+"'>INFO-Link</a><p><button id='"+ui.draggable.attr('id')+"'>löschen</button></p></div>"
        });
        div.click(enlarge);
        $(div).data('korrekt',testarray[i][0]);
        i++;
        $(this).append(div);
        $(":button[id="+ui.draggable.attr('id') +"]").click(clear);
        $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
        $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','blue');
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
    var results = { "Vegetarierstudien":            -1,
        "Blutdruckwerte":               -1,
        "Körpergewicht":                1,
        "Lebenserwartung":              2,
        "Herz-Kreislauf-Erkrankungen":  -1,
        "Sterberate":                   3,
        "Mangelerscheinungen":          -1,
        "Gesundheitszustand":		    -1 };

    var counter = [0,0,0];
    var counterCheck = true;
    var boxKorrekt = [false, false, false];

    for ( var j = 1; j <= counter.length; j++ )
    {
        for ( var i = 0; i < document.getElementById ( 'Antwortbox' + j ).children.length; i++ )
        {
            if ( document.getElementById ( 'Antwortbox' + j ).children[i].nodeName == "DIV" )
            {
                counter[j-1]++;
                for ( var z = 0; z < document.getElementById ( 'Antwortbox' + j ).children[i].children.length; z++ )
                {
                    if ( document.getElementById ( 'Antwortbox' + j ).children[i].children[z].nodeName == "P" )
                    {
                        var begriff = document.getElementById ('Antwortbox' + j ).children[i].children[z].textContent;

                        if ( results[begriff] == j )
                        {
                            boxKorrekt[j-1] = true;
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
        if ( counter[j-1] != 1 )
        {
            counterCheck = false;
        }

    }

    if ( counterCheck && boxKorrekt.indexOf ( false ) == -1 )
    {
        alert ( 'Alles richtig!' );
    }
    else if ( counterCheck )
    {
        alert ( 'Überdenke nochmal deine Zuordnung!' );
    }
    else
    {
        alert ( 'Nicht fertig! Es wurde nicht zu jeder Definition ein Begriff zugeordnet oder eine Box enthält mehr als einen Begriff!' );
    }


}