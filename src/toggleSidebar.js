import { getElement } from "./utils.js";

const toggleNav = getElement(".toggle-nav");
const sidebarClose = getElement(".sidebar-close");
const sidebarOverlay = getElement(".sidebar-overlay");

toggleNav.addEventListener("click", () => {
  sidebarOverlay.classList.add("show");
});
sidebarClose.addEventListener("click", () => {
  sidebarOverlay.classList.remove("show");
});
