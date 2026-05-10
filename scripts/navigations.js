const menuButton = document.querySelector("#menu");
const nav = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.classList.toggle("open");

  // accessibility update
  const isOpen = nav.classList.contains("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});