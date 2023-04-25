// my api key
var apiKey = "aea0e9dd933491db706a962609d73f70";

// search vars
var citySearch = document.querySelector("#city-search");
var searchForm = document.querySelector("#search-form");
var weatherIcon = document.querySelector("#weather-icon");

//current stuff vars
var currentData = document.querySelector("#current-data");
var currentIcon = document.querySelector("#current-icon");
var currentHeading = document.querySelector("#current-heading");

// searches vars
// var clearButton = document.querySelector("#clear-btn");
var searchWeatherBtn = document.querySelector("#searchWeatherBtn");
var searchContainer = document.querySelector("#search-container");
var errorContainer = document.querySelector("#error-container");

// local storage... come back to
var search = JSON.parse(localStorage.getItem("search") || "[]");

var cityList = JSON.parse(localStorage.getItem("lsCityList") || "[]");
cityList.forEach((cityName) => {
  createCityButton(cityName);
});

// current weather
function getCurrentWeather(eventObj, cityName) {
  if (eventObj) {
    eventObj.preventDefault();
  }

  // get current weathrer from open weather... Farenheit is imperial
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=imperial&appid=" +
      apiKey
  )
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Not working");
        return;
      }
      response.json().then(function (data) {
        console.log(data);
        displayCurrentWeather(data);
        saveSearch(data.name);
      });
    })
    .catch(function (err) {
      console.log("Looks like a fetch error", err);
    });
}

searchForm.addEventListener("submit", (eventObj) =>
  getCurrentWeather(eventObj, citySearch.value)
);

// Current Weather Display
function displayCurrentWeather(data) {
  var temp = document.querySelector("#temp");
  var wind = document.querySelector("#wind");
  var humid = document.querySelector("#humid");
  var cityName = document.querySelector("#city-name");

  //Date display
  var date = new Date();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var day = date.getDate();
  var formatTime = month + " " + day + ", " + year;

  cityName.textContent = data.name + " " + formatTime + "";
  temp.textContent = "Temp: " + data.main.temp + " °F";
  wind.textContent = "Wind: " + data.wind.speed + " mph";
  humid.textContent = "Humidity: " + data.main.humidity + "%";
  getForecast(data.name);
}

// getting the future weather from openweather api
function getForecast(cityName) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&units=imperial&appid=" +
      apiKey
  )
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Not working" + response.status);
        return;
      }
      response.json().then(function (data) {
        console.log(data);
        displayForecast(data);
      });
    })
    .catch(function (err) {
      console.log("Looks like a fetch error", err);
    });
}

// future weather display
function displayForecast(data) {
  var forecastData = [
    // pick 5 days from the "list:array(40) to get the next 5 days"
    data.list[0],
    data.list[10],
    data.list[19],
    data.list[28],
    data.list[35],
  ];

  document.getElementById("forcastContainer").innerHTML = "";
  // make the elements for 5 day forcast
  for (var i = 0; i < forecastData.length; i++) {
    var section = document.createElement("section");
    var fiveDayDate = document.createElement("h3");
    var fiveDayImg = document.createElement("img");
    var fiveDayTemp = document.createElement("p");
    var fiveDayWind = document.createElement("p");
    var fiveDayHumid = document.createElement("p");

    // section.setAttribute(
    //   "class",
    //   "text-center col-2 m-2 p-0 border border-primary"
    // );
    fiveDayDate.textContent = forecastData[i].dt_txt.split(" ")[0];
    fiveDayImg.setAttribute(
      "src",
      "http://openweathermap.org/img/w/" +
        forecastData[i].weather[0].icon +
        ".png"
    );
    fiveDayTemp.textContent = "Temp: " + forecastData[i].main.temp + " °F";
    fiveDayWind.textContent = "Wind: " + forecastData[i].wind.speed + " mph";
    fiveDayHumid.textContent =
      "Humidity: " + forecastData[i].main.humidity + "%";

    // append the section
    section.append(
      fiveDayDate,
      fiveDayImg,
      fiveDayTemp,
      fiveDayWind,
      fiveDayHumid
    );
    document.getElementById("forcastContainer").append(section);
  }
}

// search history saved

function saveSearch(cityName) {
  if (!cityList.includes(cityName)) {
    cityList.push(cityName);
    localStorage.setItem("lsCityList", JSON.stringify(cityList));
    createCityButton(cityName);
  }
}

function createCityButton(cityName) {
  var cityButton = document.createElement("button");
  cityButton.textContent = cityName;
  cityButton.onclick = () => {
    getCurrentWeather(undefined, cityName);
  };

  searchContainer.append(cityButton);
}
