
$( init );
function init() {

    var id=0;
    var id_speicher = [];
    var testarray = ["Physiker","Wissenschaft","Forschung","Physik","Star-Physiker","Handystrahlen","Nanotechnik","Internet","Pfeil und Bogen","Metallherstellung","Atome","Mikroskop", "Wissenschaftler","Maschinen","Roboter","Computer","Rechenkapazität","Computerspielkonsolen","Rechenleistung","Großrechner","Smartphone","Chip","Autos","Lenkrad","Film","GPS-Systeme","Radar"];
    var i = 0;
    var infos =[["Dinge",""],["Menschen",""],["Tiere",""],["Werkzeug", "Werkzeug ist ein Oberbegriff für Dinge wie Hammer, Pfeile, etc.", ["Apparat", "Arbeitsgerät", "Arbeitsinstrument", "Ausrüstung", "Gerät", "Instrument", "Maschine", "Vorrichtung"]],["Pfeil und Bogen", "Pfeil und Bogen sind frühe technische Erfindung zum Schießen.", ["schießen", "geschossen", "bewaffnet"]],["Schusswaffen", "Schusswaffe ist ein Oberbegriff für Pistolen, Gewehre etc."],["Versorgung", "Versorgung bedeutet, dass etwas  zur Verfügung steht."],["Nahrungsmittel", "Alles Essbare ist ein Nahrungsmittel."],["Hütten", "Hütten sind einfache Häuser, die Menschen auf einer früheren Entwicklungsstufe bauten."],["Lehm", "Lehm ist klebrige Erde, die als Baumaterial verwendet werden kann."],["Stroh", "Stroh besteht aus getrockneten Pflanzenteilen und wurde früher als Baumaterial genutzt."],["Metallherstellung", "Kompositum: Metall ist ein chemischer Stoff. Herstellung bezeichnet den Vorgang etwas Neues zu machen."],["Stabile Gebäude", "Stabile Gebäude sind Häuser, die lange halten."],["Lage", "Hier ist gemeint, dass jemand zu etwas fähig ist."],["Grundbaustoff", "Der Grundbaustoff ist der wichtigste Baustoff für ein Gebäude."],["Atome", "Atome sind chemische Stoffe."],["Produktion", "Produktion bedeutet etwas herzustellen.",["Anfertigung", "Erzeugung", "Fabrikation", "Fertigstellung", "Herstellung", "Schaffung"],["gemeinsame","neue","jährliche","Drosselung der","Rückgang der","Umstellung der","ankurbeln","einstellen","aufnehmen"]],["Materialien", "Materialien sind Gegenstände, die man für etwas braucht.",["zusätzliches Material","ausreichend", "überschüssiges"]],["Mikroskop", "Ein Mikroskop ermöglicht eine vergrößerte Sicht von Dingen."],["Wissenschaftler", "Ein Wissenschaftler ist ein Forscher.", ["Akademiker","Forscher","Geistesarbeiter","Gelehrter","Intellektueller"]],["Maschinen", "Maschinen sind technische Hilfsmittel.",["komplizierte","laufende","landwirtschaftliche","Mensch und Maschine"]]];
    var r_length=0;
    var w_length = 0;
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
        for(i=0;i<infos.length;i++){
            if(infos[i][0] === textinhalt)
            {textinfos = infos[i][1]};
        }
        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+textinhalt+"</p><div id='"+ui.draggable.attr('id') +"' class='hide'><p>"+textinfos+"</p><a target='_blank' href='http://www.duden.de/suchen/dudenonline/"+ui.draggable.context.textContent+"'>INFO-Link</a></div>"
        });
        div.click(enlarge);
        if($.inArray(textinhalt, testarray)> -1){
            $(div).data('korrekt',true);
            $(div).css('background','rgba(2, 255, 85, 0.16)');
            r_length++;
            update_balken();
        }else {$(div).data('korrekt',false);$(div).css('background','rgba(240, 128, 128, 0.44)');$(div).css('color','black');w_length++;update_balken();}
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

    function update_balken(){
        //console.log($('#balken_innen1'));
        $('#balken_innen1').css('width',r_length*8);
        $('#balken_innen2').css('width',w_length*4);
    }
    function clear(ev) {
        if (ev.which == 3) {
            $(".inline.ui-draggable[id=" + this.id + "]").draggable("enable").css('color', 'black');
            if($(this).data('korrekt')==true){
                r_length--;
            }else{w_length--;}
            update_balken();
            $(".token[id=" + this.id + "]").remove();
        }
    }

    function enlarge() {
            $(".hide[id=" +$(this).attr('id')+"]").toggle();
    };
};