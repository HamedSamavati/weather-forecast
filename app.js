import { getData, getCurrentLocation } from "./utils/http-request.js";
import { Forecast } from "./models/forecast.js";
import { showModal, hideModal } from "./utils/modal.js";
import { ENCRYPTED_APIKEY, passphrase } from "./config.js";

let city = "toronto";
let unit = "metric";

async function searchHandler(event) {
  const inputCity = document.querySelector(".location__input");
  if (event.target.classList.contains("location__button")) {
    if (inputCity.value === "") {
      showModal("Please enter a city name!");
      return;
    } else city = inputCity.value;
  }
  inputCity.value === "";
  const data = await getData(city, ENCRYPTED_APIKEY, unit, passphrase);
  const forecast = new Forecast(data, unit);
  forecast.render();
}

const metricHandler = (event) => {
  const target = event.target;
  if (target.innerText === "°C") {
    event.target.innerText = "°F";
    unit = "imperial";
  } else {
    event.target.innerText = "°C";
    unit = "metric";
  }
  initiate();
};

async function initiate() {
  const metricButton = document.querySelector(".unit");
  const searchButton = document.querySelector(".location__button");
  const locationIcon = document.querySelector(".location__icon");
  const loader = document.getElementById("loader");
  const modalButton = document.getElementById("modal-button");
  metricButton.addEventListener("click", metricHandler);
  searchButton.addEventListener("click", searchHandler);
  locationIcon.addEventListener("click", getCurrentLocation);
  modalButton.addEventListener("click", hideModal);
  const data = await getData(city, ENCRYPTED_APIKEY, unit, passphrase);
  const forecast = new Forecast(data, unit);
  forecast.render();
}

initiate();
