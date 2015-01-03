$(init);
function init() {
    aktuell = 0;
    var fehlversuche = 10;
    var ar = [];
    // Inhalte der Aufgabe erstellen, Notiz an mich, in DB ablegen
    var z_task1_1 = new Object();
    z_task1_1.loesung = ["Mystik","Kunstwissenschaf"];
    z_task1_1.inhalt = ["Wissenschaft", "Lehre", "Forschung","Mystik","Kunstwissenschaft"];
    z_task1_1.vorgabe = "Wissenschaft";
    ar.push(z_task1_1);

    var z_task1_2 = new Object();
    z_task1_2.loesung = ["Umweltverschmutzung", "Solarenergie"];
    z_task1_2.inhalt = ["Handystrahlen", "Elektrosmog", "Elektroenergie", "elektrische Ladung","Umweltverschmutzung", "Solarenergie"];
    z_task1_2.vorgabe = "Handystrahlen";
    ar.push(z_task1_2);

    var z_task1_3 = new Object();
    z_task1_3.loesung = ["Computer"];
    z_task1_3.inhalt = ["Internet", "Netz", "World Wide Web", "Kommunikationsmedium","Computer"];
    z_task1_3.vorgabe = "Internet";
    ar.push(z_task1_3);

    var z_task1_4 = new Object();
    z_task1_4.loesung = ["Produktion","Industrie"];
    z_task1_4.inhalt = ["Produktion", "Nanotechnologie", "Wissenschaft und Technologie im Nanometerbereich",  "Industrie"];
    z_task1_4.vorgabe = "Nanotechnik";
    ar.push(z_task1_4);

    var z_task1_5 = new Object();
    z_task1_5.loesung = ["Umstellung","Verpackung"];
    z_task1_5.inhalt = ["Anfertigung", "Umstellung", "Erzeugung", "Fabrikation", "Verpackung", "Fertigstellung", "Herstellung", "Schaffung"];
    z_task1_5.vorgabe = "Produktion";
    ar.push(z_task1_5);

    var z_task1_6 = new Object();
    z_task1_6.loesung = ["Arbeitsweise"];
    z_task1_6.inhalt = ["Apparat", "Arbeitsgerät", "Arbeitsweise", "Ausrüstung", "Gerät", "Instrument", "Maschine", "Vorrichtung"];
    z_task1_6.vorgabe = "Werkzeug";
    ar.push(z_task1_6);

    //klickhandler für die Wortelemente registriert, der funktion check() bei klick aufruft
    $(".wort").click(check);

    //Funktion die überprüft ob das angeklickte Wort richtig oder falsch ist und die entsprechenden Animationen auslöst
    function check()
    {
        if ($.inArray($(this).text(),ar[aktuell].loesung) > -1)
        {
            $(this).animate({bottom:'-=0.5em'},"fast");
            $(this).animate({backgroundColor: '#90bf60', color: 'white', fontSize: '+=0.5em'},"slow");
            $(this).animate({bottom:'+=0.5em', fontSize: '-=0.5em'}, "slow", function(){
                $(".wortbox").fadeOut(500, function(){
                    $(this).remove();
                    if (aktuell < ar.length-1)
                    {
                        aktuell++;
                        newdiv();
                    }
                    else
                    {
                        $("span[id=weiter]").append("<a id='weiterlink' class='buttona' href='zukunft_task2'>WEITER</a>");
                        animatearrow_weiter();
                        //aktuell = 0;
                    }

                });
                $("#infolink").remove();
            });
        }
        else
        {
            if (fehlversuche > 0) {
                fehlversuche--;
                $("#fehler").remove();
                $("span[id=balken]").append("<a id='fehler' class='buttona'>Fehlversuche: " + fehlversuche + "</a>");
                $("#fehler").animate({color: '#a8383b'},"fast");
                if (fehlversuche != 0) {
                    $("#fehler").animate({color: 'white'}, "fast");
                }
            }
            $("#infolink").remove();
            $("span[id=hilfe]").append("<a id='infolink' class='buttona' target='blank' href='http://www.duden.de/suchen/dudenonline/"+$(this).text()+"'>"+$(this).text()+"??</a>");
            animatearrow_wrong();
            $(this).animate({bottom:'-=0.5em'},"fast");
            $(this).animate({backgroundColor: '#a8383b', color: 'white', fontSize: '+=0.5em'},"slow");
            $(this).effect( "shake", {distance: 5}, 125)
            $(this).animate({backgroundColor: '#005E9C', color: 'white',bottom:'+=0.5em', fontSize: '-=0.5em'}, "slow");
        }
    };

    function newdiv() {
        var i= 0;
        var div = jQuery('<div/>', {
            class: 'wortbox',
            id: aktuell,
            html: "<h5>"+ar[aktuell].vorgabe+"</h5>"
        });
        $("#wrapper").append(div);
        var arr = shuffle(ar[aktuell].inhalt);
        arr.forEach(function(wort){
            var wortdiv = jQuery('<div/>', {
                class: 'wort',
                id: i,
                html: wort
            });
            i++;
            div.append(wortdiv);
        });
        i=0;

        $(".wort").click(check);
    };

    function shuffle(array) {
        var counter = array.length, temp, index;
        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter--;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    };
    console.log(shuffle(ar[aktuell].inhalt));
    newdiv();
    function animatearrow_wrong(){
        $('#arrow_wrong').animate({top: '+79%',opacity: 1},{duration: 1000, easing: "easeOutBounce" });
        $('#arrow_wrong').animate({top: '+10%', opacity: 0},0);
    }
    function animatearrow_weiter(){
        $('#arrow_weiter').animate({top: '+79%',opacity: 1},{duration: 1000, easing: "easeOutBounce" });
        $('#arrow_weiter').animate({top: '+10%', opacity: 0},0);
    }


};
