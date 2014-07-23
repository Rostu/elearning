$( init );

function init() {
    $("h1").toggle();
    $("h2").toggle();
    var id=0;
    var testarray = [["Film","entwickeln"],["Radar", "auf dem ... haben"],["Lenkrad", "hinter dem ... sitzen"],["Verkehr","aus dem ... ziehen"]];
    var linksarray = [];
    var rechtsarray = [];
    var j=0;
    var r_length=0;
    var w_length = 0;

    testarray.forEach(function(entry) {
        linksarray.push([entry[0],j]);
        rechtsarray.push([entry[1],j]);
        j++;
    });
    linksarray = shuffle(linksarray);

    linksarray.forEach(function(entry) {
        var div = jQuery('<div/>', {
            class: 'token',
            id: entry[1],
            html: entry[0]
        });
        $(div).appendTo('#ltext' ).draggable({
            containment: '#page',
            revert: true});
    });

    rechtsarray.forEach(function(entry) {
        var div = jQuery('<div/>', {
            class: 'kolo',
            id: entry[1],
            html: entry[0]
        });
        $(div).appendTo('#rtext' ).draggable({
            containment: '#page',
            revert: true
        });
    });

    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });
    function handleDropEvent( event, ui ) {
        var div = jQuery('<div/>', {
            class: 'antworttoken',
            id: ui.draggable.attr('id'),
            html: ui.draggable.context.textContent
        });
        //$("#Antwortbox").append(div);
        if(ui.draggable.attr('class') == "kolo ui-draggable ui-draggable-dragging"){
            $(".kolo[id="+ui.draggable.attr('id')+"]").remove();
            $('#a2').append(div);
        }
        if(ui.draggable.attr('class') == "token ui-draggable ui-draggable-dragging"){
            $(".token[id="+ui.draggable.attr('id')+"]").remove();
            $('#a1').append(div);
        }
        div.click(clear);
        check();

    };

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
    };

    function check(){
        if($("#Antwortbox .antworttoken").length > 1){
            if( $("#Antwortbox .antworttoken")[0].id == $("#Antwortbox .antworttoken")[1].id){
                $("#Antwortbox .antworttoken").delay(800).fadeOut( function() { $("#Antwortbox .antworttoken").remove(); });
                r_length++;
                update_balken();
                $("h1").fadeToggle(800,function(){ $("h1").hide();});
            }else{
                $("#Antwortbox .antworttoken").delay(800).fadeOut( function() {
                    clear2($("#Antwortbox .antworttoken")[1]);
                    clear2($("#Antwortbox .antworttoken")[0])
                });
                $("h2").fadeToggle(800,function(){ $("h2").hide();});
            }
        }
    }

    function clear(){
        if($(".token.ui-draggable[id="+this.id+"]").attr('id') == this.id){
            var div = jQuery('<div/>', {
                class: 'kolo',
                id: this.id,
                html: this.innerHTML
            });
            $(div).appendTo('#rechts' ).draggable({
                containment: '#page',
                revert: true
            });
            $(this).remove();
        }else{
            var div = jQuery('<div/>', {
                class: 'token',
                id: this.id,
                html: this.innerHTML
            });
            $(div).appendTo('#links' ).draggable({
                containment: '#page',
                revert: true
            });
            $(this).remove();
        }
    }

    function clear2(todel){

        if($(".token.ui-draggable[id="+todel.id+"]").attr('id') == todel.id){
            var div = jQuery('<div/>', {
                class: 'kolo',
                id: todel.id,
                html: todel.innerHTML
            });
            $(div).appendTo('#rechts' ).draggable({
                containment: '#page',
                revert: true
            });
            $(todel).remove();
        }else{
            var div = jQuery('<div/>', {
                class: 'token',
                id: todel.id,
                html: todel.innerHTML
            });
            $(div).appendTo('#links' ).draggable({
                containment: '#page',
                revert: true
            });
            $(todel).remove();
        }
    }


    function update_balken(){
        //console.log($('#balken_innen1'));
        $('#balken_innen1').css('width',r_length*50);
        $('#balken_innen2').css('width',w_length*25);
    }
};