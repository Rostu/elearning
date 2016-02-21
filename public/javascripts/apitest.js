$(document).ready(function() {
	$('#info1').show();
	$('#info1').append("<a id='infolink1' class='redlink' href='#'>Das ist ein Info-Link</a>");



	$('#wiktionary_button').click(function () {
		$("#wiki").empty();
		$("#ajaxloader").toggle();
		var query= $('input[name=testquery]').val();
		var data = 'query=' + query;

		console.log(query);

		$.ajax({
			url: "/get_wiktionary",
			type: "GET",
			data: data,
			cache: false,
			success: function(html) {
				if (html) {
					console.log(html);
					$('#ajaxloader').toggle();
					$("#wiki").empty();
					$("#wiki").append("<h3>Wortart: </h3><p>"+html.wordclass+"</p>");
					var exp = html.explanations.join(", ");
					$("#wiki").append("<h3>Definiton: </h3><p>"+exp+"</p>");
					$("#wiki").append("<h3>Beispiele: </h3>");
					jQuery.each(html.examples, function(i, val) {
						$("#wiki").append("<p>"+JSON.stringify(val.text)+"</p>");
					});
					$("#wiki").append("<h3>Hekunft: </h3><p>"+html.etymologie.join()+"</p>");
					$("#wiki").append("<h3>Synonyme: </h3><p>"+html.synonym.join()+"</p>");
					$("#wiki").append("<h3>Überbegriff: </h3><p>"+html.hyperonym.join()+"</p>");
					//$("#wiki").append("<h3>Bilddaten: </h3><p>"+JSON.stringify(html.imgname[0])+"</p>");
					$("#wiki").append("<img src='"+html.imgname[0].thumburl+"'>");
					var audiolink = html.audio[0].link;
					$("#wiki").append('<audio id="player" controls="controls"></source id="oggSource" type="audio/ogg"></audio>');
					$('#player').attr('src',audiolink);
					console.log(html);
					//$('#Outputbox').append(html.toString());
				}
				else {
					alert('Error');
					//console.log(html);
					//$('#Outputbox').append(html.toString());
				}
			}
		});
	});

	$('#baseformbutton').click(function () {
		$("#baseformoutput").empty();
		$('#baseformoutput').append("<img id='ajaxloader' src='./images/ajax-loader.gif'>");
		var query= $('input[name=baseform]').val();
		var data = 'query=' + query;

		console.log(query);

		$.ajax({
			url: "/wl_baseform",
			type: "GET",
			data: data,
			cache: false,
			success: function(html) {
				if (html) {
					console.log(html);
					$("#ajaxloader").remove();
					$('#baseformoutput').append("<p>"+ html[0]+"</p>");
				}
				else {
					alert('Error');
					$("#ajaxloader").remove();
					//console.log(html);
					//$('#Outputbox').append(html.toString());
				}
			}
		});
	});

	$('#frequencybutton').click(function () {
		$("#frequencyoutput").empty();
		$('#frequencyoutput').append("<img id='ajaxloader' src='./images/ajax-loader.gif'>");
		var query= $('input[name=frequency]').val();
		var data = 'query=' + query;

		console.log(query);

		$.ajax({
			url: "/wl_frequencies",
			type: "GET",
			data: data,
			cache: false,
			success: function(html) {
				if (html) {
					console.log(html);
					$("#ajaxloader").remove();
					$('#frequencyoutput').append("<p>"+ html+"</p>");
				}
				else {
					alert('Error');
					$("#ajaxloader").remove();
					//console.log(html);
					//$('#Outputbox').append(html.toString());
				}
			}
		});
	});


	$('#domainbutton').click(function () {
		$("#domainoutput").empty();
		$('#domainoutput').append("<img id='ajaxloader' src='./images/ajax-loader.gif'>");
		var query= $('input[name=domain]').val();
		var data = 'query=' + query;

		console.log(query);

		$.ajax({
			url: "/wl_domain",
			type: "GET",
			data: data,
			cache: false,
			success: function(html) {
				if (html) {
					console.log(html);
					$("#ajaxloader").remove();
					$('#domainoutput').append("<p>"+ html+"</p>");
				}
				else {
					alert('Error');
					$("#ajaxloader").remove();
					//console.log(html);
					//$('#Outputbox').append(html.toString());
				}
			}
		});
	});

	$('#wordformsbutton').click(function () {
		$("#wordformsoutput").empty();
		$('#wordformsoutput').append("<img id='ajaxloader' src='./images/ajax-loader.gif'>");
		var query= $('input[name=wordforms]').val();
		var limit= $('select[name=wordforms]').val();
		var data = 'query=' + query+'&limit='+limit;
		console.log(data);

		$.ajax({
			url: "/wl_wordforms",
			type: "GET",
			data: data,
			cache: false,
			success: function(html) {
				if (html) {
					console.log(html);
					$("#ajaxloader").remove();
					$('#wordformsoutput').append("<p>"+ html+"</p>");
				}
				else {
					alert('Error');
					$("#ajaxloader").remove();
					//console.log(html);
					//$('#Outputbox').append(html.toString());
				}
			}
		});
	});
	$('#thesaurusbutton').click(function () {
		$("#thesaurusoutput").empty();
		$('#thesaurusoutput').append("<img id='ajaxloader' src='./images/ajax-loader.gif'>");
		var query= $('input[name=thesaurus]').val();
		var limit= $('select[name=thesaurus]').val();
		var data = 'query=' + query+'&limit='+limit;
		console.log(data);

		$.ajax({
			url: "/wl_thesaurus",
			type: "GET",
			data: data,
			cache: false,
			success: function(html) {
				if (html) {
					console.log(html);
					$("#ajaxloader").remove();
					$('#thesaurusoutput').append("<p>"+ html+"</p>");
				}
				else {
					alert('Error');
					$("#ajaxloader").remove();
					//console.log(html);
					//$('#Outputbox').append(html.toString());
				}
			}
		});
	});






});