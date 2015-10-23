$( init );

glueck_definition_trees_enabled = true;


function init() {

    $('#textoverlay').hide();
    $('#sentbox').hide();
    $('#treebox').hide();

    $('#editor').keydown(function(event) {
        editorEnterDown(event);
    });
    $('#editor').keyup(function(event) {
        editorEnterUp(event);
    });
    $('#checkbutton').click(function() {
        checkClick();
    });
    placeCaretAtEnd(document.getElementById('editor'));
    document.getElementById("editor").addEventListener("input", function() {
        updateErrorSpans();
    }, false);
    //insertTestData();
}

function insertTestData() {

    var test_sentences = [
        "wenn die Sonne scheint."
        /*"Fügen Sie hier Ihren Dr. text ein.",
        "Klicken Sie nach der Prüfung auf die farbig unterlegten Textstellen. Klicken Sie nach der Prüfung auf die farbig unterlegten Textstellen.",
        "Klicken Sie nach der Prüfung auf die farbig unterlegten Textstellen. oder nutzen Sie diesen Text als Beispiel für ein Paar Fehler , die LanguageTool erkennen kann: Ihm wurde Angst und bange, als er davon hörte.",
        "( Eine Rechtschreibprüfun findet findet übrigens auch statt.",
        "Fügen Sie hier Ihren text ein. Fügen Sie hier Ihren text ein."*/
    ];
    var selection = [0/*, 1, 2, 3, 4*/];
    var test_text = "";

    for(i = 0; i < selection.length; i++) {
        test_text += test_sentences[selection[i]];
    }

    $('#editor').text(test_text);
    //console.log($('#editor').text());

}

function checkForErrors(editor_text, callback) {

    /*  check input text; only compare with model sentences if:
     *      - text ends with a full stop,
     *      - texts comprises only one sentence,
     *      - that sentence does not exceed a certain length,
     *      - LanguageTool does not yield any errors.
     *
     */

    var errors = [],

        category = "",
        message = "",
        base_error = {},

        sanitise = XRegExp("[^\\s\\pL\\.,\\-]+", 'g'),
        match;

    while ((match = sanitise.exec(editor_text)) != null) {

        category = "Ungültige Zeichen";
        message = "Bitte verwende nur Buchstaben, Kommata und Punkte für deine Eingabe.";
        base_error = generateBaseError(category, message, match.index, match.index + match[0].length, [], editor_text);
        errors.push(analyseError(errors.length, base_error));

        console.log("match found at " + match.index);
        console.log(JSON.stringify(match[0].length));
        console.log(JSON.stringify(match));
    }

    if (errors.length > 0) {
        callback(errors);
    } else {

        var correct_sentences = $('#sentbox').find('.textarea');

        if (correct_sentences.length > 0) {

            correct_sentences = $.map(correct_sentences, function(correct, tree_index) {
                return $(correct).text();
            });

            if ($.inArray(editor_text, correct_sentences) > -1) {

                category = "Wiederholung";
                message = "Du hast Glück schon einmal genau so definiert. Denke dir bitte einen neuen Satz aus.";
                base_error = generateBaseError(category, message, 11, editor_text.length, [], editor_text);
                errors.push(analyseError(errors.length, base_error));

                highlightRepetition($.inArray(editor_text, correct_sentences));
            }

        }

        if (errors.length > 0) {
            callback(errors);
        } else {
            $.post("/stanford_anfrage_parse", {text: editor_text}, function (parse_json) {

                //console.log(JSON.stringify(parse_json));

                var sentence_data = parse_json.document.sentences.sentence;

                if (sentence_data.length) {

                    var error_offset = sentence_data[0].tokens.token[sentence_data[0].tokens.token.length - 1].CharacterOffsetEnd;

                    category = "Satzanzahl";
                    message = "Bitte gib nur einen einzelnen Satz ein.";
                    base_error = generateBaseError(category, message, error_offset, editor_text.length, [], editor_text);
                    errors.push(analyseError(errors.length, base_error));

                    callback(errors);

                } else {
                    sentence_data = [sentence_data];
                    var words = editor_text.split(/\s+/);

                    if (words.length > 30) {

                        var exceeding = words.slice(30, words.length).join(" ");

                        category = "Satzlänge";
                        message = "Achte bitte darauf, dass dein Satz nicht zu viele Wörter enthält. Versuche es mit einem kürzeren Satz erneut.";
                        base_error = generateBaseError(category, message, editor_text.lastIndexOf(exceeding), editor_text.length, [], editor_text);
                        errors.push(analyseError(errors.length, base_error));

                    }

                    if (!endsWith(editor_text, ".")) {

                        $('#editor').text($('#editor').text() + ' ');

                        category = "Zeichensetzung";
                        message = "Achte bitte darauf, dass deine Eingabe das Satzende mit einem Punkt markiert.";
                        base_error = generateBaseError(category, message, editor_text.length, editor_text.length + 1, ["."], editor_text);
                        errors.push(analyseError(errors.length, base_error));

                    }

                    if (errors.length > 0) {
                        callback(errors);
                    } else {
                        $.post("/langtool_anfrage", {sentence: editor_text}, function (json) {

                            //console.log("langtool");

                            if (json.matches.error && json.matches.error.length > 0) {

                                $.each(json.matches.error, function (index, error) {
                                    if (error.attributes.fromx > 10) {
                                        var analysed_error = analyseError(index, error);
                                        errors.push(analysed_error);
                                    }
                                });

                            }

                            //console.log("#2 errors: " + errors.length);

                            if (errors.length > 0) {
                                callback(errors);
                            } else {
                                validateParse(sentence_data[0].parsedTree, function (validation_msg) {

                                    //console.log("validate");

                                    if (validation_msg) {

                                        //console.log("sent if");

                                        category = "Satzbau";
                                        message = validation_msg;
                                        //console.log(message);

                                        base_error = generateBaseError(category, message, editor_text.length, editor_text.length, [], editor_text);
                                        errors.push(analyseError(errors.length, base_error));

                                    } else {

                                        //console.log("sent else");

                                        var sentence_start = sentence_data[0].tokens.token[0].CharacterOffsetBegin;
                                        var sentence_end = sentence_data[0].tokens.token[sentence_data[0].tokens.token.length - 1].CharacterOffsetEnd;
                                        var sentence_string = editor_text.substring(sentence_start, sentence_end);

                                        var sentence = {
                                            start: sentence_start,
                                            end: sentence_end,
                                            string: sentence_string,
                                            parse: sentence_data[0].parsedTree
                                        };

                                        var index = $('#sentbox').find('.line').length;

                                        generateLine(index, sentence, $('#sentbox'));

                                    }
                                    callback(errors);
                                });
                            }
                        });
                    }
                }
            });
        }
    }
}



function generateBaseError(ctg, msg, fromx, tox, reps, context) {

    /*  mocking up the structure of an error yielded by LanguageTool
     */

    var base_error = {attributes:
        {
            category: ctg,
            msg: msg,
            fromx: fromx,
            tox: tox,
            context: context
        }
    };

    if (reps.length > 0) {
        base_error.attributes.replacements = reps.join("#");
    }

    return base_error;

}

function analyseError(index, error) {

    /*  restructure error data, adding some information
     */

    if (endsWith(error.attributes.context.slice(error.attributes.fromx, error.attributes.tox), '.')) {
        error.attributes.tox = error.attributes.tox - 1;
        error.attributes.errorlength = error.attributes.errorlength - 1;
    }

    var analysed_error = {
        'number': index,
    };

    $.each(error.attributes, function(key, value) {
        if (key === 'errorlength') {
            value = value - 0;
        }
        analysed_error[key] = value;
    });

    return analysed_error;

}


function generateSpanTrees(errors) {

    var span_subtrees = {},
        items = [];

    var errors_length_asc = $.extend(true, [], errors);
    errors_length_asc = errors_length_asc.sort(dynamicSort('errorlength'));

    $.each(errors_length_asc, function(c, container) {

        span_subtrees[container.number] = [];

        $.each(errors_length_asc, function(i, item) {

            if (c != i
                && items.indexOf(item.number) < 0
                && item.fromx >= container.fromx
                && item.tox <= container.tox) {
                span_subtrees[container.number].push(item.number);
                items.push(item.number);
            }

        });

    });
    console.log('items: ' + JSON.stringify(items));
    console.log('span_subtrees: ' + JSON.stringify(span_subtrees));



    var error_numbers = [];

    for (var key in span_subtrees) {
        error_numbers.push(key - 0);
    }
    console.log('error_numbers: ' + JSON.stringify(error_numbers));



    var roots = error_numbers.filter(function(i) {
        return items.indexOf(i) < 0;
    });
    console.log('roots: ' + JSON.stringify(roots));



    var span_trees = [];

    $.each(roots, function(index, root) {
        span_trees.push(generateSpanTree(root, errors, span_subtrees));
    });

    return span_trees;
}

function generateSpanTree(index, errors, span_subtrees) {

    if(span_subtrees[index].length > 0) {

        var mistake = {
            type: 'mistake',
                index: index,
                start: errors[index].fromx,
                end: errors[index].tox,
                children: []
        };
        $.each(span_subtrees[index], function(i, child) {
            mistake.children.push(generateSpanTree(child, errors, span_subtrees));
        });
        /*
        mistake.start = mistake.children[0].start;
        mistake.end = mistake.children[mistake.children.length - 1].end;
        */
    } else {
        var mistake = {
            type: 'mistake',
            index: index,
            start: errors[index].fromx,
            end: errors[index].tox,
        };
    }
    return mistake;
}

function generateText(start, end) {
    var text = {
        type: 'text',
        start: start,
        end: end
    };
    return text;
}

function insertTexts(mistakes, last_end, end) {

    var mistakes_and_text = [];

    $.each(mistakes, function(index, mistake){
        console.log('mistake: ' + JSON.stringify(mistake));
        console.log('last_end: ' + last_end);
        if(mistake.start < last_end && mistake.children[0].start >= last_end) {
            mistake.start = mistake.children[0].start;
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

function insertErrorSpans(errors, target, offset, end) {

    /*  insert coloured error spans based on position data provided by LanguageTool; offset is needed to compute the
     *  correct span positions for the current target only because the coordinates taken from the results of LanguageTool
     *  are based on the entire text;
     */

    /*
     text text text text.
     */

    var original_text = target.text();
    target.text('');


    var span_trees = generateSpanTrees(errors);
    console.log('span_trees: ' + JSON.stringify(span_trees));



    var mistakes_and_text = insertTexts(span_trees, offset, end);
    console.log('mistakes_and_text: ' + JSON.stringify(mistakes_and_text));

    var content = compileTargetContent(errors, mistakes_and_text, original_text, offset);
    console.log(content);

    $(target).append(content);
}


function insertErrorSpans_old(errlist, containers, items, span_subtrees, target, offset) {

    /*  insert coloured error spans based on position data provided by LanguageTool; offset is needed to compute the
     *  correct span positions for the current target only because the coordinates taken from the results of LanguageTool
     *  are based on the entire text;
     */

    /*
    text text text text.
     */

    var original = target.text();
    target.text('');

    var last_end = 0;

    var new_containers = {};

    $.each(errlist, function(index, error) {

        if (items.indexOf(index) < 0) {

            containers[index] = insertErrorSpan(error, target, original, last_end, offset);
            new_containers[index] = containers[index];
            last_end = errlist[index].tox - offset;

            ////console.log('last');
            ////console.log(last_end);
        }

    });

    var new_container_keys = [];

    for (var key in new_containers) {
        new_container_keys.push(key);
    }

    items = arrayUnique(items.concat(new_container_keys));
    console.log('items with roots: ' + items);

    $.each(new_containers, function(key, value) {

        if (span_subtrees[key].length > 0) {
            items = items.filter(function(i) {
                return span_subtrees[key].indexOf(i) < 0;
            });
            console.log('items without root\'s children: ' + items);

            if (items.length < errlist.length) {

                console.log('key: ' + key);
                console.log('value: ' + value);
                console.log('offset: ' + errlist[key].fromx);

                insertErrorSpans(errlist, containers, items, span_subtrees, value, errlist[key].fromx);
            } else {
                return;
            }
        }
    });

    var text = jQuery('<span/>', {
        class: 'text',
        text: original.substring(last_end, original.length)
    });
    $(target).append(text);

}

function compileTargetContent(errors, mistakes_and_text, original_text, offset) {

    var contents = [];

    $.each(mistakes_and_text, function(index, mnt){
        if(mnt.children) {
            var mistake = generateMistake(errors, original_text, mnt, offset);
            $(mistake).text('');
            $.each(compileTargetContent(errors, mnt.children, original_text, offset), function(index, item) {
                mistake.append(item);
            });
            contents.push(mistake);
        } else {
            if(mnt.type === 'text') {

                var text = jQuery('<span/>', {
                    class: 'text',
                    text: original_text.substring(mnt.start - offset, mnt.end - offset)
                });
                contents.push(text);

            } else {


                contents.push(generateMistake(errors, original_text, mnt, offset));
            }
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
        original: err_string,
        text: err_string
    });
    $(mistake).hover(
        function() {
            $(".error[id$='co" + err_coordinates + "']").addClass( "hover" );
        }, function() {
            $(".error[id$='co" + err_coordinates + "']").removeClass( "hover" );
        }
    );
    $(mistake).dblclick(function(event) {
        $('html, body').animate({
            scrollTop: $(".error[id$='co" + err_coordinates + "']").offset().top
        }, 25);
        errorClick($(".error[id$='co" + err_coordinates + "']"), false);
    });
    return mistake;
}

function insertErrorSpan(data, target, original, last_end, offset) {

    var err_start = data.fromx - offset;
    var err_end = data.tox - offset;
    var err_coordinates = '' + data.fromx + data.tox;
    var err_string = original.substring(err_start, err_end);

    if(err_start - last_end > 0) {

        /*  insert span with pristine substring, separating the current error from the previous one if needed; the
         *  end position of the previous error is tracked by insertErrorSpans(...) and passed on as the parameter "last_end"
         */

        var text = jQuery('<span/>', {
            class: 'text',
            text: original.substring(last_end, err_start)
        });
        $(target).append(text);

    }

    if($('#' + 'esco' + err_coordinates).length == 0) {

        /*  the insertion of coloured error spans needs to keep track of error coordinates since LanguageTool may have
         *  several error suggestions for the same substring; if overlapping errors occur, they are linked to the same
         *  error span;
         */

        var mistake = jQuery('<span/>', {
            id: 'esco' + err_coordinates,
            class: 'mistake',
            original: err_string,
            text: err_string
        });
        $(mistake).hover(
            function() {
                $(".error[id$='co" + err_coordinates + "']").addClass( "hover" );
            }, function() {
                $(".error[id$='co" + err_coordinates + "']").removeClass( "hover" );
            }
        );
        $(mistake).dblclick(function(event) {
            $('html, body').animate({
                scrollTop: $(".error[id$='co" + err_coordinates + "']").offset().top
            }, 25);
            errorClick($(".error[id$='co" + err_coordinates + "']"), false);
        });
        $(target).append(mistake);

        return mistake;

    } else {
        return $('#' + 'esco' + err_coordinates);
    }
}



function generateErrorBox(errlist, target) {

    var errorbox = jQuery('<div/>', {
        id: $(target).attr('id') + 'eb',
        class: 'errorbox flexcontainer flexitem',
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
        class: 'errtitle flexcontainer flexitem',
    });

    var errstatus = jQuery('<div/>', {
        class: 'errstatus flexitem',
    });
    $(errstatus).click(function(event) {
        errorClick($(error), true);
    });
    $(errtitle).append(errstatus);

    var errmsg = jQuery('<div/>', {
        class: 'errmsg flexitem',
        text: data.msg
    });
    $(errmsg).click(function(event) {
        errorClick($(error), true);
    });

    var errcat = jQuery('<b/>', {
        text: data.category + ': '
    });
    $(errmsg).prepend(errcat);
    $(errtitle).append(errmsg);

    var errarea = jQuery('<div/>', {
        class: 'errarea flexcontainer flexitem',
    });
    $(errarea).click(function(event) {
        errorClick($(error), true);
    });
    $(errarea).hide();

    var errtriangle = jQuery('<div/>', {
        class: 'errtriangle flexitem',
    });
    $(errarea).append(errtriangle);
    $(errtitle).append(errarea);

    err_info.push(errtitle);
    $(error).append(errtitle);

    if(data.replacements) {

        additional = true;

        var errrep = jQuery('<div/>', {
            class: 'errrep flexcontainer flexitem',
        });
        $(errrep).hide();
        //err_info.push(errrep);
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
                    var reset = $("span[id$='esco" + err_coordinates + "']").attr('chosen') ?
                        $("span[id$='esco" + err_coordinates + "']").attr('chosen') :
                        $("span[id$='esco" + err_coordinates + "']").attr('original');
                    $("span[id$='esco" + err_coordinates + "']").text(reset);
                }
            );
            $(rep).click(
                function() {
                    $(error).removeClass('new');
                    $(error).addClass('modified');
                    $("span[id$='esco" + err_coordinates + "']").attr('chosen', '' + $(rep).text());
                    $("span[id$='esco" + err_coordinates + "']").text($(rep).text());
                }
            );
            //$(rep).hide();
            //err_info.push(rep);
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
            class: 'errurl flexitem',
        });
        $(errurl).append(url);
        $(errurl).hide();
        //err_info.push(errurl);
        $(error).append(errurl);

    }

    /*var errdat = jQuery('<div/>', {
        class: 'errdat',
        text: JSON.stringify(data.attributes)
    });
    $(errdat).hide();
    //err_info.push(errdat);
    $(error).append(errdat);*/

    if(additional) {
        $(errarea).show();
        $(error).addClass('closed');
    }

    $(target).append(error);

    /*$(error).slideDown(25, function() {

     (function infoLoop (index) {
     setTimeout(function () {

     $(err_info[index]).slideDown(25);

     if (++index < err_info.length) infoLoop(index);
     }, 25)
     })(0);

     });*/

}

function generateLine(index, sentence, target) {

    var line = jQuery('<div/>', {
        id: 'll' + pad(index, 2),
        class: 'line flexcontainer flexitem',
    });

    var linebox = jQuery('<div/>', {
        id: 'lb' + pad(index, 2),
        class: 'linebox flexcontainer flexitem'
    });

    var textarea = jQuery('<div/>', {
        id: 'ta' + pad(index, 2),
        class: 'textarea flexitem',
    });

    var sentence_span = jQuery('<span/>', {
        id: 'ss' + pad(index, 2),
        class: 'sentence',
        text: sentence.string,
    });
    $(sentence_span).attr('start', sentence.start);
    $(sentence_span).attr('end', sentence.end);
    $(textarea).append(sentence_span);
    $(linebox).append(textarea);

    var loadarea = jQuery('<div/>', {
        id: 'la' + pad(index, 2),
        class: 'loadarea flexcontainer flexitem',
    });

    var loadbutton = jQuery('<div/>', {
        id: 'lo' + pad(index, 2),
        class: 'loadbutton flexitem',
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
