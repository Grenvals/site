document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu
  const mobileMenu = () => {
    const mobileBurger = document.querySelector('.menu__icon');
    const mobileMenu = document.querySelector('.menu__container');
    mobileBurger.addEventListener('click', function (e) {
      mobileMenu.classList.toggle('active');
      mobileBurger.classList.toggle('active');
    });
  };

  // FixedHeaderOnScroll
  const fixedHeaderOnScroll = () => {
    const content = document.querySelector('.header');
    document.addEventListener('scroll', (e) => {
      const scrolled = document.scrollingElement.scrollTop;
      const position = content.offsetTop;
      if (scrolled > position + 8) {
        content.classList.add('header_fixed');
      } else {
        content.classList.remove('header_fixed');
      }
    });
  };

  //  Active link on scroll
  const activeLinkOnScroll = () => {
    const mainNavLinks = document.querySelectorAll('.menu__link');
    window.addEventListener('scroll', (event) => {
      const fromTop = window.scrollY + 300;
      mainNavLinks.forEach((link) => {
        let section = document.querySelector(link.hash);
        if (
          section.offsetTop <= fromTop + 100 &&
          section.offsetTop + section.offsetHeight > fromTop + 55
        ) {
          link.classList.add('current');
        } else {
          link.classList.remove('current');
        }
      });
    });
  };

  // Slow scroll on click
  const slowScrollOnClick = () => {
    const mainNavLinks = document.querySelectorAll('.menu__link');
    mainNavLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(e.target.hash);
        scrollAnimate(section.offsetTop, 600);
        mobileMenu.classList.toggle('active');
        mobileBurger.classList.toggle('active');
      });
    });
  };

  // Slow scroll animate
  const scrollAnimate = (to, duration = 700) => {
    const element = document.scrollingElement || document.documentElement,
      start = element.scrollTop,
      change = to - start,
      startDate = +new Date(),
      easeInOutQuad = function (currentTime, startValue, changeInValue, duration) {
        currentTime /= duration / 2;
        if (currentTime < 1)
          return (changeInValue / 2) * currentTime * currentTime + startValue;
        currentTime--;
        return (-changeInValue / 2) * (currentTime * (currentTime - 2) - 1) + startValue;
      },
      animateScroll = function () {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          element.scrollTop = to;
        }
      };
    animateScroll();
  };

  const formHandler = () => {
    const form = document.querySelector('.contact-form-handler');
    const formErrorList = document.querySelector('.contact-form__errorsList');
    const fields = document.querySelectorAll('.contact-form__input');
    const errors = document.querySelectorAll('.contact-form__errors');
    const notification = document.querySelector('.contact-form__notification');
    const submitButton = document.querySelector('.contact-form__button');
    const formStatus = document.querySelector('.contact-form__status');
    const formStatusButton = document.querySelector('.form-status__button');

    const firstName = document.querySelector('.contact-form__name');
    const email = document.querySelector('.contact-form__email');
    const message = document.querySelector('.contact-form__message');

    const onFormStatusButtonClick = (value) => {
      formStatusButton.addEventListener('click', function (e) {
        event.preventDefault();
        onSuccess();
      });
    };

    const isNotEmpty = (value) => {
      if (value == null || typeof value == 'undefined') return false;
      return value.length > 0;
    };

    const isMaxLength = (value) => {
      return value.length > 200;
    };

    const isMinLength = (value) => {
      return value.length < 5;
    };

    const isEmail = (email) => {
      const regexEmailAdress = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      return regexEmailAdress.test(String(email).toLowerCase());
    };

    const isName = (name) => {
      const regexUserName = /^[a-zA-Zа-яА-Я]+$/;
      return regexUserName.test(String(name).toLowerCase());
    };

    const getErrorMessage = (dataAttribute) => {
      return formErrorList.getAttribute(dataAttribute);
    };

    const errorCreator = (element, message) => {
      element.nextSibling.textContent = message;
    };

    const notificationCreator = (message) => {
      notification.textContent = message;
    };

    const onSuccess = () => {
      formStatus.classList.toggle('active');
      form.classList.toggle('unactive');
      fields.forEach((el) => (el.value = ''));
      notificationCreator('');
    };

    const formSerialize = (form) => {
      if (!form || form.nodeName !== 'FORM') {
        return;
      }
      var i,
        j,
        q = [];
      for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === '') {
          continue;
        }
        switch (form.elements[i].nodeName) {
          case 'INPUT':
            switch (form.elements[i].type) {
              case 'text':
              case 'tel':
              case 'email':
              case 'hidden':
              case 'password':
              case 'button':
              case 'reset':
              case 'submit':
                q.push(
                  form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value)
                );
                break;
              case 'checkbox':
              case 'radio':
                if (form.elements[i].checked) {
                  q.push(
                    form.elements[i].name +
                      '=' +
                      encodeURIComponent(form.elements[i].value)
                  );
                }
                break;
            }
            break;
          case 'file':
            break;
          case 'TEXTAREA':
            q.push(
              form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value)
            );
            break;
          case 'SELECT':
            switch (form.elements[i].type) {
              case 'select-one':
                q.push(
                  form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value)
                );
                break;
              case 'select-multiple':
                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                  if (form.elements[i].options[j].selected) {
                    q.push(
                      form.elements[i].name +
                        '=' +
                        encodeURIComponent(form.elements[i].options[j].value)
                    );
                  }
                }
                break;
            }
            break;
          case 'BUTTON':
            switch (form.elements[i].type) {
              case 'reset':
              case 'submit':
              case 'button':
                q.push(
                  form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value)
                );
                break;
            }
            break;
        }
      }
      return q.join('&');
    };

    const formValidationHandler = () => {
      let isErrors = false;

      for (var i = 0; i < errors.length; i++) {
        errors[i].textContent = '';
      }
      for (var i = 0; i < fields.length; i++) {
        fields[i].classList.remove('error');
      }

      for (var i = 0; i < fields.length; i++) {
        if (!isNotEmpty(fields[i].value)) {
          errorCreator(fields[i], getErrorMessage('data-errors-enpty'));
          fields[i].classList.add('error');
          isErrors = true;
        } else if (isMaxLength(fields[i].value)) {
          errorCreator(fields[i], getErrorMessage('data-errors-max-length'));
          fields[i].classList.add('error');
          isErrors = true;
        } else if (isMinLength(fields[i].value)) {
          errorCreator(fields[i], getErrorMessage('data-errors-min-length'));
          fields[i].classList.add('error');
          isErrors = true;
        }
      }

      if (!isEmail(email.value)) {
        errorCreator(email, getErrorMessage('data-errors-email'));
        email.classList.add('error');
        isErrors = true;
      } else if (!isName(firstName.value)) {
        errorCreator(firstName, getErrorMessage('data-errors-name'));
        firstName.classList.add('error');
        isErrors = true;
      }
      return isErrors;
    };

    const formSender = () => {
      form.addEventListener('submit', function (e) {
        event.preventDefault();
        if (!formValidationHandler()) {
          submitButton.disabled = true;
          notificationCreator(getErrorMessage('data-process-send'));
          const data = formSerialize(this);
          const request = new XMLHttpRequest();
          const url = 'mailer/smart.php';
          request.open('POST', url, true);
          request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          request.addEventListener('readystatechange', () => {
            serverResponse = JSON.parse(request.responseText).result;
            console.log(serverResponse);
            if (
              request.readyState === 4 &&
              request.status === 200 &&
              serverResponse === 'pass'
            ) {
              onSuccess();
            } else {
              notificationCreator(serverResponse);
            }
            submitButton.disabled = false;
          });
          request.addEventListener('error', () => {
            notificationCreator(getErrorMessage('data-errors-network'));
            submitButton.disabled = false;
          });
          request.send(data);
        } else {
          for (var i = 0; i < fields.length; i++) {
            fields[i].addEventListener('input', () => {
              formValidationHandler();
            });
          }
        }
      });
    };
    formSender();
    onFormStatusButtonClick();
  };

  const typedTextAnimation = () => {
    const optionsForRobotDelorean = {
      strings: [
        'Hi!',
        'Here',
        'are some',
        'of my',
        'projects.',
        '^1000',
        'If you have   ',
        'any questions',
        'please',
        'contact me :)',
        '^1000',
        'call Elon...',
        '^3000',
        '..Ground Control',
        'to',
        'Major Tom',
        '...^1000',
        'Commencing',
        'countdown',
        'engines on',
        '...^1000',
        'Check ignition',
        'and may ',
        "God's love be",
        'with you',
        '...)^1000',
      ],
      typeSpeed: 45,
      backSpeed: 45,
      backDelay: 1000,
      startDelay: 3000,
      loop: true,
    };

    const optionsForUserLaptop = {
      strings: [
        ' Make it fun',
        ' Make it run ^1000 \n   make it right\n       make it fast :)',
        ' "Have the courage ^1000 \n   to follow your heart \n     and intuition" ― Steve Jobs',
      ],
      typeSpeed: 60,
      backSpeed: 40,
      startDelay: 3000,
      backDelay: 1000,
      loop: true,
    };
    isInit = false;
    document.addEventListener('scroll', () => {
      const scrollTop = document.scrollingElement.scrollTop;
      const element = document.querySelector('.typed-robot-animate');
      const animateOnStart = document.querySelector('.robot__init');
      if (scrollTop > element.offsetTop + window.innerHeight && isInit === false) {
        const robotDelorean = new Typed('.typed-robot-animate', optionsForRobotDelorean);
        setTimeout(() => {
          animateOnStart.classList.add('robot__init_onstart');
          setTimeout(() => {
            animateOnStart.classList.remove('robot__init_onstart');
          }, 6000);
        }, 2300);

        isInit = true;
      }
    });

    const userLaptop = new Typed('.typed-block-animate', optionsForUserLaptop);
  };

  const animateMoveElementOnScroll = () => {
    const rellax = new Rellax('.rellax');
  };

  const audioPlayer = () => {
    var myAudio = new Audio('../audio/david-bowie-space-oddity.mp3');
    myAudio.preload = 'none';
    const controllElement = document.querySelector('.robot__init');
    let isPlay = false;
    controllElement.addEventListener('click', function (e) {
      if (!isPlay) {
        myAudio.play();
        isPlay = true;
      } else {
        myAudio.pause();
        isPlay = false;
      }
    });
  };
  mobileMenu();
  fixedHeaderOnScroll();
  activeLinkOnScroll();
  slowScrollOnClick();
  formHandler();
  typedTextAnimation();
  animateMoveElementOnScroll();
  audioPlayer();
});
