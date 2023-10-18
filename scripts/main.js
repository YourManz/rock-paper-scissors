//saves score in localStorage and also sets a default if the score cannot be found.
let score = JSON.parse(localStorage.getItem('score')) || {win:0,lose:0,tie:0};
localStorage.setItem('score', JSON.stringify(score));

const actionButtonRock = document.querySelector('.js-action-rock'); 
const actionButtonPaper = document.querySelector('.js-action-paper');
const actionButtonScissors = document.querySelector('.js-action-scissors');


actionButtonRock.addEventListener('click', () => { selectWinOrLose('rock', 'paper', 'scissors', 'rock')});
actionButtonPaper.addEventListener('click', () => { selectWinOrLose('paper', 'scissors', 'rock', 'paper')});
actionButtonScissors.addEventListener('click', () => { selectWinOrLose('scissors', 'rock', 'paper', 'scissors')});

//===============================================================================// Sets the score in the .score class

document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.win} | Losses: ${score.lose} | Ties: ${score.tie}`;

//===============================================================================

const computerMove = pickComputerMove();
let result = '';

//===============================================================================
function resetScore() {
  score = {
    win: 0,
    lose: 0,
    tie: 0
  };
  document.querySelector('.js-score').innerHTML = `Wins: ${score.win} | Losses: ${score.lose} | Ties: ${score.tie}`
  localStorage.setItem('score', JSON.stringify(score));
};

//===============================================================================
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber <= 1/3) {
    computerMove = 'rock';
  } else if (randomNumber > 1/3 && randomNumber <=2/3) {
    computerMove = 'paper';
  } else if (randomNumber > 2/3) {
    computerMove = 'scissors';
  };
  return computerMove; //console logging this function will result in the computer move before giving an error.
};
//===============================================================================

function outputtingAlert(lose, win, tie, computerMove) {
    if (computerMove === lose) {
      score.lose++;
      localStorage.setItem('score', JSON.stringify(score)); // Update and store the score in local storage.
      return 'lose!';
    } else if (computerMove === win) {
      score.win++;
      localStorage.setItem('score', JSON.stringify(score)); // Update and store the score in local storage.
      return 'win!';
    } else if (computerMove === tie) {
      score.tie++;
      localStorage.setItem('score', JSON.stringify(score)); // Update and store the score in local storage.
      return 'tie!';
    };
  };

  //===============================================================================

  //document.querySelector('.js-images-result').innerHTML = '';
function selectWinOrLose(a, b, c, d) {
  const computerChoice = pickComputerMove();
  const output = outputtingAlert(b, c, d, computerChoice);
  let playerImage = document.querySelector('.js-player-image');
  let computerImage = document.querySelector('.js-computer-image');

  //document.querySelector('.js-images-result').innerHTML = 'You <img class="js-player-image result-image" src=""> Computer<img class="js-computer-image result-image" src="">';
  //console.log(document.querySelector('.js-images-result'))
  playerImage.setAttribute('src', `images/${a}-emoji.png`);
  computerImage.setAttribute('src', `images/${computerChoice}-emoji.png`);

  //document.querySelector('.js-win-or-lose')
    //.innerHTML = `You picked ${a}! The computer picked ${computerChoice}! You ${output}`;
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.win} | Losses: ${score.lose} | Ties: ${score.tie}`;
    return;
};

//===============================================================================
let autoPlayToggle = false;
let intervalId = null;
document.querySelector('.js-speed-input').value = 3000;

function playAuto() {
  autoPlayToggle = !autoPlayToggle;

  if (autoPlayToggle === true) {
    document.querySelector('.js-auto-button').textContent = 'Stop Auto Play';
    intervalId = setInterval(() => {
      const randomNumber = Math.random();

      if (randomNumber <= 1 / 3) {
        selectWinOrLose('rock', 'paper', 'scissors', 'rock');
      } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
        selectWinOrLose('paper', 'scissors', 'rock', 'paper');
      } else if (randomNumber > 2 / 3) {
        selectWinOrLose('scissors', 'rock', 'paper', 'scissors');
      }
    }, Number(document.querySelector('.js-speed-input').value));
  } else {
    clearInterval(intervalId); // Stop the interval when autoPlayToggle is false
    document.querySelector('.js-auto-button').textContent = 'Start Auto Play';
  }
}