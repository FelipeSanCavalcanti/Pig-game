'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



// Sarting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0
  score1El.textContent = 0
  current0El.textContent = 0
  current1El.textContent = 0

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function() {
  currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Dice roll funtionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Get a randon number
  const dice = Math.trunc(Math.random() * 6) + 1;

  // Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // Check for tolled 1: If true, switch to next player
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
    // Switch to next player
    switchPlayer()
    };
    };
});



// Hold function
btnHold.addEventListener('click', function() {
  if (playing) {
    scores[activePlayer] += currentScore;
  
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  
    if (scores[activePlayer] >= 100){
    playing = false;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    diceEl.classList.add('hidden');

    } else {
    switchPlayer();
    };
  };
});

btnNew.addEventListener('click', init);
