export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.container = document.querySelector('.container');
    this.steps = steps;
    this.segments = steps - 1;
    this.render();
    this.setValue(value);
  }

  render() {
    this.container.insertAdjacentHTML('beforeend', `
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps"></div>
      </div>
    `);

    this.elem = document.querySelector('.slider');
    this.sliderSteps = document.querySelector('.slider__steps');

    for (let i = 0; i < this.steps; i++) {
      this.sliderSteps.insertAdjacentHTML('afterbegin', `<span></span>`);
    }

    this.elem.addEventListener('click', event => {
      this.moveSlide(event);

      this.elem.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        })
      );
    });
  }

  setValue(value) {
    this.value = value;
    this.updateSlider();
  }

  updateSlider() {
    const stepActive = this.sliderSteps.querySelector('.slider__step-active');

    if (stepActive) {
      stepActive.classList.remove('slider__step-active');
    }

    document.querySelector('.slider__value').textContent = this.value + 1;

    this.sliderSteps.querySelectorAll('span').item(this.value).classList.add('slider__step-active');

    this.valuePercents = this.value / this.segments * 100;
    this.elem.querySelector('.slider__thumb').style.left = this.valuePercents + '%';
    this.elem.querySelector('.slider__progress').style.width = this.valuePercents + '%';
  }

  moveSlide(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * this.segments;

    this.setValue(Math.round(approximateValue));
  }
}
