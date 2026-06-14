import "./navigation.js";

document.querySelector("#year").textContent =
  new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});