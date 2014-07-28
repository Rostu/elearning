
$( init ); // function for Veranstaltungen
function init() {

    var id=0;
    var id_speicher = [];
    var testarray = ["Seminar", "Übung", "Vorlesung", "Tutorium", "Kolloqium", "Workshop", "Konzert", "Festival", "Konferenz", "Sportereignis", "Party", "Oper", "Fest", "Tanzkurs", "Demonstration"];
    var i = 0;
    var infos =[["Seminar",""], "Übung", "Vorlesung", "Tutorium", "Kolloqium", "Workshop", ["Konzert","(das): Aufführung eines oder meist mehrerer Musikwerke in einer öffentlichen Veranstaltung. Beispiele: ein öffentliches Konzert, ein Konzert besuchen, ein Konzert geben, ins Konzert gehen"], ["Festival","(das): mehrere Tage dauernde] kulturelle Großveranstaltung, Festspiele. Beispiele: ein Festival des Films, des Sports; auf dem Festival spielen bekannte Rockgruppen"], "Konferenz", ["Sportereignis","(das): ein sportliches Großereignis, bei dem es Zuschauer gibt. Beispiel: Fußballweltmeisterschaft"], ["Party","(die): ein zwangloses privates oder öffentliches Fest, mit Musik und Tanz."], ["Oper","(die): eine Aufführung eines musikalischen Bühnenwerks  mit Darstellung einer Handlung durch Gesang und Instrumentalmusik. Beispiel: in die Oper gehen"], ["Fest","(das): gesellschaftliche Veranstaltung (in glanzvollem Rahmen). Beispiel: ein Sportfest, ein Musikfest"],["Tanzkurs","(der): ein Lehrgang, um das Tanzen zu erlernen. Beispiel: einen Tanzkurs besuchen"], ["Demonstration","(die): im politischen Sinne ist eine in der Öffentlichkeit stattfindende Versammlung mehrerer Personen zum Zwecke der Meinungsäußerung. (Kurzwort: Demo)"], "Dozent", "Professor", "Lehrer", "Tutor", ["Trainer","(der): Dieser Begriff kommt aus dem Kontext Sport. Ein Trainer trainiert Sportler und Sportlerinnen. Ein Beispiel ist Pep Guardiola vom FC Bayern München."], ["Ober","(der): Dieser Begriff kommt aus dem Kontext Gastronomie. Es ist ein veralteter Begriff für Kellner. Ein Ober bedient die Gäste in einem Restaurant."], "Hausmeister", "Sekretärin", "Prof", "HiWi", ["Chauffeur","(der): Ein Chauffeur fährt berufsmäßig Auto. Zum Beispiel haben Politiker ihre eigenen Chauffeure."], ["Zimmermädchen","(das): Dies ist eine Angestellte zum Beispiel in einem Hotel, die die Zimmer sauber macht und in Ordnung hält."], "Student", "Erstsemesterstudent", "Ersti", "Kommilitone", ["Schüler","(der): Ein Schüler ist ein Lerner, der eine Schule besucht. Lerner an Universitäten heißen Studenten"], "Lerner", "Bachelor", "Master", ["Gymnasiast","(der): Ein Gymnasiast ist eine Person, die ein Gymnasium, also eine bestimmte Schulform, besucht"], ["Abiturient","(der): Ein Abiturient ist ein Schüler, der das Abitur absolviert oder bereits absolviert hat. Es ist also ein Schüler kurz vor, im und nach dem Abitur."], ["Klassenkamerad","(der): Eine Klasse ist eine Institution der Schule. Ein Klassenkamerad ist ein Schüler, der mit einem anderen Schüler die gleiche Klasse besucht."], ["Auszubildender","(der): Ein Auszubildender ist jemand, der gerade eine Berufsausbildung durchläuft. Eine Berufsausbildung ist eine andere Möglichkeit zur Weiterbildung als das Studium an einer Universität. Ein Auszubildender kann auch Lehrling genannt werden."], "Absolvent", ["Lehrling","(der): Ein Lehrling ist jemand, der gerade eine Berufslehre durchläuft. Eine Berufslehre ist eine andere Möglichkeit zur Weiterbildung als das Studium an einer Universität. Ein Lehrling kann auch Auszubildender genannt werden."],["Schulabgänger","(der): Ein Schulabgänger ist eine Person, die von der Schule abgeht. Ein Schulabgänger kann nach seinem Abschluss die Schule verlassen oder seine Schullaufbahn frühzeitig beenden."]];
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
        }else {$(div).data('korrekt',false);$(div).css('background','rgba(240, 128, 128, 0.44)');$(div).css('color','black');}
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
};



$( init_two );  // function for Personal
function init_two() {

    var id=0;
    var id_speicher = [];
    var testarray = ["Dozent", "Professor", "Lehrer", "Tutor", "Trainer", "Ober", "Hausmeister", "Sekretärin", "Prof", "HiWi", "Chauffeur", "Zimmermädchen"];
    var i = 0;
    var infos =[["Seminar",""], "Übung", "Vorlesung", "Tutorium", "Kolloqium", "Workshop", ["Konzert","(das): Aufführung eines oder meist mehrerer Musikwerke in einer öffentlichen Veranstaltung. Beispiele: ein öffentliches Konzert, ein Konzert besuchen, ein Konzert geben, ins Konzert gehen"], ["Festival","(das): mehrere Tage dauernde] kulturelle Großveranstaltung, Festspiele. Beispiele: ein Festival des Films, des Sports; auf dem Festival spielen bekannte Rockgruppen"], "Konferenz", ["Sportereignis","(das): ein sportliches Großereignis, bei dem es Zuschauer gibt. Beispiel: Fußballweltmeisterschaft"], ["Party","(die): ein zwangloses privates oder öffentliches Fest, mit Musik und Tanz."], ["Oper","(die): eine Aufführung eines musikalischen Bühnenwerks  mit Darstellung einer Handlung durch Gesang und Instrumentalmusik. Beispiel: in die Oper gehen"], ["Fest","(das): gesellschaftliche Veranstaltung (in glanzvollem Rahmen). Beispiel: ein Sportfest, ein Musikfest"],["Tanzkurs","(der): ein Lehrgang, um das Tanzen zu erlernen. Beispiel: einen Tanzkurs besuchen"], ["Demonstration","(die): im politischen Sinne ist eine in der Öffentlichkeit stattfindende Versammlung mehrerer Personen zum Zwecke der Meinungsäußerung. (Kurzwort: Demo)"], "Dozent", "Professor", "Lehrer", "Tutor", ["Trainer","(der): Dieser Begriff kommt aus dem Kontext Sport. Ein Trainer trainiert Sportler und Sportlerinnen. Ein Beispiel ist Pep Guardiola vom FC Bayern München."], ["Ober","(der): Dieser Begriff kommt aus dem Kontext Gastronomie. Es ist ein veralteter Begriff für Kellner. Ein Ober bedient die Gäste in einem Restaurant."], "Hausmeister", "Sekretärin", "Prof", "HiWi", ["Chauffeur","(der): Ein Chauffeur fährt berufsmäßig Auto. Zum Beispiel haben Politiker ihre eigenen Chauffeure."], ["Zimmermädchen","(das): Dies ist eine Angestellte zum Beispiel in einem Hotel, die die Zimmer sauber macht und in Ordnung hält."], "Student", "Erstsemesterstudent", "Ersti", "Kommilitone", ["Schüler","(der): Ein Schüler ist ein Lerner, der eine Schule besucht. Lerner an Universitäten heißen Studenten"], "Lerner", "Bachelor", "Master", ["Gymnasiast","(der): Ein Gymnasiast ist eine Person, die ein Gymnasium, also eine bestimmte Schulform, besucht"], ["Abiturient","(der): Ein Abiturient ist ein Schüler, der das Abitur absolviert oder bereits absolviert hat. Es ist also ein Schüler kurz vor, im und nach dem Abitur."], ["Klassenkamerad","(der): Eine Klasse ist eine Institution der Schule. Ein Klassenkamerad ist ein Schüler, der mit einem anderen Schüler die gleiche Klasse besucht."], ["Auszubildender","(der): Ein Auszubildender ist jemand, der gerade eine Berufsausbildung durchläuft. Eine Berufsausbildung ist eine andere Möglichkeit zur Weiterbildung als das Studium an einer Universität. Ein Auszubildender kann auch Lehrling genannt werden."], "Absolvent", ["Lehrling","(der): Ein Lehrling ist jemand, der gerade eine Berufslehre durchläuft. Eine Berufslehre ist eine andere Möglichkeit zur Weiterbildung als das Studium an einer Universität. Ein Lehrling kann auch Auszubildender genannt werden."],["Schulabgänger","(der): Ein Schulabgänger ist eine Person, die von der Schule abgeht. Ein Schulabgänger kann nach seinem Abschluss die Schule verlassen oder seine Schullaufbahn frühzeitig beenden."]];
    var r_length=0;
    var w_length = 0;
    $(".inline").each(function() {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
    });

    $('#Antwortbox_two').droppable( {
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
        }else {$(div).data('korrekt',false);$(div).css('background','rgba(240, 128, 128, 0.44)');$(div).css('color','black');}
        $("#Antwortbox_two").bind("contextmenu",function(e){return false;});
        $("#Antwortbox_two").append(div);
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
            $(".token[id=" + this.id + "]").remove();
        }
    }

    function enlarge() {
        $(".hide[id=" +$(this).attr('id')+"]").toggle();
    };
};


$( init_three ); // function for Lernende
function init_three() {

    var id=0;
    var id_speicher = [];
    var testarray = ["Student", "Erstsemesterstudent", "Ersti", "Kommilitone", "Schüler", "Lerner", "Bachelor", "Master", "Gymnasiast", "Abiturient", "Klassenkamerad", "Auszubildender", "Absolvent", "Lehrling","Schulabgänger"];
    var i = 0;
    var infos =[["Seminar",""], "Übung", "Vorlesung", "Tutorium", "Kolloqium", "Workshop", ["Konzert","(das): Aufführung eines oder meist mehrerer Musikwerke in einer öffentlichen Veranstaltung. Beispiele: ein öffentliches Konzert, ein Konzert besuchen, ein Konzert geben, ins Konzert gehen"], ["Festival","(das): mehrere Tage dauernde] kulturelle Großveranstaltung, Festspiele. Beispiele: ein Festival des Films, des Sports; auf dem Festival spielen bekannte Rockgruppen"], "Konferenz", ["Sportereignis","(das): ein sportliches Großereignis, bei dem es Zuschauer gibt. Beispiel: Fußballweltmeisterschaft"], ["Party","(die): ein zwangloses privates oder öffentliches Fest, mit Musik und Tanz."], ["Oper","(die): eine Aufführung eines musikalischen Bühnenwerks  mit Darstellung einer Handlung durch Gesang und Instrumentalmusik. Beispiel: in die Oper gehen"], ["Fest","(das): gesellschaftliche Veranstaltung (in glanzvollem Rahmen). Beispiel: ein Sportfest, ein Musikfest"],["Tanzkurs","(der): ein Lehrgang, um das Tanzen zu erlernen. Beispiel: einen Tanzkurs besuchen"], ["Demonstration","(die): im politischen Sinne ist eine in der Öffentlichkeit stattfindende Versammlung mehrerer Personen zum Zwecke der Meinungsäußerung. (Kurzwort: Demo)"], "Dozent", "Professor", "Lehrer", "Tutor", ["Trainer","(der): Dieser Begriff kommt aus dem Kontext Sport. Ein Trainer trainiert Sportler und Sportlerinnen. Ein Beispiel ist Pep Guardiola vom FC Bayern München."], ["Ober","(der): Dieser Begriff kommt aus dem Kontext Gastronomie. Es ist ein veralteter Begriff für Kellner. Ein Ober bedient die Gäste in einem Restaurant."], "Hausmeister", "Sekretärin", "Prof", "HiWi", ["Chauffeur","(der): Ein Chauffeur fährt berufsmäßig Auto. Zum Beispiel haben Politiker ihre eigenen Chauffeure."], ["Zimmermädchen","(das): Dies ist eine Angestellte zum Beispiel in einem Hotel, die die Zimmer sauber macht und in Ordnung hält."], "Student", "Erstsemesterstudent", "Ersti", "Kommilitone", ["Schüler","(der): Ein Schüler ist ein Lerner, der eine Schule besucht. Lerner an Universitäten heißen Studenten"], "Lerner", "Bachelor", "Master", ["Gymnasiast","(der): Ein Gymnasiast ist eine Person, die ein Gymnasium, also eine bestimmte Schulform, besucht"], ["Abiturient","(der): Ein Abiturient ist ein Schüler, der das Abitur absolviert oder bereits absolviert hat. Es ist also ein Schüler kurz vor, im und nach dem Abitur."], ["Klassenkamerad","(der): Eine Klasse ist eine Institution der Schule. Ein Klassenkamerad ist ein Schüler, der mit einem anderen Schüler die gleiche Klasse besucht."], ["Auszubildender","(der): Ein Auszubildender ist jemand, der gerade eine Berufsausbildung durchläuft. Eine Berufsausbildung ist eine andere Möglichkeit zur Weiterbildung als das Studium an einer Universität. Ein Auszubildender kann auch Lehrling genannt werden."], "Absolvent", ["Lehrling","(der): Ein Lehrling ist jemand, der gerade eine Berufslehre durchläuft. Eine Berufslehre ist eine andere Möglichkeit zur Weiterbildung als das Studium an einer Universität. Ein Lehrling kann auch Auszubildender genannt werden."],["Schulabgänger","(der): Ein Schulabgänger ist eine Person, die von der Schule abgeht. Ein Schulabgänger kann nach seinem Abschluss die Schule verlassen oder seine Schullaufbahn frühzeitig beenden."]];
    var r_length=0;
    var w_length = 0;
    $(".inline").each(function() {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
    });

    $('#Antwortbox_three').droppable( {
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
        }else {$(div).data('korrekt',false);$(div).css('background','rgba(240, 128, 128, 0.44)');$(div).css('color','black');w_length++;}
        $("#Antwortbox_three").bind("contextmenu",function(e){return false;});
        $("#Antwortbox_three").append(div);
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
            $(".token[id=" + this.id + "]").remove();
        }
    }

    function enlarge() {
        $(".hide[id=" +$(this).attr('id')+"]").toggle();
    };
};
