$(document).ready(function() {


    $(".sent[id^='tsc']").each(function(){
        $(this).clone().attr('id',$(this).attr('id').replace('tsc', 'tbsc')).appendTo('#WunderBox');
    });


    //$(latest_sent_clone).attr('id', $(latest_sent_clone).attr('id').replace('tsc', 'tbsc'));
    //$('#textboxarea').append(latest_sent_clone);
    //$(latest_sent_clone).appendTo('#textboxarea');

});