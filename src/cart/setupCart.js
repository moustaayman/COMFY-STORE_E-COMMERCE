// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";

// set items
const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");

let cart = getStorageItem("cart");

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    let product = findProduct(id);
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    addToCartDOM(product);
  } else {
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")];
    console.log(items);
    const newAmount = items.find((item) => item.dataset.id === id);
    newAmount.textContent = amount;
  }
  //add one to the item count
  displayCartItemCount();
  //display cart totals
  displayCartTotal();
  //set cart in local storage
  setStorageItem("cart", cart);
  //open the cart
  openCart();
};
const displayCartItemCount = () => {
  const amount = cart.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
};
const displayCartTotal = () => {
  let total = cart.reduce((acc, curr) => {
    return (acc += curr.amount * curr.price);
  }, 0);
  cartTotalDOM.textContent = `total : ${formatPrice(total)}`;
};
const displayCartItemsDOM = () => {
  cart.forEach((item) => {
    addToCartDOM(item);
  });
};
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}
const increaseAmount = (id) => {
  let newAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      newAmount = item.amount + 1;
      item = { ...item, amount: newAmount };
    }
    return item;
  });
  return newAmount;
};
const decreaseAmount = (id) => {
  let newAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      newAmount = item.amount - 1;
      item = { ...item, amount: newAmount };
    }
    return item;
  });
  return newAmount;
};
const setupCartFunctionality = () => {
  cartItemsDOM.addEventListener("click", function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentId = e.target.parentElement.dataset.id;
    //delete cart item
    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(id);
      parent.parentElement.remove();
    }
    //increase cart item amount
    if (parent.classList.contains("cart-item-increase-btn")) {
      const newAmount = increaseAmount(parentId);
      parent.nextElementSibling.textContent = newAmount;
    }
    //decrease cart item amount
    if (parent.classList.contains("cart-item-decrease-btn")) {
      const newAmount = decreaseAmount(parentId);
      if (newAmount === 0) {
        removeItem(parentId);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
  });
};
const init = () => {
  //display the amount of cart items
  displayCartItemCount();
  //display the total price of the cart items
  displayCartTotal();
  //add all cart items to the DOM
  displayCartItemsDOM();
  //setup cart functionality
  setupCartFunctionality();
};
init();
