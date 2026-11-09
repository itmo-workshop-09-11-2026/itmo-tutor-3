"use strict";
// Поток 1.5. Интеграция: связывает products.js и cart.js с DOM.
// Формат цены: целые рубли, без копеек.

const cart = [];

function formatPrice(rubles) {
  return `${rubles} ₽`;
}

function renderCatalog() {
  const catalogElement = document.querySelector("#catalog");

  catalogElement.replaceChildren(
    ...PRODUCTS.map((product) => {
      const card = document.createElement("article");
      card.className = "product-card";

      const name = document.createElement("h3");
      name.className = "product-name";
      name.textContent = product.name;

      const category = document.createElement("p");
      category.className = "product-category";
      category.textContent = `Категория: ${product.category}`;

      const price = document.createElement("p");
      price.className = "product-price";
      price.textContent = formatPrice(product.price);

      const addButton = document.createElement("button");
      addButton.type = "button";
      addButton.textContent = "Добавить";
      addButton.dataset.productId = product.id;
      addButton.addEventListener("click", handleAddToCart);

      card.append(name, category, price, addButton);
      return card;
    }),
  );
}

function renderCart() {
  const itemsElement = document.querySelector("#cart-items");
  const totalElement = document.querySelector("#cart-total-value");

  itemsElement.replaceChildren();

  if (cart.length === 0) {
    const empty = document.createElement("li");
    empty.className = "cart-empty";
    empty.textContent = "Корзина пуста";
    itemsElement.append(empty);
  }

  for (const productId of cart) {
    const product = PRODUCTS.find((item) => item.id === productId);

    const item = document.createElement("li");
    item.className = "cart-item";

    const name = document.createElement("span");
    name.className = "cart-item-name";
    name.textContent = product ? product.name : productId;

    const price = document.createElement("span");
    price.className = "cart-item-price";
    price.textContent = product ? formatPrice(product.price) : "";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "cart-item-remove";
    removeButton.textContent = "Удалить";
    removeButton.dataset.productId = productId;
    removeButton.addEventListener("click", handleRemoveFromCart);

    item.append(name, price, removeButton);
    itemsElement.append(item);
  }

  totalElement.textContent = formatPrice(calculateTotal(cart));
}

function handleAddToCart(event) {
  const { productId } = event.currentTarget.dataset;
  const nextCart = addToCart(cart, productId);

  cart.length = 0;
  cart.push(...nextCart);

  renderCart();
}

function handleRemoveFromCart(event) {
  const { productId } = event.currentTarget.dataset;
  const nextCart = removeFromCart(cart, productId);

  cart.length = 0;
  cart.push(...nextCart);

  renderCart();
}

renderCatalog();
renderCart();
