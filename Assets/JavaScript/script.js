var searchField = document.querySelector(".inputValue");
var searchButton = document.querySelector("#searchButton");
var searchForm = document.querySelector(".searchForm");

function handlesearchForm(e) {
  if (!searchField.value) {
    return;
  }
  e.preventDefault();
  console.log(searchField.value);
  var city = searchField.value.trim();

  searchCity(city);
}

function searchCity(city) {
  console.log(city);

  var apiKey = "aea0e9dd933491db706a962609d73f70";
  var baseURL = `$http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
}
searchForm.addEventListener("submit", handlesearchForm);
