import '../style.css';
import openModal from './modals';

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
  let ite = 0;

  for (let i = 0; i < newArr.length * 6; i++) {
    if (ite === newArr.length) {
      ite = 0;
    }
    newArr[ite].push(pieceArr[i]);

    ite++;
  }
  return newArr;
};

const rowsPiecesArr = () => {
  const newArr = [[], [], [], [], [], []];
  let r = 0;

  for (let i = 0; i < newArr.length * 7; i++) {
    if (!(i % 7)) {
      r++;
    }
    newArr[r - 1].push(pieceArr[i]);
  }
  return newArr;
};

let playerTurn = 1;
// 1 : vert
// 2 : rouge

const winCondition = () => {
  let winConditionVertical = 0;
  let winConditionHorizontal = 0;

  columnsPiecesArr().map((columnArr) => {
    columnArr.map((arr) => {
      if (arr[2] === playerTurn) {
        winConditionVertical += 1;
        if (winConditionVertical === 4) {
          openModal(
            `Le joueur ${
              playerTurn === 1 ? 'Rouge' : 'Vert'
            } gagne la partie avec un alignement vertical !`,
          );
        }
      } else {
        winConditionVertical = 0;
      }
    });
  });

  rowsPiecesArr().map((rowArr) => {
    rowArr.map((arr) => {
      if (arr[2] === playerTurn) {
        winConditionHorizontal += 1;
        if (winConditionHorizontal === 4) {
          openModal(
            `Le joueur ${
              playerTurn === 1 ? 'Rouge' : 'Vert'
            } gagne la partie avec un alignement horizontal !`,
          );
        }
      } else {
        winConditionHorizontal = 0;
      }
    });
  });

  // formatArr.map((columnsArr) => {
  //   columnsArr.map((arr) => {
  //     // vertical condition
  //     if (arr[2] === playerTurn) {
  //       winConditionVertical += 1;
  //       if (winConditionVertical === 4) {
  //         openModal(
  //           `Le joueur ${
  //             playerTurn === 1 ? 'Rouge' : 'Vert'
  //           } gagne la partie avec un alignement vertical !`,
  //         );
  //       }
  //     } else {
  //       winConditionVertical = 0;
  //     }

  //     // horizontal condition
  //     // [[1, 6, 2]] [[2, 6, 2]]

  //     // console.log(arr[2]);
  //   });
  // });

  // comparaison du tableau
  // diagonale => vérification de l'autre column avec l'index supérieur ou inférieur
  // horizontale => index de column égale column de l'index supérieur ou inférieur
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
  if (nbPieceArr[column - 1] === 6) {
    openModal('Vous ne pouvez pas ajouter de pièce ici !');
    return null;
    // openmodal de réinitialisation du jeu ou annuler le coup, second paramètre contient le texte à afficher dans les boutons
  }
  nbPieceArr[column - 1] += 1;

  console.log(columnsPiecesArr()[column - 1][nbPieceArr[column - 1] - 1]);
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
