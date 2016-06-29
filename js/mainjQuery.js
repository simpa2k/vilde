$(function() {

	$('#background').parallax({imageSrc: 'images/background.jpg',
							bleed: 100,
							position: "top"});
	
	$('#members').parallax({
		imageSrc: 'images/allatre.jpg',
		bleed: 100,
		position: "bottom"
	});

	$('#big-image').parallax({imageSrc: 'images/vidbil.jpg', bleed: 100});

});