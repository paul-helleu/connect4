import '../style.css';
import openModal from './modals';
import icon from '../img/connect4-icon.gif';

// animated favicon (delete on production, add on HTML head)
const fav = document.querySelector('link[rel="icon"]');
fav.href = icon;

const allGamePiecesElements = document.querySelectorAll('.piece');
const columnsElements = document.querySelectorAll('.start-piece');

// gameArray
const genGameArray = () => {
  const arr = [];

  return arr;
};

const genColumnArr = () => {
  const arr = [[], [], [], [], [], [], []];

  for (let i = 0; i < 7; i++) {
    for (let r = 0; r < 6; r++) {
      arr[i].push([null]);
    }
  }
  return arr;
};

const gameArray = [];
const columnsArr = genColumnArr();

const addPiece = (columnId) => {
  const columnArr = columnsArr[columnId];
  console.log(columnArr);
  // piece checked
};

columnsElements.forEach((element, index) => {
  element.addEventListener('click', () => {
    const colId = Number(element.getAttribute('columnid'));
    addPiece(colId);
  });
});
