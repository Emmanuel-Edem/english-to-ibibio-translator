// Fetch the dictionary from the GitHub repository
const dictionaryURL = "https://raw.githubusercontent.com/Emmanuel-Edem/ibibio-dictionary/main/dictionary.json";
let dictionary = {};

fetch(dictionaryURL)
    .then(response => response.json())
    .then(data => {
        dictionary = data;
    })
    .catch(error => {
        alert("❌ Could not load the dictionary. Please check your internet or CORS settings.");
    });

function searchWord() {
    let input = document.getElementById("search").value.toLowerCase().trim();
    let resultBox = document.getElementById("result");
    let wordDisplay = document.getElementById("word-display");
    let audioSource = document.getElementById("audio-source");
    let audioPlayer = document.getElementById("audio-player");

    if (dictionary[input]) {
        let translatedWord = dictionary[input].translation;
        let audioFile = dictionary[input].audioFile;

        wordDisplay.textContent = `${input} = ${translatedWord}`;
        audioSource.src = `https://raw.githubusercontent.com/Emmanuel-Edem/audio-files/main/${audioFile}`;
        audioPlayer.load();
        resultBox.style.display = "block";
    } else {
        alert("❌ Word not found in the dictionary.");
        resultBox.style.display = "none";
    }
}

// Event Listeners
document.getElementById("search-btn").addEventListener("click", searchWord);
document.getElementById("play-btn").addEventListener("click", () => document.getElementById("audio-player").play());
document.getElementById("pause-btn").addEventListener("click", () => document.getElementById("audio-player").pause());
document.getElementById("repeat-btn").addEventListener("click", () => {
    let audio = document.getElementById("audio-player");
    audio.currentTime = 0;
    audio.play();
});
