// URL of the raw dictionary.json file
const dictionaryUrl = 'https://raw.githubusercontent.com/Emmanuel-Edem/english-to-ibibio-translator/main/dictionary.json';

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

// Load the dictionary when the page loads
window.onload = loadDictionary;
