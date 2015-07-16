$( init );

var solutions;

load_solutions (function (solution_data) {
    solutions = solution_data;
});

function init() {

    $(document).on("MaxPointsReached", function() {
        //here you can react to the event how it is needed in your exercise
        setTimeout(function() {
            alert('Gut gemacht!')
        }, 110);        
    });

    $(document).on("MaxFaultsReached", function() {
        //here you can react to the event how it is needed in your exercise
        setTimeout(function() {
            alert('Das kannst du doch besser!')
        }, 110);        
    });
    
    //var md5test = sha256_digest("bla");
    //console.log(md5test);

    var flexy = $("#flexybox");

    for (var i = $(flexy).children('.linebox').length; i >= 0; i--) {
        $(flexy).append($(flexy).children('.linebox')[Math.random() * i | 0]);
    }

    $(".sourceline").each(function () {
        for (var i = $(this).children('.srcelem').length; i >= 0; i--) {
            $(this).append($(this).children('.srcelem')[Math.random() * i | 0]);
        }
    });

    //Control logic    
    $('.srcelem').each(function() {
        $(this).draggable( {
            containment: $(this).closest('.linebox'),
            revert: true,
            revertDuration: 100,
            opacity: 0.75,
            cursor: 'move',
            stack: $('.srcelem'),
            delay: 50
        });
    });

    $('.targetline').each(function() {
        $(this).droppable({
            drop: lineDrop,
            accept: $('.srcelem'),
        });
    });

    $('.helpico').click(function(event) {
        helpClick(event);
    });

    $('.selectbuffer').each(function() {
        $(this).attr("onclick", "stopProp(event)");
        $(this).attr("oncontextmenu", "stopProp(event)");
    });

    //Load select data
    var dropboxes = $(".dropbox");
    var dbox_count = dropboxes.length;

    load_dropbox_data (function (dropbox_data) {
        dropboxes.each(function () {
            var dbox = $(this);
            var dbox_name = $(this).attr('name');
            var dbox_id = $(this).closest('.srcelem').attr('random');
            //console.log(dbox_name);
            var corr_form_upper = false;
            $.each(dropbox_data, function(elem, forms_hash) {
                elem = elem.replace(/[\(\)\[\]]/g, '');
                if (dbox_name === elem) {
                    $.each(forms_hash, function (form, form_hash) {
                        var current_forms = [];
                        $.each(form_hash, function (f, f_h) {
                            $.each(f_h, function (f_h_k, f_h_v) {
                                if (f_h_v['wkl'] === 'VER' && !equals(current_forms, new RegExp('^' + f + '$'))) {
                                    current_forms.push(f);
                                    return;
                                }
                            });
                        });
                        if (equals(current_forms, new RegExp('^' + dbox_name + '$', 'i'))) {
                            for (var i = 0; i < current_forms.length; i++) {
                                var strval = ((corr_form_upper) ? current_forms[i].charAt(0).toUpperCase() + current_forms[i].slice(1) : current_forms[i]);

                                var opt = jQuery('<option>' + strval + '</option>');
                                $(opt).attr('value', strval);
                                $(opt).prop('selected', elem === current_forms[i]);
                                dbox.append(opt);
                            }
                            return;
                        }
                    });
                }
            });
        });
        dropboxes.each(function() {
            $(this).width($(this).width() + 18 );
            $(this).prop('disabled', false);
        });
    });
}

function load_dropbox_data (callback) {
    $.getJSON("javascripts/glueck_ist_1.json", function(json) {
        callback(json);
    });
}

function load_solutions (callback) {
    $.getJSON("javascripts/glueck_ist_1_correct.json", function(json) {
        callback(json);
    });
}

function lineDrop( event, ui ) {
    var dragID = ui.draggable.attr('id');
    var dropID = $(this).attr('id');
    handleFormCheck( dragID, dropID );
}

function handleFormCheck( dragID, dropID) {
    var drag_line = dragID.match(/\d+/)[0];
    var drag_pos = pad("" + $('#' + dropID).children().length, 2);
    var drag_text = $('#' + dragID + ' option:selected').text();
    drag_text = (drag_text) ? drag_text : $('#' + dragID).text();
    var drag_hash = $('#' + dragID).attr('hash');
    var hashtest = checkForm( dragID, dropID);
    if (hashtest) {
        setCorrect(dragID, dropID);
    }
    else {
        $('#' + dragID).addClass('incorrect');
        raisefaults();
    }
}

function helpClick(ev) {
    var linebox = ev.target.closest('.linebox');
    var sourceline = $(linebox).children('.sourceline');
    var targetline = $(linebox).children('.targetline');

    sourceline.children('.srcelem').each(function () {
        var dragID = $(this).attr('id');
        var dropID = $(targetline).attr('id');

        if ($(this).find('.dropbox').length > 0) {
            var beforeTest = $('#' + dragID + ' option:selected');
            var found = false;

            $(this).children('.selectbuffer').children('.dropbox').children().each(function () {
                $(this).prop('selected', true);
                if (checkForm(dragID, dropID)) {
                    found = true;
                    return false;
                }
            });

            if (!found) {
                $(beforeTest).prop('selected', true);
            }
        }
        if (checkForm(dragID, dropID)) {
            setCorrect(dragID, dropID);

            $(ev.target).unbind('click');
            $(ev.target).addClass('disabled');
            return false;
        }
    });
}

function checkForm(dragID, dropID) {
    var drag_line = dragID.match(/\d+/)[0];
    var drag_pos = pad("" + $('#' + dropID).children().length, 2);

    var drag_text = $('#' + dragID + ' option:selected').text();
    drag_text = (drag_text) ? drag_text : $('#' + dragID).text();
    var target_text = $('#' + dropID).children('.srcelem').text();
    
    var to_digest = drag_line + drag_pos + target_text + drag_text;

    var shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(to_digest);
    var digested = shaObj.getHash("HEX");
    
    if ($('#' + dragID).attr('punct') === 'true') {
        var shaObjComma = new jsSHA("SHA-256", "TEXT");
        shaObjComma.update(to_digest + ',');
        digested = shaObjComma.getHash("HEX");
    }

    var shaObjStop = new jsSHA("SHA-256", "TEXT");
    shaObjStop.update(to_digest + '.');
    var digestedStop = shaObjStop.getHash("HEX");
    
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
    $('#' + dragID).removeClass('incorrect');
    $('#' + dragID).addClass('correct');
    $('#' + dropID).append($('#' + dragID));
    $('#' + dragID).draggable('disable');
    $($('#' + dragID).children().children('.dropbox')[0]).prop('disabled', true);

    var linebox = $('#' + dragID).closest('.linebox');
    var sourceline = $(linebox).children('.sourceline');
    var helpico = $(linebox).find('.helpico');

    var target_text = $('#' + dropID).children('.srcelem').text();
    
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
    if ($('#' + dragID).find('.dropbox').length > 0) {
        selected_text = $('#' + dragID + ' option:selected').text();
    }else{
        selected_text = $('#' + dragID).text();
    }
    if (fullStop) {
        selected_text += '.'
    }
    else if ($('#' + dragID).attr('punct') === "true") {
        selected_text += ','
    }
    $('#' + dragID).text(selected_text);
    if (!disable) {
        $('#' + dragID).append(jQuery('<div class="handle"></div>'));
    }
}

function stopProp(ev) {
    ev.preventDefault();
    ev.stopPropagation();
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

