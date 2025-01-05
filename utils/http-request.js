import { showModal } from "./modal.js";
import { ENCRYPTED_APIKEY_GEO, passphrase } from "../config.js";

const decryptApiKey = (apiKey, passphrase) => {
  return CryptoJS.AES.decrypt(apiKey, passphrase).toString(CryptoJS.enc.Utf8);
};

async function getData(city, EN_APIKEY, unit, passphrase) {
  try {
    const apiKey = decryptApiKey(EN_APIKEY, passphrase);
    const BASEURL = "https://api.openweathermap.org/data/2.5/forecast?";
    const url = `${BASEURL}q=${city}&appid=${apiKey}&units=${unit}`;
    const data = await fetch(url);
    const json = await data.json();
    if (+json.cod === 200) {
      return json;
    } else {
      console.log(json.message);
    }
    return result;
  } catch (error) {
    showModal(error);
  }
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: long } = position.coords;
        geoToCity(lat, long);
      },
      (error) => showModal(error.message)
    );
  } else {
    showModal("Geolocation is not supported by this browser.");
  }
}

async function geoToCity(lat, long) {
  const inputCity = document.querySelector(".location__input");
  const apiKey = decryptApiKey(ENCRYPTED_APIKEY_GEO, passphrase);
  let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    inputCity.value = json.features[0].properties.city;
  } catch (error) {
    showModal(error);
  }
}

export { getData, getCurrentLocation };
