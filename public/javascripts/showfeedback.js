$(document).ready(function() {

    $.get("get_feedback_items", function (data) {
        data.forEach(function(Item) {

            $("#wrapper").append("<div id='"+Item._id+"' class='feedback_item'><h2>" +
                Item.site + "</h2>" +
                 "<div class='feedback_item_contain'>" +
                "<h4>design</h4>" +
                "<p>" + Item.design + "</p>" +
                "<h4>aufgabe</h4>" +
                "<p>" + Item.aufgabe + "</p>" +
                "<h4>funktion</h4>" +
                "<p>" + Item.funktion + "</p>" +
                "</div>" +
                "<a id='delbutton' href='delfeedback"+Item._id+"'>löschen</a> " +
                "</div>");
        });
    });

});
