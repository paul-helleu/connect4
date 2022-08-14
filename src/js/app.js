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


