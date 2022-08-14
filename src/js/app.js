import '../style.css';
import faviconImg from '../img/connect4-icon.gif';

// Include animated favicon
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.href = faviconImg;
document.head.appendChild(favicon);

// Get elements
const startPiecesElements = document.querySelectorAll('.start-pieces div');
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

const gameStack = [6, 6, 6, 6, 6, 6, 6];

startPiecesElements.forEach((startPiece, index) => {
  startPiece.addEventListener('click', () => {
    if (gameStack.every((value) => value == 0)) {
      console.log('all columns completed');
      return false;
    }

    if (!gameStack[index]) {
      console.log('column', (index + 1).toString(), 'completed');
      return false;
    }

    gameStack[index]--;
  });
});
