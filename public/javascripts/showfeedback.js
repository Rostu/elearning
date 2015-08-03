$(document).ready(function() {

    $.get("get_feedback_items", function (data) {
        data.forEach(function(Item) {

            $("#wrapper").append("<div id='"+Item._id+"' class='feedback_item'><h2>" +
                Item.site + "</h2>" +
                 "<div class='feedback_item_contain'>" +
                "<h4>Bewertung dieses Benutzers:</h4>"+
                "<b>Design: "+Item.design+" </b></br>" +
                "<b>Aufgabenstellung: "+Item.aufgabe+"</b></br>" +
                "<b>Zusatzinformationen: "+Item.zusatz+"</b></br>" +
                "<b>Feedback der Aufgabe: "+Item.feedback+"</b></br>" +
                "<b>Sonstige Anmerkungen: </b></br>" +
                "<b>"+Item.anmerkung+"</b>" +
                "</div>" +
                "<a id='delbutton' href='delfeedback"+Item._id+"'>löschen</a> " +
                "</div>");
        });
    });

});
