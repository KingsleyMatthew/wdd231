const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

/* FOOTER */

document.querySelector("#year").textContent =
  new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  document.lastModified;

/* WEATHER */

const weatherURL =
  "https://api.openweathermap.org/data/2.5/forecast?lat=5.1066&lon=7.3667&units=metric&appid=7a74636632bb2eff3d09c1da5169d097";

async function getWeather() {

  try {

    const response = await fetch(weatherURL);

    if (!response.ok) {
      throw new Error("Weather data failed to load");
    }

    const data = await response.json();

    displayWeather(data);

  } catch (error) {

    console.error(error);

    document.querySelector("#current-temp").textContent =
      "Weather unavailable";

    document.querySelector("#weather-desc").textContent =
      "";

    document.querySelector("#forecast").innerHTML =
      "<p>Forecast unavailable</p>";
  }
}

function displayWeather(data) {

  if (!data.list || data.list.length === 0) {
    return;
  }

  document.querySelector("#current-temp").textContent =
    `${Math.round(data.list[0].main.temp)}°C`;

  document.querySelector("#weather-desc").textContent =
    data.list[0].weather[0].description;

  const forecast =
    document.querySelector("#forecast");

  forecast.innerHTML = "";

  const days = [8, 16, 24];

  days.forEach(day => {

    if (data.list[day]) {

      const item = data.list[day];

      const date = new Date(item.dt_txt);

      const forecastItem =
        document.createElement("p");

      forecastItem.innerHTML = `
        <strong>
          ${date.toLocaleDateString("en-US", {
            weekday: "long"
          })}
        </strong>:
        ${Math.round(item.main.temp)}°C
      `;

      forecast.appendChild(forecastItem);
    }
  });
}

/* SPOTLIGHTS */

const spotlightContainer =
  document.querySelector("#spotlight-container");

async function getSpotlights() {

  const response =
    await fetch("data/members.json");

  const data = await response.json();

  displaySpotlights(data);
}

function displaySpotlights(members) {

  const filtered =
    members.filter(member =>
      member.membership === 2 ||
      member.membership === 3
    );

  const shuffled =
    filtered.sort(() => 0.5 - Math.random());

  const selected =
    shuffled.slice(0, 3);

  selected.forEach(member => {

    const card =
      document.createElement("section");

    card.classList.add("spotlight-card");

card.innerHTML = `

  <h3>${member.name}</h3>

  <p class="tagline">
    Chamber Member
  </p>

  <div class="spotlight-content">

    <img
      src="images/${member.image}"
      alt="${member.name}"
      width="100"
      height="100"
      loading="lazy"
    >

    <div>

      <p>
        <strong>PHONE:</strong>
        ${member.phone}
      </p>

      <p>
        <strong>ADDRESS:</strong>
        ${member.address}
      </p>

      <p>
        <strong>URL:</strong>

        <a href="${member.website}" target="_blank">
          Website
        </a>
      </p>

    </div>

  </div>
`;

    spotlightContainer.appendChild(card);
  });
}

getWeather();
getSpotlights();