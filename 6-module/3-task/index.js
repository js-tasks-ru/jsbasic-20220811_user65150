import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  render() {
    const elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
        </div
      </div>`);

    const carouselInner = elem.querySelector('.carousel__inner');

    for (const slide of this.slides) {
      carouselInner.append(
        (new Slide(slide)).render()
      );
    }

    this.initCarousel(elem);

    return elem;
  }

  initCarousel(elem) {
    const carouselInner = elem.querySelector('.carousel__inner');
    const slides = elem.querySelectorAll('.carousel__slide');
    const arrowLeft = elem.querySelector('.carousel__arrow_left');
    const arrowRight = elem.querySelector('.carousel__arrow_right');

    let slideActive = 1;
    let slidePosition = 0;

    arrowLeft.style.display = 'none';

    arrowRight.addEventListener('click', () => {
      moveSlides(1);
    });

    arrowLeft.addEventListener('click', () => {
      moveSlides(-1);
    });

    function moveSlides(step) {
      const width = slides.item(0).offsetWidth;
      slideActive = slideActive + step;
      slidePosition = slidePosition - width * step;
      carouselInner.style.transform = `translateX(${slidePosition}px)`;
      arrowLeft.style.display = slideActive === 1 ? 'none' : 'flex';
      arrowRight.style.display = slideActive === slides.length ? 'none' : 'flex';
    }
  }
}

class Slide {
  constructor(slide) {
    this.slide = slide;
  }

  render() {
    let elem = createElement(`
      <div class="carousel__slide" data-id="${this.slide.id}">
        <img src="/assets/images/carousel/${this.slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${this.slide.price.toFixed(2)}</span>
          <div class="carousel__title">${this.slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);

    this.eventListeners(elem);

    return elem;
  }

  eventListeners(elem) {
    const button = elem.querySelector('.carousel__button');
    button.addEventListener('click', event => {
      document.body.dispatchEvent(
        new CustomEvent('product-add', {
          detail: this.slide.id,
          bubbles: true,
        })
      );
    });
  }
}


