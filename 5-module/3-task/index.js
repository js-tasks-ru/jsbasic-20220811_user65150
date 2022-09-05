function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const slides = document.querySelectorAll('img.carousel__img');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const width = slides.item(0).offsetWidth;

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
    slideActive = slideActive + step;
    slidePosition = slidePosition - width * step;
    carouselInner.style.transform = `translateX(${slidePosition}px)`;
    arrowLeft.style.display = slideActive === 1 ? 'none' : 'flex';
    arrowRight.style.display = slideActive === slides.length ? 'none' : 'flex';
  }
}
