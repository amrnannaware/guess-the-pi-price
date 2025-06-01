// Simple Guess the Pi Price Game

const loginScreen = document.getElementById("login-screen");
const gameScreen = document.getElementById("game-screen");
const loginBtn = document.getElementById("login-btn");
const usernameInput = document.getElementById("username");
const loginError = document.getElementById("login-error");
const displayUsername = document.getElementById("display-username");

const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const feedback = document.getElementById("feedback");
const attemptsSpan = document.getElementById("attempts");
const restartBtn = document.getElementById("restart-btn");

let attempts = 0;
let currentUsername = null;

// The “real” Pi price (simulate with random for now)
const minPrice = 0.01;
const maxPrice = 10.0;
let piPrice = getRandomPrice(minPrice, maxPrice);

function getRandomPrice(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

function resetGame() {
  attempts = 0;
  attemptsSpan.textContent = attempts;
  feedback.textContent = "";
  guessInput.value = "";
  restartBtn.classList.add("hidden");
  guessBtn.disabled = false;
  piPrice = getRandomPrice(minPrice, maxPrice);
}

loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();

  // Basic username validation: non-empty and only letters, numbers, underscore allowed
  if (!username || !/^[a-zA-Z0-9_]+$/.test(username)) {
    loginError.textContent = "Please enter a valid Pi username (letters, numbers, _)";
    return;
  }

  currentUsername = username;
  loginError.textContent = "";
  displayUsername.textContent = currentUsername;

  loginScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  resetGame();
});

guessBtn.addEventListener("click", () => {
  const guess = parseFloat(guessInput.value);

  if (isNaN(guess)) {
    feedback.textContent = "Please enter a valid number!";
    return;
  }
  if (guess < minPrice || guess > maxPrice) {
    feedback.textContent = `Guess must be between ${minPrice} and ${maxPrice}`;
    return;
  }

  attempts++;
  attemptsSpan.textContent = attempts;

  if (guess === piPrice) {
    feedback.textContent = `🎉 Correct! The Pi price is $${piPrice}`;
    guessBtn.disabled = true;
    restartBtn.classList.remove("hidden");
  } else if (guess < piPrice) {
    feedback.textContent = "Too low! Try a higher guess.";
  } else {
    feedback.textContent = "Too high! Try a lower guess.";
  }
});

restartBtn.addEventListener("click", () => {
  resetGame();
});

