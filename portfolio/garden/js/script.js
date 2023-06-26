// preloader
$(window).on('load', function () {
  $('.preloader').delay(350).fadeOut('slow');
});

$(document).ready(function () {

  if (window.matchMedia("screen and (min-width: 1px) and (max-width:768px)").matches) {

    // Slow scroll for nav-menu link (mobile)
    $(".header-nav-list, .footer-nav-list, .header-nav-button").on("click", "a", function (event) {
      if ($(this).attr('href').length < 10) {

        event.preventDefault();
        var id = $(this).attr('href'),
          top = $(id).offset().top;
        $('body,html').animate({
          scrollTop: top
        }, 1500);
      }

    });

    /*Button for mobile menu*/
    var link = $('.nav-menu-btn'),
      link_activ = $('.nav-menu-btn_activ'),
      nav = $('.header-nav'),
      linkMenu = $('.header-nav-link, .header-button');

    link.click(function () {
      link.toggleClass('nav-menu-btn_activ');
      nav.toggleClass('navigation_activ');
    });
    link_activ.click(function () {
      link.removeClass('nav-menu-btn_activ');
      nav.removeClass('navigation_activ');
    });
    linkMenu.click(function () {
      link.removeClass('nav-menu-btn_activ');
      nav.removeClass('navigation_activ');
    });

  } else {
    // Slow scroll for nav-menu link desktop
    $(".header-nav-list, .footer-nav-list, .header-nav-button").on("click", "a", function (event) {
      if ($(this).attr('href').length < 10) {

        event.preventDefault();
        var id = $(this).attr('href'),
          top = $(id).offset().top - 53;
        $('body,html').animate({
          scrollTop: top
        }, 1500);
      }

    });

    // Fixed nav menu on scroll
    var nav = $('.header-nav');
    $(window).scroll(function () {

    });

    // block image height $ width
    function heightBlock() {
      $('.features-block').each(function () {
        var block = $(this),
          thiswidth = block.find('.features-block-item').outerWidth(); // find block and his height
        block.find('.features-block-item').css('height', thiswidth)
      });
      $('.features-block').each(function () {
        var block = $(this),
          thisHeight = block.find('.features-block-item').outerHeight(); // find block and his height
        block.find('.servise-block-space').css('height', thisHeight)
      });
      $('.servises-wrap').each(function () {
        var block = $(this),
          thiswidth = block.find('.servises-block').outerWidth(); // find block and his height
        block.find('.servises-block').css('height', (thiswidth / 100) * 80)
      });
    }heightBlock();
    $(window).on('resize', function () {
      heightBlock();
    });


  };


  // popup validate ajax form
  $('.callback-form-phone').mask("+38(999) 999-99-99");

  $('.callback-form').submit(function () {
    event.preventDefault();
    var errors = false;

    $(this).find('.callback-form-label').empty();

    $(this).find('input').each(function () {

      var phone = $('.callback-form-phone').val(),
        name = $('.callback-form-name').val(),
        intPhone = /[0-9 -()+]+$/,
        intName = /^[a-zA-Zа-яА-Я]+$/;

      //validate all input on lenght & space
      if (($(this).val().length < 5) || ($(this).val().length > 50) || ($.trim($(this).val()) == '')) {
        errors = true;
        $(this).prev().text('Заповніть правильно поле');
      }

      //validate special input(phone & name) 
      if ((phone.length < 8) || (!intPhone.test(phone))) {
        errors = true;
        $('.callback-form-phone').prev().text('Введіть номер правильно');
      }
      if (!intName.test(name)) {
        errors = true;
        $('.callback-form-name').prev().text('Введіть імя правильно');
      }

    });

    //  Ajax sender ( if errors = false)
    if (!errors) {
      console.log($('form').serialize());
      var data = $('form').serialize();
      $.ajax({
        url: 'mailer/smart.php',
        type: 'POST',
        data: data,
        beforeSend: beforeSendForm,
        success: successForm,
        error: errorsForm
      });

      function beforeSendForm() {
        $('.callback-form-status').text('- йде відправка -');
      };

      function successForm(res) {
        if (res == 1) {
          console.log(data);
          $(".callback-form").find('input:not(.callback-form-button)').val('');
          $(".callback-form").hide(0.607);
          $(".callback-sucsess").show(0.607);
          $(".callback-form-status").empty();
          $('.callback-form-name').prev().text('Введіть ваше імя');
          $('.callback-form-phone').prev().text('Введіть ваш телефон');
          setTimeout(function () {
            $('.callback-form').show();
            $('.callback-sucsess').hide();
          }, 10000);
        } else {
          errorsForm;
        }
      };

      function errorsForm(data) {
        console.log(data);
        $(".callback-form").hide(0.607);
        $(".callback-sucsess").show(0.607);
        $(".callback-form").find('input:not(.callback-form-button)').val('');
        $(".callback-form-status").empty();
        $('.callback-sucsess-title').text('Виникла помилка на сервері.');
        $('.callback-sucsess-subscription').text('Спробуйте пізніше. Через 10 секунд форма автоматично перезавантажиться.')
        $('.callback-form-name').prev().text('Введіть ваше імя');
        $('.callback-form-phone').prev().text('Введіть ваш телефон');
        setTimeout(function () {
          $('.callback-form').show();
          $('.callback-sucsess').hide();
        }, 10000);
      };

    };
    return false;
  });

  //  servises.html > acordeon for price
  $('.price-block').toggleClass('price-block-hide');
  $('.price-block:first').toggleClass('price-block-show').find('.price-title-icon').toggleClass('price-title-icon_activ');
  $('.price-title').click(function () {
    $(this).parent().toggleClass('price-block-show');
    $(this).find('.price-title-icon').toggleClass('price-title-icon_activ');
    return false;
  });
  if (!$(".price-block").hasClass("price-block-show")) {
    $('.table-show').click(function () {
      $(this).parent().removeClass('price-block-show');
      return false;
    });
  }

});