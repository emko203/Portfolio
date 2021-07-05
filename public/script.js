const nameInput = $('#name');
const emailInput = $('#email');
const subjectInput = $('#subject');
const messageInput = $('#msg');

let name = sessionStorage.getItem('name');
let email = sessionStorage.getItem('email');
let phone = sessionStorage.getItem('subject');
let message = sessionStorage.getItem('message');

nameInput.on('change', () => {
	sessionStorage.setItem('name', nameInput.val());
});

emailInput.on('change', () => {
	sessionStorage.setItem('email', emailInput.val());
});

subjectInput.on('change', () => {
	sessionStorage.setItem('subject', subjectInput.val());
});

messageInput.on('change', () => {
	sessionStorage.setItem('message', messageInput.val());
});

//Modal
const modal = $('.modal');

window.onclick = (event) => {
	if ($(event.target).is(modal)) {
		modal.css('display', 'none');
	}
};

const cvModal = $('div#cvDIV');

function showCV() {
	cvModal.css('display', 'flex');
}

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
