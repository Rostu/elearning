$(document).ready(function() {

    $('#info1').show().hover(function() {
        $(this).html('<a target="_blank" href="http://wortschatz.uni-leipzig.de/" class="redlink">Wortschatz-Portal</a>');
    }, function () {
        $(this).find("a:last").remove();
    });

});
$( init ); // function for Veranstaltungen
function init() {

    var id=0;
    var id_speicher = [];
    var testarray = ["Seminar", "Übung", "Vorlesung", "Tutorium", "Kolloquium", "Workshop", "Konzert", "Festival", "Konferenz", "Sportereignis", "Party", "Oper", "Fest", "Tanzkurs", "Demonstration","Theaterstück"];
    var i = 0;
    var infos =[["Theaterstück","das: für das Theater geschriebenes dramatisches Werk"],["Praktikant","der: jemand, der ein Praktikum absolviert"],["Seminar","das: Lehrveranstaltung(an einer Hochschule], bei der die Teilnehmer(innen) unter (wissenschaftlicher]) Anleitung bestimmte Themen erarbeiten. Beispiele: ein Seminar abhalten, durchführen, leiten, ankündigen, belegen"], ["Übung","die: durch häufiges Wiederholen einer bestimmten Handlung erworbene Fertigkeit; praktische Erfahrung"], ["Vorlesung","die: Lehrveranstaltung an einer Universität, Hochschule, bei der ein Dozent, eine Dozentin über ein bestimmtes Thema im Zusammenhang vorträgt"], ["Tutorium","das: meist in einer kleineren Gruppe abgehaltene, von Dozenten oder älteren, graduierten Studierenden geleitete, oft ein Seminar begleitende, ergänzende Übung an einer Hochschule"], ["Kolloqium","das: zeitlich festgesetztes wissenschaftliches Gespräch (zwischen Hochschullehrern und Studierenden)"], ["Workshop","der: Kurs, Veranstaltung o. Ä., in dem bestimmte Themen von den Teilnehmern selbst erarbeitet werden, praktische Übungen durchgeführt werden"], ["Konzert","(das): Aufführung eines oder meist mehrerer Musikwerke in einer öffentlichen Veranstaltung. Beispiele: ein öffentliches Konzert, ein Konzert besuchen, ein Konzert geben, ins Konzert gehen"], ["Festival","(das): mehrere Tage dauernde] kulturelle Großveranstaltung, Festspiele. Beispiele: ein Festival des Films, des Sports; auf dem Festival spielen bekannte Rockgruppen"], ["Konferenz","die: Besprechung mehrerer Personen über fachliche, organisatorische o. ä. Fragen"], ["Sportereignis","(das): ein sportliches Großereignis, bei dem es Zuschauer gibt. Beispiel: Fußballweltmeisterschaft"], ["Party","(die): ein zwangloses privates oder öffentliches Fest, mit Musik und Tanz."], ["Oper","(die): eine Aufführung eines musikalischen Bühnenwerks  mit Darstellung einer Handlung durch Gesang und Instrumentalmusik. Beispiel: in die Oper gehen"], ["Fest","(das): gesellschaftliche Veranstaltung (in glanzvollem Rahmen). Beispiel: ein Sportfest, ein Musikfest"],["Tanzkurs","(der): ein Lehrgang, um das Tanzen zu erlernen. Beispiel: einen Tanzkurs besuchen"], ["Demonstration","(die): im politischen Sinne ist eine in der Öffentlichkeit stattfindende Versammlung mehrerer Personen zum Zwecke der Meinungsäußerung. (Kurzwort: Demo)"], ["Dozent","der: Lehrender an einer Hochschule, Fachhochschule, Volkshochschule u. a. Einrichtungen, besonders in der beruflichen Aus- und Weiterbildung"], ["Professor","der: höchster akademischer Titel (der einem/einer (habilitierten) Hochschullehrer(in), verdienten Wissenschaftler(in), Künstler(in) o. Ä. verliehen wird)"], ["Lehrer","der: jemand, der an einer Schule unterrichtet (Berufsbezeichnung)"], ["Tutor","(Lehrer und) Ratgeber, Betreuer von Studierenden, Schüler(inne)n"], ["Trainer","(der): Dieser Begriff kommt aus dem Kontext Sport. Ein Trainer trainiert Sportler und Sportlerinnen. Ein Beispiel ist Pep Guardiola vom FC Bayern München."], ["Ober","(der): Dieser Begriff kommt aus dem Kontext Gastronomie. Es ist ein veralteter Begriff für Kellner. Ein Ober bedient die Gäste in einem Restaurant."], ["Hausmeister","der: jemand, der vom Hausbesitzer angestellt ist, um in einem größeren Gebäude für die Instandhaltung, die Reinigung, Einhaltung der Ordnung u. Ä. zu sorgen"], ["Sekretärin","der: jemand, der für jemanden, besonders für eine Führungskraft oder eine (leitende) Persönlichkeit des öffentlichen Lebens, die Korrespondenz abwickelt und technisch-organisatorische Aufgaben erledigt"], ["Prof","der: Kurzform für: Professor"], ["HiWi","der: wissenschaftliche Hilfskraft an einer Universität"], ["Chauffeur","(der): Ein Chauffeur fährt berufsmäßig Auto. Zum Beispiel haben Politiker ihre eigenen Chauffeure."], ["Zimmermädchen","(das): Dies ist eine Angestellte zum Beispiel in einem Hotel, die die Zimmer sauber macht und in Ordnung hält."], ["Student","der: jemand, der an einer Hochschule studiert; Studierender"], ["Erstsemesterstudent","der: jemand, der an einer Hochschule studiert; Studierender im ersten Semester"], ["Ersti","der oder die: Erstsemester"], ["Kommilitone","der: jemand, mit dem man zusammen studiert (hat); Studienkollege"], ["Schüler","(der): Ein Schüler ist ein Lerner, der eine Schule besucht. Lerner an Universitäten heißen Studenten"], ["Lerner","der: emand, der (eine Sprache) lernt"], ["Bachelor","der: niedrigster akademischer Grad"], ["Master","der: akademischer Grad"], ["Gymnasiast","(der): Ein Gymnasiast ist eine Person, die ein Gymnasium, also eine bestimmte Schulform, besucht"], ["Abiturient","(der): Ein Abiturient ist ein Schüler, der das Abitur absolviert oder bereits absolviert hat. Es ist also ein Schüler kurz vor, im und nach dem Abitur."], ["Klassenkamerad","(der): Eine Klasse ist eine Institution der Schule. Ein Klassenkamerad ist ein Schüler, der mit einem anderen Schüler die gleiche Klasse besucht."], ["Auszubildender","(der): Ein Auszubildender ist jemand, der gerade eine Berufsausbildung durchläuft. Eine Berufsausbildung ist eine andere Möglichkeit zur Weiterbildung als das Studium an einer Universität. Ein Auszubildender kann auch Lehrling genannt werden."], ["Absolvent","der: jemand, der die vorgeschriebene Ausbildung an einer Schule erfolgreich abgeschlossen hat. Beispiel: die Absolventen der Kunstschule"], ["Lehrling","(der): Ein Lehrling ist jemand, der gerade eine Berufslehre durchläuft. Eine Berufslehre ist eine andere Möglichkeit zur Weiterbildung als das Studium an einer Universität. Ein Lehrling kann auch Auszubildender genannt werden."],["Schulabgänger","(der): Ein Schulabgänger ist eine Person, die von der Schule abgeht. Ein Schulabgänger kann nach seinem Abschluss die Schule verlassen oder seine Schullaufbahn frühzeitig beenden."]];
    var r_length=0;
    var w_length = 0;
    $(".inline_big").each(function() {
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
            raisepoints();
            $(div).data('korrekt',true);
            $(div).css('background','rgba(2, 255, 85, 0.16)');
            r_length++;
            $(".inline_big.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','green');
        }else {
            raisefaults();
            $(div).data('korrekt',false);$(div).css('background','rgba(240, 128, 128, 0.44)');$(div).css('color','black');
            $(".inline_big.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','red');}
        $("#Antwortbox").bind("contextmenu",function(e){return false;});
        $("#Antwortbox").append(div);
        div.mousedown(clear);
        $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
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
            $(".inline_big.ui-draggable[id=" + this.id + "]").draggable("enable").css('color', 'black');
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
    var infos =[["Theaterstück","das: für das Theater geschriebenes dramatisches Werk"],["Praktikant","der: jemand, der ein Praktikum absolviert"],["Seminar","das: Lehrveranstaltung(an einer Hochschule], bei der die Teilnehmer(innen) unter (wissenschaftlicher]) Anleitung bestimmte Themen erarbeiten. Beispiele: ein Seminar abhalten, durchführen, leiten, ankündigen, belegen"], ["Übung","die: durch häufiges Wiederholen einer bestimmten Handlung erworbene Fertigkeit; praktische Erfahrung"], ["Vorlesung","die: Lehrveranstaltung an einer Universität, Hochschule, bei der ein Dozent, eine Dozentin über ein bestimmtes Thema im Zusammenhang vorträgt"], ["Tutorium","das: meist in einer kleineren Gruppe abgehaltene, von Dozenten oder älteren, graduierten Studierenden geleitete, oft ein Seminar begleitende, ergänzende Übung an einer Hochschule"], ["Kolloqium","das: zeitlich festgesetztes wissenschaftliches Gespräch (zwischen Hochschullehrern und Studierenden)"], ["Workshop","der: Kurs, Veranstaltung o. Ä., in dem bestimmte Themen von den Teilnehmern selbst erarbeitet werden, praktische Übungen durchgeführt werden"], ["Konzert","(das): Aufführung eines oder meist mehrerer Musikwerke in einer öffentlichen Veranstaltung. Beispiele: ein öffentliches Konzert, ein Konzert besuchen, ein Konzert geben, ins Konzert gehen"], ["Festival","(das): mehrere Tage dauernde] kulturelle Großveranstaltung, Festspiele. Beispiele: ein Festival des Films, des Sports; auf dem Festival spielen bekannte Rockgruppen"], ["Konferenz","die: Besprechung mehrerer Personen über fachliche, organisatorische o. ä. Fragen"], ["Sportereignis","(das): ein sportliches Großereignis, bei dem es Zuschauer gibt. Beispiel: Fußballweltmeisterschaft"], ["Party","(die): ein zwangloses privates oder öffentliches Fest, mit Musik und Tanz."], ["Oper","(die): eine Aufführung eines musikalischen Bühnenwerks  mit Darstellung einer Handlung durch Gesang und Instrumentalmusik. Beispiel: in die Oper gehen"], ["Fest","(das): gesellschaftliche Veranstaltung (in glanzvollem Rahmen). Beispiel: ein Sportfest, ein Musikfest"],["Tanzkurs","(der): ein Lehrgang, um das Tanzen zu erlernen. Beispiel: einen Tanzkurs besuchen"], ["Demonstration","(die): im politischen Sinne ist eine in der Öffentlichkeit stattfindende Versammlung mehrerer Personen zum Zwecke der Meinungsäußerung. (Kurzwort: Demo)"], ["Dozent","der: Lehrender an einer Hochschule, Fachhochschule, Volkshochschule u. a. Einrichtungen, besonders in der beruflichen Aus- und Weiterbildung"], ["Professor","der: höchster akademischer Titel (der einem/einer (habilitierten) Hochschullehrer(in), verdienten Wissenschaftler(in), Künstler(in) o. Ä. verliehen wird)"], ["Lehrer","der: jemand, der an einer Schule unterrichtet (Berufsbezeichnung)"], ["Tutor","(Lehrer und) Ratgeber, Betreuer von Studierenden, Schüler(inne)n"], ["Trainer","(der): Dieser Begriff kommt aus dem Kontext Sport. Ein Trainer trainiert Sportler und Sportlerinnen. Ein Beispiel ist Pep Guardiola vom FC Bayern München."], ["Ober","(der): Dieser Begriff kommt aus dem Kontext Gastronomie. Es ist ein veralteter Begriff für Kellner. Ein Ober bedient die Gäste in einem Restaurant."], ["Hausmeister","der: jemand, der vom Hausbesitzer angestellt ist, um in einem größeren Gebäude für die Instandhaltung, die Reinigung, Einhaltung der Ordnung u. Ä. zu sorgen"], ["Sekretärin","der: jemand, der für jemanden, besonders für eine Führungskraft oder eine (leitende) Persönlichkeit des öffentlichen Lebens, die Korrespondenz abwickelt und technisch-organisatorische Aufgaben erledigt"], ["Prof","der: Kurzform für: Professor"], ["HiWi","der: wissenschaftliche Hilfskraft an einer Universität"], ["Chauffeur","(der): Ein Chauffeur fährt berufsmäßig Auto. Zum Beispiel haben Politiker ihre eigenen Chauffeure."], ["Zimmermädchen","(das): Dies ist eine Angestellte zum Beispiel in einem Hotel, die die Zimmer sauber macht und in Ordnung hält."], ["Student","der: jemand, der an einer Hochschule studiert; Studierender"], ["Erstsemesterstudent","der: jemand, der an einer Hochschule studiert; Studierender im ersten Semester"], ["Ersti","der oder die: Erstsemester"], ["Kommilitone","der: jemand, mit dem man zusammen studiert (hat); Studienkollege"], ["Schüler","(der): Ein Schüler ist ein Lerner, der eine Schule besucht. Lerner an Universitäten heißen Studenten"], ["Lerner","der: emand, der (eine Sprache) lernt"], ["Bachelor","der: niedrigster akademischer Grad"], ["Master","der: akademischer Grad"], ["Gymnasiast","(der): Ein Gymnasiast ist eine Person, die ein Gymnasium, also eine bestimmte Schulform, besucht"], ["Abiturient","(der): Ein Abiturient ist ein Schüler, der das Abitur absolviert oder bereits absolviert hat. Es ist also ein Schüler kurz vor, im und nach dem Abitur."], ["Klassenkamerad","(der): Eine Klasse ist eine Institution der Schule. Ein Klassenkamerad ist ein Schüler, der mit einem anderen Schüler die gleiche Klasse besucht."], ["Auszubildender","(der): Ein Auszubildender ist jemand, der gerade eine Berufsausbildung durchläuft. Eine Berufsausbildung ist eine andere Möglichkeit zur Weiterbildung als das Studium an einer Universität. Ein Auszubildender kann auch Lehrling genannt werden."], ["Absolvent","der: jemand, der die vorgeschriebene Ausbildung an einer Schule erfolgreich abgeschlossen hat. Beispiel: die Absolventen der Kunstschule"], ["Lehrling","(der): Ein Lehrling ist jemand, der gerade eine Berufslehre durchläuft. Eine Berufslehre ist eine andere Möglichkeit zur Weiterbildung als das Studium an einer Universität. Ein Lehrling kann auch Auszubildender genannt werden."],["Schulabgänger","(der): Ein Schulabgänger ist eine Person, die von der Schule abgeht. Ein Schulabgänger kann nach seinem Abschluss die Schule verlassen oder seine Schullaufbahn frühzeitig beenden."]];
    var r_length=0;
    var w_length = 0;
    $(".inline_big").each(function() {
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
            raisepoints();
            $(div).data('korrekt',true);
            $(div).css('background','rgba(2, 255, 85, 0.16)');
            r_length++;
            $(".inline_big.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','green');
        }else {
            raisefaults();
            $(div).data('korrekt',false);$(div).css('background','rgba(240, 128, 128, 0.44)');$(div).css('color','black');
            $(".inline_big.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','red');}
        $("#Antwortbox_two").bind("contextmenu",function(e){return false;});
        $("#Antwortbox_two").append(div);
        div.mousedown(clear);
        $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
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
            $(".inline_big.ui-draggable[id=" + this.id + "]").draggable("enable").css('color', 'black');
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
    var testarray = ["Student", "Erstsemesterstudent", "Ersti", "Kommilitone", "Schüler", "Lerner", "Bachelor", "Master","Praktikant", "Gymnasiast", "Abiturient", "Klassenkamerad", "Auszubildender", "Absolvent", "Lehrling","Schulabgänger"];
    var i = 0;
    var infos =[["Theaterstück","das: für das Theater geschriebenes dramatisches Werk"],["Praktikant","der: jemand, der ein Praktikum absolviert"],["Seminar","das: Lehrveranstaltung(an einer Hochschule], bei der die Teilnehmer(innen) unter (wissenschaftlicher]) Anleitung bestimmte Themen erarbeiten. Beispiele: ein Seminar abhalten, durchführen, leiten, ankündigen, belegen"], ["Übung","die: durch häufiges Wiederholen einer bestimmten Handlung erworbene Fertigkeit; praktische Erfahrung"], ["Vorlesung","die: Lehrveranstaltung an einer Universität, Hochschule, bei der ein Dozent, eine Dozentin über ein bestimmtes Thema im Zusammenhang vorträgt"], ["Tutorium","das: meist in einer kleineren Gruppe abgehaltene, von Dozenten oder älteren, graduierten Studierenden geleitete, oft ein Seminar begleitende, ergänzende Übung an einer Hochschule"], ["Kolloqium","das: zeitlich festgesetztes wissenschaftliches Gespräch (zwischen Hochschullehrern und Studierenden)"], ["Workshop","der: Kurs, Veranstaltung o. Ä., in dem bestimmte Themen von den Teilnehmern selbst erarbeitet werden, praktische Übungen durchgeführt werden"], ["Konzert","(das): Aufführung eines oder meist mehrerer Musikwerke in einer öffentlichen Veranstaltung. Beispiele: ein öffentliches Konzert, ein Konzert besuchen, ein Konzert geben, ins Konzert gehen"], ["Festival","(das): mehrere Tage dauernde] kulturelle Großveranstaltung, Festspiele. Beispiele: ein Festival des Films, des Sports; auf dem Festival spielen bekannte Rockgruppen"], ["Konferenz","die: Besprechung mehrerer Personen über fachliche, organisatorische o. ä. Fragen"], ["Sportereignis","(das): ein sportliches Großereignis, bei dem es Zuschauer gibt. Beispiel: Fußballweltmeisterschaft"], ["Party","(die): ein zwangloses privates oder öffentliches Fest, mit Musik und Tanz."], ["Oper","(die): eine Aufführung eines musikalischen Bühnenwerks  mit Darstellung einer Handlung durch Gesang und Instrumentalmusik. Beispiel: in die Oper gehen"], ["Fest","(das): gesellschaftliche Veranstaltung (in glanzvollem Rahmen). Beispiel: ein Sportfest, ein Musikfest"],["Tanzkurs","(der): ein Lehrgang, um das Tanzen zu erlernen. Beispiel: einen Tanzkurs besuchen"], ["Demonstration","(die): im politischen Sinne ist eine in der Öffentlichkeit stattfindende Versammlung mehrerer Personen zum Zwecke der Meinungsäußerung. (Kurzwort: Demo)"], ["Dozent","der: Lehrender an einer Hochschule, Fachhochschule, Volkshochschule u. a. Einrichtungen, besonders in der beruflichen Aus- und Weiterbildung"], ["Professor","der: höchster akademischer Titel (der einem/einer (habilitierten) Hochschullehrer(in), verdienten Wissenschaftler(in), Künstler(in) o. Ä. verliehen wird)"], ["Lehrer","der: jemand, der an einer Schule unterrichtet (Berufsbezeichnung)"], ["Tutor","(Lehrer und) Ratgeber, Betreuer von Studierenden, Schüler(inne)n"], ["Trainer","(der): Dieser Begriff kommt aus dem Kontext Sport. Ein Trainer trainiert Sportler und Sportlerinnen. Ein Beispiel ist Pep Guardiola vom FC Bayern München."], ["Ober","(der): Dieser Begriff kommt aus dem Kontext Gastronomie. Es ist ein veralteter Begriff für Kellner. Ein Ober bedient die Gäste in einem Restaurant."], ["Hausmeister","der: jemand, der vom Hausbesitzer angestellt ist, um in einem größeren Gebäude für die Instandhaltung, die Reinigung, Einhaltung der Ordnung u. Ä. zu sorgen"], ["Sekretärin","der: jemand, der für jemanden, besonders für eine Führungskraft oder eine (leitende) Persönlichkeit des öffentlichen Lebens, die Korrespondenz abwickelt und technisch-organisatorische Aufgaben erledigt"], ["Prof","der: Kurzform für: Professor"], ["HiWi","der: wissenschaftliche Hilfskraft an einer Universität"], ["Chauffeur","(der): Ein Chauffeur fährt berufsmäßig Auto. Zum Beispiel haben Politiker ihre eigenen Chauffeure."], ["Zimmermädchen","(das): Dies ist eine Angestellte zum Beispiel in einem Hotel, die die Zimmer sauber macht und in Ordnung hält."], ["Student","der: jemand, der an einer Hochschule studiert; Studierender"], ["Erstsemesterstudent","der: jemand, der an einer Hochschule studiert; Studierender im ersten Semester"], ["Ersti","der oder die: Erstsemester"], ["Kommilitone","der: jemand, mit dem man zusammen studiert (hat); Studienkollege"], ["Schüler","(der): Ein Schüler ist ein Lerner, der eine Schule besucht. Lerner an Universitäten heißen Studenten"], ["Lerner","der: emand, der (eine Sprache) lernt"], ["Bachelor","der: niedrigster akademischer Grad"], ["Master","der: akademischer Grad"], ["Gymnasiast","(der): Ein Gymnasiast ist eine Person, die ein Gymnasium, also eine bestimmte Schulform, besucht"], ["Abiturient","(der): Ein Abiturient ist ein Schüler, der das Abitur absolviert oder bereits absolviert hat. Es ist also ein Schüler kurz vor, im und nach dem Abitur."], ["Klassenkamerad","(der): Eine Klasse ist eine Institution der Schule. Ein Klassenkamerad ist ein Schüler, der mit einem anderen Schüler die gleiche Klasse besucht."], ["Auszubildender","(der): Ein Auszubildender ist jemand, der gerade eine Berufsausbildung durchläuft. Eine Berufsausbildung ist eine andere Möglichkeit zur Weiterbildung als das Studium an einer Universität. Ein Auszubildender kann auch Lehrling genannt werden."], ["Absolvent","der: jemand, der die vorgeschriebene Ausbildung an einer Schule erfolgreich abgeschlossen hat. Beispiel: die Absolventen der Kunstschule"], ["Lehrling","(der): Ein Lehrling ist jemand, der gerade eine Berufslehre durchläuft. Eine Berufslehre ist eine andere Möglichkeit zur Weiterbildung als das Studium an einer Universität. Ein Lehrling kann auch Auszubildender genannt werden."],["Schulabgänger","(der): Ein Schulabgänger ist eine Person, die von der Schule abgeht. Ein Schulabgänger kann nach seinem Abschluss die Schule verlassen oder seine Schullaufbahn frühzeitig beenden."]];
    var r_length=0;
    var w_length = 0;
    $(".inline_big").each(function() {
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
            raisepoints();
            $(div).data('korrekt',true);
            $(div).css('background','rgba(2, 255, 85, 0.16)');
            r_length++;$
            (".inline_big.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','green');
        }else {
            raisefaults();
            $(div).data('korrekt',false);$(div).css('background','rgba(240, 128, 128, 0.44)');$(div).css('color','black');
            $(".inline_big.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','red');}
        $("#Antwortbox_three").bind("contextmenu",function(e){return false;});
        $("#Antwortbox_three").append(div);
        div.mousedown(clear);
        $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
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
            $(".inline_big.ui-draggable[id=" + this.id + "]").draggable("enable").css('color', 'black');
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

/**$(document).on("ready",function(){
    $('#weiter').on("click", function(e) {
        if (countCorrectAnswers() < 34)
        {
            e.preventDefault(); // Stops the browser from opening the next page, using the href attribute on the <a> element
            alert("Bitte ordne mindests 34 Wörter dem richtigen Oberbegriff zu");
        }
    });
});'*/

function countCorrectAnswers()
{
    var correctAnswers = 0;
    $(".token").each(function(){
        if($(this).data("korrekt") === true)
        {
            correctAnswers++;
        }
    });
    return correctAnswers;
}