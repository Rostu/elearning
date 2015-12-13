function displayContents() {

    /*  Hide verb hints
     */
    $('.tooltip').hide();
    $('.tooltipbox').hide();

    /*  Reset lineboxes
     */
    $('.linebox').removeClass('correct');

    var selectbox = $(".selectbox");

    /*  Reset selectboxes
     */
    $(selectbox).each(function() {
        $(this).width($(this).width() + 18 );
        $(this).prop('disabled', false);
    });
    $(selectbox).each(function() {
        var name = $(this).attr('name');
        $(this).children().each(function() {
            if ($(this).attr('value') === name) {
                $(this).prop('selected', true);
            } else {
                $(this).prop('selected', false);
            }
        });
    });

    var satzpuzzle = $("#satzpuzzle");
    
    /*  Shuffle sentences
     */
    for (var i = $(satzpuzzle).children('.linebox').length; i >= 0; i--) {
        $(satzpuzzle).append($(satzpuzzle).children('.linebox')[Math.random() * i | 0]);
    }

    /*  Shuffle puzzle elements
     */
    $(".sourceline").each(function () {
        for (var i = $(this).children('.srcelem').length; i >= 0; i--) {
            $(this).append($(this).children('.srcelem')[Math.random() * i | 0]);
        }
    });
}

function setCorrectSrcelem(dragID, dropID) {

    var drop = $('#' + dropID);
    var drag = $('#' + dragID);

    /*  Handle classes indicating correctness state and disable dragging after appending
     */
    $(drag).removeClass('incorrect');
    $(drag).addClass('correct');
    $(drop).append($(drag));
    $(drag).draggable('disable');

    var linebox = $(drag).closest('.linebox');
    var helpico = $(linebox).find('.helpico');
    var sourceline = $(linebox).children('.sourceline');
    var target_text = $(drop).children('.srcelem').text();

    /*  Check if the current sentence has reached a complete state with the latest addition
     */
    if ($(sourceline).children().length == 0 || target_text.match(/\.$/)) {
        raisepoints();
        $(helpico).unbind('click');
        $(helpico).addClass('disabled');
        $(linebox).addClass('correct');
        $(linebox).find('.srcelem').each(function () {
            fixSrcelem($(this).attr('id'), false, true);
            $(this).draggable('disable');
        });
    } else {
        $(sourceline).find('.srcelem').each(function() {
            $(this).removeClass('incorrect');
        });
    }
}

function fixSrcelem(dragID, fullStop, disable) {

    var drag = $('#' + dragID);
    var selected_text;

    /*  Get the text of the current '.srcelem'
     */
    if ($(drag).find('.selectbox').length > 0) {
        selected_text = $('#' + dragID + ' option:selected').text();
    }else{
        selected_text = $(drag).text();
    }

    if (!disable) {
        /*  Handle punctuation
         */
        if (fullStop) {
            selected_text += '.'
        }
        else if ($(drag).attr('punct') === "true") {
            selected_text += ','
        }
    }

    /*  Replaces all children of current '.srcelem' with plain text
     */
    $(drag).text(selected_text);

    if (!disable) {
        /*  Re-add handles in order to display correctness in '.targetline', disabled elements in '.sourceline' lose '.handle'
         */
        $(drag).append(jQuery('<div class="handle"></div>'));
    }
}


function addLink() {
    $("#infolink").remove();
    clear_help();
    $("#info2").append("<a id='infolink' class='redlink' onclick='toggleStartOverlay()' href='#'>Glück ist, ... (Hilfe)</a>");
    show_help();
}

function clear_help() {
    var info2 = $("#info2");
    $(info2).children().animate({color: "#A91211"}, 50);
    $(info2).children().hide();
    $(info2).animate({width: "0px", paddingRight: "12px"},100);
}

function show_help() {
    var info2 = $("#info2");
    $(info2).show();
    $(info2).animate({width: $(info2).children('.redlink').width(), paddingRight: "20px"}, 100);
    $(info2).children().show();
    $(info2).children().animate({color: "#ffffff"}, 200);
}
