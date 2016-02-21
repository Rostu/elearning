$(document).ready(function() {
	$('#info1').show();
	$('#info1').append("<a id='infolink1' class='redlink' href='#'>Das ist ein Info-Link</a>");

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
	audiodaten = shuffle(audiodaten);
	/*
	var svgWidth = $("#Vorgabe").width();
	var svg = d3.select('#Vorgabe').append('svg').attr('width', svgWidth).attr('height', svgWidth);
	var bubble = d3.layout.pack().size([svgWidth, svgWidth]).padding(3);
	*/
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


/*
	var svg1 = d3.select("#Vorgabe").append("svg").attr("width", svgWidth).attr("height", svgWidth);
	svg1.append("circle").attr("id","c1").attr("cx", svgWidth / 2).attr("cy", svgWidth / 2).attr("r",svgWidth / 2 ).attr("style","fill: rgba(243, 18, 0, 0.19)");
*/
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
			if((input === token)&&(input_id === token_id) ){
				console.log($("#Zukunft .outputbox"));
				switch (input_id) {
					case "0":
						console.log("0");
						$("#Vergangenheit .outputbox").append("<div class='antwort'>"+token+"</div>");
						break;
					case "1":
						console.log("1");
						$("#Gegenwart .outputbox").append("<div class='antwort'>"+token+"</div>");
						break;
					case "2":
						console.log("2");
						$("#Zukunft .outputbox").append("<div class='antwort'>"+token+"</div>");
						break;
				}
				$(".selected").remove();
				$("#Audioplayer").empty();

			}
			$(this).val("");
		}
	});

	$(window).resize(function() {
		updateContainer();
	});
	function updateContainer(){
		var wi = $("#Aufgabenbox").width()+20;
		$('svg').width(wi/3);
		circle.transition().attr("cx",  $('svg').width()/2);
	};
});




