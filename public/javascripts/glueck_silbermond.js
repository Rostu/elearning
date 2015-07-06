$( init );

function init() {

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
        } );
        $(this).attr("onclick", "setOne(event)");
        $(this).attr("oncontextmenu", "resetOne(event)");
    });

    $('[class$="line"]').each(function() {
        $(this).droppable({
            drop: lineDrop,
            accept: $('.srcelem'),
        });
    });

    $('.helparea').each(function() {
        $(this).droppable({
            drop: helpDrop,
            tolerance: "pointer",
            accept: $('.srcelem'),
        });
    });

    $('.resetarea').each(function() {
        $(this).droppable({
            drop: resetDrop,
            tolerance: "pointer",
            accept: $('.srcelem'),
        });
    });

    $('.resetico').click(function(event) {
        resetAll(event);
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
                                $(opt).attr('selected', elem === current_forms[i]);
                                dbox.append(opt);
                            }
                            return;
                        }
                    });
                }
            });
        });
        dropboxes.each(function() {
            $(this).width($(this).width() + 18  );
        });
    });
}

function load_dropbox_data (callback) {
    $.getJSON("javascripts/glueck_ist_1.json", function(json) {
        callback(json);
    });
}

function load_answer_data (callback) {
    $.getJSON("javascripts/glueck_ist_1_correct.json", function(json) {
        callback(json);
    });
}

function lineDrop( event, ui ) {
    $(this).append(ui.draggable);
    var dragID = ui.draggable.attr('id');
    var dropID = $(this).attr('id');
    handleFormCheck( dragID, dropID );
}

function helpDrop( event, ui ) {
    var linebox = $(this).closest('.linebox');
    var targetline = linebox.children('.targetline');
    targetline.append(ui.draggable);
    handleFormCheck( ui.draggable.attr('id'), targetline.attr('id') );
}

function resetDrop( event, ui ) {
    var linebox = $(this).closest('.linebox');
    var sourceline = linebox.children('.sourceline');
    sourceline.append(ui.draggable)
    ui.draggable.removeClass('incorrect');
    ui.draggable.removeClass('incorrect');
}

function handleFormCheck( dragID, dropID) {
    var dropRegex = new RegExp("^tal")
    if (dropID.match(dropRegex)) {
        var drag_line = dragID.match(/\d+/)[0];
        var drag_pos = pad("" + $('#' + dropID).children('.srcelem').length, 2);
        var drag_text = $('#' + dragID + ' option:selected').text();
        console.log(drag_text);
        var drag_text = (drag_text) ? drag_text : $('#' + dragID).text();
        var drag_hash = $('#' + dragID).attr('hash');
        checkForm(drag_line, drag_pos, drag_text, drag_hash, dragID, dropID);
    }
    else {
        $('#' + dragID).removeClass('incorrect');
        $('#' + dragID).removeClass('correct');
    }
}

function checkForm(line, position, form, hashval, dragID, dropID) {
    var to_digest = line + position + form;
    if (sha256_digest(to_digest) === hashval) {
        $('#' + dragID).addClass('correct');
    }
    else {
        $('#' + dragID).addClass('incorrect');
    }
}

function setOne(ev) {
    var src = ev.target.closest('.srcelem');
    var linebox = ev.target.closest('.linebox');
    var targetline = $(linebox).children('.targetline');
    targetline.append($(src));
    handleFormCheck( $(src).attr('id'), targetline.attr('id') );

}

function resetOne(ev) {
    ev.preventDefault();
    var src = ev.target.closest('.srcelem');
    var linebox = ev.target.closest('.linebox');
    var sourceline = $(linebox).children('.sourceline');
    sourceline.append($(src));
    $(src).removeClass('incorrect');
    $(src).removeClass('correct');
}

function resetAll(ev) {
    var linebox = ev.target.closest('.linebox');
    var sourceline = $(linebox).children('.sourceline');
    var targetline = $(linebox).children('.targetline');
    targetline.children('.srcelem').each(function() {
        sourceline.append(this);
        $(this).removeClass('incorrect');
        $(this).removeClass('correct');
    });
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
