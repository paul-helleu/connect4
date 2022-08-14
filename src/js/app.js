import '../style.css';
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
  return Math.round(Math.random());
};

const initArrowColor = () => {
  if (playerTurn) {
    startPieceContainer.className = 'green-turn';
    return;
  }
  startPieceContainer.className = 'red-turn';
};

const gameStack = [6, 6, 6, 6, 6, 6, 6];
// red: 0 | green: 1
let playerTurn = randomPlayer();

initArrowColor();

startPiecesElements.forEach((startPiece, index) => {
  startPiece.addEventListener('click', () => {
    if (gameStack.every((value) => value == 0)) {
      console.log('all columns completed');
      return;
    }

    if (!gameStack[index]) {
      console.log('column', (index + 1).toString(), 'completed');
      return;
    }

    gameStack[index]--;
  });
});
