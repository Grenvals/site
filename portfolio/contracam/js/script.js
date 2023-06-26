/* Javscript Document 
Dev By Valentyn Dubin. LinkedIn: https://www.linkedin.com/in/valentyn-dubin/
*/

// preloader
$(window).on('load', function () {
  $('.preloader').delay(100).fadeOut('slow');
});

// Jquery scripts
$(document).ready(function () {
  // Detection of mobile devices
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  if (isMobile.any() || screenWidth < 769 ) {  // If mobile device or screen width < 769px
    var screenWidth = $(window).width();

    if (isMobile.iOS()) {                     // If mobile device is iOS
      // Func
    }
    if (isMobile.Android()) {                 // If mobile device is Android
      // Func
    }

    $(window).resize(function () {           // If screen width changed 
      var screenWidthOnChange = $(window).width();
      var screenHeightOnChange = $(window).height();
      if (screenWidth != screenWidthOnChange) {
        // Func
      }
    });

    $(window).on("orientationchange", function () {   //  If screen orientation changed 
      var screenWidthOnChange = $(window).width();
      // Func
    });

    // Func

    $('.menu-header__icon').click(function (event) {
      event.preventDefault();
      $(this).toggleClass('active');
      $('.menu-header__menu').toggleClass('active');
      $('body').toggleClass('lock');
    }); 
    $(".slow-scroll").on("click", function (event) {
      $('.menu-header__icon').toggleClass('active');
      $('.menu-header__menu').toggleClass('active');
      $('body').toggleClass('lock');
      event.preventDefault();
      var id = $(this).attr('href'),
        top = $(id).offset().top;
      $('body,html').animate({
        scrollTop: top
      }, 900);
    });

  } else {
     
  // Slow scroll for nav-menu link 
  $(".slow-scroll").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 900);
  });
  }

// Translate image to backgroung
  function ibg(){
    $.each($('.ibg'), function(index, val) {
      if($(this).find('img').length>0){
        $(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
      }
    });
  }
  ibg();

  // SLIDERS
  $('.main-carousel').owlCarousel({
    loop: true,
    margin: 10,
    smartSpeed: 500,
    dots: true,
    items: 1,
    navText: ['<span class="arrow-owl arrow-left"></span>', '<span class="arrow-owl arrow-right"></span>'],
    responsive: {
      0: {
        stagePadding: 70,
        startPosition: 0,
        items: 1, 
        center: true,
      },
      370: {
        stagePadding: 100,
        startPosition: 0,
        items: 1, 
        center: true,
      },
      480: {
        items: 3,
        stagePadding: 0,
        center: true,
      },
      768: {
        items: 1,
        autoplay: true,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        nav: true,
      }
    }
  })

  $('.servises-slider').owlCarousel({
    loop: false,
    margin: 20,
    smartSpeed: 500,
    navText: ['<span class="arrow-owl arrow-left"></span>', '<span class="arrow-owl arrow-right"></span>'],
    dots: false,
    responsive: {
      0: {
        loop: true,
        items: 1,
        dots: true,
        center: true,
        stagePadding: 60,
        startPosition: 1,
      },
      360: {
        stagePadding: 90, 
        items: 1,
        startPosition: 1,
        dots: true,
        center: true,
      },
      480: {
        items: 2,
        dots: true,
        startPosition: 2,
      },
      550: {
        items: 3,
        dots: true,
        stagePadding: 0
      },
      992: {
        items: 4,
        nav: true,
      }
    }
  })

  // CALLBACK POPUP 
  $(".button-callback").on("click", function (event) {
    event.preventDefault();
    $('.callback').toggleClass('callback_activ');
  });
  $(".сallback-close").on("click", function (event) {
    event.preventDefault();
    $('.callback').removeClass('callback_activ');
  });

  // callback succsess button
  $('.callback-status__button').on("click", function (event) {
    event.preventDefault();
    $(".callback-block, .сallback-close").show(0.607);
    $(".callback-status").hide(0.607);
    $('.callback').removeClass('callback_activ');
  })

  //----------------- FORM ------------------------------------------------------------
  $('.callback-form').submit(function () {
    event.preventDefault();
    var errors = false;

    $(this).find('.callback-form__errors').empty();

    $(this).find('input').each(function () {

      var name = $('.callback-form__name').val(),
        email = $('.callback-form__email').val(),
        intAdress = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        intName = /^[a-zA-Zа-яА-Я]+$/;

      //validate all input on lenght & space
      if (($.trim($(this).val()) == '') || ($(this).val().trim().length < 4) || ($(this).val().length > 60)) {
        var showError = $('.callback-errors').attr("data-errors-base");
        $(this).next().text(showError);
        errors = true;
      }

      //validate special input(name & mail) 
      if (!intName.test(name)) {
        errors = true;
        var showError = $('.callback-errors').attr("data-errors-name");
        $('.callback-form__name').next().text(showError);
      }

      if ((email.length < 8) || (!intAdress.test(email))) {
        errors = true;
        var showError = $('.callback-errors').attr("data-errors-email");
        $('.callback-form__email').next().text(showError);
      }

    });

    //validate textarea on lenght & space
    $(this).find('textarea').each(function () {
      if (($.trim($(this).val()) == '') || ($(this).val().trim().length < 30) || ($(this).val().length > 1000)) {
        errors = true;
        var showError = $('.callback-errors').attr("data-errors-base");
        $(this).next().text(showError);
      }
    });

    //  Ajax sender ( if errors = false)
    if (!errors) {
      data = $('form').serialize();
      $.ajax({
        url: 'mailer/smart.php',
        type: 'POST',
        data: data,
        beforeSend: beforeSendForm,
        success: successForm,
        error: errorsForm
      });

      // Function before send
      function beforeSendForm() {
        var showError = $('.callback-errors').attr("data-process-send");
        $('.callback-form__message').next().text(showError);
        $('.callback-form__button').prop('disabled', true);
      };

      // Function success, server ansver
      function successForm(data) {
        var serverAnswer = $.parseJSON(data);
        $('.callback-form__message').next().text(serverAnswer.result);
        console.log(serverAnswer.result);
        if (serverAnswer.result == "pass") {
          $(".callback-form__errors").empty();
          $('.callback-form').trigger("reset");
          $('.callback-form__button').prop('disabled', false);
          $(".callback-block").hide(0.607);
          $('.сallback-close').hide(0.607);
          $(".callback-status").show(0.607);
        } else {
          var showError = $('.callback-errors').attr("data-errors-server");
          $('.callback-status__message').text(showError);
          $(".callback-block").hide(0.607);
          $(".callback-status").show(0.607);
          setTimeout(reloadPage, 5000);
        }
      };

      // Function errors
      function errorsForm(data) {
        console.log(data);
        $(".callback-block").hide(0.607);
        $(".callback-status").show(0.607);
        $(".callback-status__message").empty();

        var showError = $('.callback-errors').attr("data-errors-send");
        $('.callback-status__message').text(showError);
        setTimeout(reloadPage, 5000);
      };

      // Function reload page 
      function reloadPage() {
        location.reload();
      } 
    };
    return false;
  });

});