import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupPrice = (store) => {
  const priceInput = getElement(".price-filter");
  const priceValue = getElement(".price-value");

  const prices = store.map((product) => product.price);
  const maxPrice = Math.ceil(Math.max(...prices) / 100);
  priceValue.textContent = `Value : $${maxPrice}`;

  priceInput.min = 0;
  priceInput.max = maxPrice;
  priceInput.value = maxPrice;

  priceInput.addEventListener("input", () => {
    const value = parseInt(priceInput.value);
    priceValue.textContent = `Value : $${value}`;
    const newStore = store.filter((product) => product.price / 100 <= value);
    display(newStore, getElement(".products-container"), true);
    if (newStore.length < 1) {
      const products = getElement(".products-container");
      products.innerHTML = `<h3 class="filter-error">sorry, no products matched your search</h3>`;
    }
  });
};

export default setupPrice;
