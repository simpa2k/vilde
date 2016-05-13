$(function() {

	function positionNewElement(element, elementToPositionRelativeTo) {

		var navbar = $(elementToPositionRelativeTo).parents("#navbar");

		var navbarTop = navbar.offset().top;
		var navbarHeight = parseInt(navbar.css("height"), 10);
		var elementY = navbarTop + navbarHeight - 1;

		var left = $(elementToPositionRelativeTo).offset().left;
		var width = $(elementToPositionRelativeTo).width();

		$(element).css({
			"position": "absolute",
			"z-index": "10",
			"top": elementY,
			"left": left,
			//"width": width,
			"color": "#f44843",
			"background-color": "#262626",
            "padding": "0% 1% 0% 1%"
		});
		
		console.log($(elementToPositionRelativeTo).offset());

	}

	$("#about-heading").mouseover(function() {

		$(this).parents("#navbar").after("<div id='about-dropdown'><h4>MEDLEMMAR</h4></div>");

		positionNewElement($("#about-dropdown"), $(this));

	});

	$("#about-heading").mouseout(function() {

		$("#about-dropdown").remove();

	});

});