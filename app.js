import { getData, getCurrentLocation } from "./utils/http-request.js";
import { Forecast } from "./models/forecast.js";
const APIKEY = "a819feecf85020feb3988c839fd94725";
let city = "toronto";
let unit = "metric";

async function searchHandler(event) {
  const inputCity = document.querySelector(".location__input");
  if (event.target.classList.contains("location__button")) {
    if (inputCity.value === "") {
      alert("Please enter a city name!");
      return;
    } else city = inputCity.value;
  } else if (event.target.classList.contains("location__icon")) {
    console.log("yes");
    city = getCurrentLocation();
  }
  inputCity.value === "";
  const data = await getData(city, APIKEY, unit);
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
  metricButton.addEventListener("click", metricHandler);
  searchButton.addEventListener("click", searchHandler);
  locationIcon.addEventListener("click", getCurrentLocation);
  const data = await getData(city, APIKEY, unit);
  const forecast = new Forecast(data, unit);
  forecast.render();
}

initiate();
