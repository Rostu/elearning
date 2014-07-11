
$( init );
function init() {
    var id=0;
    var id_speicher = [];
    var testarray = [[false],[true],[false],[true],[true],[false],[false],[false],[true],[false],[false],[false],[false],[false],[true],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[true],[true],[true],[false],[false],[false],[false],[false],[false],[false],[true],[false],[true],[true],[false],[false],[false],[false],[false],[true],[false],[true],[false],[false],[true],[false],[true],[true],[true],[true],[true],[true],[true],[true],[true],[false],[true],[true],[false],[false],[false],[true],[false],[true],[true],[true],[true],[true],[true],[false],[true],[true],[false],[true],[true],[false],[false],[false],[true],[true],[false],[false],[false],[false],[true],[false],[false],[false],[true],[true],[true],[true],[false],[false],[true],[false],[false],[false],[true],[true],[false],[true],[false],[false]];
    var i = 0;
    var testtext = "Wortart:‭ ‬Substantiv,‭ ‬feminin.‭ ‬Wortbedeutung,‭ Das Wort Zukunft beschreibt eine noch bevorstehende und künftige Zeit und gehört somit nicht in das Wortfeld Technik."

    $(".inline").each(function() {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
    });

    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });

    function handleDropEvent( event, ui ) {
        var textinhalt = ui.draggable.context.textContent;
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');

        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+textinhalt+"</p><div id='"+ui.draggable.attr('id') +"' class='hide'><p>"+testtext+"</p><a target='_blank' href='http://www.duden.de/suchen/dudenonline/"+ui.draggable.context.textContent+"'>INFO-Link</a><p><button id='"+ui.draggable.attr('id')+"'>löschen</button></p></div>"
            });
        div.click(enlarge);
        $(div).data('korrekt',testarray[i][0]);
        i++;
        $("#Antwortbox").append(div);
        $(":button[id="+ui.draggable.attr('id') +"]").click(clear);
        $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
        $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','red');
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
        console.log("es passiert");
        $(".inline.ui-draggable[id="+this.id+"]").draggable("enable").css('color','black');
        $(".token[id="+this.id+"]").remove();
    }

    function enlarge() {
            $(".hide[id=" +$(this).attr('id')+"]").toggle();
    };

};