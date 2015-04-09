$( init );
function init() {

    $('#info3').show();


    var data = [["gestern",0],["Letztens",0],["Kürzlich",0],["Neulich",0],["Vorgestern",0],["Früher",0],["Einst",0],["Damals",0],["vorher",0],["Heute",1],["Momentan",1], ["Gerade",1],["Derzeit",1],["Nun",1],["Heutzutage",1],["aktuell",1],["Morgen",2],["Übermorgen",2],["Bald",2],["Demnächst",2],["Zukünftig",2],["Später",2] ];
    var div_container =[];
    var id = 1;
    data.forEach(function (entry) {
        var char_array = entry[0].toUpperCase().split("");

        char_array.forEach(function(character){
            var span = jQuery('<span/>', {
                class: 'char',
                id: id,
                "data-info": entry[0],
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
            add_height = add_height*1.1;
            add_angle = add_angle+1.5;
        }
        if(count==x){
            add_angle = add_angle+0.5;
            add_height = add_height*1.2;
            x= x+ x/5;
        }
        if(count==165){
            add_angle = add_angle;
            add_height = add_height*1.1;
        }
        if(count==181){
            add_angle = add_angle+2;
        }
        count++;
    });

    $('.textbox').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            var input = $(this).val();
            $(this).val("");
            //console.log(this.id);

            if ((getInd(data, input)> -1) && ($("#spiral_area h2 span[data-info='" + input + "']")) && ($("#spiral_area h2 span[data-info='" + input + "']").attr("revealed") == "false") &&(parseInt(this.id) == data[getInd(data, input)][1])) {
                $("#spiral_area h2 span[data-info='" + input + "']").css("color", "#02D64A").attr("revealed","true");
                $(this).siblings(".antwort").append("<div class='antwort_token'>"+input+"</div>");
                raisepoints();
                removeNoticeIfPresent();
            }else{
                raisefaults();
                if((getInd(data, input) != null ) && !(parseInt(this.id) == data[getInd(data, input)][1])){
                    makeNotice(2,input);
                }

                if((ckeckForSpelling(input)) && (getInd(data, input) == null )){
                    makeNotice(0,input);
                }
                if(!(ckeckForSpelling(input)) && (getInd(data, input) == null )){
                    makeNotice(1,input);
                }

            }
        }
    });
    function getInd(arr, string) {
        for (i = 0; i < arr.length; i++) {
            if (string == arr[i][0]) {
                return i;
            }
        }
        return null;
    }

    function makeNotice(which,wort) {
        removeNoticeIfPresent();
        if(which == 0){
            $('#info3').append("<p>Das Wort: "+wort+" ist leider falsch geschrieben. Schau nochmal genau hin.</p>");
        }
        if(which == 1){
            $('#info3').append("<p>Das Wort ist nicht bekannt</p>");
        }
        if(which == 2){
            $('#info3').append("<p>Das Wort ist schonmal richtig, aber die Zeitform stimmt nicht!</p>");
        }

    }

    function removeNoticeIfPresent() {
        var obj = $('#info3 p');
        if (obj.length) {
            obj.detach();
        }
    }

    function ckeckForSpelling(word) {
        var counter = 0;
        var ret = false;
        data.forEach(function(elem) {
            var testword = elem[0];

            for( i=0; i<testword.length; i++) {
                if( word.charAt(i) == testword.charAt(i)) counter++;
            }

            if((counter/testword.length) >= 0.7){
                //console.log(counter/testword.length);
                ret = true;
            }
            counter = 0;
        });
        return ret;

    }
}