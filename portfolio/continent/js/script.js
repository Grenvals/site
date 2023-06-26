$(document).ready(function () {

  // popup validate ajax form
  $('#phone').mask("(999) 999-99-99");

  $('#popup-form').submit(function () {
    event.preventDefault();
    var errors = false;

    $(this).find('span').empty();

    $(this).find('input').each(function () {

      var phone = $('#phone').val(),
        name = $('#name').val(),
        intPhone = /[0-9 -()+]+$/,
        intName = /^[a-zA-Zа-яА-Я]+$/;

      //validate all input on lenght & space
      if (($(this).val().length < 5) || ($(this).val().length > 50) || ($.trim($(this).val()) == '')) {
        errors = true;
        $(this).next().text('Заповніть правильно поле');
      }

      //validate special input(phone & name) 
      if ((phone.length < 8) || (!intPhone.test(phone))) {
        errors = true;
        $('#phone').next().text('Введіть номер правильно');
      }
      if (!intName.test(name)) {
        errors = true;
        $('#name').next().text('Введіть імя правильно');
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
        $('.popup-form__note').text('- йде відправка -');
      };

      function successForm(res) {
        if (res == 1) {
          console.log(data);
          $(".popup-form").find('input:not(#popup-submit)').val('');
          $('.popup-form__note').text('*Ми зателефонуємо вам протягом доби');
          $(".popup-form, .popup-close").hide(0.607);
          $(".popup__sucsess").show(0.607);
        } else {
          errorsForm;
        }
      };
      function errorsForm(data) {
        console.log(data);
        $(".popup-form").hide(0.607);
        $(".popup__sucsess").show(0.607);
        $('.popup__sucsess-title').text('Виникла помилка на сервері.')
      };

    };
    return false;
  });


  if (window.matchMedia("screen and (min-width: 1px) and (max-width:740px)").matches) {

  } else {

    // Fixed nav menu on scroll
    var nav = $('.header');
    var navWrap = $('.header-wrap');

    $(window).scroll(function () {
      if ($(this).scrollTop() > 660) {
        nav.addClass("header_fixed");
        navWrap.addClass("header-wrap_fixed");
      } else {
        nav.removeClass("header_fixed");
        navWrap.removeClass("header-wrap_fixed");
      }
    });
  }

  // Slow scroll for nav-menu link
  $(".header-nav, .footer-nav__list").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top - 53;
    $('body,html').animate({ scrollTop: top }, 1500);
  });


  /*Button for mobile menu*/
  $('.nav-menu-btn').click(function () {
    $('.nav-menu-btn').toggleClass('nav-menu-btn_activ');
    $('.header-nav').toggleClass('header-nav_activ');
    return false;
  });

  $('.nav-menu-btn_activ').click(function () {
    $('.nav-menu-btn').removeClass('nav-menu-btn_activ');
    $('.header-nav').removeClass('header-nav_activ');
    return false;
  });

  // Function for popup show
  $(".button").on("click", function () {
    $(".overlay").show(0.607);
    $('.header-nav').removeClass('nav-menu-btn_activ');
    $('.nav-menu-btn').removeClass('header-nav_activ');
    return false;
  });

  $('.header-nav_btn').click(function () {
    $('.nav-menu-btn').removeClass('nav-menu-btn_activ');
    $('.header-nav').removeClass('header-nav_activ');
    return false;
  });

  $(".popup-close, .popup-form__button-close").on("click", function () {
    $(".overlay").hide(0.7);
    $(".popup-form, .popup-close").show(0.607);
    $(".popup__sucsess").hide(0.607);
    return false;
  });

  // svg
  $('.main-bg__part').hover(function () {
      if (window.matchMedia("screen and (min-width: 1290px) and (max-width:1560px)").matches) {
        var p = $(this);  // Add cordinat "hover element" for .main-tip class
        var offset = p.offset();
        $(".main-tip").show(0.607);
        $(".main-tip").css({ "top": offset.top + -100, "left": offset.left + -10 });
        $('.description').fadeIn();
      };
    
    if (window.matchMedia("(min-width: 740px)").matches) {

    } else {
      $('.main-bg__link').attr('xlink:href', 'javascript:void(0);');
    }

    $('.main-inf__title, .main-tip__title').html($(this).attr('data-description__title'));
    $('.main-inf__subsc, .main-tip__desc').html($(this).attr('data-description__subsc'));
    $('.main-inf__descr').html($(this).attr('data-description__desc'));
   
  });

  // Aparment block
  $(function () {
    $(".previev-form__input").on("click", function () {

      if ($('#one-bedroom').is(":checked")) {

        $('.onebadroom-slider, .previev-info__onebadroom, .apartment-previev__onebedroom').show(0.607);
        $('.twobadroom-slider, .threebadroom-slider, .twoflors-slider, .previev-info__twobadroom, .previev-info__threebadroom, .previev-info__twofloors').hide(0.607);
      }
      else if ($('#two-bedroom').is(":checked")) {

        $('.twobadroom-slider, .previev-info__twobadroom').show(0.607);
        $('.onebadroom-slider, .threebadroom-slider, .twoflors-slider, .previev-info__onebadroom, .previev-info__threebadroom, .previev-info__twofloors, .apartment-previev__onebedroom').hide(0.607);
      }
      else if ($('#three-bedroom').is(":checked")) {

        $('.threebadroom-slider, .previev-info__threebadroom').show(0.607);
        $('.onebadroom-slider, .twobadroom-slider, .twoflors-slider, .previev-info__onebadroom, .previev-info__twobadroom, .previev-info__twofloors, .apartment-previev__onebedroom').hide(0.607);
      }
      else if ($('#two-floors').is(":checked")) {

        $('.twoflors-slider, .previev-info__twofloors').show(0.607);
        $('.onebadroom-slider, .twobadroom-slider, .threebadroom-slider, .previev-info__onebadroom, .previev-info__twobadroom, .previev-info__threebadroom, .apartment-previev__onebedroom').hide(0.607);
      }
    })
  });






});


