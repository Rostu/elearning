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
};

var init = function () {
    // load data
    applyTo( "javascripts/wertewandel3_questions.json", placeQuestions );

    // evaluate answer on
    $( "#submit" ).click( function() {
        // get answers
        var answered = $( "input[type='radio']" ).serializeArray();
        
        // check them on the json file
        $.getJSON( "javascripts/wertewandel3_questions.json", function( json ) {
            $.map( json.questions, function( n ) {
                // pretty messy... I agree
                $.map( answered, function( e ) {
                    if ( n.id == e.name )
                    {
                        if ( n.answer == e.value )
                        {
                            raisepoints()
                            $( "#" + e.name ).animate({backgroundColor: "#0f0"}, 2000);
                        }
                        else
                        {
                            raisefaults();
                            $( "#" + e.name ).animate({backgroundColor: "#f00"}, 2000);
                        }
                    }
                });
            });
        });
    });
};

$( init );
addPointBars();
