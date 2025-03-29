var TEXT_TABLE = {};
var current_lang = "";

/**
 * Load CSV files with translated text for header and current page (translated_text.csv)
 */
async function loadTextsTable() {
    await Promise.all([
        await fetch('/common/header_text.csv')
            .then(resp => resp.text())
            .then(footer => parseTextsTable(footer))
            .catch(error => console.error('Failed to load header translated text')),
        await fetch('translated_text.csv')
            .then(resp => resp.text())
            .then(text => parseTextsTable(text))
            .catch(error => console.error('Failed to load page translated text'))
    ])
}

function parseTextsTable(csv_text_table) {
    const lines = csv_text_table.split('\n');
    const headers = lines[0].split(',');

    for (let i = 1; i < headers.length; i++) {
        if (!TEXT_TABLE[String(headers[i])]) {
            TEXT_TABLE[String(headers[i])] = {};
        }
    }
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i]) {
            continue;
        }
        const current_line = lines[i].split(',');
        for (let j = 1; j < current_line.length; j++) {
            TEXT_TABLE[String(headers[j])][String(current_line[0])] = current_line[j];
        }
    }
}

function selectLanguage(language) {
    $("[translated_text_id]").each(function () {
        updateTranslatedText(this, language);
    });
    current_lang = language;
    setCookie('language', language, 7);
}

/**
 * Set HTML element translated text.
 * @param {*} elem HTML element to set text.
 * @param {*} text_id translated text id.
 * @param {*} lang language (by default current selected language)
 */
function setElemTranslatedText(elem, text_id, lang = current_lang) {
    elem.setAttribute("translated_text_id", text_id);
    updateTranslatedText(elem, lang);
}

function updateTranslatedText(elem, lang) {
    let text_id = elem.getAttribute("translated_text_id");
    let text = "Error: unsupported language, language: " + lang;
    if (TEXT_TABLE[lang]) {
        text = "Error: not translated, lang: " + lang + " text id: " + text_id;
        if (TEXT_TABLE[lang][text_id]) {
            text = TEXT_TABLE[lang][text_id];
        }
    }
    elem.innerHTML = text;
}

function updateLanguage(language) {
    if (language == "ru") {
        selectLanguage("ru")
        setFlagGrey("us_flag")
        setFlagColorful("ru_flag")
        setButtonContrast("us_flag_btn", false)
        setButtonContrast("ru_flag_btn", true)
    } else {
        selectLanguage("en")
        setFlagGrey("ru_flag")
        setFlagColorful("us_flag")
        setButtonContrast("ru_flag_btn", false)
        setButtonContrast("us_flag_btn", true)
    }
};

function setFlagGrey(flag) {
    element = document.getElementById(flag)
    element.style.filter = "grayscale(60%)"
}

function setFlagColorful(flag) {
    element = document.getElementById(flag)
    element.style.filter = "grayscale(0%)"
}

function setButtonContrast(id, is_contrast) {
    cls = "outline"
    element = document.getElementById(id)
    if (is_contrast) {
        element.classList.add(cls)
    } else if (element.classList.contains(cls)) {
        element.classList.remove(cls)
    }
}
