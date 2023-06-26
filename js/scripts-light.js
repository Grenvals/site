document.addEventListener('DOMContentLoaded', function () {
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
  // Menu
  const mobileMenu = () => {
    const mobileBurger = document.querySelector('.menu__icon');
    const mobileMenu = document.querySelector('.menu__container');
    mobileBurger.addEventListener('click', function (e) {
      mobileMenu.classList.toggle('active');
      mobileBurger.classList.toggle('active');
    });
  };

  mobileMenu();
  fixedHeaderOnScroll();
});
