$(document).ready(function() {

	var data = [
		{token:"Autokunde",tag:"noun",number:"PLU",gold:["Autos","Solarautos","Solarfahrzeuge"]},
		{token:"Autokunde",tag: "noun",number:"PLU",gold:["Fahrzeuge","Wagen","Solarautos","Solarfahrzeuge"]},
		{token:"flach",tag:"adjective",number:"null",gold:["flach","dünn","schmal"]},
		{token:"V-Motoren",tag:"noun",number:"PLU",gold:["Elektromotoren","Antriebe", "Elektroantriebe"]},
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
	$("#wrapper").on( "click",".wrong", function(elem) {
		$("#info3").show();
		$("#info3").empty();
		$("#info3").append("<p>"+$(this).attr("errMSG")+"</p>");
	});
	luecken.on("blur", function() {
		var query = $(this).val();
		var gold = data[parseInt($(this).attr("id"))];
		var inputfield = $(this);
		$(this).removeClass("wrong");
		if(!$(this).hasClass("checking") && !$(this).hasClass("done") && query.length > 2){
			$(this).addClass("checking");
			if($.inArray(query, gold.gold) > -1 ){
				$(this).removeClass("checking");
				$(this).removeClass("wrong");
				$(this).addClass("done");
				$(this).prop('disabled', true);
				if($("#info3").is(':visible')){$("#info3").toggle();}
				console.log("in list, therefor correct");
			}else if(Levenshtein_inArray(query, gold.gold)){
				$(this).removeClass("checking");
				$(this).removeClass("wrong");
				$(this).addClass("done");
				if($("#info3").is(':visible')){$("#info3").toggle();}
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
						var DML_check = $.get('/dml_get', {query:query});
						console.log("Gold Wortart: "+gold.tag);
						if(gold.tag === "noun"){
							var domain = $.get('/wl_domain', {query:baseformResponse[0][0],limit:20});
							$.when(DML_check, domain).done(function (dmlResponse,domainResponse ) {
								if(domainResponse[0] != "") {
									console.log(domainResponse[0]);
									if ($.inArray(gold.token, domainResponse[0]) > -1){
										$(inputfield).removeClass("checking");
										$(inputfield).removeClass("wrong");
										$(inputfield).addClass("done");
										if($("#info3").is(':visible')){$("#info3").toggle();}
										if(dmlResponse[0] != ""){
											var infos = dmlResponse[0].morphology;
											var test = true;
											console.log(infos);
											$.each(infos, function (index, b) {
												if (b.indexOf("number:"+gold.number) > -1) {
													test = false;
												}
											});
											if(test){
												error_message = "Das ist ein passendes Wort, aber es sollte in der Mehrzahl stehen.";
												$(inputfield).attr("errMSG",error_message);
												$(inputfield).removeClass("done");
												$(inputfield).addClass("wrong");
											}
										}

									}else{
										if(dmlResponse[0] != ""){
											var infos = dmlResponse[0].morphology;
											$.each(infos, function (a, b) {
												var test = false;
												if (b.indexOf("wordclass:"+gold.tag) > -1 && b.indexOf("number:"+gold.number) > -1) {
													$(inputfield).removeClass("checking");
													$(inputfield).addClass("wrong");
													error_message = "Das ist die richtige Wortart, aber dieses Wort macht hier keinen Sinn.";
													test = true;
												}
												if (b.indexOf("wordclass:"+gold.tag) === -1) {
													$(inputfield).removeClass("checking");
													$(inputfield).addClass("wrong");
													error_message += "Das ist die falsche Wortart, in diese Lücke gehört ein Nomen";
													test = true;
												}
												if (b.indexOf("number:"+gold.number) === -1) {
													$(inputfield).removeClass("checking");
													$(inputfield).addClass("wrong");
													error_message += "Das ist der falsche Numerus";
													test = true;
												}
												if(test){$(inputfield).attr("errMSG",error_message);return false}
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
										if($("#info3").is(':visible')){$("#info3").toggle();}
									}else{
										if(dmlResponse[0] != ""){
											var infos = dmlResponse[0].morphology;
											$.each(infos, function (a, b) {
												if (b.indexOf("wordclass:"+gold.tag) > -1) {
													$(inputfield).removeClass("checking");
													$(inputfield).addClass("wrong");
													error_message = "Dieses Wort passt hier nicht hin";
													console.log(error_message);
													$(inputfield).attr("errMSG",error_message);
													return false;
												}
												if (b.indexOf("wordclass:"+gold.tag) === -1) {
													$(inputfield).removeClass("checking");
													$(inputfield).addClass("wrong");
													error_message += "Das ist die falsche Wortart, in diese Lücke gehört ein: Adjektiv";
													console.log(error_message);
													$(inputfield).attr("errMSG",error_message);
													return false;
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
						$(inputfield).attr("errMSG",error_message);
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
