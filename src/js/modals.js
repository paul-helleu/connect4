let calcElement;

const calc = () => {
  calcElement = document.createElement('div');
  calcElement.className = 'calc';
};

const modal = (word, secondBtn, complete) => {
  const m = document.createElement('div');
  m.className = 'modal';
  m.innerHTML = `<h3>${word}</h3>`;

  const firstBtnElement = document.createElement('button');
  firstBtnElement.innerHTML = `<i class="fas fa-sync-alt></i> Rejouer`;
  firstBtnElement.className = 'btn continue';
  firstBtnElement.addEventListener('click', () => {
    try {
      console.log('Rejouer !');
    } catch (e) {
      console.error(e);
    }
  });

  const secondBtnElement = document.createElement('button');
  secondBtnElement.innerHTML = `<i class="${
    secondBtn === 'save' ? 'far fa-save' : 'fas fa-arrow-right'
  }"></i> ${secondBtn === 'save' ? 'Sauvegarder' : 'Continuer'}`;
  secondBtnElement.className = 'btn primary';
  secondBtnElement.addEventListener('click', () => {
    try {
      console.log('Sauvegarde !');
    } catch (e) {
      console.error(e);
    }
  });

  const btnContainer = document.createElement('div');
  btnContainer.className = 'btn-container';

  const btnContainerFlex = document.createElement('div');
  btnContainerFlex.className = 'btn-container-flex';

  if (complete) {
    btnContainer.append(firstBtnElement, secondBtnElement);
  } else {
    btnContainerFlex.appendChild(secondBtnElement);
  }

  /* window.addEventListener('click', (e) => {
    e.stopPropagation();
    calcElement.remove();
  }); */

  m.appendChild(complete ? btnContainer : btnContainerFlex);

  document.querySelector('.container').classList.add('blur-effect');

  calcElement.appendChild(m);
  document.body.appendChild(calcElement);
};

export default (word) => {
  calc();
  modal(word);
};
