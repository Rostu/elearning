function startCheckUI(callback) {

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
            callback();
        });
    });

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

            console.log(error_data.length);

            if (error_data.length == 0) {
                //TODO: add some form of positive feedback
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
