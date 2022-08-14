const container = document.querySelector('.container');
const calc = document.createElement('div');
calc.className = 'calc';

const modal = (sentence) => {
  const modalElement = document.createElement('div');
  modalElement.className = 'modal';

  const sentenceElement = document.createElement('h3');
  sentenceElement.innerHTML = sentence;

  const removeModal = () => {
    container.classList.remove('blur-effect');

    modalElement.remove();
    calc.remove();
  };

  const buttonElement = document.createElement('button');
  buttonElement.className = 'btn continue';
  buttonElement.innerText = 'Continue';
  buttonElement.addEventListener('click', () => {
    removeModal();
  });

  window.addEventListener('click', (e) => {
    if (e.target == calc) {
      removeModal();
    }
  });

  modalElement.append(...[sentenceElement, buttonElement]);

  calc.appendChild(modalElement);

  container.classList.add('blur-effect');
  document.body.appendChild(calc);
};

export default modal;
