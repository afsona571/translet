// Доступные языки
const languages = {
    "en": "English",
    "ru": "Русский",
    "es": "Español",
    "fr": "Français",
    "de": "Deutsch",
    "it": "Italiano",
    "zh-CN": "中文",
    "ja": "日本語"
};

// Заполняем выпадающие списки языков
const inputLangSelect = document.getElementById("inputlang");
const outputLangSelect = document.getElementById("outputlang");

for (let code in languages) {
    let option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = languages[code];
    inputLangSelect.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = code;
    option2.textContent = languages[code];
    outputLangSelect.appendChild(option2);
}

// Функция перевода
document.getElementById("translatebtn").addEventListener("click", async function () {
    let text = document.getElementById("writingarea").value;
    let inputLang = document.getElementById("inputlang").value;
    let outputLang = document.getElementById("outputlang").value;

    if (!text) {
        alert("Введите текст для перевода!");
        return;
    }

    if (!inputLang || !outputLang) {
        alert("Выберите языки!");
        return;
    }

    if (inputLang === outputLang) {
        alert("Выберите разные языки!");
        return;
    }

    let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${inputLang}|${outputLang}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        document.getElementById("outputarea").innerText = data.responseData.translatedText;
    } catch (error) {
        console.error("Ошибка перевода:", error);
    }
});

// Функция озвучивания текста
document.getElementById("spkbtn").addEventListener("click", function () {
    let text = document.getElementById("outputarea").innerText;

   

    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = document.getElementById("outputlang").value;
    window.speechSynthesis.speak(speech);
});
