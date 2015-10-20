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
        base_error = generateBaseError(category, message, match.index, match.index + match[0].length, []);
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

            $.each(correct_sentences, function(index, correct) {
                console.log(correct);
            });

            if ($.inArray(editor_text, correct_sentences) > -1) {

                category = "Wiederholung";
                message = "Du hast Glück schon einmal genau so definiert. Denke dir bitte einen neuen Satz aus.";
                base_error = generateBaseError(category, message, 11, editor_text.length, []);
                errors.push(analyseError(errors.length, base_error));

                highlightRepetition($.inArray(editor_text, correct_sentences));
            }

        }

        console.log("sentences: " + correct_sentences.length);

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
                    base_error = generateBaseError(category, message, error_offset, editor_text.length, []);
                    errors.push(analyseError(errors.length, base_error));

                    callback(errors);

                } else {
                    sentence_data = [sentence_data];
                    var words = editor_text.split(/\s+/);

                    if (words.length > 30) {

                        var exceeding = words.slice(30, words.length).join(" ");

                        category = "Satzlänge";
                        message = "Achte bitte darauf, dass dein Satz nicht zu viele Wörter enthält. Versuche es mit einem kürzeren Satz erneut.";
                        base_error = generateBaseError(category, message, editor_text.lastIndexOf(exceeding), editor_text.length, []);
                        errors.push(analyseError(errors.length, base_error));

                    }

                    if (!endsWith(editor_text, ".")) {

                        $('#editor').text($('#editor').text() + ' ');

                        category = "Zeichensetzung";
                        message = "Achte bitte darauf, dass deine Eingabe das Satzende mit einem Punkt markiert.";
                        base_error = generateBaseError(category, message, editor_text.length, editor_text.length + 1, ["."]);
                        errors.push(analyseError(errors.length, base_error));

                    }

                    console.log("#1 errors: " + errors.length);

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

                                        base_error = generateBaseError(category, message, editor_text.length, editor_text.length, []);
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



function generateBaseError(ctg, msg, fromx, tox, reps) {

    /*  mocking up the structure of an error yielded by LanguageTool
     */

    var base_error = {attributes:
        {
            category: ctg,
            msg: msg,
            fromx: fromx,
            tox: tox
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

    var analysed_error = {
        'number': index,
        'coordinates': '' + error.attributes.fromx + error.attributes.tox,
        'attributes': error.attributes
    };

    return analysed_error;

}



function insertErrorSpans(errlist, target, offset) {

    /*  insert coloured error spans based on position data provided by LanguageTool; offset is needed to compute the
     *  correct positions for the current sentence only since the coordinates taken from the results of LanguageTool
     *  are based on the entire text;
     */

    var original = target.text();
    target.text('');

    var last_end = 0;

    $.each(errlist, function(index, error) {

        insertErrorSpan(error, target, original, last_end, offset);
        last_end = errlist[index].attributes.tox - offset;

        ////console.log('last');
        ////console.log(last_end);

    });

    var text = jQuery('<span/>', {
        class: 'text',
        text: original.substring(last_end, original.length)
    });
    $(target).append(text);

}

function insertErrorSpan(data, target, original, last_end, offset) {

    var err_start = data.attributes.fromx - offset;
    var err_end = data.attributes.tox - offset;

    var err_string = original.substring(err_start, err_end);

    ////console.log('computed');
    ////console.log(err_start - last_end);

    if(err_start - last_end > 0) {

        /*  insert span with pristine substring, separating the current error from the previous one if needed; the
         *  end position of the previous error is tracked by insertErrorSpans(...) and passed on as the parameter "last_end"
         */

        var text = jQuery('<span/>', {
            class: 'text',
            text: original.substring(last_end, err_start)
        });
        $(target).append(text);

    }else{

        console.log("Uh, oh! We've hit a snag!!");

    }

    if($('#' + 'esco' + data.coordinates).length == 0) {

        /*  the insertion of coloured error spans needs to keep track of error coordinates since LanguageTool may have
         *  several error suggestions for the same substring; if overlapping errors occur, they are linked to the same
         *  error span;
         */

        var mistake = jQuery('<span/>', {
            id: 'esco' + data.coordinates,
            class: 'mistake',
            original: err_string,
            text: err_string
        });
        $(mistake).hover(
            function() {
                $(".error[id$='co" + data.coordinates + "']").addClass( "hover" );
            }, function() {
                $(".error[id$='co" + data.coordinates + "']").removeClass( "hover" );
            }
        );
        $(mistake).dblclick(function(event) {
            $('html, body').animate({
                scrollTop: $(".error[id$='co" + data.coordinates + "']").offset().top
            }, 25);
            errorClick($(".error[id$='co" + data.coordinates + "']").find('.errmsg'), false);
        });
        $(target).append(mistake);

        //var old_target_id = $(target).attr('id');
        //var tbs_target_id = 'ts' + old_target_id.slice(2, old_target_id.length);

        //console.log(old_target_id);
        //console.log(tbs_target_id);

    }

    //console.log('start');
    //console.log(err_start);
    //console.log('end');
    //console.log(err_end);
    //console.log('err');
    //console.log(err_string);

}



function generateErrorBoxes(errlist, target) {

    var errorbox = jQuery('<div/>', {
        id: $(target).attr('id') + 'eb',
        class: 'errorbox',
    });
    $(errorbox).hide();
    $(target).append(errorbox);

    $.each(errlist, function(index, error) {
        generateErrorBox(error, errorbox);
    });

}

function generateErrorBox(data, target) {

    var additional = false;

    var error = jQuery('<div/>', {
        id: 'er' + pad(data.number, 2) + 'co' + data.coordinates,
        class: 'error'
    });
    $(error).hover(
        function() {
            $("span[id$='esco" + data.coordinates + "']").addClass('hover');
        }, function() {
            $("span[id$='esco" + data.coordinates + "']").removeClass('hover');
        }
    );
    $(error).hide();

    var err_info = [];

    var errcat = jQuery('<b/>', {
        text: data.attributes.category + ': '
    });

    var errmsg = jQuery('<div/>', {
        class: 'errmsg',
        text: data.attributes.msg
    });
    $(errmsg).click(function(event) {
        errorClick(event.target, true);
    });
    $(errmsg).prepend(errcat);
    //$(errmsg).hide();
    err_info.push(errmsg);
    $(error).append(errmsg);

    if(data.attributes.replacements) {

        additional = true;

        var errrep = jQuery('<div/>', {
            class: 'errrep',
        });
        $(errrep).hide();
        //err_info.push(errrep);
        $(error).append(errrep);

        var reps = data.attributes.replacements.split('#');

        $.each(reps, function(rep_index, replacement){

            var rep = jQuery('<div/>', {
                id: 'er' + pad(data.number, 2) + 'rp' + pad(rep_index, 2),
                class: 'rep',
                text: replacement
            });
            $(rep).hover(
                function() {
                    $("span[id$='esco" + data.coordinates + "']").text($(rep).text());
                }, function() {
                    var reset = $("span[id$='esco" + data.coordinates + "']").attr('chosen') ?
                        $("span[id$='esco" + data.coordinates + "']").attr('chosen') :
                        $("span[id$='esco" + data.coordinates + "']").attr('original');
                    $("span[id$='esco" + data.coordinates + "']").text(reset);
                }
            );
            $(rep).click(
                function() {
                    $("span[id$='esco" + data.coordinates + "']").attr('chosen', '' + $(rep).text());
                    $("span[id$='esco" + data.coordinates + "']").text($(rep).text());
                }
            );
            //$(rep).hide();
            //err_info.push(rep);
            $(errrep).append(rep);

        });
    }

    if(data.attributes.url) {

        additional = true;

        var url = jQuery('<a/>', {
            target: 'blank',
            text: 'Mehr Informationen',
            href: data.attributes.url
        });

        var errurl = jQuery('<div/>', {
            class: 'errurl',
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
        $(errmsg).addClass('closed');
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

    var loadbutton = jQuery('<div/>', {
        id: 'lo' + pad(index, 2),
        class: 'loadbutton',
    });
    $(loadbutton).click(function(event) {
        loadClick(event);
    });

    var loadarea = jQuery('<div/>', {
        id: 'la' + pad(index, 2),
        class: 'loadarea',
    });
    $(loadarea).append(loadbutton);

    var sentence_span = jQuery('<span/>', {
        id: 'ss' + pad(index, 2),
        class: 'sentence',
        text: sentence.string,
    });
    $(sentence_span).attr('start', sentence.start);
    $(sentence_span).attr('end', sentence.end);

    var textarea = jQuery('<div/>', {
        id: 'ta' + pad(index, 2),
        class: 'textarea',
    });
    $(textarea).append(sentence_span);

    var treedata = jQuery('<div/>', {
        id: 'td' + pad(index, 2),
        class: 'treedata',
        text: JSON.stringify(sentence.parse)
    });

    var dataarea = jQuery('<div/>', {
        id: 'da' + pad(index, 2),
        class: 'dataarea'
    });
    $(dataarea).append(treedata);

    var linebox = jQuery('<div/>', {
        id: 'lb' + pad(index, 2),
        class: 'linebox'
    });
    $(linebox).append(textarea);
    $(linebox).append(loadarea);
    $(linebox).append(dataarea);

    var line = jQuery('<div/>', {
        id: 'll' + pad(index, 2),
        class: 'line',
    });
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
