let calcElement;

const calc = () => {
  calcElement = document.createElement('div');
  calcElement.className = 'calc';
};

const modal = (word, secondBtn, complete) => {
  const container = document.querySelector('.container');

  const m = document.createElement('div');
  m.className = 'modal';
  m.innerHTML = `<h3>${word}</h3>`;

  const firstBtnElement = document.createElement('button');
  firstBtnElement.innerHTML = `<i class="fas fa-sync-alt></i> Rejouer`;
  firstBtnElement.className = 'btn continue';
  firstBtnElement.addEventListener('click', () => {
    try {
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
      calcElement.remove();
      container.classList.remove('blur-effect');
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

  container.classList.add('blur-effect');

  calcElement.appendChild(m);
  document.body.appendChild(calcElement);
};

export default (word) => {
  calc();
  modal(word);
};
