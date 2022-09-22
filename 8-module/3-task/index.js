export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

