$(document).ready(function() {

	var errorcount = 0;

	var audiodaten = [
		{token:"gestern",link:'https://upload.wikimedia.org/wikipedia/commons/a/ac/De-gestern.ogg',info:'https://commons.wikimedia.org/wiki/File:De-gestern.ogg?uselang=de',time:"0"},
		{token:'heute',link:'https://upload.wikimedia.org/wikipedia/commons/7/74/De-heute.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-heute.ogg',time:"1"},
		{token:'früher',link:'https://upload.wikimedia.org/wikipedia/commons/7/7f/De-fr%C3%BCher.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-fr%C3%BCher.ogg',time:"0"},
		{token:'einst',link:'https://upload.wikimedia.org/wikipedia/commons/c/c9/De-einst.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-einst.ogg',time:"0"},
		{token:'gerade',link:'https://upload.wikimedia.org/wikipedia/commons/5/5f/De-gerade.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-gerade.ogg',time:"1"},
		{token:'aktuell',link:'https://upload.wikimedia.org/wikipedia/commons/d/d4/De-aktuell.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-aktuell.ogg',time:"1"},
		{token:'morgen',link:'https://upload.wikimedia.org/wikipedia/commons/e/e2/De-Morgen.ogg',info:'https://commons.wikimedia.org/wiki/File:De-Morgen.ogg?uselang=de#file',time:"2"},
		{token:'übermorgen',link:'https://upload.wikimedia.org/wikipedia/commons/1/1f/De-at-%C3%BCbermorgen.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-at-%C3%BCbermorgen.ogg',time:"2"},
		{token:'zukünftig',link:'https://upload.wikimedia.org/wikipedia/commons/f/f6/De-zuk%C3%BCnftig.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-zuk%C3%BCnftig.ogg',time:"2"},
		{token:'jetzt',link:'https://upload.wikimedia.org/wikipedia/commons/5/5a/De-jetzt.ogg',info:'https://de.wiktionary.org/wiki/Datei:De-jetzt.ogg',time:"1"},
		{token:'später',link:'https://upload.wikimedia.org/wikipedia/commons/f/f6/De-sp%C3%A4ter.ogg',info:'https://de.wiktionary.org/wiki/Datei:De-sp%C3%A4ter.ogg',time:"2"}
	];
	var ausnahme = ["später","übermorgen","zukünftig","gerade","früher","aktuell" ];
	audiodaten = shuffle(audiodaten);
	$("#wrapper").append('<audio id="errorsound" controls="controls"><source src="audio/resonant-error.mp3" type="audio/mpeg">none</source> </audio>');

	audiodaten.forEach(function(elem) {
		var div = jQuery('<div/>', {
			class: 'token',
			"data-token": elem.token,
			"data-time": elem.time,
			href: elem.link,
			html: "???"
		});
		$("#Vorgabe").append(div);
	});

	$(".token").click(function(){
		console.log($(this));
		$(".selected").toggleClass("selected");
		$(this).toggleClass("selected");
		var data = $(this).data("token");
		var time = $(this).data("time");
		var href = $(this).attr("href");
		$("#Audioplayer").empty();
		$("#Audioplayer").append('<audio id="player" data-time="'+time+'" data-token="'+data+'" controls="controls"><source src="'+href+'" type="audio/ogg"><p>Your Browser is not able to play this Audio File</p></source><a href="http://creativecommons.org/licenses/by-sa/3.0">©</a> </audio>').hide().fadeIn('slow');;
		$("#player")[0].play();
	});

	$('input.textbox').keypress(function (e) {
		var key = e.which;
		if(key == 13)  // the enter key code
		{
			var input = $(this).val();
			var input_id = this.id;
			var token_id = $("audio#player").data("time").toString();
			var token = $("audio#player").data("token");
			var levenshtein = false;
			var varianz = true;
			if(ausnahme.indexOf(token) > -1) {	varianz = false	}
			if(getEditDistance(token,input) <2 ){levenshtein = true}

			if(levenshtein&&(input_id === token_id) ){
				errorcount = 0;
				if($("#info3").is(":visible") == true){$('#info3').toggle();}
				raisepoints();
				switch (input_id) {
					case "0":
						if(varianz) {
							$("#Vergangenheit > .outputbox").append("<div class='antwort'>" + token + " / " + token.capitalize() + "<a class='dudenlink' target='_blank' href='http://www.duden.de/suchen/dudenonline/" + token + "'>DUDEN</a></div>");
						}else{
							$("#Vergangenheit > .outputbox").append("<div class='antwort'>" + token +"<a class='dudenlink' target='_blank' href='http://www.duden.de/suchen/dudenonline/" + token + "'>DUDEN</a></div>");
						}
						break;
					case "1":
						if(varianz) {
							$("#Gegenwart > .outputbox").append("<div class='antwort'>"+token+" / "+token.capitalize()+"<a class='dudenlink' target='_blank' href='http://www.duden.de/suchen/dudenonline/"+token+"'>DUDEN</a></div>");
						}else{
							$("#Gegenwart > .outputbox").append("<div class='antwort'>"+token+"<a class='dudenlink' target='_blank' href='http://www.duden.de/suchen/dudenonline/"+token+"'>DUDEN</a></div>");
						}
						break;
					case "2":
						if(varianz) {
							$("#Zukunft > .outputbox").append("<div class='antwort'>" + token + " / " + token.capitalize() + "<a class='dudenlink' target='_blank' href='http://www.duden.de/suchen/dudenonline/" + token + "'>DUDEN</a></div>");
						}else{
							$("#Zukunft > .outputbox").append("<div class='antwort'>" + token +"<a class='dudenlink' target='_blank' href='http://www.duden.de/suchen/dudenonline/" + token + "'>DUDEN</a></div>");
						}
						break;
				}
				$(".selected").remove();
				$("#Audioplayer").empty();
			}else {
				raisefaults();
				console.log(errorcount);
				if($("#info3").is(":visible") == false){
					$('#info3').show();
				}
				$('#info3 > p').remove();
				$("#errorsound")[0].play();
				if (input_id != token_id) {
					$('#info3').append("<p id='infotext1'>Das ist nicht die Richtige Zeit</p>");
				}
				if (getEditDistance(token, input) > 1 && errorcount == 1) {
					$('#info3').append("<p id='infotext2'>Das Wort ist falsch geschrieben. Schau dir die richtige Schreibweise hier an:<a class='dudenlink2' target='_blank' href='http://www.duden.de/suchen/dudenonline/" + token + "'>DUDEN</a></p>");
				}
				if (getEditDistance(token, input) > 1 && errorcount < 1) {
					$('#info3').append("<p id='infotext2'>Das Wort ist falsch geschrieben. Höre dir die Audiodatei nochmal an.</p>");
					errorcount++;
				}
			}
			$(this).val("");
		}
	});
	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
});




