let calcElement;

const calc = () => {
  calcElement = document.createElement('div');
  calcElement.className = 'calc';
};

const modal = (word) => {
  const m = document.createElement('div');
  m.className = 'modal';
  m.innerHTML = `<h3>${word}</h3>`;

  const continueBtn = document.createElement('button');
  continueBtn.innerHTML = 'Continuer';
  continueBtn.className = 'btn continue';
  continueBtn.addEventListener('click', () => {});

  const stopBtn = document.createElement('button');
  stopBtn.innerHTML = 'Stop';
  stopBtn.className = 'btn stop';
  stopBtn.addEventListener('click', () => {
    try {
    } catch (e) {
      throw e;
    }
  });

  const btnContainer = document.createElement('div');
  btnContainer.className = 'btn-container';
  btnContainer.append(continueBtn, stopBtn);

  /* window.addEventListener('click', (e) => {
    e.stopPropagation();
    calcElement.remove();
  }); */

  m.appendChild(btnContainer);

  document.querySelector('.container').classList.add('blur-effect');

  calcElement.appendChild(m);
  document.body.appendChild(calcElement);
};

export default (word) => {
  calc();
  modal(word);
};
