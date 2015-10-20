glueck_definition_editor_unlocked = true;

function startCheckUI(callback) {

    glueck_definition_editor_unlocked = false;

    $('#treebox').find('.explanation').slideDown(75);
    $('#textbox').find('.explanation').slideUp(75);

    $('.linebox').removeClass('active');
    $('#tree').slideUp(75);
    $('#editorarea').removeClass('incorrect');
    $('.errorbox').slideUp(75, function() {
        $('.errorbox').remove();
    });

    $('#textoverlay').fadeIn(25, function() {
        $('#textbox').find('.spinnerbox').fadeIn(25, function() {
            $(this).find('.spinner').fadeIn(25, function () {
                callback();
            });
        });
    });

}

function stopCheckUI(callback) {

    $('#textbox').find('.spinner').fadeOut(25, function () {
        $(this).closest('.spinnerbox').fadeOut(25, function () {
            $(this).closest('#textoverlay').fadeOut(25);
            glueck_definition_editor_unlocked = true;
            callback();
        });
    });

}

function editorEnterDown(event) {

    if (!event) {
        event = window.event;
    }
    var keyCode = event.which || event.keyCode,
        target = event.target || event.srcElement;

    if (keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
    }
}

function editorEnterUp(event) {

    if (!event) {
        event = window.event;
    }
    var keyCode = event.which || event.keyCode,
        target = event.target || event.srcElement;

    if (keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        if (glueck_definition_editor_unlocked) {
            checkClick();
        }
    }
}

function checkClick() {

    /*  get the text in the editor and and reinsert it, deleting all additional markup
     */

    var editor_text = "Glück ist, " + $('#editor').text().trim();
    $('#editor').text($('#editor').text().trim());

    startCheckUI(function() {

        checkForErrors(editor_text, function (error_data) {

            /*  display error data if any are yielded or accept input sentence
             */

            //console.log(error_data.length);

            if (error_data.length > 0) {
                raisefaults();
                insertErrorSpans(error_data, $('#editor'), 11);
                generateErrorBoxes(error_data, $('#textbox'));

                stopCheckUI(function() {
                    $('#editorarea').addClass('incorrect');
                    $('#editorarea').effect("highlight", {color: '#FF7F7F'}, function() {
                        $('#editorarea').effect("highlight", {color: '#FF7F7F'});
                    });
                    displayErrors($('#textbox'));
                    placeCaretAtEnd($('#editor')[0]);
                });
            } else {
                raisepoints();
                stopCheckUI(function () {
                    displayLines();
                    $('#editorarea').addClass('correct');
                    $('#editorarea').effect("highlight", {color: '#A8D54D'}, function () {
                        $('#editorarea').effect("highlight", {color: '#A8D54D'}, function () {
                            $('#editorarea').removeClass('correct');
                            $('#editor').text('');
                        });
                    });
                });
            }
        });
    });
}

function errorClick(target, toggle) {

    if($(target).hasClass('closed')) {
        $(target).removeClass('closed');
        $(target).addClass('open');
        $(target).closest('.error').children(':not(.errmsg)').slideDown(25);
    }else if($(target).hasClass('open')){
        if (toggle) {
            $(target).removeClass('open');
            $(target).addClass('closed');
            $(target).closest('.error').children(':not(.errmsg)').slideUp(25);
        }
    }

}

function loadClick(ev) {

    $('#tree').slideDown(75);
    $('#treebox').find('.explanation').slideUp(75);

    $('.linebox').removeClass('active');
    var linebox = ev.target.closest('.linebox');
    $(linebox).addClass('active');

    var treedata = $(linebox).children('.dataarea').children('.treedata')[0];
    updateTree(JSON.parse($(treedata).text()));
}

function highlightRepetition(index) {

    var lines = $('#sentbox').find('.line');

    $(lines[index]).addClass('incorrect');
    $(lines[index]).effect("highlight", {color: '#FF7F7F'}, function () {
        $(lines[index]).effect("highlight", {color: '#FF7F7F'}, function () {
            $(lines[index]).removeClass('incorrect');
        });
    });
}

function displayLines() {

    $('#sentbox').slideDown(25, function() {
        $('#treebox').slideDown(25);
    });

    var lines = $('#sentbox').find('.line');

    (function lineLoop(index) {
        setTimeout(function () {

            $(lines[index]).slideDown(25);

            if (++index < lines.length) {

                lineLoop(index);

            } else {
                $(lines[0]).addClass('correct');
                $(lines[0]).effect("highlight", {color: '#A8D54D'}, function () {
                    $(lines[0]).effect("highlight", {color: '#A8D54D'}, function () {
                        $(lines[0]).removeClass('correct');
                    });
                });
            }
        }, 25)
    })(0);

}

function displayErrors(target) {

    $(target).find('.errorbox').slideDown(25);
    var errors = $(target).find('.error');

    (function errorLoop(index) {
        setTimeout(function () {

            $(errors[index]).slideDown(25);

            if (++index < errors.length) {
                errorLoop(index);
            }

        }, 25)
    })(0);

}



//helper functions
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}
