const modal = document.querySelector("#eventModal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelector("#closeModal");

const eventButtons =
document.querySelectorAll(".event-btn");

eventButtons.forEach(button => {

    button.addEventListener("click", () => {

        const title =
        button.dataset.title;

        const description =
        button.dataset.description;

        modalContent.innerHTML = `
            <h2>${title}</h2>
            <p>${description}</p>
        `;

        modal.showModal();

    });

});

closeModal.addEventListener("click", () => {
    modal.close();
});

const memberName =
localStorage.getItem("memberName");

const welcomeMessage =
document.querySelector("#welcomeMessage");

if(memberName){

    welcomeMessage.textContent =
    `Welcome back, ${memberName}!`;

}

const form =
document.querySelector(".membership-form");

form.addEventListener("submit", () => {

    const fullname =
    document.querySelector("#fullname").value;

    localStorage.setItem(
        "memberName",
        fullname
    );

});