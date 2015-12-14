$( init );

var glueck_definition_maxfaults;
var glueck_definition_tree_help;
var glueck_definition_editor_unlocked;

function init() {

    glueck_definition_maxfaults = false;
    glueck_definition_tree_help = false;
    glueck_definition_editor_unlocked = true;

    $('#textoverlay').hide();
    $('#sentbox').hide();
    $('#treebox').hide();

    var editor_div = $('#editor');

    document.getElementById('editor').addEventListener("paste", function(event) {

        if (!event) {
            event = window.event;
        }
        var keyCode = event.which || event.keyCode;

        if (!(keyCode === 13 && !event.shiftKey)) {

            /*  prevent pasting content which is marked up; adapted from:
             *  source: http://stackoverflow.com/questions/12027137/javascript-trick-for-paste-as-plain-text-in-execcommand/19327995#19327995
             */

            event.preventDefault();

            if (event.clipboardData) {
                content = (event.originalEvent || event).clipboardData.getData('text/plain');

                document.execCommand('insertText', false, content);
            }
            else if (window.clipboardData) {
                content = window.clipboardData.getData('Text');

                document.selection.createRange().pasteHTML(content);
            }
        }
    });

    editor_div.keydown(function(event) {
        editorEnterDown(event);
    });
    editor_div.keyup(function(event) {
        editorEnterUp(event);
    });
    $('#checkbutton').click(function() {
        checkClick();
    });
    placeCaretAtEnd(document.getElementById('editor'));
    document.getElementById("editor").addEventListener("input", function() {
        updateErrorSpans();
    }, false);

    /*  Add messages for task completion and maximum amount of errors
     */
    $(document).on("MaxPointsReached", function() {
        $('#textbox').slideUp(75, function() {
            $(this).remove();
            if (glueck_definition_maxfaults) {
                setTimeout(function() {
                    addLink($("#info2"), generateLink("Glück ist, ...", "define-help"));
                    alert('Geschafft! Aber du hast leider mindestens 10 Fehler gemacht. Schaue dir über den Infolink auf der linken Seite noch einmal die Bildung von geeigneten Nebensätzen zur Definition von Glück an.');
                }, 500);
            } else {
                setTimeout(function() {
                    alert('Gut gemacht!');
                }, 500);
            }
        });
    });
    $(document).on("MaxFaultsReached", function() {
        if (!glueck_definition_maxfaults) {
            setTimeout(function() {
                alert('Das kannst du doch besser!');
            }, 500);
            glueck_definition_maxfaults = true;
        }
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

function updateErrorSpans() {

    /*  check all spans associated with errors for changes; mark errors as modified or deleted where appropriate
     */

    var errors = $('.error');

    var spans = $.map(errors, function(error, index) {
        var coordinates_index = $(error).attr('id').indexOf('co');
        var coordinates = $(error).attr('id').slice(coordinates_index, $(error).attr('id').length);
        var span = $("span[id$='" + coordinates + "']");
        if (span.length > 0) {
            return span;
        } else {
            markDeleted(error);
        }
    });

    $.each(spans, function(index, span) {

        var original = $(span).attr('chosen') ?
            $(span).attr('chosen') :
            $(span).data('text');

        if ($(span).text() !== original) {

            var coordinates_index = $(span).attr('id').indexOf('co');
            var coordinates = $(span).attr('id').slice(coordinates_index, $(span).attr('id').length);
            var error = $(".error[id$='" + coordinates + "']");

            if ($(span).text().length == 0) {
                markDeleted(error);
                $(span).remove();
            } else {
                $(span).attr('chosen', $(span).text());
                $(error).removeClass('new');
                $(error).addClass('modified');
            }
        }
    });
}

function checkClick() {

    /*  get the text in the editor and reinsert it, deleting all additional markup
     */

    var editor = $('#editor');

    var editor_text = "Glück ist, " + editor.text().trim();
    editor.text(editor.text().trim());

    startCheckUI(function() {

        checkForErrors(editor_text, function (error_data) {

            /*  display error data if any are yielded or accept input sentence
             */

            var editorarea = $('#editorarea');

            if (error_data.length > 0) {

                raisefaults();

                insertErrorSpans(error_data, $('#editor'), 11, editor_text.length);
                generateErrorBox(error_data, $('#textbox'));

                stopCheckUI(function() {
                    editorarea.addClass('incorrect');
                    editorarea.effect("highlight", {color: '#FF7F7F'}, function() {
                        editorarea.effect("highlight", {color: '#FF7F7F'});
                    });
                    displayErrors($('#textbox'));
                    placeCaretAtEnd(document.getElementById('editor'));
                });
            } else {

                raisepoints();

                stopCheckUI(function () {
                    displayLines();
                    editorarea.addClass('correct');
                    editorarea.effect("highlight", {color: '#A8D54D'}, function () {
                        editorarea.effect("highlight", {color: '#A8D54D'}, function () {
                            editorarea.removeClass('correct');
                            $('#editor').text('');
                        });
                    });
                });
            }
        });
    });
}

function errorClick(target, toggle) {

    /*  handles opening and closing errors
     */

    if($(target).hasClass('closed')) {
        $(target).removeClass('closed');
        $(target).addClass('open');
        $(target).closest('.error').children(':not(.errtitle)').slideDown(25);
    }else if($(target).hasClass('open')){
        if (toggle) {
            $(target).removeClass('open');
            $(target).addClass('closed');
            $(target).closest('.error').children(':not(.errtitle)').slideUp(25);
        }
    }
}

function loadTreeClick(ev) {

    /*  handles treebox display
     */

    $('#tree').slideDown(75);
    $('#treebox').find('.explanation').slideUp(75);

    $('.linebox').removeClass('active');
    var linebox = ev.target.closest('.linebox');
    $(linebox).addClass('active');

    var treedata = $(linebox).children('.dataarea').children('.treedata')[0];
    updateTree(JSON.parse($(treedata).text()));
}

function generateLine(index, sentence, target) {

    /*  creates div for accepted sentence and adds it to target
     */

    var line = jQuery('<div/>', {
        id: 'll' + pad(index, 2),
        class: 'line flexcontainer flexitem'
    });

    var linebox = jQuery('<div/>', {
        id: 'lb' + pad(index, 2),
        class: 'linebox flexcontainer flexitem'
    });

    var textarea = jQuery('<div/>', {
        id: 'ta' + pad(index, 2),
        class: 'textarea flexitem'
    });

    var sentence_span = jQuery('<span/>', {
        id: 'ss' + pad(index, 2),
        class: 'sentence',
        text: sentence.string
    });
    $(sentence_span).attr('start', sentence.start);
    $(sentence_span).attr('end', sentence.end);
    $(textarea).append(sentence_span);
    $(linebox).append(textarea);

    var loadarea = jQuery('<div/>', {
        id: 'la' + pad(index, 2),
        class: 'loadarea flexcontainer flexitem'
    });

    var loadbutton = jQuery('<div/>', {
        id: 'lo' + pad(index, 2),
        class: 'loadbutton flexitem'
    });
    $(loadbutton).click(function(event) {
        loadTreeClick(event);
    });
    $(loadarea).append(loadbutton);
    $(linebox).append(loadarea);

    var dataarea = jQuery('<div/>', {
        id: 'da' + pad(index, 2),
        class: 'dataarea'
    });

    var treedata = jQuery('<div/>', {
        id: 'td' + pad(index, 2),
        class: 'treedata',
        text: JSON.stringify(sentence.parse)
    });
    $(dataarea).append(treedata);
    $(linebox).append(dataarea);

    $(line).append(linebox);
    $(line).hide();

    $(target).prepend(line);

    return {start: sentence.start, end: sentence.end, line: line };
}

function generateLink(text, class_str) {
    var link = jQuery('<a/>', {
        id: 'infolink',
        class: 'redlink',
        text: text,
        href: '#'
    });
    $(link).click(function(event) {
        $(".overlay-content").hide();
        $("." + class_str).show();
        toggleStartOverlay();
    });
    return link;
}

//helper functions
function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}
