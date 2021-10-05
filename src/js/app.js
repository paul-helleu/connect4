import '../style.css';
import openModal from './modals';

const columnElements = document.querySelectorAll('.start-piece');
const pieceElements = document.querySelectorAll('.piece');

const arrSchema = [[], [], [], [], [], [], []];
let formatArr = [];
const nbPieceArr = [0, 0, 0, 0, 0, 0, 0];
// nombre de pièces dans le tableau ex: [1, 0, 4, 3]

let playerTurn = 1;
// 1 : vert
// 2 : rouge

// const columnsArr = formatArr.map(() => {});
// const rowsArr = formatArr.map((colArr) => {
//   const arr = [];
//   arr.push();

//   return arr;
// });

const addPieceArr = (column) => {
  nbPieceArr[column] += 1;
};

const winCondition = () => {
  let winConditionVertical = 0;
  let winConditionHorizontal = 0;

  formatArr.map((columnsArr) => {
    columnsArr.map((arr) => {
      // vertical condition
      if (arr[2] === playerTurn) {
        winConditionVertical += 1;
        if (winConditionVertical === 4) {
          openModal(
            `Le joueur ${
              playerTurn === 1 ? 'Rouge' : 'Vert'
            } gagne la partie avec un alignement vertical !`
          );
        }
      } else {
        winConditionVertical = 0;
      }

      // horizontal condition
      // [[1, 6, 2]] [[2, 6, 2]]

      // console.log(arr[2]);
    });
    if (columnsArr[0]) {

    }
  });

  // comparaison du tableau
  // diagonale => vérification de l'autre column avec l'index supérieur ou inférieur
  // horizontale => index de column égale column de l'index supérieur ou inférieur
};

const changeCSSClass = () => {
  columnElements.forEach((element) => {
    if (playerTurn === 2) {
      element.classList.add('red-turn');
      element.classList.remove('green-turn');
    } else {
      element.classList.add('green-turn');
      element.classList.remove('red-turn');
    }
  });
};

const displayPiece = (column, row) => {
  pieceElements.forEach((piece) => {
    const { attributes } = piece;
    if (
      attributes.columnId.value === column.toString() &&
      attributes.rowId.value === row.toString()
    ) {
      attributes.class.value += playerTurn === 1 ? ' red' : ' green';
    }
  });
};

const changePlayerTurn = () => {
  if (playerTurn === 1) {
    playerTurn = 2;
  } else {
    playerTurn = 1;
  }
};

const addPiece = (column) => {
  if (nbPieceArr[column - 1] === 6) {
    openModal('Vous ne pouvez pas ajouter de pièce ici !');
    // openmodal de réinitialisation du jeu ou annuler le coup
  }

  formatArr[column - 1][nbPieceArr[column - 1]][2] = playerTurn;
  const row = formatArr[column - 1][nbPieceArr[column - 1]][1];

  changeCSSClass();
  addPieceArr(column - 1);
  winCondition();
  displayPiece(column, row);
  changePlayerTurn();
};

columnElements.forEach((column) => {
  column.addEventListener('click', (e) => {
    const { value } = e.target.attributes.columnId;

    addPiece(Number(value));
  });
});

const format = (arr) => {
  let row = 6;

  for (let i = 0; i < 7; i += 1) {
    for (let e = 0; e < 6; e += 1) {
      arr[i].push([i + 1, row, 0]);
      row -= 1;
    }
    row = 6;
  }
  return arr;
};

formatArr = format(arrSchema);
