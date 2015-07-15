$( init );
function init() {
    $('#info3').show();

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
