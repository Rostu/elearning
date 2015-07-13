$( init );
function init() {
    $('#info1').show();
    $("#info1").append("<a id='infolink1' class='redlink' href='#'>Hilfe??</a>");

    $('#infolink1').on('click',function(){
        toggleStartOverlay();
    });

}

