const params = new URLSearchParams(window.location.search);

document.querySelector("#firstName").textContent =
params.get("firstname") || "Not Provided";

document.querySelector("#lastName").textContent =
params.get("lastname") || "Not Provided";

document.querySelector("#email").textContent =
params.get("email") || "Not Provided";

document.querySelector("#phone").textContent =
params.get("phone") || "Not Provided";

document.querySelector("#organization").textContent =
params.get("organization") || "Not Provided";

const timestamp = params.get("timestamp");

if (timestamp) {

    const formattedDate =
        new Date(timestamp).toLocaleString();

    document.querySelector("#timestamp").textContent =
        formattedDate;

}