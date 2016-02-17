$( init );
function init() {
    var id=0;
    var zuFinden = 35;
    var testarray = ["alternativen Energien","Bedarf","Energieressourcen","Ressourcen","Alternative Energien","Energiequellen","unerschöpflich","Solarenergie","Wasserkraft","Windkraft","Photovoltaik","Sonnenenergie","Sonneneinstrahlung","elektrische Energie","Sonnenenergie", "herkömmlichen Energieerzeugung","umweltfreundlicher","staatlich gefördert","Investition","Energiegewinnung","wetter- tages- und jahreszeitenabhängig","Turbinen","umweltschonend","Strom erzeugt","elektrische Energie","umgewandelt","Strömungsenergie","Windströmung","Rotationsenergie","Generator","Umwandlung","energieerzeugender Betriebe","Laufwasserkraftwerke","teuer", "lange Nutzungsphase", "Niederdruckanlagen", "umweltfreundlich", "Speicherkraftwerke", "gespeichert", "Reserve", "Spitzenlastzeiten"];
    var i = 0;


    $(".inline").each(function() {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
    });

    $(".help").click(function () {
        showMessage("Im Text gibt es noch "+ zuFinden+" weitere Wörter. Versuche sie auch noch zu finden! ");
    });

    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });

    function handleDropEvent( event, ui ) {
        var textinhalt = ui.draggable.context.textContent;
        var textinfos ="Mehr Info's hier: ";
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        textinhalt = textinhalt.replace('"','');
        if($.inArray(textinhalt,testarray) < 0){
            textinfos="Das ist leider nicht richtig. Wenn du nicht weißt, was dieses Wort bedeutet, schau doch mal hier nach:";
        }

        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+textinhalt+"</p><div id='"+ui.draggable.attr('id') +"' class='hide'><p>"+textinfos+"</p><a target='_blank' href='http://www.dwds.de/?qu="+textinhalt+"'>DWDS</a></div>"
        });
        div.click(enlarge);
        if($.inArray(textinhalt, testarray)> -1){
            $(div).data('korrekt',true);
            $(div).css('background','#02D64A').css("color","#005E9C");
            zuFinden--;
            raisepoints();
        }else {
            $(div).data('korrekt',false);
            $(div).css('background','#A91211');
            $(div).css('color','#ECECEC');
            raisefaults();
            div.mousedown(clear);

        }
        $("#Antwortbox").bind("contextmenu",function(e){return false;});
        $("#Antwortbox").append(div);

        //$(":button[id="+ui.draggable.attr('id') +"]").click(clear);
        $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
        $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','green');
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
                decreasepoints();
                console.log("Punkte reduziert")
            }else{}
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

    function showMessage(text) {
        var div = jQuery('<div/>', {
            html: "<p>"+text+"</p></div>"
        });
        $('#overlaycontentbox').html(div);
        toggleStartOverlay();
    }


};