
$( init );
function init() {
    var id=0;
    var id_speicher = [];
    var testarray = [[false],[true],[false],[true],[true],[false],[false],[false],[true],[false],[false],[false],[false],[false],[true],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[false],[true],[true],[true],[false],[false],[false],[false],[false],[false],[false],[true],[false],[true],[true],[false],[false],[false],[false],[false],[true],[false],[true],[false],[false],[true],[false],[true],[true],[true],[true],[true],[true],[true],[true],[true],[false],[true],[true],[false],[false],[false],[true],[false],[true],[true],[true],[true],[true],[true],[false],[true],[true],[false],[true],[true],[false],[false],[false],[true],[true],[false],[false],[false],[false],[true],[false],[false],[false],[true],[true],[true],[true],[false],[false],[true],[false],[false],[false],[true],[true],[false],[true],[false],[false]];
    var i = 0;

    $("div[class=inline]").each(function() {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
    });
    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });
    function handleDropEvent( event, ui ) {
        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+ui.draggable.context.textContent+"</p><div id='"+ui.draggable.attr('id') +"' class='hide'><p>Das ist ein kleiner Testtext. An dieser Stelle soll dann eine kurze erläuterung zu dem Wort erscheinen.</p><a target='_blank' href='http://www.duden.de/suchen/dudenonline/"+ui.draggable.context.textContent+"'>INFO-Link</a><p><button id='"+ui.draggable.attr('id')+"'>löschen</button></p></div>"
            });
        div.click(enlarge);
        $(div).data('korrekt',testarray[i][0]);
        i++;
        $("#Antwortbox").append(div);
        $(":button[id="+ui.draggable.attr('id') +"]").click(clear);
        $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
        console.log($(".inline.ui-draggable[id="+ui.draggable.attr('id') +"]"));
        //$("div[class=inline],[id="+ui.draggable.attr('id') +"]").each(function(index){
          //  $(index).draggable.css('color','red');
           // $(index).draggable.draggable('disable');
        //});
        ui.draggable.css('color','red');
        ui.draggable.draggable('disable');
    };

    function myHelper( event ) {
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: $(this).context.innerHTML
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