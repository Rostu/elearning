$( init );
function init() {
    $('#info3').show();
    var actualColor = "#00aa00";

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
            $(allItems[i]).on("click", leafClick);
        }

    };

    function leafClick(){
        this.setAttribute("fill", actualColor);
    }

    $(".color").on("click", colorPick);

    function colorPick(){
        $(".selected").removeClass( "selected" );
        $(this).addClass("selected");
        actualColor = $(this).attr("colorCode")
    }


}
