$(document).ready(function() {
    	$('#info3').show();
    	$('#info3').append("<p>Hier könnte Ihre Info stehen für einen kleinen Aufpreis </p>");
	//Here you can use your magic javascript skills
    var Woerter = ["Kohle", "Turbine","Photovoltaik", "Rotorblatt"];
    $(".textToken").draggable({
        helper:"clone",
        containmant:"parent",
        revert:true
    });

    $(".zuordnungsBox").droppable({
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
            /*$(".subTextBox").remove();*/
            raisepoints();
        }else {
            $(ui.draggable).css("background","#A91211");

        }
    }
	});


