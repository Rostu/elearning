$(document).ready(function() {
    	$('#info1').show();
    	$('#info1').append("<a id='infolink1' class='redlink' href='#'>Das ist ein Info-Link</a>");
	//Here you can use your magic javascript skills

	var questions = [
		{ "id": 0, "question": "Die Nutzung von Wasserkraftwerken ist teuer.", "answer": 0 },
		{ "id": 1, "question": "Die Atomenergie gehört zu den alternativen Energien", "answer": 1},
		{ "id": 2, "question": "Sonnenenergie ist unerschöpflich.", "answer": 0},
		{ "id": 3, "question": "Rotationsenergie ist auch unter dem Namen Photovoltaik bekannt.", "answer": 1},
		{ "id": 4, "question": "Die Nutzung von alternativen Energien ist umweltschonend.", "answer": 0},
		{ "id": 5, "question": "Ein Vorteil von alternativen Energien ist deren staatliche Förderung.", "answer": 0}
	];


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

	$( "input[type='radio']").on( "click", function() {
		//console.log(this.name);
		var name = this.name;
		var value = this.value;
		var button = this.name;
		console.log(button);
			questions.forEach(function(n) {
				if ( n.id == name ){
					if ( n.answer == value )
					{
						raisepoints();
						$("input[name='"+name+"']").parent().css("background-color","#02D64A");
						$("input[name='"+button+"']").attr('disabled', true);
					}
					else
					{
						raisefaults();
						$("input[name='"+name+"']").parent().css("background-color","#A91211");
						//$(button).attr('disabled', true);
					}
				}

			});

	});
	function clickHandler(id) {

		switch(id) {
			case "Tipp":
				alert("Lies noch einmal den Text, um die richtige Antwort herauszufinden: \n\n zu 1. Zeile 07-08 \n zu 2. Zeile 22-23 \n zu 3. Zeile 06-07 \n zu 4. Zeile 08-09 \n zu 5. Zeile 15 \n zu 6. Zeile 11-12");
				break;
		}

	}
	//Wenn man auf Fragzeichen klickt wird, dann wird diese aufgerufen?
	$(".Tipps").on('click',function(){
		clickHandler(this.id);
		//console.log(this.id); lässt in der Konsole die Ausführung testen
	});
	});

