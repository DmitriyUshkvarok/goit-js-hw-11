let buttonUp = document.querySelector('.btn-scroll');

window.addEventListener('scroll', onScrolFunction);

function onScrolFunction(e) {
  if (window.pageYOffset > 200) {
    buttonUp.classList.add('shown');
  } else {
    buttonUp.classList.remove('shown');
  }
}

buttonUp.addEventListener('click', onScrollUp);

function onScrollUp() {
  window.scrollTo(0, 0);
}

const theme = document.querySelector('.js-theme');

theme.addEventListener('click', onWhiteTheme);

function onWhiteTheme(e) {
  e.preventDefault();
  document.body.classList.toggle('shown');
  console.log(theme);
}
