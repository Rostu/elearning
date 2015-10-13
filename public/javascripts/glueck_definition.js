$( init );

glueck_definition_trees_enabled = true;

function init() {

    $('#textoverlay').hide();
    $('#sentbox').hide();
    $('#treebox').hide();

    $('#checkbutton').click(function() {
        checkClick();
    });

    insertTestData();

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

function checkClick() {

    /*  get the text in the editor and and reinsert it, deleting all additional markup
     */

    var editor_text = "Glück ist, " + $('#editor').text().trim();
    $('#editor').text($('#editor').text().trim());

    startCheckUI(function() {

        checkForErrors(editor_text, function (error_data) {

            /*  filter error data in order to detect issues with sentence separation and only use
             *  CoreNLP if no such issues occur; otherwise, display sentence-final errors;
             */

            if (error_data.length == 0) {
                //TODO: add some form of positive feedback
                stopCheckUI(function () {
                    $('#editorarea').addClass('correct');
                    $('#editorarea').effect("highlight", {color: '#A8D54D'}, function () {
                        $('#editorarea').effect("highlight", {color: '#A8D54D'}, function () {
                            $('#editorarea').removeClass('correct');


                        });
                    });
                });
            } else {

                insertErrorSpans(error_data, $('#editor'), 11);
                generateErrorBoxes(error_data, $('#textbox'));

                stopCheckUI(function() {

                    $('#editorarea').addClass('incorrect');

                    $('#editorarea').effect("highlight", {color: '#FF7F7F'}, function() {
                        $('#editorarea').effect("highlight", {color: '#FF7F7F'});
                    });

                    displayErrors($('#textbox'));
                });
            }
        });
    });
}

function checkForErrors(editor_text, callback) {

    var errors = [];

    var msg = "";
    var base_error = {};

    if (!endsWith(editor_text, ".")) {

        msg = "Achte bitte darauf, dass deine Eingabe das Satzende mit einem Punkt kennzeichnet.";
        base_error = generateBaseError(msg, editor_text.length);
        errors.push(analyseError(0, base_error));

        callback(errors);
    }

    if(editor_text.split(/\s+/).length > 30) {

        msg = "Achte bitte darauf, dass dein Satz nicht zu viele Wörter enthält. Beschränke dich bitte auf kurze Sätze.";
        base_error = generateBaseError(msg, editor_text.length);
        errors.push(analyseError(0, base_error));

        callback(errors);

    }

    } else {

        $.post("/langtool_anfrage", {sentence: editor_text}, function (json) {

            if (json.matches.error && json.matches.error.length > 0) {
                $.each(json.matches.error, function (index, error) {



                    if (error.attributes.fromx > 10) {
                        var analysed_error = analyseError(index, error);
                        errors.push(analysed_error);
                    }
                });
            }
            callback(errors);
        });
    }
}

function generateBaseError(msg, text_length) {

    /*  mocking up the structure of an error yielded by LanguageTool
     */

    var base_error = {attributes:
    {
        category: "Sonstiges",
        msg: msg,
        fromx: text_length,
        tox: text_length
    }
    };

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

function analyseSentence(editor_text, errors, callback) {

    $.post("/stanford_anfrage", {sentences: editor_text}, function (json) {

        var sentence_data = json.document.sentences.sentence;
        var sentences = [];

        /*  allow texts comprising one sentence only; needed because the parser removes one intermediate level of
         *  the returned data in this case
         */

        if (!json.document.sentences.sentence.length) {
            sentence_data = [sentence_data];
        }

        /*  restructure sentence data, adding some information
         */

        $.each(sentence_data, function (index, sentence) {

            var sentence_start = sentence.tokens.token[0].CharacterOffsetBegin;
            var sentence_end = sentence.tokens.token[sentence.tokens.token.length - 1].CharacterOffsetEnd;

            var sentence_string = editor_text.substring(sentence_start, sentence_end)  + ' ';
            sentences.push({start: sentence_start, end: sentence_end, string: sentence_string, parse: sentence.parsedTree});

            console.log(sentences);

        });

        /*  highlight erroneous substrings by inserting coloured spans and generate divs for display of
         *  error data if any errors are present in the current sentence
         */

        insertErrors(errors, $('#editor'), 11);
        generateErrors(errors, $('#textbox'));

        /*var sentence_span = $(line_data.line).find('.textarea').children().first();

         insertErrors(relevant_errors, textspan, line_data.start);

         generateErrors(relevant_errors, line_data.line);*/

        callback();
    });

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
         *  end position of the previous error is tracked by insertErrors(...) and passed on as the parameter "last_end"
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

//helper functions
function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
