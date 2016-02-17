$( init );
function init() {
    $('#info3').show();
    var r_length = 0;
    var arr = [["Wenn ich was mit meinen Eltern machen kann",1],
        ["Wenn ich jemanden hab, der mich liebt",1],
        ["Wenn meine Kinder mich anlachen und mir sagen, dass sie mich lieben",1],
        ["Wenn meine Tochter morgens aufwacht",1],["Wenn ich mit meiner Familie zusammen sein kann",1],
        ["Mein Enkelkind",1],["Einen besten Freund zu haben",1],
        ["Eine Freundin",1],["Wenn ich mit meinen Freunden unterwegs bin",1],
        ["Wenn man die Augen aufmacht",2],["Spaß am Leben",2],["Als Mensch auftauchen und menschlich sein",2],
        ["Mut zum Weiterleben",2],["Das ich noch lebe",2],["Man hat nur dieses eine Leben und da muss man Beste draus machen",2],
        ["Glück ist einfach zu leben",2],["Eine ordentliche Arbeitsstelle",3],
        ["Wenn man seine Rechnungen bezahlen kann",3],["Erst mal würde ich mich freuen, wenn ich wirklich mal 'nen festen Job bekommen würde",3],
        ["Sechs richtige im Lotto",3],["Geld",3]];

    arr = shuffle(arr);

    arr.forEach(function(elem) {

        var inline_text = elem[0];
        var inline_id = elem[1];

        var div = jQuery('<div/>', {
            class: 'token',
            id: inline_id,
            html: inline_text
        });
        div.draggable({
            containment: '#wrapper',
            revert: true,
            helper: myHelper
        });
        $("#Vorgabe").append(div);
    });
    var wi = $("#Aufgabenbox").width();
    var svgWidth = wi/3;
    var svgHeight = 240;
    var svg1 = d3.select("#Familie").append("svg").attr("width", svgWidth).attr("height", svgHeight);
    var svg2 = d3.select("#Leben").append("svg").attr("width", svgWidth).attr("height", svgHeight);
    var svg3 = d3.select("#Geld").append("svg").attr("width", svgWidth).attr("height", svgHeight);
    svg1.append("circle").attr("id","c1").attr("cx", svgWidth / 2).attr("cy", svgHeight / 2).attr("r", svgHeight / 2 ).attr("style","fill: rgba(243, 18, 0, 0.19)");
    svg2.append("circle").attr("id","c2").attr("cx", svgWidth / 2).attr("cy", svgHeight / 2).attr("r", svgHeight / 2 ).attr("style","fill: rgba(79, 226, 122, 0.44)");
    svg3.append("circle").attr("id","c3").attr("cx", svgWidth / 2).attr("cy", svgHeight / 2).attr("r", svgHeight / 2 ).attr("style","fill: rgba(250, 234, 122, 0.34)");
    svg1.append("circle").attr("id","r1").attr("cx", svgWidth / 2).attr("cy", svgHeight / 2).attr("r", 0 ).attr("style","fill: rgba(243, 18, 0, 0.30)");
    svg2.append("circle").attr("id","r2").attr("cx", svgWidth / 2).attr("cy", svgHeight / 2).attr("r", 0 ).attr("style","fill: rgba(79, 226, 122, 0.70)");
    svg3.append("circle").attr("id","r3").attr("cx", svgWidth / 2).attr("cy", svgHeight / 2).attr("r", 0 ).attr("style","fill: rgba(250, 234, 122, 0.70)");
    var circle = d3.selectAll("circle");

    $(".Antwort").droppable({
        hoverClass: "ui-state-hover",
        drop: handleDropEvent
    });
    function handleDropEvent( event, ui ) {
        //test if correct token dropped on correct box (attr token id and attr .Antwort int)
        //if correct
        if(ui.draggable.attr("id") == $(this).attr("int"))
        {
            switch (ui.draggable.attr("id")) {
                case "1":
                    if(parseInt($("#r1").attr("r"))>100.0){
                        $("#r1").attr("r",120);
                    }else{
                        $("#r1").attr("r",parseInt($("#r1").attr("r"))+13);
                    }
                    break;
                case "2":
                    if(parseInt($("#r2").attr("r"))>99.0){
                        $("#r2").attr("r",120);
                    }else{
                        $("#r2").attr("r",parseInt($("#r2").attr("r"))+17);
                    }
                    break;
                case "3":
                    if(parseInt($("#r3").attr("r"))>95.0){
                        $("#r3").attr("r",120);
                    }else{
                        $("#r3").attr("r",parseInt($("#r3").attr("r"))+24);
                    }
                    break;
            }
            removeNoticeIfPresent();
            //change the color of the token and their border to green
            ui.draggable.css("color", "#02D64A");
            ui.draggable.css("border", "solid 1px #02D64A");
            //delete the helper and remove the draggable option from the token
            ui.helper.fadeOut();
            ui.draggable.draggable( 'disable' );
            //raise points
            raisepoints();
            //if not correct
        }else{
            //raise faults change color of token to red
            raisefaults();
            ui.draggable.css("color", "#A91211");
            ui.draggable.css("border", "solid 1px #A91211");
            removeNoticeIfPresent();
            $('#info3').append("<p>Das war nicht richtig. Probier es ruhig noch einmal.</p>");
        }
    };
    //$("#r1").attr("r",45);

    function myHelper( event ) {
        var text = $(this).text();
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: text
        });
    };
    $(window).resize(function() {
        updateContainer();
    });
    function updateContainer(){
        var wi = $("#Aufgabenbox").width()+20;
        $('svg').width(wi/3);
        circle.transition().attr("cx",  $('svg').width()/2);
    };
};
