$(document).ready(function() {
    var Antworten1 = ["die Nutzung", "die Erklärung", "die Erzeugung", "die Bezeichnung", "die Gewinnung", "die Einstrahlung", "die Umwandlung", "die Strömung"];
    var Textstellen = [1,3,3,2,3,2,4,5];
    var Hilfstext = "<h4>Welcher alternativen Energie gibt es?</h4> <p class='p1'>Der heutige Bedarf an Strom wird hauptsächlich durch die Nutzung von Energien gedeckt, die nicht erneuerbar sind. Solche Energieressourcen sind z.B. Kohle, Holz oder Atomenergie. Die Nutzung nicht erneuerbarer Energieformen führt letztendlich zum Versiegen der momentan genutzten Ressourcen. Dabei gibt es genug Möglichkeiten alternative Energien zu verwenden.</p> <p class='p2'>Alternative Energien sind Energiequellen, die nach menschlichen Maßstäben unerschöpflich sind. Zu den heute bestehenden alternativen Energien zählen die Solarenergie, die Wasserkraft und die Windkraft. Eine Form der alternativen Energien ist die Photovoltaik, besser bekannt unter der Bezeichnung Sonnenenergie. Durch Sonneneinstrahlung werden Elektronen freigesetzt und dadurch kann elektrische Energie gewonnen werden.</p><p class='p3'>Sonnenenergie hat viele Vorteile: Im Vergleich zur herkömmlichen Energieerzeugung ist sie wesentlich umweltfreundlicher, sie wird staatlich gefördert und eine Investition in diese Form der Energiegewinnung kann bei der Steuererklärung geltend gemacht werden. Allerdings ist die Sonneneinstrahlung sehr wetter-, tages- und jahreszeitenabhängig.</p><p class='p4'> Windkraft ist eine weitere Möglichkeit, Strom umweltschonend durch alternative Energien zu gewinnen. Hier wird Strom erzeugt, indem die kinetische Energie des Windes in elektrische Energie umgewandelt wird. Große Rotorblätter werden durch die Windströmung bewegt und die Rotationsenergie an einen Generator weitergegeben. Der Generator sorgt schließlich für die Umwandlung.</pclass> <p class='p5'> Eine weitere Form alternativer Energien ist die Wasserkraft. Die Strömungsenergie von fließendem Wasser wird durch Turbinen in elektrische Energie umgewandelt. Bei dieser Form der Energiegewinnung gibt es unterschiedliche Arten energieerzeugender Betriebe. Laufwasserkraftwerke sind zwar teuer, haben aber eine lange Nutzungsphase. Sie werden auch als Niedrigdruckanlagen bezeichnet und sind sehr umweltfreundlich. Speicherkraftwerke haben den Vorteil, dass Wasser gespeichert und als Reserve für die Spitzenlastzeiten genutzt werden kann.</p> ";
    var Antworten2 = ["-ung", "ung"];
    var Antworten3 = ["die","Die"];
    var Antworten4 = ["die Führung", "die Bewegung", "die Zählung", "die Verwendung", "die Förderung"];
    var Aufgabe1zuErledigen = 8;
    var Aufgabe4zuErledigen = 5;

    $(function(){
        $(document).on("change","input", function(){
            switch (parseInt($(this).attr("class"))) {
                case 1:
                    aufgabe1($(this).val(), $(this).attr("name"));
                    break;
                case 2:
                    aufgabe2($(this).val(), $(this).attr("name"));
                    break;
                case 3:
                    aufgabe3($(this).val(), $(this).attr("name"));
                    break;
                case 4:
                    aufgabe4($(this).val(), $(this).attr("name"));
                    break;
            }

        });
    });

    function aufgabe1 (eingabe,name){
        var losung=Antworten1[parseInt(name)-1];
        var greenID = String(110 + parseInt(name));
        var yellowID = String(120 + parseInt(name));
        var redID = String(130 + parseInt(name));
        if (eingabe == losung){
            document.getElementById(greenID).style.visibility = 'visible';
            document.getElementById(yellowID).style.visibility = 'hidden';
            document.getElementById(redID).style.visibility = 'hidden';
            raisepoints();
            document.getElementsByClassName("1")[parseInt(name)-1].disabled = true;
            Aufgabe1zuErledigen--;

        }
        else if((eingabe.length > 4 && getEditDistance(eingabe.slice(4),losung.slice(4)) <= 1) || getEditDistance(eingabe,losung.slice(4)) <= 1)  {
            if (eingabe.toLowerCase().search(losung.slice(0,3)) != 0) {showMessage("Du scheinst den Artikel '"+ losung.slice(0,3) + "' vergessen zu haben" ); }
            else{showMessage("Die richtige Schreibweise des Wortes lautet: '"+ losung + "'." );}
            document.getElementById(greenID).style.visibility = 'hidden';
            document.getElementById(yellowID).style.visibility = 'visible';
            document.getElementById(redID).style.visibility = 'hidden';
        }
        else {
            var xy = Textstellen[parseInt(name)-1];
            var markPos = Hilfstext.search(xy+"'>") + 1;
            var output = [Hilfstext.slice(0, markPos), ' markierung', Hilfstext.slice(markPos)].join('');
            showMessage("<h3>Schau noch einmal in Absatz "+xy+" nach, wie das Substantiv gebildet wird und versuche es erneut.</h3>"+output);
            document.getElementById(greenID).style.visibility = 'hidden';
            document.getElementById(yellowID).style.visibility = 'hidden';
            document.getElementById(redID).style.visibility = 'visible';
            raisefaults();
        }

        if (Aufgabe1zuErledigen == 0) {
            for (i = 0; i < 8; i++) {
                var eingabefeld = document.getElementsByClassName("1")[0];
                var text = eingabefeld.value;
                var cell = eingabefeld.parentNode;
                cell.removeChild(eingabefeld);
                cell.innerHTML = "<div class='geloest'><span class = 'Artikel' >" +text.slice(0,3)+"</span>"+"<span>" +text.slice(3,-3)+"</span>"+"<span class='Endung'>" +text.slice(-3)+"</span></div>";
                $(".hidden1").each(function() {$(this).show();});

            }


        }

    }

    function aufgabe2(eingabe,name){
        if ($.inArray(eingabe, Antworten2)> -1) {
            document.getElementById(211).style.visibility = 'visible';
            document.getElementById(231).style.visibility = 'hidden';
            $('.Endung').attr('style','text-decoration: none');
            document.getElementsByClassName("2")[parseInt(name)-1].disabled = true;
            raisepoints();
            $(".hidden2").each(function() {$(this).show();});
        } else {
            document.getElementById(231).style.visibility = 'visible';
            $('.Endung').attr('style','text-decoration: underline');
            raisefaults();
        }
    }

    function aufgabe3(eingabe,name){
        if ($.inArray(eingabe, Antworten3)> -1) {
            document.getElementById(311).style.visibility = 'visible';
            document.getElementById(331).style.visibility = 'hidden';
            $('.Artikel').attr('style','text-decoration: none');
            document.getElementsByClassName("3")[parseInt(name)-1].disabled = true;
            raisepoints();
            $(".hidden3").each(function() {$(this).show();});
        } else {
            document.getElementById(331).style.visibility = 'visible';
            $('.Artikel').attr('style','text-decoration: underline');
            raisefaults();
        }
    }

    function aufgabe4 (eingabe,name){
        var losung=Antworten4[parseInt(name)-1];
        var greenID = String(410 + parseInt(name));
        var yellowID = String(420 + parseInt(name));
        var redID = String(430 + parseInt(name));
        if (eingabe == losung){
            document.getElementById(greenID).style.visibility = 'visible';
            document.getElementById(yellowID).style.visibility = 'hidden';
            document.getElementById(redID).style.visibility = 'hidden';
            raisepoints();
            document.getElementsByClassName("4")[parseInt(name)-1].disabled = true;
            Aufgabe4zuErledigen--;

        }
        else if((eingabe.length > 4 && getEditDistance(eingabe.slice(4),losung.slice(4)) <= 1) || getEditDistance(eingabe,losung.slice(4)) <= 1)  {
            if (eingabe.toLowerCase().search(losung.slice(0,3)) != 0) {showMessage("Du scheinst den Artikel '"+ losung.slice(0,3) + "' vergessen zu haben" ); }
            else{showMessage("Die richtige Schreibweise des Wortes lautet: '"+ losung + "'." );}
            document.getElementById(greenID).style.visibility = 'hidden';
            document.getElementById(yellowID).style.visibility = 'visible';
            document.getElementById(redID).style.visibility = 'hidden';
        }
        else {
            document.getElementById(greenID).style.visibility = 'hidden';
            document.getElementById(yellowID).style.visibility = 'hidden';
            document.getElementById(redID).style.visibility = 'visible';
            raisefaults();
        }

    }

    function showMessage(text) {
        var div = jQuery('<div/>', {
            html: "<p>"+text+"</p></div>"
        });
        $('#overlaycontentbox').html(div);
        toggleStartOverlay();
    }
});