import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupSearch = (store) => {
  const form = getElement(".input-form");
  const input = getElement(".search-input");
  const productsDOM = getElement(".products-container");

  form.addEventListener("keyup", function (e) {
    e.preventDefault();
    const value = input.value;
    if (value) {
      const newStore = store.filter((product) => {
        const { name } = product;
        if (name.toLowerCase().includes(value)) return product;
      });
      display(newStore, productsDOM, true);
      if (newStore.length < 1) {
        productsDOM.innerHTML = `<h3 class='filter-error'>sorry, no item matched your search</h3>`;
      }
    } else {
      display(store, productsDOM, true);
    }
  });
};

export default setupSearch;
