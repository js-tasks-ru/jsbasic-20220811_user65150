import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.id = product.id;
    this.img = product.image;
    this.price = product.price;
    this.name = product.name;
    this.elem = this.render();
  }

  render() {
    let elem = createElement(`
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${this.img}" class="card__image" alt="product">
          <span class="card__price">€${this.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);

    this.eventListeners(elem);
    return elem;
  }

  eventListeners(elem) {
    const button = elem.querySelector('.card__button');
    button.addEventListener('click', event => {
      document.body.dispatchEvent(
        new CustomEvent('product-add', {
          detail: this.id,
          bubbles: true,
        })
      );
    });
  }
}
