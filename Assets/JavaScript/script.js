// city is added to the search history
// When I view current weather conditions for that city
// I am presented with the city name, the date, an icon representation of weather
// conditions, the temperature, the humidity, and wind speed
// when I view future weather conditions for that city
// then I am presented with a 5-day forecast that displays the date, an icon
// representation fo weather conditions, the temperature, the windspeed, and humidity
// When I click on a city in the search history
// then I am again presented with current and future conditions for that city

// var searchField = document.querySelector(".inputValue");
// var searchButton = document.querySelector("#searchButton");
// var searchForm = document.querySelector(".searchForm");

// // When I search a city
// function handlesearchForm(e) {
//   if (!searchField.value) {
//     return;
//   }
//   e.preventDefault();
//   console.log(searchField.value);
//   var city = searchField.value.trim();

//   searchCity(city);
// }

// function searchCity(city) {
//   console.log(city);

//   var apiKey = "aea0e9dd933491db706a962609d73f70";
//   var baseURL = `$http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
// }
// searchForm.addEventListener("submit", handlesearchForm);

var baseURL = "https://api.openweathermap.org/data/2.5";
var apiKey = "aea0e9dd933491db706a962609d73f70";
var weatherURL = baseURL + "weather?lat=" + apiKey;
var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=";
var lat = "39.934002";
var lon = "-74.89099879999998";
varURL = baseURL + "weather?lat=" + apiKey + "&lat=" + lat + "&lon=";

// I am presented with current and future conditions for that city
// $.get(URL).then(function (data) {
//   console.log(data);
// });

// fetch(baseURL)
//   .then(function (resObj) {
//     // console.log(resObj);
//     return resObj.json();
//   })
//   .then(function (data) {
//     // console.log(data);
//     var output = document.querySelector('#current-weather');

//     for (var cityName of data.results) {
//       var
//     }
//   });
//
// add event listener to the search button
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
  console.log(city);
  // create a function that runs our api to gather weather data
  // with the data from the api we will ned to get the temp, wind, humidity, the weather icon

  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&appid=aea0e9dd933491db706a962609d73f70"
  )
    .then(function (resObj) {
      // console.log(resObj);
      return resObj.json();
    })
    .then(function (data) {
      console.log(data[0].lat);
      //extract the lat & lon

      // send to the current weather function
    })
    .then(function (data) {
      console.log(data[0].lon);
    });
}

function currentWeather(lat, lon) {}
// add the temp, humidity, wind and icon to the appropriate elements in html
