const mode_sun = '<img class="svg-inverted" width="30rem" height="10rem" src="/image/svg/mode_sun.svg">'
const mode_moon = '<img class="svg-inverted" width="30rem" height="10rem" src="/image/svg/mode_moon.svg">'

let theme_is_light = true
function initThemeSwitcher(mode) {
    const html = document.documentElement
    const theme_switcher = document.getElementById('theme_switcher')

    theme_switcher.innerHTML = mode == 'light'? mode_moon: mode_sun;
    theme_is_light = mode == 'light';
    if (!theme_is_light) {
        document.body.classList.toggle("inverted");
    }
    html.setAttribute('data-theme', theme_is_light? 'light': 'dark');

    theme_switcher.addEventListener('click', (e)=> {
      e.preventDefault();
      document.body.classList.toggle("inverted");
      theme_is_light = !theme_is_light;
      html.setAttribute('data-theme', theme_is_light? 'light': 'dark');
      theme_switcher.innerHTML = theme_is_light? mode_moon : mode_sun
      setCookie('color_theme', theme_is_light? 'light': 'dark', 7);
    })
}
