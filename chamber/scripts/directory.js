const container = document.querySelector("#members-container");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

/* MOBILE MENU */

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

/* FETCH MEMBERS */

async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data);
}

/* DISPLAY MEMBERS */

function displayMembers(members) {

  container.innerHTML = "";

  members.forEach(member => {

    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-header">
        <h2>${member.name}</h2>
        <p class="tagline">${member.description}</p>
      </div>

      <div class="card-content">

        <img 
          src="images/${member.image}" 
          alt="${member.name}"
          width="90"
          height="90"
          loading="lazy"
        >

        <div class="info">
          <p><strong>EMAIL:</strong> ${member.email}</p>
          <p><strong>PHONE:</strong> ${member.phone}</p>
          <p><strong>URL:</strong> 
            <a href="${member.website}" target="_blank">
              ${member.website.replace("https://", "")}
            </a>
          </p>
        </div>

      </div>
    `;

    container.appendChild(card);
  });
}

/* GRID/LIST BUTTONS */

gridBtn.addEventListener("click", () => {
  container.classList.add("grid");
  container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list");
  container.classList.remove("grid");
});

/* FOOTER */

document.querySelector("#year").textContent =
  new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  document.lastModified;

/* INITIALIZE */

getMembers();