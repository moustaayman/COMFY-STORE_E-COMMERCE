import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupCompanies = (store) => {
  const companiesDOM = getElement(".companies");
  const companies = [
    "all",
    ...new Set(store.map((product) => product.company)),
  ];
  companiesDOM.innerHTML = companies
    .map((company) => {
      return `<button class="company-btn">${company}</button>`;
    })
    .join("");
  companiesDOM.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("company-btn")) {
      let newStore = [];
      if (target.textContent !== "all") {
        newStore = store.filter(
          (product) => product.company === target.textContent
        );
      } else {
        newStore = [...store];
      }
      display(newStore, getElement(".products-container"), true);
    }
  });
};

export default setupCompanies;
