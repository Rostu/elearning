$(document).ready(function() {
    	$('#info1').show();
    	$('#info1').append("<a id='infolink1' class='redlink' href='#'>Das ist ein Info-Link</a>");
	var data = [
		{token:"Fahrzeuge",tag:"noun",number:"PLU",gold:["Fahrzeuge","Wagen","Solarautos","Solarfahrzeuge"]},
		{token:"Solarautos",tag: "noun",number:"PLU",gold:["Fahrzeuge","Autos","Wagen","Solarautos","Solarfahrzeuge"]},
		{token:"flach",tag:"adjective",number:"null",gold:["flach","dünn","platt","schmal"]},
		{token:"Elektromotoren",tag:"noun",number:"PLU",gold:["Elektromotoren","Motoren","Antriebe"]},
		{token:"rasant",tag:"adjective",number:"null",gold:["schnell","zügig"]},
		{token:"Batterie",tag:"noun",number:"SIN",gold:["Batterie","Energiespeicher","Speicher"]},
		{token:"super",tag:"adjective",number:"null",gold:["prima","gut"]},
		{token:"schwer",tag:"adjective",number:"null",gold:["schwer","gewichtig"]}
	];

	var error_message = "";
	var form = false;
	var semantic = false;
	var finished = false;
	//var lastUpdate = $.post('/echo/json/', {json:JSON.stringify({'lastUpdate':"Hello World"})});

	var luecken = $('.luecke');

	luecken.on("blur", function() {
		var query = $(this).val();
		var gold = data[parseInt($(this).attr("id"))];
		var inputfield = $(this);
		if(!$(this).hasClass("checking") && !$(this).hasClass("done") && query.length > 2){
			$(this).addClass("checking");
			if($.inArray(query, gold.gold) > -1 ){
				$(this).removeClass("checking");
				$(this).removeClass("wrong");
				$(this).addClass("done");
				$(this).prop('disabled', true);
				console.log("in list, therefor correct");
			}else if(Levenshtein_inArray(query, gold.gold)){
				$(this).removeClass("checking");
				$(this).removeClass("wrong");
				$(this).addClass("done");
				$(this).val(get_Levenshtein_correct(query, gold.gold));
				error_message = "Da hattest du dich verschrieben, schau dir die richtige Schreibweise nochmal an!";
				console.log(error_message);

			}else{
				//The second ajax call uses the Wortschatz Leipzig baseform function to get a lemmatized form of the input
				//this is needed since the further searches for synonyms and hypernyms need lemmatized forms
				//by doing the request like that we create a jquerry deferred object, this makes the code more readable
				var Baseform_check = $.get('/wl_baseform', {query:query});
				Baseform_check.done(function(baseformResponse){
					if(baseformResponse){
						console.log(baseformResponse);
						//this ajax call gets a corresponding entry from the morphology lexicon in the database
						//the results can be used to check if the wordform and numerus match the gold standard
						//by doing the request like that, we create a jquerry deferred object, this makes the code more readable
						var DML_check = $.get('/dml_get', {query:query});
						console.log(gold.tag);
						if(gold.tag === "noun"){
							var domain = $.get('/wl_domain', {query:baseformResponse[0][0],limit:20});
							$.when(DML_check, domain).done(function (dmlResponse,domainResponse ) {
								if(domainResponse[0] != "") {
									if (false){
										$(inputfield).removeClass("checking");
										$(inputfield).removeClass("wrong");
										$(inputfield).addClass("done");
									}else{
										if(dmlResponse[0] != ""){
											var infos = dmlResponse[0].morphology;
											$.each(infos, function (a, b) {
												if (b.indexOf("wordclass:"+gold.tag) > -1 && b.indexOf("number:"+gold.number)) {
													$(inputfield).removeClass("checking");
													$(inputfield).addClass("wrong");
													error_message = "Dieses Wort passt hier nicht hin";
													console.log(error_message);
												}
												if (b.indexOf("wordclass:"+gold.tag) === -1) {
													$(inputfield).removeClass("checking");
													$(inputfield).addClass("wrong");
													error_message += "Das ist die Falsche Wortart, in diese Lücke gehört ein: "+gold.tag+"\n";
													console.log(error_message);
												}
												if (b.indexOf("wordclass:"+gold.tag) === -1) {
													$(inputfield).removeClass("checking");
													$(inputfield).addClass("wrong");
													error_message += "Das ist der falsche Numerus";
													console.log(error_message);
												}
											});
										}
									}
								}
							});
						}
						if(gold.tag === "adjective"){
							var synonyms = $.get('/wl_synonyms', {query:baseformResponse[0][0],limit:20});
							$.when(DML_check, synonyms).done(function (dmlResponse,synonymResponse ) {
								if(synonymResponse[0] != "") {
									console.log(synonymResponse[0]);
									if ($.inArray(gold.token, synonymResponse[0]) > -1){
										$(inputfield).removeClass("checking");
										$(inputfield).removeClass("wrong");
										$(inputfield).addClass("done");
									}else{
										if(dmlResponse[0] != ""){
											var infos = dmlResponse[0].morphology;
											$.each(infos, function (a, b) {
												if (b.indexOf("wordclass:"+gold.tag) > -1 && b.indexOf("number:"+gold.number)) {
													$(inputfield).removeClass("checking");
													$(inputfield).addClass("wrong");
													error_message = "Dieses Wort passt hier nicht hin";
													console.log(error_message);
												}
												if (b.indexOf("wordclass:"+gold.tag) === -1) {
													$(inputfield).removeClass("checking");
													$(inputfield).addClass("wrong");
													error_message += "Das ist die Falsche Wortart, in diese Lücke gehört ein: "+gold.tag+"\n";
													console.log(error_message);
												}
												if (b.indexOf("wordclass:"+gold.tag) === -1) {
													$(inputfield).removeClass("checking");
													$(inputfield).addClass("wrong");
													error_message += "Das ist der falsche Numerus";
													console.log(error_message);
												}
											});
										}
									}
								}
							});
						}

					}else{
						$(inputfield).removeClass("checking");
						$(inputfield).addClass("wrong");
						error_message = "Dieses Wort kann ich leider nicht finden";
						console.log(error_message);
					}
				});
			}
		}
	});
});

// little helper function to check if one string from the gold standart array has a levenshtein distance smaller than 2 to a compared string
function Levenshtein_inArray(word, array){
	for(i=0; i<array.length; i++){
		if(getEditDistance(word,array[i]) <2){
			return true;
		}
	}
	return false;
}

function get_Levenshtein_correct(word, array){
	for(i=0; i<array.length; i++){
		if(getEditDistance(word,array[i]) <2){
			return array[i];
		}
	}
}
