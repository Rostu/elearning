$( init );
function init() {
    $('#info3').show();
    $('#info1').show();
    $("#info1").append("<a id='infolink1' class='redlink' href='#'>Hilfe??</a>");
    var wordList = [["ordentlich",2],
        ["Freund",1,"Glück ist, 'nen besten Freund zu haben."],
        ["zufrieden",2,"Glück ist, wenn man zufrieden mit sich selber ist."],
        ["freuen",4,"Erst mal würde ich mich freuen, wenn ich wirklich mal einen festen Job bekommen würde."],
        ["Kinder",1,"Wenn meine Kinder mich anlachen und mir sagen, dass sie mich lieben."],
        ["glücklich",2,"Was macht mich glücklich?"],
        ["Mut",1,"Glück ist, Mut zum Weiterleben."],
        ["Beste",1,"Jochen war der Beste beim Wettschwimmen"],
        ["immer",3, "Glück ist wenn man immer, das Lachen nicht verliert." ],
        ["lieben",4 ,"Wenn meine Kinder mich anlachen und mir sagen, dass sie mich lieben."],
        ["Leben",1,"Spaß am Leben."],
        ["man",3,"Wenn man die Augen aufmacht." ],
        ["kaum",3,"Ich glaube Glück kann man kaum beschreiben." ],
        ["Glück",1 ,"Ich glaube Glück kann man kaum beschreiben."],
        ["frei",2,"Glück ist wenn man frei ist." ],
        ["Spaß",1,"Spaß am Leben." ],
        ["scheinen",4,"Glück ist, wenn die Sonne scheint" ],
        ["Zufriedenheit",1, "Glück ist Zufriedenheit"],
        ["mal",3 ,"Man kann ja nur glücklich sein, wenn man mal unglücklich gewesen ist."],
        ["Geld",1,"Glück hängt ganz bestimmt nicht von Geld ab." ],
        ["auftauchen",4,"Als Mensch auftauchen und menschlich sein." ],
        ["beste",2,"'Nen besten Freund zu haben." ],
        ["hier",3,"Glück ist hier zu leben" ],
        ["brauchen",4,"Zu wissen, dass ich gebraucht werde." ],
        ["leben",4,"Glück ist hier zu leben"  ],
        ["da",3,"Man hat nur dieses ein Leben und da muss man das Beste daraus machen." ],
        ["Jubeln",1,"Das kommt von ganz unten rauf und dann ist das so ein Jubeln." ],
        ["menschlich",2,"Als Mensch auftauchen und menschlich sein." ],
        ["Arbeitsstelle",1,"Glück ist 'ne ordentliche Arbeitsstelle." ],
        ["bezahlen",4,"Glück ist, wenn man seine Rechnungen bezahlen kann." ],
        ["aufmachen",4,"Glück ist, wenn man die Augen aufmacht." ],
        ["Balance",1,"Glück ist die Balance zwischen Kopf und Bauch." ],
        ["Führerschein",1 ,"Glück ist, dass ich meinen Führerschein erhalten habe."],
        ["anlachen",4,"Wenn meine Kinder mich anlachen und mir sagen, dass sie mich lieben." ],
        ["Aufwachen",1,"Glück ist tatsächlich morgens nach dem Aufwachen - neben Ihm."],
        ["Frieden",1,"Frieden auf der Welt." ],
        ["bestimmt",2,"Glück hängt ganz bestimmt nicht von Geld ab." ],
        ["Familie",1,"Glück ist, wenn ich mit meiner Familie zusammen sein kann." ],
        ["Weiterleben",1,"Mut zum Weiterleben." ],
        ["ganz",2,"Glück hängt ganz bestimmt nicht von Geld ab." ],
        ["fest",2 ,"Erst mal würde ich mich freuen, wenn ich wirklich mal 'nen festen Job bekommen würde."],
        ["bekommen",4,"Erst mal würde ich mich freuen, wenn ich wirklich mal 'nen festen Job bekommen würde." ],
        ["Mensch",1,"Als Mensch auftauchen und menschlich sein." ],
        ["Lachen",1 , "Glück ist wenn man immer, das Lachen nicht verliert."],
        ["morgens",3,"Glück ist tatsächlich morgens nach dem Aufwachen - neben Ihm." ],
        ["unterwegs",3,"Wenn ich glücklich bin, bin ich oft unterwegs" ],
        ["festhalten",4,"Wenn man sich wünscht, den Moment festhalten zu können." ],
        ["unglücklich",2,"Man kann ja nur glücklich sein, wenn man mal unglücklich gewesen ist." ],
        ["Hochzeit",1 ,"Glück ist, 'ne schöne Hochzeit"],
        ["schön",2,"Glück ist, 'ne schöne Hochzeit"],
        ["zusammen",3,"Glück ist, wenn ich mit meiner Familie zusammen sein kann."],
        ["erst",3,"Erst mal würde ich mich freuen, wenn ich wirklich mal 'nen festen Job bekommen würde." ]];

    $('#infolink1').on('click',function(){
        toggleStartOverlay();
    });
    var actualColor = "#668ED8";

    //since svg Dom is a bit trixky to handle with jquery we have to pre select some element with plain javaScript
    window.onload=function() {
        // Get the Object by ID
        var a = document.getElementById("klee-svg");
        // Get the SVG document inside the Object tag
        var svgDoc = a.contentDocument;
        // Get one of the SVG items by ID;
        var svgItem = svgDoc.getElementById("Freund");
        var allItems = svgDoc.getElementsByClassName("form");
        //set the fill color of all svg elements and add click-event listener
        for (i = 0; i < allItems.length; ++i) {
            allItems[i].setAttribute("fill", "lightgrey");
            allItems[i].setAttribute("correct", "false");
            allItems[i].setAttribute("colored", "false");
            $(allItems[i]).on("click", leafClick);
        }

        //onclick function to change the leaf color
        function leafClick(){
            this.setAttribute("fill", actualColor);
            $(this).attr("colored","true");
            check(this);
        }

        function check(obj){
            var inList = false;
            var actualWordType = 0;
            var coloredCheck = 0;
            switch(actualColor) {
                case "#668ED8":
                    actualWordType = 1;
                    break;
                case "#BCE498":
                    actualWordType = 2;
                    break;
                case "#FFFFAA":
                    actualWordType = 3;
                    break;
                case "#B176A9":
                    actualWordType = 4;
                    break;
            }

            for (i = 0; i < wordList.length; ++i) {
                if((wordList[i][0] == $(obj).attr("id")) && (wordList[i][1] == actualWordType ) ){
                    $(obj).attr("correct","true");
                    inList = true;
                    break;
                }
            }
            if(inList == false){
                $(obj).attr("correct","false");
            }
            allItems = svgDoc.getElementsByClassName("form");
            for (i = 0; i < allItems.length; ++i) {
               if($(allItems[i]).attr("colored") == "true"){
                   coloredCheck++;
               }
            }
            console.log(coloredCheck + " " + allItems.length)
            if(allItems.length == coloredCheck){
                var countCorrect = 0;
                for (i = 0; i < allItems.length; ++i) {
                    if($(allItems[i]).attr("correct") == "true"){
                        $(allItems[i]).unbind( "click" );
                        countCorrect++;
                    }else {
                        allItems[i].setAttribute("fill", "lightgrey");
                        allItems[i].setAttribute("correct", "false");
                        allItems[i].setAttribute("colored", "false");
                        removeNoticeIfPresent();
                        $('#info3').append("<p>Da war noch nicht alles richtig, Probier es nochmal.</p>");
                    }
                }
                setpoints(countCorrect);
            }
        }
    };

    $(".color").on("click", colorPick);
    //enables color choosing
    function colorPick(){
        $(".selected").removeClass( "selected" );
        $(this).addClass("selected");
        actualColor = $(this).attr("colorCode")
    }
}
