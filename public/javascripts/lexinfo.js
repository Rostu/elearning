
$(function(){
    $(document.body).bind('mouseup', function(e){
        var selection;

        if (window.getSelection) {
            selection = window.getSelection();
        } else if (document.selection) {
            selection = document.selection.createRange();
        }

        selection.toString() !== '' && alert('"' + selection.toString() + '" was selected at ' + e.pageX + '/' + e.pageY);
    });
});