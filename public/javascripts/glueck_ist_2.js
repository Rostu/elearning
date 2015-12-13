$( init );

var glueck_definition_maxfaults;

function init() {

    glueck_definition_maxfaults = false;
    glueck_definition_tree_help = false;

    glueck_definition_trees_enabled = true;
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

function insertErrorSpans(errors, target, offset, end) {

    /*  insert coloured error spans based on position data provided by LanguageTool; offset is needed to compute the
     *  correct span positions for the current target only because the coordinates taken from the results of LanguageTool
     *  are based on the entire text;
     */

    var original_text = target.text();
    target.text('');

    var span_trees = generateSpanTrees(errors);
    var mistakes_and_text = insertTexts(span_trees, offset, end);
    var content = compileTargetContent(errors, mistakes_and_text, original_text, offset);

    $(target).append(content);
}

function generateSpanTrees(errors) {

    /*  find errors occurring inside each other and generate a corresponding structure for the error spans recursively
     *  with the help of the function "generateSpanTree"; the hash "span_children" serves as the basis for the recursive
     *  generation;
     */

    var span_children = {},
        items = [];

    var errors_length_asc = $.extend(true, [], errors);
    errors_length_asc = errors_length_asc.sort(dynamicSort('errorlength'));

    $.each(errors_length_asc, function(c, container) {

        span_children[container.number] = [];

        $.each(errors_length_asc, function(i, item) {
            if (c != i
                && items.indexOf(item.number) < 0
                && item.fromx >= container.fromx
                && item.tox <= container.tox) {
                span_children[container.number].push(item.number);
                items.push(item.number);
            }
        });
    });

    var error_numbers = [];

    for (var key in span_children) {
        error_numbers.push(key - 0);
    }

    var roots = error_numbers.filter(function(i) {
        return items.indexOf(i) < 0;
    });

    var span_trees = [];

    $.each(roots, function(index, root) {
        span_trees.push(generateSpanTree(root, errors, span_children));
    });

    return span_trees;
}

function generateSpanTree(index, errors, span_children) {

    var mistake = {
        type: 'mistake',
        index: index,
        start: errors[index].fromx,
        end: errors[index].tox
    };

    if(span_children[index].length > 0) {

        mistake.children = [];
        $.each(span_children[index], function(i, child) {
            mistake.children.push(generateSpanTree(child, errors, span_children));
        });
    }
    return mistake;
}

function insertTexts(mistakes, last_end, end) {

    /*  takes care of filling in the gaps between the start and the end of the input string as well as between and
     *  within the mistake spans;
     */

    var mistakes_and_text = [];

    $.each(mistakes, function(index, mistake){
        if(mistake.start < last_end) {
            if(mistake.children) {
                if (mistake.children[0].start >= last_end) {
                    mistake.start = mistake.children[0].start;
                }
            } else {
                mistake.start = last_end;
            }
        }
        if(mistake.start > last_end) {
            mistakes_and_text.push(generateText(last_end, mistake.start));
        }
        if(mistake.children) {
            mistake.children = insertTexts(mistake.children, mistake.start, mistake.end);
        }
        mistakes_and_text.push(mistake);
        last_end = mistake.end;
    });
    if(last_end < end) {
        mistakes_and_text.push(generateText(last_end, end));
    }

    return mistakes_and_text;
}

function generateText(start, end) {
    var text = {
        type: 'text',
        start: start,
        end: end
    };
    return text;
}

function compileTargetContent(errors, mistakes_and_text, original_text, offset) {

    /*  turns the generated span structure into actual html content
     */

    var contents = [];

    $.each(mistakes_and_text, function(index, mnt) {

        if (mnt.type === 'text') {

            var text = jQuery('<span/>', {
                class: 'text',
                text: original_text.substring(mnt.start - offset, mnt.end - offset)
            });

            contents.push(text);

        } else {

            var mistake = generateMistake(errors, original_text, mnt, offset);

            if (mnt.children) {
                $(mistake).text('');
                $.each(compileTargetContent(errors, mnt.children, original_text, offset), function (index, item) {
                    mistake.append(item);
                });
            }
            $(mistake).data('original', $(mistake).html());
            $(mistake).data('text', $(mistake).text());
            contents.push(mistake);
        }
    });
    return contents;
}

function generateMistake(errors, original_text, mnt, offset) {

    var err_string = original_text.substring(mnt.start - offset, mnt.end - offset);
    var err_coordinates = '' + errors[mnt.index].fromx + errors[mnt.index].tox;

    var mistake = jQuery('<span/>', {
        id: 'esco' + err_coordinates,
        class: 'mistake',
        text: err_string
    });
    $(mistake).data('original',$(mistake).html());
    $(mistake).hover(
        function() {
            $(".error[id$='co" + err_coordinates + "']").addClass( "hover" );
        }, function() {
            $(".error[id$='co" + err_coordinates + "']").removeClass( "hover" );
        }
    );

    $(mistake).dblclick(function(event) {
        event.preventDefault();
        var relevant_error = $(".error[id$='co" + err_coordinates + "']");
        $('html, body').animate({
            scrollTop: relevant_error.offset().top
        }, 25);
        errorClick(relevant_error, false);
    });
    return mistake;
}

function generateErrorBox(errlist, target) {

    var errorbox = jQuery('<div/>', {
        id: $(target).attr('id') + 'eb',
        class: 'errorbox flexcontainer flexitem'
    });
    $(errorbox).hide();
    $(target).append(errorbox);

    $.each(errlist, function(index, error) {
        generateError(error, errorbox);
    });

}

function generateError(data, target) {

    var additional = false;
    var err_coordinates = '' + data.fromx + data.tox;

    var error = jQuery('<div/>', {
        id: 'er' + pad(data.number, 2) + 'co' + err_coordinates,
        class: 'error flexcontainer flexitem new'
    });
    $(error).hover(
        function() {
            $("span[id$='esco" + err_coordinates + "']").addClass('hover');
        }, function() {
            $("span[id$='esco" + err_coordinates + "']").removeClass('hover');
        }
    );
    $(error).hide();

    var err_info = [];

    var errtitle = jQuery('<div/>', {
        class: 'errtitle flexcontainer flexitem'
    });

    var errstatus = jQuery('<div/>', {
        class: 'errstatus flexitem'
    });
    $(errstatus).click(function(event) {
        event.preventDefault();
        errorClick($(error), true);
    });
    $(errtitle).append(errstatus);

    var errmsg = jQuery('<div/>', {
        class: 'errmsg flexitem',
        text: data.msg
    });
    $(errmsg).click(function(event) {
        event.preventDefault();
        errorClick($(error), true);
    });

    var errcat = jQuery('<b/>', {
        text: data.category + ': '
    });
    $(errmsg).prepend(errcat);
    $(errtitle).append(errmsg);

    var errarea = jQuery('<div/>', {
        class: 'errarea flexcontainer flexitem'
    });
    $(errarea).click(function(event) {
        event.preventDefault();
        errorClick($(error), true);
    });
    $(errarea).hide();

    var errtriangle = jQuery('<div/>', {
        class: 'errtriangle flexitem'
    });
    $(errarea).append(errtriangle);
    $(errtitle).append(errarea);

    err_info.push(errtitle);
    $(error).append(errtitle);

    if(data.replacements) {

        additional = true;

        var errrep = jQuery('<div/>', {
            class: 'errrep flexcontainer flexitem'
        });
        $(errrep).hide();
        $(error).append(errrep);

        var reps = data.replacements.split('#');

        $.each(reps, function(rep_index, replacement){

            var rep = jQuery('<div/>', {
                id: 'er' + pad(data.number, 2) + 'rp' + pad(rep_index, 2),
                class: 'rep flexitem',
                text: replacement
            });
            $(rep).hover(
                function() {
                    $("span[id$='esco" + err_coordinates + "']").text($(rep).text());
                }, function() {
                    var relevant_span = $("span[id$='esco" + err_coordinates + "']");
                    var reset = relevant_span.attr('chosen') ?
                        relevant_span.attr('chosen') :
                        relevant_span.data('original');
                    relevant_span.html(reset);
                }
            );
            $(rep).click(
                function() {
                    $(error).removeClass('new');
                    $(error).addClass('modified');

                    var relevant_span = $("span[id$='esco" + err_coordinates + "']");

                    relevant_span.attr('chosen', '' + $(rep).text());
                    relevant_span.text($(rep).text());
                }
            );
            $(errrep).append(rep);
        });
    }

    if(data.url) {

        additional = true;

        var url = jQuery('<a/>', {
            target: 'blank',
            text: 'Mehr Informationen',
            href: data.url
        });

        var errurl = jQuery('<div/>', {
            class: 'errurl flexitem'
        });
        $(errurl).append(url);
        $(errurl).hide();
        $(error).append(errurl);

    }

    if(additional) {
        $(errarea).show();
        $(error).addClass('closed');
    }

    $(target).append(error);
}

function generateLine(index, sentence, target) {

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
        loadClick(event);
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

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}
