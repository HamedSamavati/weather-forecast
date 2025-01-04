class Forecast {
  constructor(data, unit) {
    this.data = data;
    this.unit = unit;
  }

  todayFirstTwoJSX(cityName, country, icon, weather, temp, unitShow) {
    return `
    <h1 class="city">${cityName} ,${country}</h1>
        <section class="todayscard-firstrow">
            <img class="todayscard-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt=${weather} />
            <p class="todayscard__weather">${weather}</p>
            <p class="todayscard__temp">${Math.round(temp)} ${unitShow}</p>
        </section>
    `;
  }
  todaySecondTwoJSX(humidity, wind, feelsLike, unitShow) {
    return `
        <section class="todayscard-secondrow">
            <p class="todayscard-secondrow-items">
              Humidity
              <span class="todayscard-secondrow-values humidity">${humidity}%</span>
            </p>
            <p class="todayscard-secondrow-items">
              Wind Speed
              <span class="todayscard-secondrow-values wind">${wind} m/s</span>
            </p>
        </section>
        <section>
            <p>
              feels like:
              <span class="today-feelslike todayscard-secondrow-values">${Math.round(
                feelsLike
              )}${unitShow}</span>
            </p>
        </section>
    `;
  }

  displayToday() {
    const { city, list } = { ...this.data };
    const feelsLike = list[0].main.feels_like;
    const { name: cityName, country } = city;
    const { temp, humidity } = list[0].main;
    const wind = list[0].wind.speed;
    const { main: weather, icon } = list[0].weather[0];
    const unitShow = this.unit === "metric" ? "°C" : "°F";
    const todaysCard = document.querySelector(".todayscard");

    todaysCard.innerHTML = this.todayFirstTwoJSX(
      cityName,
      country,
      icon,
      weather,
      temp,
      unitShow
    ).concat(this.todaySecondTwoJSX(humidity, wind, feelsLike, unitShow));
  }

  filterOtherDays() {
    const list = this.data.list;
    const daysData = list.filter((item, index) => {
      if (index % 8 === 0) {
        return item;
      }
    });
    return daysData;
  }
  otherDaysData() {
    const dailyData = this.filterOtherDays();
    const deconstructedDailyData = dailyData.map((item) => {
      const weatherIcon = item.weather[0].icon;
      const day = item.dt;
      const temp = item.main.temp;
      const weather = item.weather[0].main;
      return { weatherIcon, weather, day, temp };
    });
    return deconstructedDailyData;
  }

  dayOfWeek(index) {
    const currentDate = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = currentDate.getDay();
    return daysOfWeek[(today + index + 1) % 7];
  }

  displayOtherDays() {
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";
    const otherDaysData = this.otherDaysData();
    const unitShow = this.unit === "metric" ? "°C" : "°F";
    otherDaysData.map((item, index) => {
      const { weatherIcon, temp, weather } = { ...item };
      const otherDayJSX = `
                <section class="cards__card shadow">
                  <img class="card__icon" src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt=${weather} />
                  <h2 class="card__day">${this.dayOfWeek(index)}</h2>
                  <p class="card__temprature">${Math.round(
                    temp
                  )} ${unitShow}</p>
                  <p class="card__weather">${weather}</p>
                </section>
        `;
      cards.innerHTML += otherDayJSX;
    });
  }

  render() {
    this.displayToday();
    this.displayOtherDays();
  }
}

export { Forecast };
