$(document).ready(function() {
    $('#info1').show();
    $('#info1').append("<a id='infolink1' class='redlink' href='#'>Das ist ein Info-Link</a>");
    //Here you can use your magic javascript skills

    var wordArray = [
        {id:"0",inhalt:["unerschöpflich","unendlich","grenzenlos","unbegrenzt"]},
        {id:"1",inhalt:["alternative","alternativ"]},
        {id:"2",inhalt:["bekannt"]},
        {id:"3",inhalt:["Vorteil","Vorteile"]},
        {id:"4",inhalt:["umweltfreundlich","ökologisch"]},
        {id:"5",inhalt:["umweltschonend","umweltverträglich"]},
        {id:"6",inhalt:["teuer","kostepielig"]}
        ];

    $("#divButton").on("click",function(){
        $("#Teil1").toggle();
        $("#Teil2").toggle();

    });


    var slots = $('.slot');
    slots.on("blur", function () {
        validate(this);
    });

    function validate(self) {
        var input = $(self).val();
        if (input.length == 0) return;
        // try get word div if present
        var id = self.id;
        var validateThis = wordArray[id];

            if (validateThis.inhalt.indexOf(input)> -1 ) {
                raisepoints();
                $(self).removeClass("false");
                $(self).addClass("correct");

                } else {
                    raisefaults();
                    $(self).addClass("false", 500, "swing");
                    $(self).effect("pulsate", "fast");
            }

    }

    function clickHandler(id) {

        switch(id) {
            case "1":
                alert("Das gesuchte Wort findest du in Zeile 6 des Textes.");
                break;
            case "2":
                alert("Das gesuchte Wort findest du in Zeile 1/6 des Textes.");
                break;
            case "3":
                alert("Das gesuchte Wort findest du in Zeile 8 des Textes.");
                break;
            case "4":
                alert("Das gesuchte Wort findest du in Zeile 11/24 des Textes.");
                break;
            case "5":
                alert("Das gesuchte Wort findest du in Zeile 12/24 des Textes.");
                break;
            case "6":
                alert("Das gesuchte Wort findest du in Zeile 15 des Textes.");
                break;
            case "7":
                alert("Das gesuchte Wort findest du in Zeile 23 des Textes.");
                break;
        }

    }
    //Wenn man auf Fragzeichen klickt wird, dann wird diese aufgerufen?
    $(".Zahl").on('click',function(){
        clickHandler(this.id);
        //console.log(this.id); lässt in der Konsole die Ausführung testen
    });
    });