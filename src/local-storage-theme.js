// Выбираем кнопку
const btn = document.querySelector('.js-theme');
// Выбираем настройки темы из localStorage
const currentTheme = localStorage.getItem('theme');
// Если текущая тема в localStorage равна "dark"…
if (currentTheme == 'dark') {
  // …тогда мы используем класс .dark-theme
  document.body.classList.add('shown');
}

btn.addEventListener('click', onClickTheme);

function onClickTheme() {
  document.body.classList.toggle('shown');
  // Допустим, тема светлая
  let theme = 'light';
  // Если <body> содержит класс .dark-theme…
  if (document.body.classList.contains('shown')) {
    // …тогда делаем тему тёмной
    theme = 'dark';
  }
  // После чего сохраняем выбор в localStorage
  localStorage.setItem('theme', theme);
}
