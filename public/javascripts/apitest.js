$(document).ready(function() {
	$('#info1').show();
	$('#info1').append("<a id='infolink1' class='redlink' href='#'>Das ist ein Info-Link</a>");


	$('#testbutton').click(function () {
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
					//$('#Outputbox').append(html.toString());
				}
				else {
					//console.log(html);
					//$('#Outputbox').append(html.toString());

				}
			}
		});



	});
});