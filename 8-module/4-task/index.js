import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    const cartItem = this.cartItems.find(item => item.product.id === product?.id);

    if (cartItem) {
      cartItem.count++;
    } else if (product) {
      this.cartItems.push({product: product, count: 1});
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(item => item.product.id === productId);
    if (!cartItem) {
      return;
    }

    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.findIndex(item => item.product.id === productId), 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return (this.cartItems <= 0);
  }

  getTotalCount() {
    let totalCount = 0;

    for (const item of this.cartItems) {
      totalCount += item.count;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (const item of this.cartItems) {
      totalPrice += item.product.price * item.count;
    }

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    modal.setBody(createElement(`<div class="modal__body-content"></div>`));
    modal.setTitle('Your order');
    modal.open();

    let modalBodyContent = document.querySelector('.modal__body-content');

    for (const item of this.cartItems) {
      modalBodyContent.append(this.renderProduct(item.product, item.count));
    }

    modalBodyContent.append(this.renderOrderForm());

    for (const button of modalBodyContent.querySelectorAll('.cart-counter__button_plus')) {
      button.addEventListener('click', event => {
        const product = event.target.closest('.cart-product');
        this.updateProductCount(product.dataset.productId, 1);
      });
    }

    for (const button of modalBodyContent.querySelectorAll('.cart-counter__button_minus')) {
      button.addEventListener('click', event => {
        const product = event.target.closest('.cart-product');
        this.updateProductCount(product.dataset.productId, -1);
      });
    }

    let cartForm = document.querySelector('.cart-form');

    cartForm.addEventListener('submit', this.onSubmit);
  }

  onProductUpdate(cartItem) {
    if (cartItem && document.querySelector('.is-modal-open')) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body-content');
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      if (this.cartItems.length === 0) {
        document.querySelector('.is-modal-open').classList.remove('is-modal-open');
        document.querySelector('.modal').remove();
      }

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = '€' + (cartItem.count * cartItem.product.price).toFixed(2);
      infoPrice.innerHTML = '€' + this.getTotalPrice().toFixed(2);
    }

    this.cartIcon.update(this);
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const button = document.querySelector(`[type="submit"]`);
    const form = document.querySelector('.cart-form');
    const modalTitle = document.querySelector('.modal__title');
    const modalBody = document.querySelector('.modal__body');

    button.classList.add('is-loading');

    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    });

    const result = await response.json();

    if (!result) {
      return;
    }

    this.cartItems = [];
    modalTitle.textContent = 'Success!';
    modalBody.innerHTML = `
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
    `;
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

