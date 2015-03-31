$(init);
function init() {

    //shows the info buttons on the left side
    $('#info1').show();
    $('#info2').show();
    $('#info1').html("<a id='infolink' class='redlink' target='_tab' href=\"http://www.duden.de/suchen/dudenonline\">Duden </a> ");
    $('#info2').html("<a id='infolink' class='redlink' target='_tab' href=\'http://wortschatz.uni-leipzig.de/'>Wortschatzportal</a> ");

};