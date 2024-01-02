import { getElement } from "../utils.js";

const toggleCart = getElement(".toggle-cart");
const cartClose = getElement(".cart-close");
const cartOverlay = getElement(".cart-overlay");

toggleCart.addEventListener("click", () => {
  cartOverlay.classList.add("show");
});
cartClose.addEventListener("click", () => {
  cartOverlay.classList.remove("show");
});
export const openCart = () => {
  cartOverlay.classList.add("show");
};
