$(document).ready(function() {

    //on click event for underlined text. As wished just a link to the corresponding duden.de page
    $('span.underline').click(function () {
        window.open('http://www.duden.de/suchen/dudenonline/'+$(this).attr("inhalt"),'_blank');
    });
});