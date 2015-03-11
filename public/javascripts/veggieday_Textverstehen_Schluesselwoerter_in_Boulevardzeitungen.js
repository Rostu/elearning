$(init);
function init() {
    //shows the info buttons on the left side
    $('.redstripe').show();
    //add a content div to the second info button; first one is reserved
    jQuery('<div/>', {
        class: 'redtext'
    }).appendTo('#info2');
    $(".redtext").append(" <div> <a id='infolink' class='redlink' target='blank' href=\"http://www.duden.de/suchen/dudenonline\">Duden </a> </div>");

};