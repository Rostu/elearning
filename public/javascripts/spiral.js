$( init );
function init() {
    var data = ["Baum","Auto","Schatten","grün","Desoxyribonukleinsäure","Banane","Glücksgefühl","Erbsensalat","Welt","gehen","Fußball","Wasserflasche","Wort","Potential","Mittagessen","Eselsfell","Traumapatient","Wahrscheinlichkeitsdichte","Kartoffelschäler"];
    var div_container =[];
    var id = 1;
    data.forEach(function (entry) {
        var char_array = entry.toUpperCase().split("");

        char_array.forEach(function(character){
            var span = jQuery('<span/>', {
                class: 'char',
                id: id,
                "data-info": entry,
                "revealed": false,
                html: character
            });
            $("#spiral_area h2").append(span);
            id++;
        })

    });

    var angle = 0;
    var height = 0;
    var add_height = 0.5;
    var add_angle = 5;
    var count = 0;
    var x=100;

    $("#spiral_area h2 span").each(function(){
        $(this).css("transform", "rotate("+angle+"deg)");
        $(this).css("margin-top",height);
        var zwischen = parseInt($(this).css("height"))-height;
        $(this).css("height",zwischen);
        height = height + add_height;
        angle = angle+add_angle;
        if(count==65){
            add_height = add_height*1.5;
            add_angle = add_angle+1;
        }
        if(count==x){
            add_angle = add_angle+1.5;
            add_height = add_height*1.1;
            x= x+ x/5;
        }
        if(count==165){add_angle = add_angle+3; add_height = add_height*1.2;}
        if(count==181){add_angle = add_angle+4;}
        count++;
    });

    $('#textbox').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            var input = $('#textbox').val();
            $('#textbox').val("");
            if ((data.indexOf(input) > -1) && ($("#spiral_area h2 span[data-info='" + input + "']")) && ($("#spiral_area h2 span[data-info='" + input + "']").attr("revealed") == "false")) {
                $("#spiral_area h2 span[data-info='" + input + "']").css("color", "#02D64A").attr("revealed","true");
                raisepoints();
            }else{raisefaults();}

        }
    });



}