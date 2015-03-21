$( init );
function init() {

    var data = [["Maus","maus.jpg"],["Baum","baum.jpg"],["Auto","auto.jpg"],["Banane","banane.jpg"],["Schatten","schatten.jpg"]];
    var id=1;
    var div_container =[];
    var count = 0;
    var backgroundsave = "";

    //building the cards; push them into an array(div_container),shuffle the array
    data.forEach(function (entry) {
            var div = jQuery('<div/>', {
                class: 'mem_token',
                id: id,
                "data-info": entry[0],
                "revealed": false,
                html: "</br><h2>?</h2>"
            });
            var div2 = jQuery('<div/>', {
                class: 'mem_token',
                id: id,
                "data-info": entry[1],
                "revealed": false,
                html: "</br><h2>?</h2>"
            });
            div_container.push(div);
            div_container.push(div2);
            div_container = shuffle(div_container);
            id++;
    });
    //add the cards to the game :)
    div_container.forEach(function(entry){
            $("#wrapper").append(entry);
    });
    $(document).on('click','.mem_token',function(){
        reveal(this);
    });

    function reveal(sender){
        console.log(sender);
        if (count <= 1) {
            backgroundsave = $(sender).css("background");
            console.log(backgroundsave);
            $(sender).css("background", "white").css("color", "#005E9C");
            $(sender).children('h2').remove();
            $(sender).append("<h2>" + $(sender).attr("data-info") + "</h2>");
            $(sender).attr("revealed","true");
            count++;
        }
        check();
    }
    function check(sender){
        if (count == 2){setTimeout(function(){
            var test = $(".mem_token[revealed='true']");
            if($(test[0]).attr("id") === $(test[1]).attr("id")){
                raisepoints();
                $(".mem_token[revealed='true']").remove();
                count = 0;
            }else {
                $(test).attr("revealed", "false");
                $(test).children('h2').remove();
                $(test).css("background", backgroundsave).css("color", "#005E9C");
                $(test).append("<h2>?</h2>");
                count = 0;
            }},2000);
        }
    }

    //helper function to shuffle an array
    function shuffle(array) {
        var counter = array.length, temp, index;
        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter--;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    };




}