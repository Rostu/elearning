$(document).ready(function() {
    var  corrects=["0","1","2","3","4","5"];
    var Aufgabe1zuErledigen = 5;
    var semantisch=["hat viele Vorteile", "Im Vergleich", "haben den Vorteil"];
    var konjunktionen=["Allerdings", "zwar", "aber"];

    $('span.candidate').click(function () {
        if((corrects.indexOf($(this).attr("id"))>=0) && (!$(this).hasClass("correct"))&& (!$(this).hasClass("false"))) {
            $(this).addClass("correct");
            makeDrop(this);
            raisepoints();
            Aufgabe1zuErledigen--
            if (Aufgabe1zuErledigen == 0){
                $(".hidden").each(function() {$(this).show();});
            }

        }else if((!$(this).hasClass("correct"))&& (!$(this).hasClass("false"))  ){
            raisefaults();
            $(this).addClass("false");
        }
    });



    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });
    $('#Antwortbox2').droppable( {
        drop: handleDropEvent2
    });

    function handleDropEvent( event, ui ) {
        var textinhalt = ui.draggable.context.textContent;

        textinhalt = textinhalt.replace(',', '');
        textinhalt = textinhalt.replace('.', '');
        textinhalt = textinhalt.replace('"', '');

        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+textinhalt+"</p></div>"
        });
        div.click(enlarge);
        if($.inArray(textinhalt, semantisch) > -1){
            $(div).data('korrekt',true);
            $(div).css('background','#02D64A').css("color","#005E9C");
            raisepoints();
            $("#Antwortbox").bind("contextmenu",function(e){return false;});
            $("#Antwortbox").append("<br>");
            $("#Antwortbox").append(div);
            $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
            $(".candidate.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable");
        }
            //$('#info3').append(textinhalt);



        //$(":button[id="+ui.draggable.attr('id') +"]").click(clear);

    }

    function handleDropEvent2( event, ui ) {
        var textinhalt = ui.draggable.context.textContent;
        var textinfos = "";
        textinhalt = textinhalt.replace(',', '');
        textinhalt = textinhalt.replace('.', '');
        textinhalt = textinhalt.replace('"', '');

        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+textinhalt+"</p></div>"
        });
        div.click(enlarge);
        if($.inArray(textinhalt, konjunktionen) > -1){
            $(div).data('korrekt',true);
            $(div).css('background','#02D64A').css("color","#005E9C");
            raisepoints();
            $("#Antwortbox2").bind("contextmenu",function(e){return false;});
            $("#Antwortbox2").append("<br>");
            $("#Antwortbox2").append(div);
            $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
            $(".candidate.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable");
        }


    };
    function enlarge() {
        $(".hide[id=" +$(this).attr('id')+"]").toggle();
    };
    function clear(ev) {
        if (ev.which == 3) {
            $(".inline.ui-draggable[id=" + this.id + "]").draggable("enable").css('color', 'black');
            if($(this).data('korrekt')==true){
                decreasepoints();
                console.log("Punkte reduziert")
            }else{}
            $(".token[id=" + this.id + "]").remove();
        }
    }
    function myHelper( event ) {
        var textinhalt = $(this).context.innerHTML;
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        //nbspc!!!
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: textinhalt
        });
    }

    function makeDrop(word){
        //$('#info3').append("<p><b>Info: Was sind Fahrzeuge?</b></br></br>Die deutsche Sprache verfügt über eine Vielzahl an Wörtern, die denselben Inhalt auf unter<wbr>schiedliche Weise wiedergeben. Die folgende Aufgabe soll dir eine Vielzahl an Benennungs<wbr>möglichkeiten für den Begriff 'Fahrzeug' aufzeigen.</p>");
        $(word).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
        //$('#info3').append(word.draggable);
    }




});