function startCheckUI(callback) {

    glueck_definition_editor_unlocked = false;

    $('#tree').slideUp(75);
    $('#treebox').find('.explanation').slideDown(75);
    $('#textbox').find('.explanation').slideUp(75);

    $('.linebox').removeClass('active');
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

    var sentbox = $('#sentbox');

    sentbox.slideDown(25, function() {
        $('#treebox').slideDown(25);
        if (!glueck_definition_tree_help) {
            addLink($("#info2"), generateLink("Tagset der Syntaxbäume", "tree-help"));
        }
        glueck_definition_tree_help = true;
    });

    var lines = sentbox.find('.line');

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

//source: http://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser
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

function markDeleted(error) {
    $(error).removeClass('new');
    $(error).removeClass('modified');
    $(error).children(':not(.errtitle)').slideUp(25);
    $(error).find('.errarea').hide();
    $(error).removeClass('closed');
    $(error).removeClass('open');
    $(error).addClass('deleted');
}

function addLink(info, link) {
    info.children("#infolink").remove();
    clear_help(info);
    info.append(link);
    show_help(info);
}

function clear_help(info) {
    info.children().animate({color: "#A91211"}, 50);
    info.children().hide();
    info.animate({width: "0px", paddingRight: "12px"},100);
}

function show_help(info) {
    info.show();
    info.animate({width: info.children('.redlink').width(), paddingRight: "20px"}, 100);
    info.children().show();
    info.children().animate({color: "#ffffff"}, 200);
}
