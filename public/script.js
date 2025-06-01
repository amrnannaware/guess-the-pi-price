// script.js

// DOM elements for login
const loginScreen = document.getElementById('login-screen');
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const loginError = document.getElementById('login-error');

// DOM elements for game
const gameScreen = document.getElementById('game-screen');
const displayUsername = document.getElementById('display-username');
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const resultDiv = document.getElementById('result');
const scoreSpan = document.getElementById('score');
const resetBtn = document.getElementById('resetBtn');

let score = 0;
const maxPrice = 10;
let targetPrice = 0;
let loggedInUser = "";

// Generate random price with 2 decimals
function generateRandomPrice() {
  return parseFloat((Math.random() * maxPrice).toFixed(2));
}

// Login function
function login() {
  const username = usernameInput.value.trim();

  if (username === "") {
    loginError.textContent = "Please enter your Pi username.";
    return;
  }

  // Reset error if any
  loginError.textContent = "";

  // Save username, show game screen
  loggedInUser = username;
  displayUsername.textContent = loggedInUser;

  loginScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  startGame();
}

// Start or restart game
function startGame() {
  score = 0;
  targetPrice = generateRandomPrice();
  scoreSpan.textContent = score;
  resultDiv.textContent = "";
  guessInput.value = "";
  resetBtn.classList.add('hidden');
  guessBtn.disabled = false;
  guessInput.disabled = false;
  guessInput.focus();
}

// Check user's guess
function checkGuess() {
  const userGuess = parseFloat(guessInput.value);

  if (isNaN(userGuess)) {
    resultDiv.textContent = "Please enter a valid number!";
    return;
  }

  if (userGuess < 0.01 || userGuess > maxPrice) {
    resultDiv.textContent = `Please enter a number between 0.01 and ${maxPrice}.`;
    return;
  }

  if (userGuess === targetPrice) {
    score++;
    scoreSpan.textContent = score;
    resultDiv.textContent = `🎉 Correct! The Pi price was $${targetPrice}. Your score: ${score}`;
    
    // Prepare for next round
    targetPrice = generateRandomPrice();
    guessInput.value = "";
    guessInput.focus();

  } else if (userGuess > targetPrice) {
    resultDiv.textContent = "Too high! Try again.";
  } else {
    resultDiv.textContent = "Too low! Try again.";
  }
}

// Reset game (play again)
function resetGame() {
  startGame();
}

// Event listeners
loginBtn.addEventListener('click', login);

guessBtn.addEventListener('click', checkGuess);

guessInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

resetBtn.addEventListener('click', resetGame);
