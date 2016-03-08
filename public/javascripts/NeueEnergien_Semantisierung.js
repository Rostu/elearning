$(document).ready(function() {
    $('#info1').show();
    $('#info1').append("<a id='infolink1' class='redlink' href='#'>Das ist ein Info-Link</a>");
    //Here you can use your magic javascript skills
    var Woerter = ["Kohle", "Turbine","Photovoltaik", "Rotorblatt"];

    $(".textToken").draggable({
        helper:"clone",
        containmant:"parent",
        revert:true
    });

    $(".zuordnungsBox").droppable({
        tolerance: "touch",
        hoverClass: "border",
        accept: ".textToken",
        drop: handleDropEvent
    })
    function handleDropEvent(event,ui){
        console.log(this.id);
        console.log(ui.draggable.attr("id"));

        if (this.id === ui.draggable.attr("id")) {
            $(this).append("<div class='Korrekt'>"+ Woerter[this.id-1] +"</div>");
            $(ui.draggable).remove();

            raisepoints();
        }else {
            raisefaults();
            $(ui.draggable).css("background","#A91211");

        }
    }
});



