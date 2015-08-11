$( init );

//  Stores solution data globally
var solutions;

function init() {
    displayContents();
    loadSolutions();
    setupLogic();
}

function setupLogic() {

    /*  Add drag-and-drop functionality  
     */
    $('.srcelem').each(function() {
        $(this).draggable({
            containment: $(this).closest('.linebox'),
            revert: true,
            revertDuration: 100,
            opacity: 0.75,
            stack: $('.srcelem'),
            delay: 50,
            start: function(event,ui){
                $(this).css("cursor", "-webkit-grabbing");
                $(this).css("cursor", "-moz-grabbing");
            },
            stop: function(event,ui){
                $(this).css("cursor", "initial");
            }
        });
    });

    $('.targetline').each(function() {
        $(this).droppable({
            drop: lineDrop,
            accept: $('.srcelem'),
            over: function(event, ui) {
                ui.draggable.css("cursor", "copy");
            },
            out: function(event, ui) {
                ui.draggable.css("cursor", "-webkit-grabbing");
                ui.draggable.css("cursor", "-moz-grabbing");
            }
        });
    });

    /*  Add help functionality
     */
    $('.helpico').click(function(event) {
        helpClick(event);
    });

    /*  Add messages for task completion and maximum amount of errors  
     */
    $(document).on("MaxPointsReached", function() {
        setTimeout(function() {
            alert('Gut gemacht!')
        }, 110);
    });
    $(document).on("MaxFaultsReached", function() {
        setTimeout(function() {
            alert('Das kannst du doch besser!')
        }, 110);
    });
}

function loadSolutions() {
    $.getJSON("javascripts/glueck_silbermond_solutions.json", function(json) {
        solutions = json;
    });
}

function displayContents() {

    $(".dropbox").each(function() {
        $(this).width($(this).width() + 18 );
        $(this).prop('disabled', false);
    });

    var flexy = $("#flexybox");

    for (var i = $(flexy).children('.linebox').length; i >= 0; i--) {
        $(flexy).append($(flexy).children('.linebox')[Math.random() * i | 0]);
    }

    $(".sourceline").each(function () {
        for (var i = $(this).children('.srcelem').length; i >= 0; i--) {
            $(this).append($(this).children('.srcelem')[Math.random() * i | 0]);
        }
    });
}

function helpClick(ev) {
    var linebox = ev.target.closest('.linebox');
    var sourceline = $(linebox).children('.sourceline');
    var targetline = $(linebox).children('.targetline');

    var found = false;
    var count_selected = 0;

    sourceline.children('.srcelem').each(function () {
        var dragID = $(this).attr('id');
        var dropID = $(targetline).attr('id');

        if ($(this).find('.dropbox').length > 0) {
            count_selected++;
        }
        else if (checkForm(dragID, dropID)) {
            found = true;
            setCorrect(dragID, dropID);

            $(ev.target).unbind('click');
            $(ev.target).addClass('disabled');
            return false;
        }
    });

    if (!found && count_selected > 0) {
        $("#infolink").remove();
        clear_help();
        $("#info2").append("<a id='infolink' class='redlink' onclick='toggleStartOverlay()' href='#'>Glück ist, ...</a>");
        show_help();
    }
}

function clear_help(){
    $("#info2").children().animate({color: "#A91211"}, 50);
    $("#info2").children().hide;
    $("#info2").animate({width: "0px", paddingRight: "12px"},100);
};

function show_help(){
    $('.redstripe#info2').show();
    $("#info2").animate({width: $("#info2").children('.redlink').width(), paddingRight: "20px"}, 100);
    $("#info2").children().show;
    $("#info2").children().animate({color: "#ffffff"}, 200);
};

function lineDrop( event, ui ) {
    var dragID = ui.draggable.attr('id');
    var dropID = $(this).attr('id');
    handleFormCheck( dragID, dropID );
}

function handleFormCheck( dragID, dropID) {
    if (checkForm( dragID, dropID)) {
        setCorrect(dragID, dropID);
    }else{
        $('#' + dragID).addClass('incorrect');
        raisefaults();
    }
}

function checkForm(dragID, dropID) {
    var drag_line = dragID.match(/\d+/)[0];
    var drag_pos = pad("" + $('#' + dropID).children().length, 2);

    var target_text = $('#' + dropID).children('.srcelem').text();

    //Get the text of current '.srcelem', restricted to the selected value for <select>-elements
    var drag_text = $('#' + dragID + ' option:selected').text();
    drag_text = (drag_text) ? drag_text : $('#' + dragID).text();

    var to_digest = drag_line + drag_pos + target_text + drag_text;
    
    //Get the SHA-256-hash for a sentence-terminal element
    var shaObjStop = new jsSHA("SHA-256", "TEXT");
    shaObjStop.update(to_digest + '.');
    var digestedStop = shaObjStop.getHash("HEX");

    //Get the SHA-256-hash for a non-terminal element
    var shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(to_digest);
    var digested = shaObj.getHash("HEX");

    //Handle commas via the 'punct'-attribute
    if ($('#' + dragID).attr('punct') === 'true') {
        var shaObjComma = new jsSHA("SHA-256", "TEXT");
        shaObjComma.update(to_digest + ',');
        digested = shaObjComma.getHash("HEX");
    }

    //Retrieve acceptable positions for the current element
    var drag_random = $('#' + dragID).attr('random');
    var drag_hashes = solutions[drag_random];

    if (equals(drag_hashes, new RegExp('^' + digested + '$'))) {
        fixSrcelem(dragID, false, false);
        return true;
    }
    else if (equals(drag_hashes, new RegExp('^' + digestedStop + '$'))) {
        fixSrcelem(dragID, true, false);
        return true;
    }
    else {
        return false;
    }
}

function setCorrect(dragID, dropID) {

    //Handle classes indicating correctness state and disable dragging after appending
    $('#' + dragID).removeClass('incorrect');
    $('#' + dragID).addClass('correct');
    $('#' + dropID).append($('#' + dragID));
    $('#' + dragID).draggable('disable');

    var linebox = $('#' + dragID).closest('.linebox');
    var helpico = $(linebox).find('.helpico');
    var sourceline = $(linebox).children('.sourceline');
    var target_text = $('#' + dropID).children('.srcelem').text();

    //Check if the current sentence has reached a complete state with the latest addition
    if ($(sourceline).children().length == 0 || target_text.match(/\.$/)) {
        raisepoints();
        $(helpico).unbind('click');
        $(helpico).addClass('disabled');
        $(sourceline).children('.srcelem').each(function () {
            fixSrcelem($(this).attr('id'), false, true);
            $(this).draggable('disable');
        });
    }
}

function fixSrcelem(dragID, fullStop, disable) {

    var selected_text;

    //Get the text of the current '.srcelem'
    if ($('#' + dragID).find('.dropbox').length > 0) {
        selected_text = $('#' + dragID + ' option:selected').text();
    }else{
        selected_text = $('#' + dragID).text();
    }

    //Handle punctuation
    if (fullStop) {
        selected_text += '.'
    }
    else if ($('#' + dragID).attr('punct') === "true") {
        selected_text += ','
    }

    //Replaces all children of current '.srcelem' with plain text
    $('#' + dragID).text(selected_text);

    //re-add handles in order to display correctness in '.targetline', disabled elements in '.sourceline' lose '.handle'
    if (!disable) {
        $('#' + dragID).append(jQuery('<div class="handle"></div>'));
    }
}

function equals(array, regex){
    for(var i = 0; i < array.length; i++) {
        if (array[i].match(regex)) {
            return true;
        }
    }
    return false;
}

function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}