$(init);
function init() {
    //shows the info buttons on the left side
    $('.redstripe').show();
    //add a content div to the second info button; first one is reserved
    /*    jQuery('<div/>', {
     class: 'redtext'
     }).appendTo('#info2');*/

    aktuell = 0;

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
            raisepoints();
            $(this).animate({bottom:'-=0.5em'},"fast");
            $(this).animate({backgroundColor: '#90bf60', color: 'white', fontSize: '+=0.5em'},"slow");
            $(this).animate({bottom:'+=0.5em', fontSize: '-=0.5em'}, "slow", function(){
                animateclear();
                $("#infolink").remove();
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
                        //aktuell = 0;
                    }

                });
                //$("#infolink").remove();
                //animateclear();
            });
        }
        else
        {
            raisefaults();
            $("#infolink").remove();
            animateclear();
            $("#info2").append("<a id='infolink' class='redlink' target='blank' href='http://www.duden.de/suchen/dudenonline/"+$(this).text()+"'>"+$(this).text()+"</a>");
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
    //console.log(shuffle(ar[aktuell].inhalt));
    newdiv();

    function animatearrow_wrong(){
        //$('#info2').children('.redtext').show();
        //$("#info2").animate({width: $("#info2").children('.redlink').width(), paddingLeft: "8px", paddingRight: "20px"}, 100);
        //$("#info2").children().animate({color: "#ffffff"}, 150);
        //$('#info2').animate({width: "90%"}, 300);
        //$('#info2').animate({color: "#ffffff"}, 100);
        $("#info2").animate({width: $("#info2").children('.redlink').width(), paddingRight: "20px"}, 100);
        $("#info2").children().show;
        $("#info2").children().animate({color: "#ffffff"}, 200);
    };

    function animateclear(){
        //$('#info2').children('.redtext').hide();
        //$('#info2').animate({color: "#A91211"}, 100);
        //$('#info2').animate({width: "20px"},100);
        $("#info2").children().animate({color: "#A91211"}, 50);
        $("#info2").children().hide;
        $("#info2").animate({width: "0px", paddingRight: "12px"},100);
    };
    $(document).on("MaxFaultsReached", function() {
       alert('Das kannst du doch besser')
    });
};

