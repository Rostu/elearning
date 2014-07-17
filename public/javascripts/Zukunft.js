
$( init );
function init() {

    var id=0;
    var id_speicher = [];
    var testarray = ["Physiker","Wissenschaft","Forschung","Physik","Star-Physiker","Handystrahlen","Nanotechnik","Internet","Pfeil und Bogen","Metallherstellung","Atome","Mikroskop", "Wissenschaftler","Maschinen","Roboter","Computer","Rechenkapazität","Computerspielkonsolen","Rechenleistung","Großrechner","Smartphone","Chip","Autos","Lenkrad","Film","GPS-Systeme","Radar","NASA","Mondlandung"];
    var i = 0;
    var infos =[["Dinge",""],["Menschen",""],["Tiere",""],["Werkzeug", "Werkzeug ist ein Oberbegriff für Dinge wie Hammer, Pfeile, etc.", ["Apparat", "Arbeitsgerät", "Arbeitsinstrument", "Ausrüstung", "Gerät", "Instrument", "Maschine", "Vorrichtung"]],["Pfeil und Bogen", "Pfeil und Bogen sind frühe technische Erfindung zum Schießen.", ["schießen", "geschossen", "bewaffnet"]],["Schusswaffen", "Schusswaffe ist ein Oberbegriff für Pistolen, Gewehre etc."],["Versorgung", "Versorgung bedeutet, dass etwas  zur Verfügung steht."],["Nahrungsmittel", "Alles Essbare ist ein Nahrungsmittel."],["Hütten", "Hütten sind einfache Häuser, die Menschen auf einer früheren Entwicklungsstufe bauten."],["Lehm", "Lehm ist klebrige Erde, die als Baumaterial verwendet werden kann."],["Stroh", "Stroh besteht aus getrockneten Pflanzenteilen und wurde früher als Baumaterial genutzt."],["Metallherstellung", "Kompositum: Metall ist ein chemischer Stoff. Herstellung bezeichnet den Vorgang etwas Neues zu machen."],["Stabile Gebäude", "Stabile Gebäude sind Häuser, die lange halten."],["Lage", "Hier ist gemeint, dass jemand zu etwas fähig ist."],["Grundbaustoff", "Der Grundbaustoff ist der wichtigste Baustoff für ein Gebäude."],["Atome", "Atome sind chemische Stoffe."],["Produktion", "Produktion bedeutet etwas herzustellen.",["Anfertigung", "Erzeugung", "Fabrikation", "Fertigstellung", "Herstellung", "Schaffung"],["gemeinsame","neue","jährliche","Drosselung der","Rückgang der","Umstellung der","ankurbeln","einstellen","aufnehmen"]],["Materialien", "Materialien sind Gegenstände, die man für etwas braucht.",["zusätzliches Material","ausreichend", "überschüssiges"]],["Mikroskop", "Ein Mikroskop ermöglicht eine vergrößerte Sicht von Dingen."],["Wissenschaftler", "Ein Wissenschaftler ist ein Forscher.", ["Akademiker","Forscher","Geistesarbeiter","Gelehrter","Intellektueller"]],["Maschinen", "Maschinen sind technische Hilfsmittel.",["komplizierte","laufende","landwirtschaftliche","Mensch und Maschine"]],["Roboter" , "m., künstlicher (Maschinen)mensch, Automat, der ferngesteuert oder programmiert bestimmte Tätigkeiten ausführt"],["Computer" , "m., elektronische Datenverarbeitungsanlage, Rechenmaschine"],["Rechenkapazität" , "f. ,(Rechen)-Leistung eines Computers"],["Rechenleistung" , "f., Von einem Rechner erbrachte rechnerische Leistung"],["Computerspielkonsole" , "f., Speziell für Videospiele entwickelter Computer"],["Großrechner" , "m., Rechner, der über eine große Leistung und Speicherkapazität verfügt"],["Smartphone" , "neutr., Mobiltelefon mit Touchscreen und Computer-Funktionalität"],["NASA" , "f., Akronym, Abk. f. National Aeronautic and Space Administration, US-amerikanische Luft- und Raumfahrtgesellschaft"],["Mondlandung" , "f. ,Landung eines Raumfahrzeugs auf dem Mond"],["Chip" , "m., Abkürzung für Microchip. Dünnes, einige Quadratmillimeter großes Plättchen aus Halbleitermaterial, auf dem sich Schaltung und mikroelektronische Schaltelemente befinden"],["Auto" , "neutr., Abkürzung für Automobil"],["Lenkrad" , "neutr., Steuerungsteil des Automobils"],["Fahrer" , "m., 1. jemand, der fährt, ein Fahrzeug führt, 2. jemand, der berufsmäßig ein (Kraft)Fahrzeug (als Transport-, Verkehrsmittel o. Ä.) fährt"],["Film" , "m., 1. [sehr] dünne zusammenhängende Schicht, 2. [zu einer Rolle aufgewickelter] Streifen aus einem mit einer lichtempfindlichen Schicht überzogenen Material für fotografische Aufnahmen oder Filme, 3. mit der Filmkamera aufgenommene Abfolge von bewegten Bildern, Szenen, Handlungsabläufen o. Ä., die zur Vorführung im Kino oder zur Ausstrahlung im Fernsehen bestimmt ist, Filmbranche, -industrie"],["GPS-System" , "neutr., Gerät zum Navigieren und exakte Ortsbestimmung, basierend auf Signalen von Satelliten, GPS ist Abkürzung von Global Positioning System =weltumspannendes Ortungssystem"],["Radar" , "m., neutr., englisch radar, Kurzwort aus: radio detecting and ranging,= Funkermittlung und Entfernungsmessung"],["Verkehr" , "m., 1. Beförderung, Bewegung von Fahrzeugen, Personen, Gütern, Nachrichten auf dafür vorgesehenen Wegen, 2a. Kontakt, Umgang mit jemandem im Hinblick auf Gedankenaustausch, wechselseitige Mitteilung, als gesellschaftliche Beziehung, b. (verhüllend) Geschlechtsverkehr"],["Physiker", "Ein Physiker ist wie der Biologe, Mathematiker und Chemiker ein Naturwissenschaftler. Ein Teil der Physiker bleibt nach Studium und in der universitären Forschung und Lehre. In der Regel sind sie dann auf ein Spezialgebiet orientiert, wie zum Beispiel auf die Elementarteilchenphysik, Atom- und Astrophysik. Viele Physiker sind bei Unternehmen in vielen Branchen tätig, zum Beispiel im Maschinen- oder Fahrzeugbau"],["Star-Physiker", "Zusammensetzung aus Star und Physiker. Der Begriff Star kommt aus dem Englischen und bedeutet so viel wie zu Deutsch Sternchen. Als Star wird eine Person bezeichnet, die große Berühmtheit erlangt hat. Ein Star-Physiker ist folglich ein sehr renommierter Forscher, der schon einen gewissen Bekanntheitsgrad hat und schon einmal in der Medienöffentlichkeit stand"],["Physik", "Naturwissenschaft, die besonders durch experimentelle Erforschung und messende Erfassung die Erscheinungen und Vorgänge, die Grundgesetze der Natur, die Erscheinungs- und Zustandsformen der unbelebten Materie sowie die Eigenschaften der Strahlungen und der Kraftfelder untersucht. Ihr sind verschiedene Disziplinen wie die Astrophysik, Atomphysik, Kernphysik, Laserphysik, Quantenphysik und Geophysik untergeordnet"],["Wissenschaft", "Forschende Tätigkeit auf einem Gebiet, die neue Erkenntnisse schafft"],["Forschung", "Unter Forschung versteht man im Gegensatz zum zufälligen Entdecken die systematische Suche nach neuen Erkenntnissen sowie deren Dokumentation. Ziel sind Lösungen zu wissenschaftlichen Problemstellungen"],["Handystrahlen", "Im Englischen wird das Wort handy nur als Adjektiv für praktisch oder handlich verwendet. Im Deutschen hat sich der Begriff Handy als Bezeichnung für ein Mobiltelefon eingebürgert. Handystrahlen ist ein Ausdruck für die Gesamtheit an elektromagnetischen Wellen, von denen teilweise angenommen wird, dass sie unerwünschte biologische Wirkungen auf Menschen haben könnten"],["Nanotechnik", "Setzt sich aus dem Wort Technik (Forschung und Technologie) und der Vorsilbe nano zusammen, welche auf das griechische nanos (zu deutsch: Zwerg) zurückgeht. Ein Nanometer ist ein zweitausendstel der Breite eines Haares. Die Nanotechnologie umfasst sämtliche Wissenschafts- und Technikzweige, die sich dem nanoskaligen Bereich widmen. Die Strukturgrößen befinden sich üblicherweise im Bereich weniger Atome bis hin zu 100nm. Der Begriff umschließt daher Bereiche der Physik, der Chemie und der Biologie und ist somit keine prinzipiell neue Naturwissenschaft, sondern vielmehr ein Sammelbegriff für alle involvierten Technologien"],["Internet", "Weltweiter Verbund von Computern und Computernetzwerken, in dem spezielle Dienstleistungen, wie E-Mail, World Wide Web, und Telefonie angeboten werden"]];
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