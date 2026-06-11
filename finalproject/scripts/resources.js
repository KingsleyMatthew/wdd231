import "./navigation.js";

const container = document.querySelector("#tutorials");
const search = document.querySelector("#search");

const modal = document.querySelector("#tutorialModal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelector("#closeModal");

let tutorials = [];

async function loadTutorials() {
    try {
        const response = await fetch("data/tutorials.json");

        if (!response.ok) {
            throw new Error("Unable to load tutorial data.");
        }

        tutorials = await response.json();

        displayTutorials(tutorials);

    } catch (error) {
        container.innerHTML =
            "<p>Unable to load tutorial resources.</p>";

        console.error(error);
    }
}

function displayTutorials(data) {

    container.innerHTML = "";

    data.forEach(tutorial => {

        const card = document.createElement("article");

        card.classList.add("tutorial-card");

        card.innerHTML = `
            <div class="card-header">

                <span class="badge">
                    ${tutorial.category}
                </span>

                <h3>${tutorial.title}</h3>

            </div>

            <p><strong>Category:</strong>
            ${tutorial.category}</p>

            <p><strong>Level:</strong>
            ${tutorial.level}</p>

            <p><strong>Duration:</strong>
            ${tutorial.duration}</p>

            <div class="tutorial-actions">

                <button
                    class="details-btn"
                    data-id="${tutorial.id}">
                    View Details
                </button>

                <button
                    class="save-btn"
                    data-id="${tutorial.id}">
                    Save
                </button>

            </div>
        `;

        container.appendChild(card);
    });

    attachEvents();
}

function attachEvents() {
    document
    .querySelectorAll(".save-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const id =
                Number(button.dataset.id);

            let saved =
                JSON.parse(
                    localStorage.getItem("savedTutorials")
                ) || [];

            if (!saved.includes(id)) {

                saved.push(id);

                localStorage.setItem(
                    "savedTutorials",
                    JSON.stringify(saved)
                );

                alert("Tutorial saved!");
            }
        });
    });

    document
        .querySelectorAll(".details-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id =
                    Number(button.dataset.id);

                const tutorial =
                    tutorials.find(
                        item => item.id === id
                    );

                modalContent.innerHTML = `
                    <h2>${tutorial.title}</h2>

                    <p>
                        ${tutorial.description}
                    </p>

                    <p>
                        Category:
                        ${tutorial.category}
                    </p>

                    <p>
                        Level:
                        ${tutorial.level}
                    </p>

                    <p>
                        Duration:
                        ${tutorial.duration}
                    </p>
                `;

                modal.showModal();
            });
        });
}

closeModal.addEventListener("click", () => {
    modal.close();
});

search.addEventListener("input", () => {

    const value =
        search.value.toLowerCase();

    const filtered =
        tutorials.filter(tutorial =>
            tutorial.title
                .toLowerCase()
                .includes(value)
        );

    displayTutorials(filtered);
});

loadTutorials();