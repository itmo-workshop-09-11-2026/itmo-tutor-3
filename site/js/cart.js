"use strict";
// Поток B. Логика корзины: чистые функции, без DOM и localStorage.
// Корзина — массив id товаров. Цены берутся из PRODUCTS (products.js).
// Контракт (этап 0), не менять без согласования команды:
//   addToCart(cart, productId)      → новый массив корзины
//   removeFromCart(cart, productId) → новый массив без одного экземпляра товара
//   calculateTotal(cart)            → число (сумма в рублях)

function findProduct(productId) {
  return PRODUCTS.find((product) => product.id === productId) || null;
}

function addToCart(cart, productId) {
  if (!findProduct(productId)) {
    return [...cart];
  }

  return [...cart, productId];
}

function removeFromCart(cart, productId) {
  const index = cart.indexOf(productId);
  if (index === -1) {
    return [...cart];
  }

  return [...cart.slice(0, index), ...cart.slice(index + 1)];
}

function calculateTotal(cart) {
  return cart.reduce((sum, productId) => {
    const product = findProduct(productId);
    return product ? sum + product.price : sum;
  }, 0);
}
