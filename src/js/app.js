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

startPiecesElements.forEach((startPiece) => {
  startPiece.addEventListener('click', () => {
    console.log(startPiece);
  });
});

const gamePiecesTo2DRowArray = () => {
  const result = [];
  for (let i = 0; i < 6; i++) {
    const elements = [];
    const ite = i * 7;

    for (let j = 0; j < 7; j++) {
      elements.push(allGamePiecesElements[ite + j]);
    }

    result.push(elements);
  }
  return result;
};

console.log(gamePiecesTo2DRowArray(allGamePiecesElements));
