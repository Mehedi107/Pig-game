'use strict';

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const player1Score = document.querySelector('#score--0');
const player2Score = document.querySelector('#score--1');
const curScore1 = document.querySelector('#current--0');
const curScore2 = document.querySelector('#current--1');
const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Switch player function
const changePlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
};

// Reset scores & visual
const resetScore = function () {
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  dice.classList.add('hidden');
};
resetScore();

// Roll dice functionality
btnRollDice.addEventListener('click', function () {
  // Random dice roll number
  let diceValue = Math.trunc(Math.random() * 6) + 1;
  console.log(diceValue);
  dice.src = `imgs/dice-${diceValue}.png`;
  dice.classList.remove('hidden');

  // Display dice value
  if (diceValue !== 1) {
    currentScore += diceValue;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
  } else {
    // Switch player
    changePlayer();
  }
});

// Hold button functionality
btnHold.addEventListener('click', function () {
  // Add score to current player
  score[activePlayer] += currentScore;

  // Declare winner if score 100
  if (score[activePlayer] >= 100) {
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    btnRollDice.disabled = true;
    btnHold.disabled = true;
  } else {
    document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];

    // Switch player
    changePlayer();
  }
});

// New game functionality
btnNewGame.addEventListener('click', function () {
  btnRollDice.disabled = false;
  btnHold.disabled = false;
  currentScore = 0;
  score[0] = 0;
  score[1] = 0;

  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  curScore1.textContent = 0;
  curScore2.textContent = 0;

  activePlayer = 0;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');

  // Reset scores & visual
  resetScore();
});
