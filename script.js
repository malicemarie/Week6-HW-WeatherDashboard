var displayWeather = $("#display-info");
var currentWeather = $("#current");
var forecast = $("#five-day");
var APIKey = "099caf31d8be846f886d2afe1d409790";
var citySearch = $("#search-input").val();
var searchBtn = $("#search-btn");

searchBtn.on("click", runSearch);

function runSearch() {
  var citySearch = $("#search-input").val();

  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?&appid=" +
    APIKey +
    "&q=" +
    citySearch;

  console.log(citySearch, searchBtn, queryURL, APIKey);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryURL);

    console.log(response);

    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F) " + response.main.temp);

    var tempF = convertKelvin(response.main.temp);
    $(".tempF").text("Temperature (Kelvin) " + tempF);

    appendWeather(
      response.wind.speed,
      response.main.humidity,
      tempF,
      response.name
    );
  });
  getFiveDay();
}

function appendWeather(speed, humidity, tempF, name) {
  currentWeather.append("<p>Wind Speed: " + speed + "</p>");
  currentWeather.append("<p>Humidity: " + humidity + "</p>");
  currentWeather.append("<p>Temperature (F): " + tempF + "</p>");

  var currentDate = moment().calendar();

  currentWeather.prepend("<h1>" + name + " " + currentDate);
}

function getFiveDay() {
  var citySearch = $("#search-input").val();

  var queryURL =
    "http://api.openweathermap.org/data/2.5/forecast?&appid=" +
    APIKey +
    "&q=" +
    citySearch;

  console.log(citySearch, searchBtn, queryURL, APIKey);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryURL);

    console.log(response);

    appendForecast(response.list);
  });
}

function appendForecast(list) {
  for (var i = 0; i <= 4; i++) {
    var date = moment(list[i].dt).calendar();
    forecast.append("<p>" + date + "</p>");
    forecast.append("<p>" + convertKelvin(list[i].main.temp) + "</p>");
    forecast.append("<p>" + list[i].main.humidity + "</p>");
  }
}

function convertKelvin(temp) {
  var tempF = (temp - 273.15) * 1.8 + 32;
  return tempF.toFixed(2);
}
