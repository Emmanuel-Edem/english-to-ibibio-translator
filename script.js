// Initialize the dictionary variable
let dictionary = {};

// URL of the dictionary.json hosted on GitHub Pages
const dictionaryUrl = 'https://Emmanuel-Edem.github.io/english-to-ibibio-translator/dictionary.json';

// Function to load the dictionary from the JSON file
function loadDictionary() {
    fetch(dictionaryUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load dictionary');
            }
            return response.json();
        })
        .then(data => {
            dictionary = data;  // Store the loaded dictionary data
            console.log('Dictionary loaded');
        })
        .catch(error => {
            console.error('Error loading dictionary:', error);
            alert('❌ Could not load the dictionary. Please check your internet or CORS settings.');
        });
}

// Function to search for a word in the dictionary
function searchWord() {
    let input = document.getElementById("search").value.toLowerCase().trim();
    let resultBox = document.getElementById("result");
    let wordDisplay = document.getElementById("word-display");
    let audioSource = document.getElementById("audio-source");
    let audioPlayer = document.getElementById("audio-player");

    // Check if the input word exists in the dictionary
    if (dictionary[input]) {
        let translatedWord = dictionary[input].translation;
        let audioFile = dictionary[input].audioFile;

        wordDisplay.textContent = `🔊 ${input} = ${translatedWord}`;
        audioSource.src = `https://raw.githubusercontent.com/Emmanuel-Edem/audio-files/main/${audioFile}`;
        audioPlayer.load();
        resultBox.style.display = "block";
    } else {
        let alternative = fuzzyMatch(input); // Fuzzy matching for partial matches
        if (alternative) {
            input = alternative;
            let translatedWord = dictionary[input].translation;
            let audioFile = dictionary[input].audioFile;

            wordDisplay.textContent = `🔊 ${input} = ${translatedWord}`;
            audioSource.src = `https://raw.githubusercontent.com/Emmanuel-Edem/audio-files/main/${audioFile}`;
            audioPlayer.load();
            resultBox.style.display = "block";
        } else {
            alert("❌ Word not found!");
            resultBox.style.display = "none";
        }
    }
}

// Function for fuzzy matching words
function fuzzyMatch(input) {
    let words = input.toLowerCase().trim().split(/\s+/);
    let bestMatch = null;
    let bestMatchScore = 0;

    for (let key in dictionary) {
        let keyWords = key.toLowerCase().split(/\s+/);
        let matchCount = words.filter(word => keyWords.includes(word)).length;

        if (matchCount >= 2 && matchCount > bestMatchScore) {
            bestMatch = key;
            bestMatchScore = matchCount;
        }
    }
    return bestMatch;
}

// Event listeners for the buttons
document.getElementById("search-btn").addEventListener("click", searchWord);
document.getElementById("play-btn").addEventListener("click", () => document.getElementById("audio-player").play());
document.getElementById("pause-btn").addEventListener("click", () => document.getElementById("audio-player").pause());
document.getElementById("repeat-btn").addEventListener("click", () => {
    let audio = document.getElementById("audio-player");
    audio.currentTime = 0;
    audio.play();
});

// Load the dictionary when the page loads
window.onload = loadDictionary;
