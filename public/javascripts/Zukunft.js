
$( init );
function init() {

    var id=0;
    var id_speicher = [];
    var testarray = ["Physiker","Wissenschaft","Forschung","Physik","Star-Physiker","Handystrahlen","Nanotechnik","Internet","Pfeil und Bogen","Metallherstellung","Atome","Mikroskop", "Wissenschaftler","Maschinen","Roboter","Computer","Rechenkapazität","Computerspielkonsolen","Rechenleistung","Großrechner","Smartphone","Chip","Autos","Lenkrad","Film","GPS-Systeme","Radar"];
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
        textinhalt = textinhalt.replace('"','');
        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+textinhalt+"</p><div id='"+ui.draggable.attr('id') +"' class='hide'><p>"+testtext+"</p><a target='_blank' href='http://www.duden.de/suchen/dudenonline/"+ui.draggable.context.textContent+"'>INFO-Link</a></div>"
        });
        div.click(enlarge);
        if($.inArray(textinhalt, testarray)> -1){
            $(div).data('korrekt','true');
            $(div).css('background','rgba(2, 255, 85, 0.16)');
        }else {$(div).data('korrekt','false');$(div).css('background','rgba(240, 128, 128, 0.44)');$(div).css('color','black');}
        $("#Antwortbox").bind("contextmenu",function(e){return false;});
        $("#Antwortbox").append(div);
        div.mousedown(clear);
        //$(":button[id="+ui.draggable.attr('id') +"]").click(clear);
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

    function clear(ev) {
        if (ev.which == 3) {
        $(".inline.ui-draggable[id=" + this.id + "]").draggable("enable").css('color', 'black');
        $(".token[id=" + this.id + "]").remove();
        }
    }

    function enlarge() {
            $(".hide[id=" +$(this).attr('id')+"]").toggle();
    };
};