/* Drag&Drop für Umweltschützer*/

$( init );
function init()
{
    var id=0;
    $('#info1').show();
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
        var results = { "Masttiere":         1,
            "geschlachtet":                  1,
            "Unterernährung":                2,
            "Weltbevölkerung zu vergiften":  2,
            "die Wasserverschmutzung (50%)":  3,
            "die Grundwasserverseuchung (50%)":  3,
            "das Ozonloch":                 3,
            "Temperaturerhöhung (20%-25%)": 3,
            "Pestizide":                    3  };
        var correct = false;
        var textinhalt = ui.draggable.context.textContent;

        if (results[textinhalt] == parseInt($(this).attr('id').slice(-1))){
            correct = true;
        };
        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+textinhalt+"</p>"
        });
        i++;
        $(this).append(div);
        if (correct){
            $(div).css('background-color','#02D64A');
            raisepoints();
        }else{
            $(div).css('background-color','#A91211');
            $(div).css("color","white");
            raisefaults();
            div.click(clear);
            $("#info1").append("<a id='infolink' class='redlink' href='#'>Ein falsch zugeordneter Begriff lässt sich durch Anklicken entfernen!</a>");
            //$("#info2").append('Überdenke nochmal deine Zuordnung! (Technischer Hinweis: Ein zugeordneter Begriff lässt sich durch Anklicken entfernen.) ');

            $('#info1').animate({width: $('#info1').children('.redlink').width(), paddingRight: "20px"}, 100);
            $('#info1').children().show;
            $('#info1').children().animate({color: "#ffffff"}, 200);
        }

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

