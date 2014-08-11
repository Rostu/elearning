$(init);
function init() {
    aktuell = 0;
    var ar = [];
    // Inhalte der Aufgabe erstellen, Notiz an mich, in DB ablegen
    var z_task1_1 = new Object();
    z_task1_1.loesung = ["Mystik","Kunstwissenschaf"];
    z_task1_1.inhalt = ["Wissenschaft", "Lehre", "Forschung","Mystik","Kunstwissenschaft"];
    ar.push(z_task1_1);

    var z_task1_2 = new Object();
    z_task1_2.loesung = ["Umweltverschmutzung", "Solarenergie"];
    z_task1_2.inhalt = ["Handystrahlen", "Elektrosmog", "Elektroenergie", "elektrische Ladung","Umweltverschmutzung", "Solarenergie"];
    ar.push(z_task1_2);

    var z_task1_3 = new Object();
    z_task1_3.loesung = ["Computer"];
    z_task1_3.inhalt = ["Internet", "Netz", "World Wide Web", "Kommunikationsmedium","Computer"];
    ar.push(z_task1_3);

    //klickhandler für die Wortelemente registriert, der funktion check() bei klick aufruft
    $(".wort").click(check);

    //Funktion die überprüft ob das angeklickte Wort richtig oder falsch ist und die entsprechenden animationen auslöst
    function check()
    {
        if ($.inArray($(this).text(),ar[aktuell].loesung) > -1)
        {
            $(this).animate({bottom:'-=0.5em'},"fast");
            $(this).animate({backgroundColor: '#90bf60', color: 'white', fontSize: '+=0.5em'},"slow");
            $(this).animate({bottom:'+=0.5em', fontSize: '-=0.5em'}, "slow", function(){
                $(".wortbox").fadeOut(500, function(){
                    $(this).remove();
                    if (aktuell < ar.length-1){aktuell++;}else{aktuell = 0;}
                    newdiv();
                });
                $("#infolink").remove();
            });
        }
        else
        {
            $("#infolink").remove();
            $("span[id=balken]").append("<a id='infolink' class='buttona' target='blank' href='http://www.duden.de/suchen/dudenonline/"+$(this).text()+"'>"+$(this).text()+"??</a>");
            animatearrow();
            $(this).animate({bottom:'-=0.5em'},"fast");
            $(this).animate({backgroundColor: '#a8383b', color: 'white', fontSize: '+=0.5em'},"slow");
            $(this).effect( "shake", {distance: 5}, 125)
            $(this).animate({backgroundColor: '#fafad2', color: 'black',bottom:'+=0.5em', fontSize: '-=0.5em'}, "slow");
        }
    };

    $("#weiter").click(function(){

        $(".wortbox").remove();
        newdiv();
    });
    function newdiv() {
        var i= 0;
        var div = jQuery('<div/>', {
            class: 'wortbox',
            id: aktuell,
            html: "<h5>Fehlersuche</h5>"
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
    function animatearrow(){
        $('#arrow').animate({top: '+79%',opacity: 1},{duration: 1000, easing: "easeOutBounce" });
        $('#arrow').animate({top: '+10%', opacity: 0},0);
    }


};
