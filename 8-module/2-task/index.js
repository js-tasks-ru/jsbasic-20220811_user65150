import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4,
      category: ''
    };

    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);

    this.productInner = this.elem.querySelector('.products-grid__inner');

    this.updateFilter(this.filters);
  }

  updateFilter(filters) {
    if (filters.noNuts !== undefined) {
      this.filters.noNuts = filters.noNuts;
    }

    if (filters.vegeterianOnly !== undefined) {
      this.filters.vegeterianOnly = filters.vegeterianOnly;
    }

    if (filters.maxSpiciness !== undefined) {
      this.filters.maxSpiciness = filters.maxSpiciness;
    }

    if (filters.category !== undefined) {
      this.filters.category = filters.category;
    }

    this.filteredProducts = this.products.filter(product => (
      (this.filters.noNuts && !product.nuts || !this.filters.noNuts) &&
      (this.filters.vegeterianOnly && product.vegeterian || !this.filters.vegeterianOnly) &&
      product.spiciness <= this.filters.maxSpiciness &&
      (product.category === this.filters.category || this.filters.category === '')
    ));

    this.productInner.innerHTML = '';

    for (const product of this.filteredProducts) {
      let card = new ProductCard({
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        id: product.id,
        spiciness: product.spiciness
      });

      this.productInner.append(card.elem);
    }
  }
}
