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
    getFiveDay();
  });
}

function appendWeather(speed, humidity, tempF, name) {
  currentWeather.append("<p>Wind Speed: " + speed + " MPH" + "</p>");
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
  for (var i = 0; i <= 40; i += 8) {
    var date = moment(list[i].dt_txt).format("MM/DD/YYYY");

    var card = $('<div class="card" style="width: 18rem;">');
    var cardBody = $('<div class="card-body"></div>');
    var cardTitle = $('<h5 class="card-title"></h5> ');
    var cardTemp = $('<p class="card-text" id="card-temp"></p> ');
    var cardHumidity = $('<p class="card-text" id="card-humidity"></p> ');

    cardTitle.append(date);
    cardTemp.append("Temperature: " + convertKelvin(list[i].main.temp));
    cardHumidity.append("Humidity: " + list[i].main.humidity);

    cardBody.append([cardTitle, cardTemp, cardHumidity]);
    card.append(cardBody);
    forecast.append(card);
  }
}

function convertKelvin(temp) {
  var tempF = (temp - 273.15) * 1.8 + 32;
  return tempF.toFixed(2);
}
