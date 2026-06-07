import { places } from "../data/places.mjs";

const container = document.querySelector("#discover-grid");

// Modal elements
const modal = document.querySelector("#placeModal");
const modalTitle = document.querySelector("#modalTitle");
const modalImage = document.querySelector("#modalImage");
const modalAddress = document.querySelector("#modalAddress");
const modalDescription = document.querySelector("#modalDescription");
const closeBtn = document.querySelector("#closeModal");

// Build cards
places.forEach((place, index) => {

    const card = document.createElement("article");

    card.classList.add("discover-card");
    card.classList.add(`card${index + 1}`);

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img
                src="${place.image}"
                alt="${place.name}"
                loading="lazy"
                width="300"
                height="200"
                loading="${index === 0 ? 'eager' : 'lazy'}"
                fetchpriority="${index === 0 ? 'high' : 'auto'}"
            >
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button class="learn-more-btn">
            Learn More
        </button>
    `;

    // Button event for modal
    const button = card.querySelector(".learn-more-btn");

    button.addEventListener("click", () => {

        modalTitle.textContent = place.name;

        modalImage.src = place.image;
        modalImage.alt = place.name;

        modalAddress.textContent = place.address;
        modalDescription.textContent = place.description;

        modal.showModal();
    });

    container.appendChild(card);
});

// Close modal
closeBtn.addEventListener("click", () => {
    modal.close();
});

// Close when clicking backdrop
modal.addEventListener("click", (event) => {

    const rect = modal.getBoundingClientRect();

    const clickedInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

    if (!clickedInside) {
        modal.close();
    }
});

// Visitor message
const visitMessage = document.querySelector("#visitorText");

const lastVisit = Number(localStorage.getItem("lastVisit"));
const now = Date.now();

if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const days = Math.floor((now - lastVisit) / 86400000);

    if (days < 1) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else {

        visitMessage.textContent =
            `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
}

localStorage.setItem("lastVisit", now);

// Footer
document.querySelector("#year").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;