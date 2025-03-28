
function onLoad(event) {
    initPage()

    var language = getCookie('language');
    if (!language) {
        var userLang = navigator.language || navigator.userLanguage;
        language = userLang.substring(0, 2)
    }
    updateLanguage(language);

    var color_theme = getCookie('color_theme');
    if (!color_theme) {
        color_theme = 'light';
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            color_theme = 'dark';
        }
    }
    initThemeSwitcher(color_theme);
}

function initPage() {
    header = document.getElementById("header")
    header.innerHTML = getHeader()

    footer = document.getElementById("footer")
    footer.innerHTML = getFooter()
}

function getHeader() {
    return `
    <nav>
        <ul class="responsive_container" style="margin-left:5rem;">
            <a href="https://github.com/Slava2001">
                <img class="svg-inverted" width="50rem" height="50rem" src="/image/svg/github.svg" style="vertical-align:middle">
            </a>
            <a href="https://github.com/Slava2001" class="humble">
                <span style="font-size:1.6rem%;">GitHub</span>
            </a>
        </ul>

        <ul style="margin-right: 5rem">
            <li>
                <button class="outline">
                <a href="/" class="humble">
                    <span lang="en">Main</span>
                    <span lang="ru">Главная</span>
                </a>
                </button>
            </li>
            <li>
              <details class="dropdown" style="margin-top: 0; margin-bottom: 0;">
                <summary>
                  TorLand
                </summary>
                <ul dir="rtl">
                    <li>
                        <a href="/sections/TorLand/about/index.html">
                            <span lang="en">About</span>
                            <span lang="ru">Описание</span>
                        </a>
                    </li>
                    <li>
                        <a href="/sections/TorLand/simulation/index.html">
                            <span lang="en">Simulation</span>
                            <span lang="ru">Симуляция</span>
                        </a>
                    </li>
                    <li>
                        <a href="/sections/TorLand/compiler/index.html">
                            <span lang="en">Compiler</span>
                            <span lang="ru">Компилятор</span>
                        </a>
                    </li>
                    <li>
                        <a href="/sections/TorLand/world/index.html">
                            <span lang="en">World</span>
                            <span lang="ru">Мир</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/Slava2001/TorLand">
                            <span>GitHub</span>
                        </a>
                    </li>
                </ul>
              </details>
            </li>
            <li>
                <div style="display: flex; justify-content: center; flex-direction: column;">
                    <button onclick="updateLanguage('ru')" class="secondary language_button" id="ru_flag_btn">
                        <span class="flag-icon flag-icon-ru" id="ru_flag""></span>
                        &nbsp;Русский
                    </button>
                    <button onclick="updateLanguage('en')" class="secondary language_button" id="us_flag_btn">
                        <span class="flag-icon flag-icon-us" id="us_flag"></span>
                        &nbsp;English
                    </button>
                </div>
            </li>
            <li>
                <a href="#" id="theme_switcher"></a>
            </li>
        </ul>
    </nav>`
}

function getFooter() {
    return `
        <section style="display: flex; justify-content: center;">
            <div style="">
                <p style="display: inline">E-mail: slavakaplya20011501@gmail.com</p>
                <i id="main_email_copy_button" class="si-copy clickable responsive_container"
                    style="font-size: 1rem; object-fit: contain;" onclick="navigator.clipboard.writeText('slavakaplya20011501@gmail.com');">
                </i>
            </div>
            <div class="responsive_container" style="vertical-align:middle; position: absolute; right: 5rem;">
                <a href="https://github.com/nikonru/" class="humble">
                    <span style="font-size:1rem; vertical-align:middle">Designed by nikonru</span>
                </a>
                <a href="https://github.com/nikonru/">
                    <img  class="svg-inverted" width="20rem" height="20rem" src="/image/svg/github.svg">
                </a>
            </div>
        </section>`
}
