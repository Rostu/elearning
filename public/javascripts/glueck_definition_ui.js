

function startCheckUI(callback) {

    $('#treebox').find('.explanation').slideDown(75);
    $('#textbox').find('.explanation').slideUp(75);
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
            callback();
        });
    });

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



//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################



function displayLines() {

    /*  displays sentences and their errors (if any) one at a time with some delay once they are generated dynamically
     */

    var lines = $('.line');

    (function lineLoop(index) {
        setTimeout(function () {

            $(lines[index]).slideDown(25);

            if (++index < lines.length) {

                lineLoop(index);

            } else {

                var errorboxes = $('.errorbox');

                (function errorboxLoop(index) {
                    setTimeout(function () {

                        $(errorboxes[index]).slideDown(25);

                        if (++index < errorboxes.length) {
                            errorboxLoop(index);
                        }

                    }, 25)
                })(0);

                var errors = $('.error');

                (function errorLoop(index) {
                    setTimeout(function () {

                        $(errors[index]).slideDown(25);

                        if (++index < errors.length) {
                            errorLoop(index);
                        }

                    }, 25)
                })(0);

            }

        }, 25)
    })(0);

}

function hideLines(callback) {

    /*  hides sentences and their errors one at a time with some delay before another check is performed
     */

    var errorboxes = $('.errorbox');

    (function errorboxLoop(index) {
        setTimeout(function () {

            $(errorboxes[index]).slideDown(25);

            if (++index < errorboxes.length) {

                errorboxLoop(index);

            } else {

                var lines = $('.line');

                if (lines) {

                    (function lineLoop (index) {
                        setTimeout(function () {

                            $(lines[index]).slideUp(25);

                            if (++index < lines.length) {

                                lineLoop(index);

                            }else{

                                $('#sentbox').slideUp(25);

                                callback();

                            }

                        }, 5)
                    })(0);

                }

            }

        }, 25)
    })(0);

}



//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################



function generateLines(sentence_data, sentences, errors, target, callback) {

    /*  loop for dynamically generating divs for display of sentence data
     *
     *  TODO: variable sentence not used yet
     */

    $.each(sentences, function (index, sentence) {

        var parse = $.extend(true, {}, sentence.parse);
        //translation_test(parse);

        validate_parse(parse);

        var line_data = generateLine(index, sentence, target);
        var relevant_errors = [];

        $.each(errors, function(err_index, error) {
            if (error.attributes.fromx - line_data.start >= 0 && error.attributes.tox - line_data.end <= 0) {
                relevant_errors.push(error);
            }
        });

        if(relevant_errors.length > 0) {

            /*  highlight erroneous substrings by inserting coloured spans and generate divs for display of
             *  error data if any errors are present in the current sentence
             */

            var sentence_span = $(line_data.line).find("span[id^='ss']");

            insertErrors(relevant_errors, sentence_span, line_data.start);
            generateErrors(relevant_errors, line_data.line);

            /*var sentence_span = $(line_data.line).find('.textarea').children().first();

             insertErrors(relevant_errors, textspan, line_data.start);

             generateErrors(relevant_errors, line_data.line);*/

        }

    });

    callback();

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
        id: 'td' + pad(i, 2),
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

    $(target).append(line);

    return {start: sentence.start, end: sentence.end, line: line };

}

function handleFinalErrors(final_errors, callback) {

    insertErrors(final_errors, $('#editor'), 0);
    generateErrors(final_errors, $('#textbox'));

    callback();

}



//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################



function checkSentences_old(editor_text, other_errors, callback) {

    $.post("/stanford_anfrage", {sentences: editor_text}, function (json) {

        var sentence_data = json.document.sentences.sentence;
        var sentences = [];

        /*  restructure sentence data, adding some information
         */

        //console.log(json.document.sentences.sentence.length);

        /*  allow texts comprising one sentence only; needed because the parser removes one intermediate level of
         *  the returned data in this case
         */

        if (!json.document.sentences.sentence.length) {
            sentence_data = [sentence_data];
        }

        $.each(sentence_data, function (index, sentence) {

            //console.log(sentence);
            console.log(JSON.stringify(sentence.parsedTree));


            var sentence_start = sentence.tokens.token[0].CharacterOffsetBegin;
            var sentence_end = sentence.tokens.token[sentence.tokens.token.length - 1].CharacterOffsetEnd;

            var sentence_string = editor_text.substring(sentence_start, sentence_end)  + ' ';
            sentences.push({start: sentence_start, end: sentence_end, string: sentence_string, parse: sentence.parsedTree});

            //console.log(sentence.parse);

        });

        //console.log(sentence_data);
        //console.log(sentences);

        generateLines(sentence_data, sentences, other_errors, $('#sentbox'), function() {

            /*  clone lines and replace editor text with them
             */

            $('#editor').text('');

            $.each($(".sentence[id^='ss']"), function(index, span) {
                $(span).clone(true, true).attr('id',$(this).attr('id').replace('ss', 'tbss')).appendTo('#editor');
            });

            $.each($('#textbox').find(".mistake[id^='esco']"), function(index, span) {
                $(span).attr('id', 't' + $(this).attr('id'));
            });

            $('#sentbox').slideDown(25, function() {
                $('#sentboxheader').slideDown(25);
                callback();
            });

        });

    });

}

function checkErrors_old(editor_text, callback) {

    $.post("/langtool_anfrage", {sentence: editor_text}, function (json) {

        var final_errors = [];
        var other_errors = [];

        if (json.matches.error && json.matches.error.length > 0) {
            $.each(json.matches.error, function (index, error) {

                /*  restructure error data, adding some information
                 */

                var analysed_error = {
                    'number': index,
                    'coordinates': '' + error.attributes.fromx + error.attributes.tox,
                    'length': error.attributes.tox - error.attributes.fromx,
                    'attributes': error.attributes
                };

                if (error.attributes.msg === "Fügen Sie zwischen Sätzen ein Leerzeichen ein") {

                    final_errors.push(analysed_error);

                } else {

                    other_errors.push(analysed_error);
                    //console.log(analysed_error);

                }

            });
        }


        callback({final: final_errors, other: other_errors});

    });

}

function checkClick_old() {

    /*  get the text in the editor and and reinsert it, deleting all additional markup
     *
     *  TODO: smart markup removal (preserving intentional line breaks)
     */

    var editor_text = $('#editor').text();
    $('#editor').text(editor_text);

    //var editor_text = $('#editor').text();

    /*var test = document.getElementById("editor").innerHTML;

     console.log('innerHTML');
     console.log(test);

     var regex = /<br\s*[\/]?>/gi;
     test = test.replace(regex, "\n");

     console.log('test');
     console.log(test);

     $('#editor').html(test);

     var editor_text = $('#editor').text();

     console.log('editor_text');
     console.log(editor_text);*/

    //$('#editor').text(editor_text);

    //$('#editor').text(editor_text);

    /*var test = document.getElementById("editor");

     console.log(test.innerHTML);

     var regex = /<br\s*[\/]?>/gi;
     $("#mydiv").html(str.replace(regex, "\n"));

     console.log(test.innerHTML.replace('<br>', '\n'));

     test.innerHTML = test.innerHTML.replace('<br>', '\n');

     var editor_text = test.textContent || $('#editor').innerText;

     //console.log(test);

     console.log(test.textContent);
     console.log(test.innerText);

     //$('#editor').textContent || $('#editor').innerText;

     $('#editor').text(editor_text);

     //console.log($('#editor').html());*/

    var fixed_callback = function () {

        displayLines();

        $('#textbox').find('.spinner').fadeOut(25, function () {
            $(this).closest('.spinnerbox').slideUp(25, function () {
                $(this).closest('#textoverlay').fadeOut(25);
            });
        });
    };

    $('#textoverlay').fadeIn(25, function() {

        $('#textbox').find('.spinnerbox').slideDown(25, function() {

            $(this).find('.spinner').fadeIn(25);

            hideLines(function() {

                $('.errorbox').remove();
                $('.line').remove();

                checkErrors(editor_text, function (error_data) {

                    /*  filter error data in order to detect issues with sentence separation and only use
                     *  CoreNLP if no such issues occur; otherwise, display sentence-final errors;
                     */

                    if (error_data.final.length == 0) {

                        /*errorData.other = errorData.other.sort(function(a,b) {
                         return b.length - a.length;
                         });*/

                        if (error_data.other.length == 0) {
                            //TODO: add some form of positive feedback
                        }
                        checkSentences(editor_text, error_data.other, fixed_callback);

                    } else {

                        handleFinalErrors(error_data.final, fixed_callback);

                    }

                });

            });

        });

    });

}