function checkForErrors(editor_text, callback) {

    /*  check input text; only compare with model sentences if:
     *      - text contains letter, comma, full-stop, hyphen characters only
     *      - text ends with a full stop,
     *      - texts comprises only one sentence,
     *      - that sentence does not exceed a certain length,
     *      - LanguageTool does not yield any errors.
     *      - the sentence complies with the model sentences
     *
     *  TODO: sentence length
     */

    var errors = validateCharacters(editor_text);

    if (errors.length > 0) {
        callback(errors);
    } else {
        var sentbox = $('#sentbox');
        var correct_sentences = sentbox.find('.textarea');

        if (correct_sentences.length > 0) {
            errors = excludeDuplicates(editor_text, correct_sentences);
        }
        if (errors.length > 0) {
            callback(errors);
        } else {
            $.post("/stanford_anfrage_parse", {text: editor_text}, function (parse_json) {

                if (!parse_json.document) {
                    var base_error = generateBaseError(
                        "Serverfehler",
                        "Bei der Anfrage an den Parser ist ein Fehler aufgetreten. Bitte entschuldige den Fehler und " +
                        "suche dir vorrübergehend eine andere Übungsaufgabe aus. Der Fehlerbericht wurde bereits weitergeleitet.",
                        11, editor_text.length + 1, [], editor_text);
                    errors.push(analyseError(errors.length, base_error));
                } else {

                    var sentence_data = parse_json.document.sentences.sentence;

                    errors = validateSentence(editor_text, sentence_data);

                }

                if (errors.length > 0) {
                    callback(errors);
                } else {

                    /*  restructure "sentence_data" because the hash structure returned by the CoreNLP pipeline for
                     *  a single sentence differs from the output for multiple sentences
                     */
                    sentence_data = [sentence_data];

                    $.post("/langtool_anfrage", {text: editor_text}, function (json) {

                        if (!json.matches) {
                            var base_error = generateBaseError(
                                "Serverfehler",
                                "Bei der Anfrage an die Rechtschreib- und Grammatikkorrektur ist ein Fehler " +
                                "aufgetreten. Bitte entschuldige den Fehler und suche dir vorrübergehend eine andere " +
                                "Übungsaufgabe aus. Der Fehlerbericht wurde bereits weitergeleitet.",
                                11, editor_text.length + 1, [], editor_text);
                            errors.push(analyseError(errors.length, base_error));
                        } else {
                            if (json.matches.error && json.matches.error.length > 0) {

                                $.each(json.matches.error, function (index, error) {
                                    if (error.attributes.fromx > 10) {
                                        var analysed_error = analyseError(index, error);
                                        errors.push(analysed_error);
                                    }
                                });
                            }
                        }

                        if (errors.length > 0) {
                            callback(errors);
                        } else {
                            validateParse(sentence_data[0].parsedTree, function (validation_msg) {

                                if (validation_msg) {
                                    var base_error = generateBaseError(
                                        "Satzbau",
                                        validation_msg,
                                        11, editor_text.length + 1, [], editor_text);
                                    errors.push(analyseError(errors.length, base_error));
                                } else {

                                    var sentence_start = sentence_data[0].tokens.token[0].CharacterOffsetBegin;
                                    var sentence_end = sentence_data[0].tokens.token[sentence_data[0].tokens.token.length - 1].CharacterOffsetEnd;
                                    var sentence_string = editor_text.substring(sentence_start, sentence_end);

                                    var sentence = {
                                        start: sentence_start,
                                        end: sentence_end,
                                        string: sentence_string,
                                        parse: sentence_data[0].parsedTree
                                    };

                                    var index = sentbox.find('.line').length;
                                    generateLine(index, sentence, sentbox);
                                }
                                callback(errors);
                            });
                        }

                    });
                }
            });
        }
    }
}

function validateCharacters(editor_text) {

    var errors = [],
        sanitise = XRegExp("[^\\s\\pL\\.,\\-]+", 'g'),
        match;

    while ((match = sanitise.exec(editor_text)) != null) {
        var base_error = generateBaseError(
            "Ungültige Zeichen",
            "Bitte verwende nur Buchstaben, Kommata und Punkte für deine Eingabe.",
            match.index, match.index + match[0].length, [], editor_text);
        errors.push(analyseError(errors.length, base_error));
    }
    return errors;
}

function excludeDuplicates(editor_text, correct_sentences) {

    var errors = [];

    correct_sentences = $.map(correct_sentences, function(correct, tree_index) {
        return $(correct).text();
    });

    if ($.inArray(editor_text, correct_sentences) > -1) {
        var base_error = generateBaseError(
            "Wiederholung",
            "Du hast Glück schon einmal genau so definiert. Denke dir bitte einen neuen Satz aus.",
            11, editor_text.length + 1, [], editor_text);
        errors.push(analyseError(errors.length, base_error));
        highlightRepetition($.inArray(editor_text, correct_sentences));
    }
    return errors;
}

function validateSentence(editor_text, sentence_data) {

    var errors = [],
        base_error;

    if (sentence_data.length) {

        var error_offset = sentence_data[0].tokens.token[sentence_data[0].tokens.token.length - 1].CharacterOffsetEnd;

        base_error = generateBaseError(
            "Satzanzahl",
            "Bitte gib nur einen einzelnen Satz ein.",
            error_offset, editor_text.length + 1, [], editor_text);
        errors.push(analyseError(errors.length, base_error));

        return errors;
    } else {
        var words = editor_text.split(/\s+/);

        if (words.length > 30) {

            var exceeding = words.slice(30, words.length).join(" ");

            base_error = generateBaseError(
                "Satzlänge",
                "Achte bitte darauf, dass dein Satz nicht zu viele Wörter enthält. Versuche es mit einem kürzeren Satz erneut.",
                editor_text.lastIndexOf(exceeding), editor_text.length, [], editor_text);
            errors.push(analyseError(errors.length, base_error));
        }

        if (!endsWith(editor_text, ".")) {
            
            var editor = $('#editor');
            $(editor).text($(editor).text() + ' ');
            
            base_error = generateBaseError(
                "Zeichensetzung",
                "Achte bitte darauf, dass deine Eingabe das Satzende mit einem Punkt markiert.",
                editor_text.length, editor_text.length + 1, ["."], editor_text);
            errors.push(analyseError(errors.length, base_error));
        }
        return errors;
    }
}



//helper functions
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
        'number': index
    };

    $.each(error.attributes, function(key, value) {
        if (key === 'errorlength') {
            value = value - 0;
        }
        analysed_error[key] = value;
    });

    return analysed_error;

}
