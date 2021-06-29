// Flowing navbar
$(document).ready(function() {
	$(window).scroll(function() {
		if (this.scrollY > 20) {
			$('.navbar').addClass('sticky');
		} else {
			$('.navbar').removeClass('sticky');
		}
	});

	// Toggle menu/navbar script
	$('.menu-btn').click(function() {
		$('.navbar .menu').toggleClass('active');
		$('.menu-btn i').toggleClass('active');
	});
});

function about() {
	$('.about').get(0).scrollIntoView();
}

function skills() {
	$('.skills').get(0).scrollIntoView();
}

function projects() {
	$('.projects').get(0).scrollIntoView();
}

function contact() {
	$('.contact').get(0).scrollIntoView();
}
