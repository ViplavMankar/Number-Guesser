const randomNum = Math.floor(Math.random() * 100 + 1);

const submitBtn = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remainingGuesses = document.querySelector('.lastResult');

const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const guessTaken = parseInt(userInput.value);
    validateGuess(guessTaken);
  });
}

function validateGuess(guess) {
  // validate if the guess is valid input no. or not, and is within the game's range or not
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < 1) {
    alert('Please enter a number more than 1');
  } else if (guess > 100) {
    alert('Please enter a number less than 1');
  } else {
    if (numGuess >= 11) {
      // displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNum}`);
      endGame();
    } else {
      prevGuess.push(guess);
      displayGuess(guess);
      examineGuess(guess);
    }
  }
}

function examineGuess(guess) {
  // check if the number guessed is correct or not
  if (guess === randomNum) {
    displayMessage(`Yes! You guessed it right!!!`);
    endGame();
  } else if (guess < randomNum) {
    if (Math.abs(randomNum - guess) <= 20) {
      displayMessage(`No! Number to guess is somewhat higher`);
    } else if (Math.abs(randomNum - guess) <= 40) {
      displayMessage(`No! Number to guess is very high`);
    } else {
      displayMessage(`No! Number to guess is TOO higher`);
    }
  } else if (guess > randomNum) {
    if (Math.abs(randomNum - guess) <= 20) {
      displayMessage(`No! Number to guess is somewhat lower`);
    } else if (Math.abs(randomNum - guess) <= 40) {
      displayMessage(`No! Number to guess is very low`);
    } else {
      displayMessage(`No! Number to guess is TOO lower`);
    }
  }
}

function displayGuess(guess) {
  // display what set of numbers the user guessed till now
  userInput.value = '';
  if (numGuess === 10) {
    guessSlot.innerHTML += `${guess}`;
  } else {
    guessSlot.innerHTML += `${guess}, `;
  }
  numGuess++;
  remainingGuesses.innerHTML = `${11 - numGuess} `;
}

function displayMessage(message) {
  // display if the guess was correct or not and was it greater than or lower than the required number
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function newGame() {
  // Start a new game
  const newGameBtn = document.querySelector('#newGame');
  newGameBtn.addEventListener('click', (e) => {
    randomNum = Math.floor(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remainingGuesses.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);

    playGame = true;
  });
}

function endGame() {
  // End the game
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = '<button id="newGame">Start new Game</button>';
  startOver.appendChild(p);
  playGame = false;
  newGame();
}
