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

const gamePiecesTo2DDiagonalArray = () => {
  const result = [];

  // #region Diagonal Array ( / )
  for (let i = 3; i < 6; i++) {
    const element = [];

    let ite = i,
      id = i;

    do {
      element.push(allGamePiecesElements[id]);

      id += 6;
      ite--;
    } while (ite >= 0);

    result.push(element);
  }

  for (let i = 3; i < 6; i++) {
    const element = [];

    let ite = i,
      id = i;

    do {
      element.push(allGamePiecesElements[allGamePiecesElements.length - id - 1]);

      id += 6;
      ite--;
    } while (ite >= 0);

    result.push(element);
  }
  // #endregion ( / )

  // #region Diagonal Array ( \ )
  for (let i = 3; i < 6; i++) {
    const element = [];

    let ite = i,
      id = 6 - i;

    do {
      element.push(allGamePiecesElements[id]);

      id += 8;
      ite--;
    } while (ite >= 0);

    result.push(element);
  }

  for (let i = 3; i < 6; i++) {
    const element = [];

    let ite = i,
      id = allGamePiecesElements.length - 7;

    do {
      element.push(allGamePiecesElements[id + i]);

      id -= 8;
      ite--;
    } while (ite >= 0);

    result.push(element);
  }
  // #endregion ( \ )

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
const checkHorizontalAlignment = (color) => {
  const gameRows = gamePiecesTo2DRowArray();

  for (let i = 0; i < 6; i++) {
    let acc = 0;

    for (let j = 0; j < 7; j++) {
      if (gameRows[i][j].classList.contains(color)) {
        acc++;
      } else {
        acc = 0;
      }

      if (acc == 4) {
        return true;
      }
    }
  }
};

const checkVerticalAlignment = (color) => {
  const gameColumns = gamePiecesTo2DColumnArray();

  for (let i = 0; i < 7; i++) {
    let acc = 0;

    for (let j = 0; j < 6; j++) {
      if (gameColumns[i][j].classList.contains(color)) {
        acc++;
      } else {
        acc = 0;
      }

      if (acc == 4) {
        return true;
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

    const color = playerTurn ? 'green' : 'red';

    // columns alignment check
    const gameColumns = gamePiecesTo2DColumnArray();
    gameColumns[index][gameStack[index]].className = color;

    const vertical = checkVerticalAlignment(color);

    if (vertical) {
      modal(`<span class="${color}">${color.toUpperCase()}</span> wins with vertical alignment !`);
      resetGame();
    }

    // rows alignment check
    const horizontal = checkHorizontalAlignment(color);

    if (horizontal) {
      modal(
        `<span class="${color}">${color.toUpperCase()}</span> wins with horizontal alignment !`,
      );
      resetGame();
    }

    playerTurn = !playerTurn;
    initArrowColor();
  });
});
