import '../style.css';
import modal from './modals';
import faviconImg from '../img/connect4-icon.gif';

// Include animated favicon
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.href = faviconImg;
document.head.appendChild(favicon);

// Get elements
const startPieceContainer = document.getElementById('start-pieces');
const startPiecesElements = startPieceContainer.querySelectorAll('div');
const allGamePiecesElements = document.querySelectorAll('.cases div');

const gamePiecesTo2DRowArray = () => {
  const result = [];
  for (let i = 0; i < 6; i++) {
    const elements = [];

    for (let j = 0; j < 7; j++) {
      elements.push(allGamePiecesElements[i * 7 + j]);
    }

    result.push(elements);
  }
  return result;
};

const gamePiecesTo2DColumnArray = () => {
  const result = [];
  for (let i = 0; i < 7; i++) {
    const elements = [];

    for (let j = 0; j < 6; j++) {
      elements.push(allGamePiecesElements[j * 7 + i]);
    }
    result.push(elements);
  }
  return result;
};

const randomPlayer = () => {
  return !!Math.round(Math.random());
};

const initArrowColor = () => {
  if (playerTurn) {
    startPieceContainer.className = 'green-turn';
    return;
  }
  startPieceContainer.className = 'red-turn';
};

const resetGame = () => {
  allGamePiecesElements.forEach((element) => {
    element.classList = '';
  });

  gameStack = [6, 6, 6, 6, 6, 6, 6];
};

// Alignment check
const checkVerticalAlignment = () => {
  const gameColumns = gamePiecesTo2DColumnArray();

  for (let i = 0; i < 7; i++) {
    let greenAcc = 0;
    let redAcc = 0;

    for (let j = 0; j < 6; j++) {
      if (gameColumns[i][j].className == 'green') {
        greenAcc++;
      } else {
        greenAcc = 0;
      }

      if (gameColumns[i][j].className == 'red') {
        redAcc++;
      } else {
        redAcc = 0;
      }

      if (greenAcc == 4) {
        return 1;
      }

      if (redAcc == 4) {
        return 0;
      }
    }
  }
};

let gameStack = [6, 6, 6, 6, 6, 6, 6];
// red: false | green: true
let playerTurn = randomPlayer();

initArrowColor();

startPiecesElements.forEach((startPiece, index) => {
  startPiece.addEventListener('click', () => {
    if (gameStack.every((value) => value == 0)) {
      modal('All columns are completed, reseting the game !');
      resetGame();
      return;
    }

    if (!gameStack[index]) {
      modal('Column ' + (index + 1).toString() + ' completed');
      return;
    }

    gameStack[index]--;

    const gameColumns = gamePiecesTo2DColumnArray();
    gameColumns[index][gameStack[index]].className = playerTurn ? 'green' : 'red';

    const vertical = checkVerticalAlignment();

    if (vertical == 0 || vertical == 1) {
      console.log({ vertical, playerTurn });

      modal(
        (playerTurn ? '<span class="green">GREEN</span>' : '<span class="red">RED</span>') +
          ' wins with vertical alignment !',
      );
      resetGame();
    }

    playerTurn = !playerTurn;
    initArrowColor();
  });
});
