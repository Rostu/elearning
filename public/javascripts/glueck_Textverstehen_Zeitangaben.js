$( init );
function init() {

    var id=0;
    var id_speicher = [];
    var testarray = ["in diesem Sommer","letzte Woche","vor ein paar Monaten","In der folgenden halben Stunde", "Eine Minute später","Kurz darauf","ewig"];
    var i = 0;
    var infos =[["",""],["",""]];
    var r_length=0;
    var w_length = 0;
    var fb1 = 0;
    var fb2 = 0;
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
        var textinfos ="";
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        textinhalt = textinhalt.replace('"','');
        if($.inArray(textinhalt,testarray) < 0){
            textinfos="Das ist leider nicht richtig. Wenn du nicht weißt, was dieses Wort bedeutet, schau doch mal hier nach:";
            if(++fb1 == 3){
                animatearrow();
            };
            if(++fb2 == 6){
                $("span[id=hmenu]").append("<p>Versuche, mehr über das <a target='_blank' href='http://www.dwds.de/?qu=Technik'>Wortfeld \"Technik\"</a> herauszufinden.</p>");
                animatearrow();
            };
        };

        for(i=0;i<infos.length;i++){
            if(infos[i][0] === textinhalt && infos[i][1] !="")
            {textinfos = infos[i][1]}
        }
        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+textinhalt+"</p><div id='"+ui.draggable.attr('id') +"' class='hide'><p>"+textinfos+"</p><a target='_blank' href='http://www.dwds.de/?qu="+ui.draggable.context.textContent+"'>DWDS</a><p><a target='_blank' href='http://http://www.duden.de/suchen/dudenonline/"+ui.draggable.context.textContent+"'>DUDEN</a></p></div>"
        });
        div.click(enlarge);
        if($.inArray(textinhalt, testarray)> -1){
            $(div).data('korrekt',true);
            $(div).css('background','rgba(2, 255, 85, 0.16)');
            r_length++;
            raisepoints();
        }else {

            $(div).data('korrekt',false);$(div).css('background','rgba(240, 128, 128, 0.44)');$(div).css('color','black');w_length++;update_balken();}
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
            if($(this).data('korrekt')==true){
                r_length--;
            }else{w_length--;}
            $(".token[id=" + this.id + "]").remove();
        }
    }

    function enlarge() {
        $(".hide[id=" +$(this).attr('id')+"]").toggle();
    };

    function animatearrow(){
        $('#arrow').animate({top: '+79%',opacity: 1},{duration: 1000, easing: "easeOutBounce" });
        $('#arrow').animate({top: '+10%', opacity: 0},0);
    }
};
