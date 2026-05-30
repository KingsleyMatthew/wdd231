const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

const modalButtons =
document.querySelectorAll("[data-modal]");

modalButtons.forEach(button => {

    button.addEventListener("click", () => {

        const modal =
        document.getElementById(button.dataset.modal);

        modal.showModal();

    });

});

document
.querySelectorAll(".close-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        button.closest("dialog").close();

    });

});