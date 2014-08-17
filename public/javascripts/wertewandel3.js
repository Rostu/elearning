////////////////////////////////////////////////////////////////////////////////
// question obtaining
////////////////////////////////////////////////////////////////////////////////
var applyTo = function( jsonpath, fn ) {
    // This funciton is merely a wrapper because of "getJSONs" scope:
    // the real placement is done in the function passed as "fn".
    $.getJSON( jsonpath, function( json ) {
        var questArray = [];
        
        $.map( json.questions, function( content ) {
            questArray.push( content );
        });

        fn( questArray );
    });
}

var placeQuestions = function( questions ) {
    // Places the question on the website
    var preamble = "<table><tr><td class=\"questionaire_1\"></td>"
        + "<td class=\"questionaire_2\">ja</td>"
        + "<td class=\"questionaire_3\">nein</td></tr>";
    var end = "<tr><td></td><td></td><td></td></tr>"
        + "<tr><td><div id=\"submit\">pr&uuml;fen"
        + "</div></td><td></td><td></td></table>";

    var original_html = $( "#ww3_form" ).html();
    var counter = 0;

    $.map( questions, function( question ) {
        counter += 1;
        
        var questionString = "<tr><td>" + counter + ". " + question.question
            + "</td><td><input type=\"radio\" name=\"" + question.id +
            "\" value=\"0\"/></td><td><input type=\"radio\" name=\"" +
            question.id + "\" value=\"1\" /></td></tr>";
        
        original_html += questionString;
    });

    $( "#ww3_form" ).html( preamble + original_html + end );
}


var init = function () {
    // dda da
    console.log( " joooar ");
    
    applyTo( "/javascripts/wertewandel3_questions.json", placeQuestions );
    
    // evaluate answer on
};

$(function() {
    $( "#submit" ).click(function () {
        console.log( " joooar2 ");
        var answered = $( "#ww3_form :input" ).serializeArray();
        console.log( answered );
    });
});

$( init );
