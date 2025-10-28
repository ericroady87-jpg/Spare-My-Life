/*-------------- Constants -------------*/
// Word list and hints for the game
const wordList = [
    { word: "blaster", hint: "A weapon that shoots energy bolts." },
    { word: "starship", hint: "A spacecraft used for interstellar travel." },
    { word: "colony", hint: "A settlement established by people from another planet." },
    { word: "navigation", hint: "The process of determining and planning a course." },
    { word: "frontier", hint: "The outermost limit of an area of development or settlement." }
];

const keyBoardLetters = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M'
];

/*-------------- Variables -------------*/
let selectedWord = '';
let displayedWord = []; // Array to hold the current state of the displayed word
let guessedLetters = new Set();
let wrongGuesses = 0;
let maxWrongGuesses = 6;
let gameActive = false;

/*-------------- Cached Elements -------------*/

const hangmanImg = document.getElementById('hangman-img');
const wordDisplay = document.getElementById('word-display');
const keyboardContainer = document.getElementById('keyboard');
const hintDisplay = document.getElementById('hint-display');
const startGameButton = document.getElementById('start-game-button');
const resetButton = document.getElementById('reset-button');
const hintButton = document.getElementById('hint-button');


/*-------------- Event Listeners -------------*/

startGameButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
hintButton.addEventListener('click', showHint);
keyboardContainer.addEventListener('click', handleLetterClick);

/*-------------- Functions -------------*/

function startGame() {
    resetGame();
    gameActive = true;
    const randomIndex = Math.floor(Math.random() * wordList.length);
    selectedWord = wordList[randomIndex].word.toUpperCase();
    displayedWord = Array(selectedWord.length).fill('_');
    updateWordDisplay();
    hintDisplay.textContent = '';
}
function resetGame() {
    selectedWord = '';
    displayedWord = [];
    guessedLetters.clear();
    wrongGuesses = 0;
    gameActive = false;
    hangmanImg.src = 'images/hangman-0.svg';
    wordDisplay.textContent = '';
    hintDisplay.textContent = '';
    renderKeyboard();
}
function showHint() {
    if (!gameActive) return;
    const wordObj = wordList.find(obj => obj.word.toUpperCase() === selectedWord);
    hintDisplay.textContent = wordObj ? `Hint: ${wordObj.hint}` : '';
}

