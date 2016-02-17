$( init );
function init() {
    var id=0;
    var Argumentation = ["6","9"];
    var Aufzaehlung = ["4"];
    var Darstellung = ["1"];
    var Definition = ["3"];
    var Vorschlag = ["2"];
    var Teilthema = ["5","7","8"];
    var Loesungen = [Argumentation,Aufzaehlung,Darstellung,Definition,Vorschlag,Teilthema];
    var i = 0;


    $(".inline").each(function() {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
    });

    $(".antwort").each(function() {
        $(this).click(function() {

            if ($('.inline').css('text-decoration') == 'underline'){
                $('.inline').attr('style','text-decoration: none');
            }
            else {
                $('.inline').attr('style','text-decoration: underline');
            }

        });
    });

    $('#Antwortbox_ww_1').droppable( {
        drop: handleDropEvent
    });

    $('#Antwortbox_ww_2').droppable( {
        drop: handleDropEvent
    });
    $('#Antwortbox_ww_3').droppable( {
        drop: handleDropEvent
    });
    $('#Antwortbox_ww_4').droppable( {
        drop: handleDropEvent
    });
    $('#Antwortbox_ww_5').droppable( {
        drop: handleDropEvent
    });
    $('#Antwortbox_ww_6').droppable( {
        drop: handleDropEvent
    });

    function handleDropEvent( event, ui ,goal) {
        var Box = event.target.id;
        switch(parseInt(Box.slice(-1))) {
            case 1:
                var korrekteAntworten = Loesungen[0];
                break;
            case 2:
                var korrekteAntworten = Loesungen[1];
                break;
            case 3:
                var korrekteAntworten = Loesungen[2];
                break;
            case 4:
                var korrekteAntworten = Loesungen[3];
                break;
            case 5:
                var korrekteAntworten = Loesungen[4];
                break;
            case 6:
                var korrekteAntworten = Loesungen[5];
                break;
        }
        var textinhalt = ui.draggable.context.textContent;
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        textinhalt = textinhalt.replace('"','');
        var kurzformtextinhalt = textinhalt.substring(0,20) + "[...]";
        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+kurzformtextinhalt+"</p></div>"
        });
        if($.inArray(ui.draggable.attr('id'), korrekteAntworten)> -1){
            $('.inline').attr('style','text-decoration: none');
            $(div).data('korrekt',true);
            $(div).css('background','#02D64A').css("color","#005E9C");
            raisepoints();
            $(event.target).bind("contextmenu",function(e){return false;});
            $(event.target).append(div);
            //$(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','green');
            $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").addClass( "correct" );
        }
        else{
            $('.inline').attr('style','text-decoration: underline');
            toggleStartOverlay();
            raisefaults();
        }

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
    }

    function animatearrow(){
        $('#arrow').animate({top: '+79%',opacity: 1},{duration: 1000, easing: "easeOutBounce" });
        $('#arrow').animate({top: '+10%', opacity: 0},0);
    }

}