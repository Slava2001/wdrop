/**
 * Common page init command. Loads header, footer, selects language and color theme and other
 * common action. Should be called on page load.
 * @param {*} _event event.
 */
function onLoad(_event) {
    initPage().then(() => {
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
    });
}

async function initPage() {
    await Promise.all([
        fetch('/common/header.html')
            .then(resp => resp.text())
            .then(header => document.getElementById('header').innerHTML = header)
            .catch(error => console.error('Failed to load header')),
        fetch('/common/footer.html')
            .then(resp => resp.text())
            .then(footer => document.getElementById('footer').innerHTML = footer)
            .catch(error => console.error('Failed to load footer')),
        loadTextsTable()
    ])
}
