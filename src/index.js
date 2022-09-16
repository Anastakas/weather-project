let curDate = document.querySelector("#current-date");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuethday",
  "Wednesday",
  "Thurthday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
curDate.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let currentWindsped = document.querySelector("#current-windspeed");
  currentWindsped.innerHTML = `${wind} km/c`;
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${humidity}%`;
  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = description;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;
}
function searchCity(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}
searchCity("Kyiv");
let inputCity = document.querySelector("#search-city");
inputCity.addEventListener("submit", getCity);
function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d33243fa11c3284dcffcf337fc75caaa";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentLocation);
