function validate2(){
    document.querySelector('#pruefen').addEventListener('click', validate(document.querySelector('form')),false);
};


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
    console.log(document.querySelector('#pruefen'));
    var results = [ "Sonntagsbraten",
        "nur Gemuese im Kopf",
        "richtig dicke Luft",
        "zum Himmel stinkt" ];

    var err_msg = new Array ( 'Falsch! Folgende Felder enthalten Fehler:\n' );
    var error = false;

    for ( var j = 0; j < results.length; j++ )
    {
        var elemName = "antwort" + ( j+1 );
        var field = document.forms [ sender.name ].elements [ elemName ];
        var input = replaceUmlauts ( field.value );
        if ( input != results [ j ] )
        {
            error = true;
            // leeres Feld
            if ( ! input )
            {
                err_msg.push ( 'Feld ' + ( j+1 ) + ':' + ' Hier fehlt eine Metapher!' );
            }
            // richtiges Wort aber Groß-/Kleinschreibung falsch
            else if ( input.toUpperCase () == results [ j ].toUpperCase () )
            {
                err_msg.push ( 'Feld ' + ( j+1 ) + ':' + ' Beachte deine Groß-/Kleinschreibung!' );
            }
            // falsches Wort
            else
            {
                err_msg.push ( 'Feld ' + ( j+1 )  + ':' + ' Das ist leider nicht die gesuchte Metapher!' );
            }
            field.style.border = "1px solid #ff0000";
        }
        else
        {
            field.style.border = "1px solid #00AA00";
        }
    }

    /* im Fehlerfall werden hier die gesammelten Fehlermeldungen verarbeitet und angezeigt. */
    if ( error )
    {
        err_msg = err_msg.join ( '\n\xB7 ' );
        alert ( err_msg );
    }
    else
    {
        alert ( 'Glückwunsch! Du hast alle Metaphern richtig verwendet!' );
    }
}

$(init);
function init() {
    //shows the info buttons on the left side
    $('#info1').show();
};
