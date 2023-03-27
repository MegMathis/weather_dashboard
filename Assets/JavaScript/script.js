// city is added to the search history
// When I view current weather conditions for that city
// I am presented with the city name, the date, an icon representation of weather
// conditions, the temperature, the humidity, and wind speed
// when I view future weather conditions for that city
// then I am presented with a 5-day forecast that displays the date, an icon
// representation fo weather conditions, the temperature, the windspeed, and humidity
// When I click on a city in the search history
// then I am again presented with current and future conditions for that city

var baseURL = "https://api.openweathermap.org/data/2.5";
var apiKey = "aea0e9dd933491db706a962609d73f70";
var weatherURL = baseURL + "weather?lat=" + apiKey;
var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=";
var weatherAPIRootUrl = "https://api.openweathermap.org";
var form = document.querySelector(".searchForm");

form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();

  // function that will run when the button is clicked will need to do the following:

  // capture the value from the input box
  var userInput = document.getElementById("inputValue");
  weatherGather(userInput.value);
}

function weatherGather(city) {
  // create a function that runs our api to gather weather data
  // with the data from the api we will ned to get the temp, wind, humidity, the weather icon

  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function (res) {
      // console.log(resObj);
      return res.json();
    })
    .then(function (data) {
      let lat = data.coord.lat;
      let lon = data.coord.lon;

      console.log(lat, lon);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then(function (data) {
          console.log(data);
        })
        .catch(function (err) {
          console.log(err);
        });

      //extract the lat & lon
    })
    .catch(function (err) {
      console.log(err);
    });
}

// // send to the current weather function
// function renderItems(city, data) {
//   renderCurrentWeather(city, data);
// }
// add the temp, humidity, wind and icon to the appropriate elements in html
// function renderCurrentWeather(city, weather) {
//   var temp = weather.main.temp;
//   var windMPH = weather.wind.speed;
//   var humidity = weather.main.humidity;
//   var iconURL = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
//   var iconDescription = weather.weather[0].description || weather[0].main;

//   console.log(city, weather, temp, windMPH, humidity, iconURL, iconDescription);
// }
// renderItems();
