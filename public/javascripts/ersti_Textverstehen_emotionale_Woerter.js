$( init );  // function for the list of positive "Gefühlswörter"
function init() {

    var id=0;
    var id_speicher = [];
    var testarray = ["baut", "Verwunderung", "nicht alleine ist", "erleichtert", "Neugier", "Vorfreude"];
    var i = 0;
    var infos = [];
    var r_length=0;
    var w_length = 0;
    $(".inline").each(function() {
        $(this).draggable({
            containment: '#page',
            id: this,
            revert: true,
            helper: myHelper});
    });

    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });

    function handleDropEvent( event, ui ) {
        var textinhalt = ui.draggable.context.textContent;
        var textinfos ="";
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        textinhalt = textinhalt.replace('"','');
        for(i=0;i<infos.length;i++){
            if(infos[i][0] === textinhalt)
            {textinfos = infos[i][1]};
        }
        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+$(".inline.ui-draggable[id=" + ui.draggable.attr('id') + "]").data("text")+"</p><div id='"+ui.draggable.attr('id') +"' class='hide'>"
        });
        if($.inArray(textinhalt, testarray)> -1){
            raisepoints();
            $(div).data('korrekt',true);
            $(div).css('background','#02D64A');
            r_length++;
            $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','green');
        }else {
            raisefaults();
            $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','red');
            $(div).data('korrekt',false);$(div).css('background','#A91211');$(div).css('color','white');w_length++}
        $("#Antwortbox").bind("contextmenu",function(e){return false;});
        $("#Antwortbox").append(div);
        div.click(clear);
        $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
    };

    function myHelper( event ) {
        var textinhalt = $(this).context.innerHTML;
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: textinhalt
        });
    };
    function clear()
        {
            $(".inline.ui-draggable[id=" + this.id + "]").draggable("enable").css('color', 'black');
            $(".token[id=" + this.id + "]").remove();
        }

};


$( init_two ); // function for the list of negative "Gefühlswörter"
function init_two() {

    var id=0;
    var id_speicher = [];
    var testarray_two = ["aufgeregt", "Nervosität", "unsicher wirken", "klein vor","klein", "zurückversetzt","unwissend", "genervt", "belästigt", "Unsicherheit"];
    var i = 0;
    var infos = [];
    var r_length=0;
    var w_length = 0;
    $(".inline").each(function() {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
    });

    $('#Antwortbox_two').droppable( {
        drop: handleDropEvent
    });

    function handleDropEvent( event, ui ) {
        var textinhalt = ui.draggable.context.textContent;
        var textinfos ="";
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        textinhalt = textinhalt.replace('"','');
        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+$(".inline.ui-draggable[id=" + ui.draggable.attr('id') + "]").data("text")+"</p><div id='"+ui.draggable.attr('id') +"' class='hide'>"
        });
        if($.inArray(textinhalt, testarray_two)> -1){
            $(div).data('korrekt',true);
            raisepoints();
            $(div).css('background','#02D64A');
            r_length++;
            $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','green');
        }else {
            raisefaults();
            $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','red');
            $(div).data('korrekt',false);$(div).css('background','#A91211');$(div).css('color','white');w_length++}
        $("#Antwortbox_two").bind("contextmenu",function(e){return false;});
        $("#Antwortbox_two").append(div);
        div.click(clear);
        $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
    };

    function myHelper( event ) {
        var textinhalt = $(this).context.innerHTML;
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: textinhalt
        });
    };
    function clear()
            {
                $(".inline.ui-draggable[id=" + this.id + "]").draggable("enable").css('color', 'black');
                $(".token[id=" + this.id + "]").remove();
            }
};

/** $(document).on("ready",function(){      // function that checks if you have enough correct words. Lets you pass to the next Page if you do.
    $('#weiter').on("click", function(e) {
        if (countCorrectAnswers() < 13)
        {
            e.preventDefault(); // Stops the browser from opening the next page, using the href attribute on the <a> element
            alert("Bitte fülle genügend Lücken aus! Es werden mindestens 13 richtige Anworten benötigt.");
        }
    });
}); **/

function countCorrectAnswers()  //function checks how many answers are correct
{
    var correctAnswers = 0;
    $(".token").each(function(){
        if($(this).data("korrekt") === true)
        {
            correctAnswers++;
        }
    });
    return correctAnswers;
}