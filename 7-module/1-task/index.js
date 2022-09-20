import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }

  render() {
    const elem = createElement(`<div class="ribbon"><nav class="ribbon__inner"></nav></div>`);
    const ribbonInner = elem.querySelector('.ribbon__inner');

    for (const category of this.categories) {
      ribbonInner.append(
        (new Category(category)).render()
      );
    }

    elem.insertAdjacentHTML('afterBegin', `
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`);

    elem.insertAdjacentHTML('beforeEnd', `
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);

    this.eventListeners(elem, ribbonInner);

    return elem;
  }

  eventListeners(elem, ribbonInner) {
    const arrowRight = elem.querySelector('.ribbon__arrow_right');
    const arrowLeft = elem.querySelector('.ribbon__arrow_left');

    const checkPosition = () => {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;

      if (scrollLeft === 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        arrowRight.classList.add('ribbon__arrow_visible');
      }
    }

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
      checkPosition();
    });

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
      checkPosition();
    });

    ribbonInner.addEventListener('scroll', checkPosition);
  }
}

class Category {
  constructor(category) {
    this.category = category;
  }

  render() {
    let elem = createElement(`<a href="#" class="ribbon__item" data-id="${this.category.id}">${this.category.name}</a>`);

    this.eventListeners(elem);

    return elem;
  }

  eventListeners(elem) {
    elem.addEventListener('click', event => {
      const itemActive = document.querySelector('.ribbon__item_active');
      if (itemActive) {
        itemActive.classList.remove('ribbon__item_active');
      }

      elem.classList.add('ribbon__item_active');

      document.querySelector('.ribbon').dispatchEvent(
        new CustomEvent('ribbon-select', {
          detail: this.category.id,
          bubbles: true,
        })
      );

      event.preventDefault();
    });
  }
}
