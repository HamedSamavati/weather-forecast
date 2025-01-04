async function getData(city, APIKEY, unit) {
  try {
    const BASEURL = "https://api.openweathermap.org/data/2.5/forecast?";
    const url = `${BASEURL}q=${city}&appid=${APIKEY}&units=${unit}`;
    const data = await fetch(url);
    const result = await data.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: long } = position.coords;
      geoToCity(lat, long);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

async function geoToCity(lat, long) {
  const inputCity = document.querySelector(".location__input");
  const apiKey = `c55b92e577ac4ed99c4e28108fc569be`;
  let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    inputCity.value = json.features[0].properties.city;
  } catch (error) {
    console.error(error);
  }
}

export { getData, getCurrentLocation };
