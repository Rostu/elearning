/**
 * Created by Ich on 31.03.2015.
 */
$(document).ready(function() {
    $('#info3').show();

    var data = [["vor ein paar Monaten",-1],["letzte Woche",-1],["eine Minute später",1],["kurz darauf",1],["in der folgenden halben Stunde",1]];
    var display_data = data.slice(0);
    display_data = shuffle(display_data);
    //defines how many droppable boxes will be there (needs to be a even number)
    var slices = 10;
    var middle = slices/2;
    //defines how many tokens are on the left and the right side, respectively past or future.
    //this will be important later when we check if the answer is correct.
    var left_count = 0;
    var right_count = 0;
    var order = [];


    //For each element in display data add a div to the Token_area where the html content is the element.
    //Also make those divs draggable.
    display_data.forEach(function(elem){
        var div = jQuery('<div/>', {
            class: 'token',
            id: data.indexOf(elem),
            html: elem[0]
        });
        $(div).appendTo('#Token_area' ).draggable({
            containment: '#wrapper',
            drag: handleDragEvent,
            revert: true});
        if(elem[1] == -1){
            left_count++;
        }else if(elem[1] == 1){right_count++;}
    });

//build the .fragment divs and make them droppable;
    for(j=1;j<=slices;j++){
        var div = jQuery('<div/>', {
            class: 'fragment'
        });
        div.droppable( {
            drop: handleDropEvent,
            hoverClass: "ui-state-hover"
        });
        $("#zeit").append(div);
    }

//function to handle the drop event
    function handleDropEvent( event, ui ) {
        if($(".falsch").length < 1){
            $(this).append("<p>"+ui.draggable.context.textContent+"</p>");
            $(this).css("height", "35px");
            $(this).toggleClass( "dropped" );
            $(this).attr('id',ui.draggable.context.id);
            //$(this).click(clear());
            $(".token[id='"+ui.draggable.context.id+"']").remove();
            check();
        }else{
            $('#info3').append("<p>Du musst zuerst die falschen entfernen!</p>");
        }

    }

    function clear(){
        console.log("clear Funktion aufgerufen")
        var div = jQuery('<div/>', {
            class: 'token',
            id: $(this).attr("id"),
            html: $(this).children("p").text()
        });
        $(div).appendTo('#Token_area' ).draggable({
            containment: '#wrapper',
            drag: handleDragEvent,
            revert: true});
        $(this).toggleClass( "dropped" );
        $(this).unbind( "click" );
        $(this).removeAttr( "id" );
        $(this).empty();
        $(this).toggleClass( "falsch" );
        removeNoticeIfPresent();

    }

    function handleDragEvent( event, ui ) {

    }

    function check(){

        $(".dropped").each(function() {
            //check if the item is on the correct side respectively past or future
            var order = checkorder();
            if ((data[this.id][1] == -1) && ($(".fragment").index(this) <= middle - 1) && (order[0])) {
                if (!($(this).hasClass("korrekt"))) {
                    $(this).toggleClass("korrekt");
                    raisepoints();
                }

            } else if ((data[this.id][1] == 1) && ($(".fragment").index(this) >= middle ) && (order[0])) {
                if (!($(this).hasClass("korrekt"))) {
                    $(this).toggleClass("korrekt");
                    raisepoints();
                }

                //check if the item is in the right area of the side respectively if there is enough space for the other correct item
            } else {
                if (order[0]) {
                    $(this).on("click", clear);
                    $(this).toggleClass("falsch");
                    raisefaults();
                } else {
                    var xy = []
                    xy.push($(".dropped")[order[1]], $(".dropped")[order[2]]);
                    xy.forEach(function (elem) {
                        if ($(elem).hasClass('korrekt')) {
                            console.log($(elem));
                            console.log( "war korrekt");
                            console.log(!($(this).hasClass("falsch")));
                            $(elem).toggleClass("korrekt");
                            decreasepoints();
                        }
                        if (!($(this).hasClass("falsch"))) {
                            console.log("click function added; class falsch toggled")
                            $(elem).on("click", clear);
                            $(elem).toggleClass("falsch");
                            raisefaults();
                        }

                    });
                    return false;
                }
            }
        });

    };
    function checkorder() {
        var erg = [true,0,0];
        var arr = $('.dropped').map(function () {
            return parseInt(this.id);
        }).get();
        if(arr.length >1){
            for(x=0;x<arr.length;x++){
                var y= x+1;
                if (arr[x]>arr[y]){
                    erg[0] = false;
                    erg[1] = x;
                    erg[2] = y;
                }
            }
        }
        return erg;

    }


    function shuffle(array) {
        var counter = array.length, temp, index;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    function removeNoticeIfPresent() {
        var obj = $('#info3 p');
        if (obj.length) {
            obj.detach();
        }
    }
});

