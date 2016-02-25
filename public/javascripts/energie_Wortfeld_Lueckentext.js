$(document).ready(function() {
    	$('#info1').show();
    	$('#info1').append("<a id='infolink1' class='redlink' href='#'>Das ist ein Info-Link</a>");

	var luecken = $('.luecke');
	luecken.on("blur", function() {
		console.log(this);
		//validate(this);
	});



	});
