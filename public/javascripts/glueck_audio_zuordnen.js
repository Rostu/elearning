$(document).ready(function() {
	$('#info1').show();
	$('#info1').append("<a id='infolink1' class='redlink' href='#'>Das ist ein Info-Link</a>");

	var audiodaten = [
		{token:"gestern",link:'https://commons.wikimedia.org/wiki/File%3ADe-gestern.ogg'},
		{token:'heute',link:'https://upload.wikimedia.org/wikipedia/commons/7/74/De-heute.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-heute.ogg'},
		{token:'früher',link:'https://upload.wikimedia.org/wikipedia/commons/7/7f/De-fr%C3%BCher.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-fr%C3%BCher.ogg'},
		{token:'einst',link:'https://upload.wikimedia.org/wikipedia/commons/c/c9/De-einst.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-einst.ogg'},
		{token:'gerade',link:'https://commons.wikimedia.org/wiki/File%3ADe-gerade.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-gerade.ogg'},
		{token:'aktuell',link:'https://upload.wikimedia.org/wikipedia/commons/d/d4/De-aktuell.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-aktuell.ogg'},
		{token:'morgen',link:'https://upload.wikimedia.org/wikipedia/commons/e/e2/De-Morgen.ogg',info:'https://commons.wikimedia.org/wiki/File:De-Morgen.ogg?uselang=de#file'},
		{token:'übermorgen',link:'https://upload.wikimedia.org/wikipedia/commons/1/1f/De-at-%C3%BCbermorgen.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-at-%C3%BCbermorgen.ogg'},
		{token:'zukünftig',link:'https://upload.wikimedia.org/wikipedia/commons/f/f6/De-zuk%C3%BCnftig.ogg',info:'https://commons.wikimedia.org/wiki/File%3ADe-zuk%C3%BCnftig.ogg'},
		{token:'jetzt',link:'https://upload.wikimedia.org/wikipedia/commons/5/5a/De-jetzt.ogg',info:'https://de.wiktionary.org/wiki/Datei:De-jetzt.ogg'},
		{token:'später',link:'https://upload.wikimedia.org/wikipedia/commons/f/f6/De-sp%C3%A4ter.ogg',info:'https://de.wiktionary.org/wiki/Datei:De-sp%C3%A4ter.ogg'}
	];
	audiodaten = shuffle(audiodaten);
	var svgWidth = $("#Vorgabe").width();

	var svg = d3.select('#Vorgabe').append('svg').attr('width', svgWidth).attr('height', svgWidth);
	var bubble = d3.layout.pack().size([svgWidth, svgWidth]).padding(3);


	$("#Audioplayer").append('<audio id="player" data-token="früher" controls="controls"><source src="https://upload.wikimedia.org/wikipedia/commons/7/7f/De-fr%C3%BCher.ogg" type="audio/ogg"><p>Your Browser is not able to play this Audio File</p></source><a href="http://creativecommons.org/licenses/by-sa/3.0">©</a> </audio>');

/*
	var svg1 = d3.select("#Vorgabe").append("svg").attr("width", svgWidth).attr("height", svgWidth);
	svg1.append("circle").attr("id","c1").attr("cx", svgWidth / 2).attr("cy", svgWidth / 2).attr("r",svgWidth / 2 ).attr("style","fill: rgba(243, 18, 0, 0.19)");
*/

	$(window).resize(function() {
		updateContainer();
	});
	function updateContainer(){
		var wi = $("#Aufgabenbox").width()+20;
		$('svg').width(wi/3);
		circle.transition().attr("cx",  $('svg').width()/2);
	};
});




