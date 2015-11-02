$( init );

var glueck_satzpuzzle_solutions;
var glueck_satzpuzzle_maxfaults;

function init() {
    console.log(glueck_satzpuzzle_maxfaults);

    displayContents();
    loadSolutions();
    setupLogic();
    var glueck_satzpuzzle_maxfaults = false;
}

function loadSolutions() {
    $.getJSON("javascripts/glueck_satzpuzzle_solutions.json", function(json) {
        glueck_satzpuzzle_solutions = json;
    });
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
        if (glueck_satzpuzzle_maxfaults) {
            setTimeout(function() {
                addLink();
                alert('Geschafft! Aber du hast leider mindestens 10 Fehler gemacht. Schaue dir über den Infolink auf der linken Seite noch einmal die Bildung von geeigneten Nebensätzen zur Definition von Glück an.');
            }, 110);
        } else {
            setTimeout(function() {
                alert('Gut gemacht!');
            }, 110);
        }

    });
    $(document).on("MaxFaultsReached", function() {
        if (!glueck_satzpuzzle_maxfaults) {
            setTimeout(function() {
                alert('Das kannst du doch besser!');
            }, 110);
            glueck_satzpuzzle_maxfaults = true;
        }
    });
}

function lineDrop( event, ui ) {
    var dragID = ui.draggable.attr('id');
    var dropID = $(this).attr('id');
    handleFormCheck( dragID, dropID );
}

function handleFormCheck(dragID, dropID) {
    if (checkForm( dragID, dropID)) {
        setCorrectSrcelem(dragID, dropID);
    }else{
        $('#' + dragID).addClass('incorrect');
        raisefaults();
    }
}

function checkForm(dragID, dropID) {
    
    var drop = $('#' + dropID);
    var drag = $('#' + dragID);
    
    var drag_line = dragID.match(/\d+/)[0];
    var drag_pos = pad("" + $(drop).children().length, 2);

    var target_text = $(drop).children('.srcelem').text();

    /*  Get the text of current '.srcelem', restricted to the selected value for <select>-elements
     */
    var drag_text = $('#' + dragID + ' option:selected').text();
    drag_text = (drag_text) ? drag_text : $(drag).text();

    var to_digest = drag_line + drag_pos + target_text + drag_text;

    /*  Get the SHA-256-hash for a sentence-terminal element
     */
    var shaObjStop = new jsSHA("SHA-256", "TEXT");
    shaObjStop.update(to_digest + '.');
    var digestedStop = shaObjStop.getHash("HEX");

    /*  Get the SHA-256-hash for a non-terminal element
     */
    var shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(to_digest);
    var digested = shaObj.getHash("HEX");

    /*  Handle commas via the 'punct'-attribute
     */
    if ($(drag).attr('punct') === 'true') {
        var shaObjComma = new jsSHA("SHA-256", "TEXT");
        shaObjComma.update(to_digest + ',');
        digested = shaObjComma.getHash("HEX");
    }

    /*  Retrieve acceptable positions for the current element
     */
    var drag_random = $(drag).attr('random');
    var drag_hashes = glueck_satzpuzzle_solutions[drag_random];

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

function helpClick(ev) {
    var linebox = ev.target.closest('.linebox');
    var sourceline = $(linebox).children('.sourceline');
    var targetline = $(linebox).children('.targetline');

    var found = false;
    var count_selected = 0;

    /*  check elements for correct form unless a selectbox is present;
     *  if a correct form is identified, add it to the target area
     */
    sourceline.children('.srcelem').each(function () {
        var dragID = $(this).attr('id');
        var dropID = $(targetline).attr('id');

        if ($(this).find('.selectbox').length > 0) {
            count_selected++;
        }
        else if (checkForm(dragID, dropID)) {
            found = true;
            setCorrectSrcelem(dragID, dropID);

            $(ev.target).unbind('click');
            $(ev.target).addClass('disabled');
            return false;
        }
    });

    /*  Display info link on the left if the next correct element is a verb form
     */
    if (!found && count_selected > 0) {
        addLink();
    }
}


//  helper functions
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