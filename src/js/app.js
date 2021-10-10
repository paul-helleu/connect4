import '../style.css';
import openModal from './modals';
import icon from '../img/connect4-icon.gif';

// initial animated icon
const fav = document.querySelector('link[rel="icon"]');
fav.href = icon;

const columnElements = document.querySelectorAll('.start-piece');
const pieceElements = document.querySelectorAll('.piece');

let pieceArr = [];

pieceElements.forEach((elem) => {
  pieceArr.push([Number(elem.attributes.columnId.value), Number(elem.attributes.rowId.value), 0]);
});
const nbPieceArr = [0, 0, 0, 0, 0, 0, 0];
// nombre de pièces dans le tableau ex: [1, 0, 4, 3]

// dry functions required
const columnsPiecesArr = () => {
  const newArr = [[], [], [], [], [], [], []];
  let col = 0;

  for (let i = 0; i < newArr.length * 6; i++) {
    if (col === newArr.length) {
      col = 0;
    }
    newArr[col].push(pieceArr[i]);

    col++;
  }
  return newArr;
};

const rowsPiecesArr = () => {
  const newArr = [[], [], [], [], [], []];
  let row = 0;

  for (let i = 0; i < newArr.length * 7; i++) {
    if (!(i % 7)) {
      row++;
    }
    newArr[row - 1].push(pieceArr[i]);
  }
  return newArr;
};

const diagonalsPiecesArr1 = () => {
  const newArr = [[], [], [], [], [], []];
  let row = 2;
  let col = 0;
  // fonction dry

  for (let i = 0; i < 4; i++) {
    newArr[0].push(columnsPiecesArr()[col][row]);
    row++;
    col++;
  }

  row = 1;
  col = 0;
  for (let i = 0; i < 5; i++) {
    newArr[1].push(columnsPiecesArr()[col][row]);
    row++;
    col++;
  }

  row = 0;
  col = 0;
  for (let i = 0; i < 6; i++) {
    newArr[2].push(columnsPiecesArr()[col][row]);
    row++;
    col++;
  }

  row = 0;
  col = 1;
  for (let i = 0; i < 6; i++) {
    newArr[3].push(columnsPiecesArr()[col][row]);
    row++;
    col++;
  }

  row = 0;
  col = 2;
  for (let i = 0; i < 5; i++) {
    newArr[4].push(columnsPiecesArr()[col][row]);
    row++;
    col++;
  }

  row = 0;
  col = 3;
  for (let i = 0; i < 4; i++) {
    newArr[5].push(columnsPiecesArr()[col].reverse()[row]);
    row++;
    col++;
  }

  return newArr;
};

const diagonalsPiecesArr2 = () => {
  const newArr = [[], [], [], [], [], []];
  let row = 2;
  let col = 6;
  // fonction dry

  for (let i = 0; i < 4; i++) {
    newArr[0].push(columnsPiecesArr()[col][row]);
    row++;
    col--;
  }

  row = 1;
  col = 6;
  for (let i = 0; i < 5; i++) {
    newArr[1].push(columnsPiecesArr()[col][row]);
    row++;
    col--;
  }

  row = 0;
  col = 6;
  for (let i = 0; i < 6; i++) {
    newArr[2].push(columnsPiecesArr()[col][row]);
    row++;
    col--;
  }

  row = 0;
  col = 5;
  for (let i = 0; i < 6; i++) {
    newArr[3].push(columnsPiecesArr()[col][row]);
    row++;
    col--;
  }

  row = 0;
  col = 4;
  for (let i = 0; i < 5; i++) {
    newArr[4].push(columnsPiecesArr()[col][row]);
    row++;
    col--;
  }

  row = 0;
  col = 3;
  for (let i = 0; i < 4; i++) {
    newArr[5].push(columnsPiecesArr()[col].reverse()[row]);
    row++;
    col--;
  }

  return newArr;
};

let playerTurn = 1;
// 1 : vert
// 2 : rouge

const winCondition = () => {
  let winConditionVertical = 0;
  let winConditionHorizontal = 0;
  let winConditionDiagonal1 = 0;
  let winConditionDiagonal2 = 0;

  columnsPiecesArr().map((columnArr) => {
    let ite = 0;
    columnArr.map((arr) => {
      ite += 1;
      if (ite === 6) {
        winConditionVertical = 0;
        ite = 0;
      }
      if (arr[2] === playerTurn) {
        winConditionVertical += 1;
        if (winConditionVertical === 4) {
          openModal(
            `Le joueur ${
              playerTurn === 1
                ? '<span class="red">Rouge</span>'
                : '<span class="green">Vert</span>'
            } gagne la partie avec un alignement vertical !`,
            'save',
            0,
          );
        }
      } else {
        winConditionVertical = 0;
      }
    });
  });

  rowsPiecesArr().map((rowArr) => {
    let ite = 0;
    rowArr.map((arr) => {
      ite += 1;
      if (ite === 7) {
        winConditionHorizontal = 0;
        ite = 0;
      }
      if (arr[2] === playerTurn) {
        winConditionHorizontal += 1;

        if (winConditionHorizontal === 4) {
          openModal(
            `Le joueur ${
              playerTurn === 1
                ? '<span class="red">Rouge</span>'
                : '<span class="green">Vert</span>'
            } gagne la partie avec un alignement horizontal !`,
            'save',
            1,
          );
        }
      } else {
        winConditionHorizontal = 0;
      }
    });
  });

  diagonalsPiecesArr1().map((diagArr) => {
    diagArr.map((arr) => {
      if (arr[2] === playerTurn) {
        winConditionDiagonal1 += 1;
        if (winConditionDiagonal1 === 4) {
          openModal(
            `Le joueur ${
              playerTurn === 1
                ? '<span class="red">Rouge</span>'
                : '<span class="green">Vert</span>'
            } gagne la partie avec un alignement diagonale !`,
            'save',
            0,
          );
        }
      } else {
        winConditionDiagonal1 = 0;
      }
    });
  });

  diagonalsPiecesArr2().map((diagArr) => {
    diagArr.map((arr) => {
      if (arr[2] === playerTurn) {
        winConditionDiagonal2 += 1;
        if (winConditionDiagonal2 === 4) {
          openModal(
            `Le joueur ${
              playerTurn === 1
                ? '<span class="red">Rouge</span>'
                : '<span class="green">Vert</span>'
            } gagne la partie avec un alignement diagonale !`,
            'save',
            0,
          );
        }
      } else {
        winConditionDiagonal2 = 0;
      }
    });
  });
};

const changeCSSClass = () => {
  columnElements.forEach((column) => {
    if (playerTurn === 2) {
      column.classList.add('red-turn');
      column.classList.remove('green-turn');
    } else {
      column.classList.add('green-turn');
      column.classList.remove('red-turn');
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
  if (nbPieceArr.join('') === '6666666') {
    openModal('Vous avez remplit de pièces tout le tableau !', '', 1);
  }
  if (nbPieceArr[column - 1] === 6) {
    openModal('Vous ne pouvez pas ajouter de pièce ici !', '', 1);
    // openmodal de réinitialisation du jeu ou annuler le coup,
    // second paramètre contient le texte à afficher dans les boutons
  }
  nbPieceArr[column - 1] += 1;

  columnsPiecesArr()[column - 1][nbPieceArr[column - 1] - 1][2] = playerTurn;
  const row = nbPieceArr[column - 1];

  changeCSSClass();
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
