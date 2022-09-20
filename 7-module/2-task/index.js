import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.eventListener = event => {
      if (event.code === 'Escape') {
        this.close();
      }
    };

    this.modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>`);
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add('is-modal-open');

    this.button = this.modal.querySelector('.modal__close');

    this.button.addEventListener('click', () => {
      this.close();
    });

    document.addEventListener('keydown', this.eventListener);
  }

  setTitle(title) {
    this.modal.querySelector('.modal__title').textContent = title;
  }

  setBody(elem) {
    this.modal.querySelector('.modal__body').append(elem);
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.eventListener);
  }
}
