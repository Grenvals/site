$(window).on('load', function () {
  // Polifils for IE11
  (function () {
    if (!Element.prototype.closest) {
      Element.prototype.closest = function (css) {
        var node = this;
        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      };
    }

  })();
  (function () {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
  })();
});

$(document).ready(function () {

  svg4everybody({});
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
  var bannerSlider = function () {
    var owl = $('.js-banner');
    owl.owlCarousel({
      loop: true,
      margin: 20,
      smartSpeed: 500,
      dots: true,
      items: 1,
      navText: ['<span class="banner__navigation banner__navigation-prev"><img class="banner__navigation-icon" src="static/images/content/slider/left-arrow.svg" alt="s"></span>', '<span class="banner__navigation banner__navigation-next"><img class="banner__navigation-icon" src="static/images/content/slider/right-arrow.svg" alt="s"></span>'],
      responsive: {
        0: {
        },
        400: {
          loop: false,
          items: 1,
          center: false,
        },
        577: {
        },
        769: {
          nav: true,
        }
      }
    })
  };
  var agvantagesSlider = function () {
    var owl = $('.advantages');
    owl.owlCarousel({
      loop: true,
      smartSpeed: 500,
      dots: true,
      nav: false,
      slideBy: 1,
      items: 7,
      responsive: {
        0: {
          items: 3,
        },
        567: {
          items: 3,
        },
        767: {
          items: 5,
        },
        1139: {
          items: 7,
        }
      }
    })
  };
  var productSlider = function () {

    var sync1 = $(".js-big-product-slider");
    var sync2 = $(".js-small-product-slider");
    var slidesPerPage = 4; 
    var syncedSecondary = true;
  
    sync1.owlCarousel({
      items : 1,
      slideSpeed : 2000,
      nav: false,
      autoplay: false,
      dots: false,
      loop: true,
      responsiveRefreshRate : 200,
    }).on('changed.owl.carousel', syncPosition);
  
    sync2
      .on('initialized.owl.carousel', function () {
        sync2.find(".owl-item").eq(0).addClass("current");
      })
      .owlCarousel({
      items : slidesPerPage,
      dots: false,
      nav: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      smartSpeed: 700,
      slideSpeed : 700,
      slideBy: slidesPerPage,  
      responsiveRefreshRate : 100,
      navText: ['<span class="product__navigation product__navigation-prev"><img class="product__navigation-icon" src="static/images/content/slider/left-arrow.svg" alt="s"></span>', '<span class="product__navigation product__navigation-next"><img class="product__navigation-icon" src="static/images/content/slider/right-arrow.svg" alt="s"></span>'],
    }).on('changed.owl.carousel', syncPosition2);
  
    function syncPosition(el) {
      //if you set loop to false, you have to restore this next line
      //var current = el.item.index;
      //if you disable loop you have to comment this block
      var count = el.item.count-1;
      var current = Math.round(el.item.index - (el.item.count/2) - .5);
      
      if(current < 0) {
        current = count;
      }
      if(current > count) {
        current = 0;
      }
      sync2
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = sync2.find('.owl-item.active').length - 1;
      var start = sync2.find('.owl-item.active').first().index();
      var end = sync2.find('.owl-item.active').last().index();
      
      if (current > end) {
        sync2.data('owl.carousel').to(current, 100, true);
      }
      if (current < start) {
        sync2.data('owl.carousel').to(current - onscreen, 100, true);
      }
    }
    
    function syncPosition2(el) {
      if(syncedSecondary) {
        var number = el.item.index;
        sync1.data('owl.carousel').to(number, 100, true);
      }
    }
    
    sync2.on("click", ".owl-item", function(e){
      e.preventDefault();
      var number = $(this).index();
      sync1.data('owl.carousel').to(number, 300, true);
    }); 
  };
  var tabs = function () {
    $('.tabs-navigation__item').click(function () {
      var tabName = $(this).attr('data-show-tab'),
        tabsBody = $(this).closest('.tabs').find('.tabs-body')[0],
        tab = $(tabsBody).find('.' + tabName);

      $(this).addClass('tabs-navigation__item_active').siblings().removeClass('tabs-navigation__item_active');
      $(tab).addClass('tab_active').siblings().removeClass('tab_active');

      if ($(tabsBody).find('.js-products-line-slider').length) {
        $('.js-products-line-slider').each(function () {
          $(this).trigger('refresh.owl.carousel');
        });
      };
    });



  };
  var previewSlider = function () {
    var owl = $('.js-products-line-slider');
    owl.owlCarousel({
      loop: false,
      smartSpeed: 500,
      dots: true,
      lazyLoad: true,
      nav: false,
      items: 4,
      slideBy: 1,
      responsive: {
        0: {
          items: 1,
        },
        567: {
          items: 2,
        },
        767: {
          items: 3,
        },
        1139: {
          items: 4,
        }
      }
    })
  };
  var navCatalog = function () {
    if (!isMobile.any()) {
      $('.catalog-open-btn').hover(function () {
        $('.main-nav__dropdown-wrapper').addClass('is-active');
      }, function () {
        $('.main-nav__dropdown-wrapper').removeClass('is-active');
      });

      $('.main-subnav__item').hover(function () {
        $(this).children('.main-subnav__list').addClass('is-active');
        $(this).find('.main-subnav__arrow').addClass('fill-white');
      }, function () {
        $(this).children('.main-subnav__list').removeClass('is-active');
        $(this).find('.main-subnav__arrow').removeClass('fill-white');
      });

    } else {
      $('.catalog-open-btn_mobile').click(function (event) {
        $('.main-nav__dropdown-wrapper').toggleClass('is-active');
      });
      $('.main-subnav__item').click(function (event) {
        $(this).children('.main-subnav__list').toggleClass('is-active');
        $(this).find('.main-subnav__arrow').toggleClass('main-subnav__arrow_is-active');
        $('.main-subnav__item').not($(this)).children('.main-subnav__list').removeClass('is-active');
        $('.main-subnav__item').not($(this)).find('.main-subnav__arrow').removeClass('main-subnav__arrow_is-active');
      });
    }
  };
  var categorySelect = function () {
    $('.select').click(function (event) {
      if (!$(this).hasClass('disabled')) {
        $('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
        $(this).toggleClass('active');
      }
    });

    $('.select-options__value').click(function () {
      if ($(this).parents('.select').hasClass('content-search__select')) {
        $(this).parents('.select').find('.select-title__value').html('<span>' + $(this).html() + '</span>');
        $('body,html').scrollTop(0);
      } else {
        $(this).parents('.select').find('.select-title__value').html($(this).html());
      }
      if ($.trim($(this).data('value')) != '') {
        $(this).parents('.select').find('input').val($(this).data('value'));
      } else {
        $(this).parents('.select').find('input').val($(this).html());
      }
    });
  };
  var filterItem = function () {
    $(document).on('click', '.filter-item__header', function () {
      $(this).parent().toggleClass('filter-item_active')
    })
  };
  var filterSlider = function () {
    $('.filter-slider__line').each(function () {
      var slider = $(this)[0],
        sliderFrom = $(this).parent().find('.filter-slider__value_from')[0],
        sliderTo = $(this).parent().find('.filter-slider__value_to')[0],
        inputs = [sliderFrom, sliderTo],
        type = $(this).data('type');

      if (type === 'range-price') {
        noUiSlider.create(slider, {
          start: [1000, 45000],
          // tooltips: [true, true],
          connect: true,
          margin: 300,
          step: 10,
          range: {
            min: 1000,
            max: 50000
          },
          format: wNumb({
            decimals: 0,
            thousand: '',
          })
        });
      };
      slider.noUiSlider.on('update', function (values, handle) {
        inputs[handle].value = Math.floor(values[handle]);
      })
      inputs.forEach(function (input, handle) {

        input.addEventListener('change', function () {
          slider.noUiSlider.setHandle(handle, this.value);
        });

      });
    });
  };
  var filterMobilePopup = function () {
    var filterBlock = $('.category-filter'),
        productsBlock = $('.category-main');

    $(document).on('click', '.filters-button', function () {
      filterBlock.toggleClass('is-active');
      productsBlock.toggleClass('is-hide');
    });
    $(document).on('click', '.filter__close', function () {
      filterBlock.removeClass('is-active');
      productsBlock.removeClass('is-hide');
    });
    $(document).on('click', '.filter-button', function () {
      filterBlock.removeClass('is-active');
      productsBlock.removeClass('is-hide');
    });
    
  };
  var starRating = function () {
    $('.rating-script .star').hover(function () {
      $(this).parent().find('.star').removeClass('star_active');
      var ind = $(this).index();
      var $this = $(this);
      for (var i = 0; i <= ind; i++) {
        $(this).parent().find('.star').eq(i).addClass('star_active');
      };
  
    }, function () {
      $(this).parent().find('.star').removeClass('active');
      var ind = $(this).parent().find('input').val() - 1;
      for (var i = 0; i <= ind; i++) {
        $(this).parent().find('.star').eq(i).addClass('active');
      };
  
    });
    $('.rating-script .star').click(function (event) {
      var re = $(this).parent().find('.star.star_active').length;
  
      $(this).parent().find('input').val(re);
      // Получаем длину и сохраняем значение в инпут
  
    });
  
    $.each($('.rating-script'), function (index, val) {
  
      var ind = $(this).find('input').val() - 1;
      for (var i = 0; i <= ind; i++) {
        $(this).parent().find('.star').eq(i).addClass('star_active');
      }
      
    });
  };
  var quantity = function () {
    $('.quantity__button-plus').click(function(event) {
      var n=parseInt($(this).prev().val())+1;
      $(this).prev().val(n);
      return false;
    });
    $('.quantity__button-minus').click(function(event) {
      var n=parseInt($(this).next().val())-1;
      if(n<1){n=1;}
      $(this).next().val(n);
      return false;
    });
  };
  var formValidation = function () {

    $('form').submit(function(){
      event.preventDefault();
      var errors = false;
      $(this).find('input').removeClass('form-error');
      $(this).find('input').each(function () {
        var name = $('.form-user__name').val(),
          email = $('.form-user__email').val(),
          intAdress = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
          intName = /^[a-zA-Zа-яА-Я]+$/;
  
        //validate all input on lenght & space
        if (($.trim($(this).val()) == '') || ($(this).val().trim().length < 4) || ($(this).val().length > 60)) {
          $(this).addClass('form-error');
          errors = true;
        }; 
  
        //validate special input(name & mail) 
        if (!intName.test(name)) {
          $(this).addClass('form-error');
          errors = true;
        }; 
  
        // if ((email.length < 8) || (!intAdress.test(email))) {
        //   $(this).addClass('form-error');
        //   errors = true;
        // };
      });
  
      //validate textarea on lenght & space
      $(this).find('textarea').each(function () {
        if (($.trim($(this).val()) == '') || ($(this).val().trim().length < 30) || ($(this).val().length > 1000)) {
          $(this).addClass('form-error');
          errors = true;
        } else {
          $(this).removeClass('form-error');
        }
      });
  
      return false;
    });
  };

  
  bannerSlider();
  agvantagesSlider();
  previewSlider();
  tabs();
  navCatalog();
  categorySelect();
  filterItem();
  filterSlider();
  filterMobilePopup();
  starRating();
  productSlider();
  quantity();
  formValidation();
});