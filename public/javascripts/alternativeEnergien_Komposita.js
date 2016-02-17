$(document).ready(function() {
    var Antworten = [['Welt', 'Jahr', 'Zeit', 'Lauf', 'Wasser', 'Kraft', 'Werk', 'Speicher', 'Druck', 'Lage'],['freundlich', 'hängig'],['nieder'],['Um', 'ab', 'an'],['die Energieressource'],['die Windkraft'],['das Rotorblatt'],['die Sonneneinstrahlung','die Sonneenkraft']];
    var Aufgabe1ZuErledigen = 13;
    var Aufgabe2ZuErledigen = 13;

    $('span').click(function () {

        if ($(this).attr("class") == "richtig") {
            $(this).addClass("correct");
            $(this).off("click");
            raisepoints();
            Aufgabe1ZuErledigen--;
            $(this).html($(this).html()+"|");
        }
        else if ($(this).attr("class") == "falsch"){
            $(this).addClass("false");
            $(this).off("click");
            $(this).html($(this).html() + "|");
        }

        if (Aufgabe1ZuErledigen == 0){
            $(".false").each(function() {$(this).html("&nbsp;")});
            $(".hidden1").each(function() {$(this).show();});
        }
    });

    $('span.help').click(function () {
        var helptype = $(this).attr('class').split(' ')[1];
        if ((helptype == 'a1') ||(helptype == 'a4' ) ){
            showMessage("Das Wort besteht aus 3  Bestandteilen. Insgesamt musst du noch "+ Aufgabe1ZuErledigen + " Striche setzen.");
        } else if ((helptype == 'a2') ||(helptype == 'a3' )||(helptype == 'a5' ) ){
            showMessage("Das Wort besteht aus 4  Bestandteilen. Insgesamt musst du noch "+ Aufgabe1ZuErledigen + " Striche setzen.") ;
        } else {
            showMessage("In diesem Feld fehlen dir noch "+ Antworten[parseInt(helptype.slice(-1))-1].length + " Bestandtteile");
        }
    });

    $(function(){
        $(document).on("change","input", function(){
            var eingabe = $(this).val();
            var id = $(this).attr("id");
            if( id < 4){
                aufgabe2(eingabe,id);
            }else{
                aufgabe3(eingabe,id);
            }


        });
    });

    function aufgabe2(eingabe,id){
        var losung=Antworten[id];
        if ($.inArray(eingabe, losung)> -1){

            var div = jQuery('<div/>', {
                class: 'token correct korrekt',
                html: "<p>"+eingabe+"</p></div>"
            });
            switch(parseInt(id)) {
                case 0:
                    $("#Antwortbox1").append(div);
                    break;
                case 1:
                    $("#Antwortbox2").append(div);
                    break;
                case 2:
                    $("#Antwortbox3").append(div);
                    break;
                case 3:
                    $("#Antwortbox4").append(div);
                    break;
            }
            raisepoints();
            Aufgabe2ZuErledigen--;
            Antworten[id].splice( $.inArray(eingabe, Antworten[id]), 1 );
            if (Antworten[id].length == 0){
                document.getElementById(id).disabled = true;
                document.getElementById(id).className += " korrekt";
                var fin = jQuery('<div/>', {
                    class: 'token correct korrekt',
                    html: "<p>"+"&#10004;"+"</p></div>"
                });
                switch(parseInt(id)) {
                    case 0:
                        $("#Antwortbox1").append(fin);
                        break;
                    case 1:
                        $("#Antwortbox2").append(fin);
                        break;
                    case 2:
                        $("#Antwortbox3").append(fin);
                        break;
                    case 3:
                        $("#Antwortbox4").append(fin);
                        break;
                }

            }
            if(Aufgabe2ZuErledigen == 0){
                $(".hidden2").each(function() {$(this).show();});
            }

        }
        else{
            showMessage("Beachte, dass du nur die Bestandteile nimmst, die du in Aufgabe 1 entdeckt hast. Tippe auch jedes Wort nur einmal.");
        }

    }

    function aufgabe3(eingabe,id) {
        var losung=Antworten[id][0];
        var greenID = String(10 + parseInt(id));
        var yellowID = String(20 + parseInt(id));
        var redID = String(30 + parseInt(id));


        if (eingabe == losung){
            document.getElementById(greenID).style.visibility = 'visible';
            document.getElementById(yellowID).style.visibility = 'hidden';
            document.getElementById(redID).style.visibility = 'hidden';
            //Antworten[id].splice( $.inArray(eingabe, Antworten[id]), 1 );
            raisepoints();
            document.getElementById(id).disabled = true;
            document.getElementById(id).className += " korrekt";
        }
        else if((eingabe.length > 4 && getEditDistance(eingabe.slice(4),losung.slice(4)) <= 1) || getEditDistance(eingabe,losung.slice(4)) <= 1){
                if (eingabe.toLowerCase().search(losung.slice(0,3).toLowerCase()) != 0) {showMessage("Du scheinst den Artikel '"+ losung.slice(0,3) + "' vergessen zu haben" ); }
                else{showMessage("Die richtige Schreibweise des Wortes lautet: '"+ losung + "'." );}
                document.getElementById(greenID).style.visibility = 'hidden';
                document.getElementById(yellowID).style.visibility = 'visible';
                document.getElementById(redID).style.visibility = 'hidden';
            }
            else {
                document.getElementById(greenID).style.visibility = 'hidden';
                document.getElementById(yellowID).style.visibility = 'hidden';
                document.getElementById(redID).style.visibility = 'visible';
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
