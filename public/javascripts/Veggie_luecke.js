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

    field = document.forms[sender.name].antwort1;
    if ( field.value != "Sonntagsbraten" )
    {
        error = true;
        err_msg.push ( 'Frage 1' );
        field.style.border="1px solid #ff0000";
    }
    else
    {
        field.style.border="1px solid #00AA00";
    }

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
        field.style.border="1px solid #00AA00";
    }

    field = document.forms[sender.name].antwort3;
    if ( field.value != "richtig dicke Luft" )
    {
        error = true;
        err_msg.push('Frage 3');
        field.style.border="1px solid #ff0000";
    }
    else
    {
        field.style.border="1px solid #00AA00";
    }

    field = document.forms[sender.name].antwort4;
    if ( field.value != "zum Himmel stinkt" )
    {
        error = true;
        err_msg.push('Frage 4');
        field.style.border="1px solid #ff0000";
    }
    else
    {
        field.style.border="1px solid #00AA00";
    }

    /* im Fehlerfall werden hier die gesammelten Fehlermeldungen verarbeitet und angezeigt. */
    if ( error )
    {
        err_msg = err_msg.join ('\n\xB7 ');
        alert ( 'Dein Lösungsvorschlag ist so nicht richtig! Lies dir die Zeitungsartikel aus Übung 1 noch einmal genau durch! Achte auch auf deine Rechtschreibung!!' );
    }
    else
    {
        alert ( 'Alles richtig!' );
    }
}

