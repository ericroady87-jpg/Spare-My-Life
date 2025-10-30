/*-------------- Constants -------------*/
// Word list and hints for the game
const wordList = [
    { word: "blaster", hint: "A weapon that shoots energy bolts." },
    { word: "starship", hint: "A spacecraft used for interstellar travel." },
    { word: "colony", hint: "A settlement established by people from another planet." },
    { word: "navigation", hint: "The process of determining and planning a course." },
    { word: "frontier", hint: "The outermost limit of an area of development or settlement." }
];
// Keyboard letters for on-screen keyboard
const keyBoardLetters = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M'
];

/*-------------- Variables -------------*/
let selectedWord = ''; // selects the word to guess
let displayedWord = []; // Array to hold the current state of the displayed word
let guessedLetters = new Set(); // Set to hold guessed letters
let wrongGuesses = 0; // Counter for wrong guesses
let maxWrongGuesses = 6; // Maximum allowed wrong guesses
let gameActive = false; // Flag to indicate if the game is active

/*-------------- Cached Elements -------------*/
const wordContainer = document.getElementById('word-container'); // Container for the word display
const keyboardContainer = document.getElementById('keyboard-container'); // Container for the on-screen keyboard
const messageContainer = document.getElementById('message-container'); // Container for messages
const hintContainer = document.getElementById('hint-container'); // Container for hints
const startGameButton = document.getElementById('start-game-button'); // Button to start the game
const resetButton = document.getElementById('reset-button'); // Button to reset the game
const hintButton = document.getElementById('hint-button'); // Button to show a hint 

/*-------------- Event Listeners -------------*/

startGameButton.addEventListener('click', startGame); //Starts the game
resetButton.addEventListener('click', resetGame); //Resets the game
hintButton.addEventListener('click', showHint); //Shows a hint  
keyboardContainer.addEventListener('click', handleLetterClick); //Handles letter clicks

/*-------------- Functions -------------*/
function startGame() {
    // Select a random word from the word list
    const randomIndex = Math.floor(Math.random() * wordList.length);
    selectedWord = wordList[randomIndex].word.toUpperCase();
    displayedWord = Array(selectedWord.length).fill('_');
    guessedLetters.clear();
    wrongGuesses = 0;
    gameActive = true;
    updateWordDisplay();
    updateKeyboard();
    messageContainer.textContent = '';
    hintContainer.textContent = '';
}
// Updates the displayed word
function updateWordDisplay() {
    wordContainer.textContent = displayedWord.join(' ');
}
// Updates the on-screen keyboard
function updateKeyboard() {
    keyboardContainer.innerHTML = '';
    keyBoardLetters.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.disabled = guessedLetters.has(letter) || !gameActive;
        keyboardContainer.appendChild(button);
    });
}
// Handles letter clicks on the keyboard
function handleLetterClick(event) {
    if (!gameActive || event.target.tagName !== 'BUTTON') return;
    const letter = event.target.textContent;
    if (guessedLetters.has(letter)) return;
    guessedLetters.add(letter);
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                displayedWord[i] = letter;
            }
        }
        updateWordDisplay();
        if (!displayedWord.includes('_')) {
            messageContainer.textContent = 'Congratulations! You won!';
            gameActive = false;
        }
    } else {
        wrongGuesses++;
        if (wrongGuesses >= maxWrongGuesses) {
            messageContainer.textContent = `Game Over! The word was: ${selectedWord}`;
            gameActive = false;
        }
    }
    updateKeyboard();
}
// Shows a hint for the selected word
function showHint() {
    if (!gameActive) return;
    const wordObj = wordList.find(obj => obj.word.toUpperCase() === selectedWord);
    hintContainer.textContent = wordObj ? wordObj.hint : 'No hint available.';
}
// Resets the game state
function resetGame() {
    selectedWord = '';
    displayedWord = [];
    guessedLetters.clear();
    wrongGuesses = 0;
    gameActive = false;
    wordContainer.textContent = '';
    keyboardContainer.innerHTML = '';
    messageContainer.textContent = '';
    hintContainer.textContent = '';
}