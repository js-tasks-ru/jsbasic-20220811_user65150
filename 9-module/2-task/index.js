import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';
// import {resolve} from "karma/lib/plugin";

export default class Main {

  constructor() {
  }

  async render() {
    const carouselHolder = document.querySelector(`[data-carousel-holder]`);
    const ribbonMenuHolder = document.querySelector(`[data-ribbon-holder]`);
    const stepSliderHolder = document.querySelector(`[data-slider-holder]`);
    const cartIconHolder = document.querySelector(`[data-cart-icon-holder]`);
    const productsGridHolder = document.querySelector(`[data-products-grid-holder]`);
    const vegeterianCheckboxHolder = document.getElementById('vegeterian-checkbox');
    const nutsCheckboxHolder = document.getElementById('nuts-checkbox');
    const stepSlider = new StepSlider({steps: 5, value: 3});
    const ribbonMenu = new RibbonMenu(categories);
    const cartIcon = new CartIcon();
    const cart = new Cart(cartIcon);

    carouselHolder.append(new Carousel(slides).elem);
    ribbonMenuHolder.append(ribbonMenu.elem);
    stepSliderHolder.append(stepSlider.elem);
    cartIconHolder.append(cartIcon.elem);

    const response = await fetch('products.json');
    const products = await response.json();
    const productsGrid = new ProductsGrid(products);

    productsGridHolder.innerHTML = '';
    productsGridHolder.append(productsGrid.elem);

    productsGrid.updateFilter({
      noNuts: nutsCheckboxHolder.checked,
      vegeterianOnly: vegeterianCheckboxHolder.checked,
      maxSpiciness: stepSlider.value,
      category: document.querySelector('.ribbon__item_active')?.dataset.id || ''
    });

    document.body.addEventListener('product-add', event => {
      const product = products.find(product => product.id === event.detail);
      cart.addProduct(product);
    });

    stepSliderHolder.addEventListener('slider-change', event => {
      productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    ribbonMenuHolder.addEventListener('ribbon-select', event => {
      productsGrid.updateFilter({
        category: event.detail
      });
    });

    vegeterianCheckboxHolder.addEventListener('change', (event) => {
      console.log(event);
      productsGrid.updateFilter({
        vegeterianOnly: vegeterianCheckboxHolder.checked
      });
    });

    nutsCheckboxHolder.addEventListener('change', () => {
      productsGrid.updateFilter({
        noNuts: nutsCheckboxHolder.checked
      });
    });
  }
}
