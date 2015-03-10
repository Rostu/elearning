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
};

var placeQuestions = function( questions ) {
    // Places the question on the website
    var preamble = "<table><tr><td class=\"questionaire_1\"></td>"
        + "<td class=\"questionaire_2\">ja</td>"
        + "<td class=\"questionaire_3\">nein</td></tr>";
    var end = "<tr><td></td><td></td><td></td></tr>"
        + "<tr><td></td><td></td><td></td></table>";

    var original_html = $( "#ww3_form" ).html();
    var counter = 0;

    $.map( questions, function( question ) {
        counter += 1;
        
        var questionString = "<tr><td><div id=\"" + question.id + "\">" + counter + ". " + question.question
            + "</div></td><td><input type=\"radio\" name=\"" + question.id +
            "\" value=\"0\"/></td><td><input type=\"radio\" name=\"" +
            question.id + "\" value=\"1\" /></td></tr>";
        
        original_html += questionString;
    });

    $( "#ww3_form" ).html( preamble + original_html + end );

    // evaluate answer on click
    $( "input[type='radio']").on( "click", function() {
        //console.log(this.name);
        var name = this.name;
        var value = this.value;
        var button = this;
        $.getJSON( "javascripts/wertewandel3_questions.json", function( json ){
            json.questions.forEach(function(n) {
                if ( n.id == name ){
                    if ( n.answer == value )
                    {
                        raisepoints();
                        $("input[name='"+name+"']").parent().css("background-color","#02D64A");
                        $(button).attr('disabled', true);
                    }
                    else
                    {
                        raisefaults();
                        $("input[name='"+name+"']").parent().css("background-color","#A91211");
                        $(button).attr('disabled', true);
                    }
                }

            });

        });


    });
};

var init = function () {
    // load data
    applyTo( "javascripts/wertewandel3_questions.json", placeQuestions );

};

$( init );
addPointBars();
