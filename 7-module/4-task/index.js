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
    this.thumb = document.querySelector('.slider__thumb');

    for (let i = 0; i < this.steps; i++) {
      this.sliderSteps.insertAdjacentHTML('afterbegin', `<span></span>`);
    }

    this.elem.addEventListener('click', event => {
      let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

      this.setValue(Math.round(this.segments * newLeft));

      this.elem.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        })
      );
    });

    this.thumb.onpointerdown = () => {
      this.elem.classList.add('slider_dragging');

      const onMouseMove = (event) => {
        this.moveSlide(event);
      };

      const onMouseUp = () => {
        document.removeEventListener('pointermove', onMouseMove);
        document.removeEventListener('pointerup', onMouseUp);
        this.elem.classList.remove('slider_dragging');

        this.elem.dispatchEvent(
          new CustomEvent('slider-change', {
            detail: this.value,
            bubbles: true
          })
        );
      };

      document.addEventListener('pointermove', onMouseMove);
      document.addEventListener('pointerup', onMouseUp);
    };

    this.thumb.ondragstart = () => false;
  }

  moveSlide(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * this.segments;
    let value = Math.round(approximateValue);

    if (value > this.segments) {
      value = this.segments;
    } else if (value < 0) {
      value = 0;
    }

    if (leftRelative < 0) { leftRelative = 0; }
    if (leftRelative > 1) { leftRelative = 1; }

    this.setValue(value);

    this.elem.querySelector('.slider__thumb').style.left = leftRelative * 100 + '%';
    this.elem.querySelector('.slider__progress').style.width = leftRelative * 100 + '%';
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
}
