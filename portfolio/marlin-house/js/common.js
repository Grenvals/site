$(function () {

	// mmenu
	$('#my-menu').mmenu({
		extensions: ['theme-black', 'pagedim-black'],
		navbar: {
			title: '<img src="img/logo-1.svg" alt="Салон красоты S&Milter">'
		},
		offCanvas: {
			position: "right"
		},
	});
	var API = $("#my-menu").data("mmenu");
	var $menuBtn = $("header .hamburger");

	API.bind("open:start", function () {
		$menuBtn.addClass('is-active');
	});
	API.bind("close:start", function () {
		$menuBtn.removeClass('is-active');
	});

	// Fixed nav menu on scroll
	var nav = $('.nav-btn');

	$(window).scroll(function () {
		if ($(this).scrollTop() > 760) {
			nav.addClass("navbtn-fixed");
		} else {
			nav.removeClass("navbtn-fixed");
		}
	});

	 // Slow scroll for nav-menu link
	 $(".my-menu, .footer-nav-group").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top - 53;
    $('body,html').animate({ scrollTo: top }, 1500);
  });

	// servises-carousel 
	$('.servises-carousel').on('initialized.owl.carousel', function () {
		setTimeout(function () {
			heightBlock();
		}, 100);

	});
	$('.servises-carousel').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		smartSpeed: 600,
		navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			800: {
				items: 2
			},
			1100: {
				items: 3
			}
		}
	});

	
	$('.team-carousel').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		margin: 20,
		smartSpeed: 600,
		navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			990: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
	});
	
	// Servises - block image height 
	function heightBlock() {
		$('.servises-carousel-item').each(function () {
			var block = $(this),
				thisHeight = block.find('.servises-carousel-content').outerHeight(); // find block and his height
			block.find('.servises-carousel-img').css('min-height', thisHeight)

		});
	}
	// Resize window
	function onResize() {
		$('.servises-carousel-content').equalHeights();
	}
	onResize();
	window.onresize = function () {
		onResize()
	};

	// Selectric 
	$(function () {
		$('select').selectric();
	});


 // popup validate ajax form
 $('.callback-form-phone').mask("+ 38 (999) 999-99-99");

	// form validator & sender 
	jQuery.validator.addMethod(
		'regexp',
		function (value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		},
		"Please check your input."
	);

	var example = $('.callback-form');


	example.on('success.sml', function() {
		$('.callback-form').hide();
		$('.callback-sucsess').show();
		setTimeout(function() { 
			$('.callback-form').show();
			$('.callback-sucsess').hide();
		 }, 10000);
	
	});
	
	// Alax errors, server errors
	example.on('serverError.sml, ajaxError.sml', function(e, instance, form, response) {
			$('.callback-form').hide();
		$('.callback-sucsess').show().text('Что то пошло не так. Попробуйте позже.');
		setTimeout(function() { 
			$('.callback-form').show();
			$('.callback-sucsess').hide();
		 }, 10000);
	});
	
	example.on("afterInit.sml", function (e, instance, form) {
		$(form).off('submit.sml-' + instance.nsid);
	});
	example.sendMail({});
	example.validate({
		rules: {
			name: {
				required: true,
				digits: false,
				number: false,
				maxlength: 20,
				minlength: 4,
				regexp: '^[a-zA-Zа-яА-Я]+$'
			},
			phone: {
				required: true,
				maxlength: 20,
				minlength: 6,
			}
		},
		messages: {
			name: {
				number: "Введите имя правильно",
				required: "Заполните поле",
				maxlength: "Введите имя правильно",
				minlength: "Введите имя правильно",
				regexp: "Введите имя правильно"
			},
			phone: {
				required: "Заполните поле",
				digits: "Введите телефон в числовом формате:",
				maxlength: "Введите телефон в правильном формате",
				minlength: "Введите телефон в правильном формате"
			}
		},
		submitHandler: function (form) {
			$(form).sendMail('send');

		}

	});

	
});

// preloader
$(window).on('load', function() {
	$('.preloader').delay(1000).fadeOut('slow');
});