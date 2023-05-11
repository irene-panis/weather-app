const API_KEY = "fcd695651489692dd902cf171673c895";

var searchHistory;

// gets current weather
function getWeather(city) {
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY + "&units=imperial";

  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (data.cod !== '404') { // runs this code if city was valid
      $( '#search-text' ).removeClass('is-invalid');
      displayCurrent(data);
      storeHistory(data.name);
      displayHistory(searchHistory);
    } else {
      $( '#search-text' ).addClass('is-invalid'); // makes searchbar red for invalid searches
    }
  })
}

// gets forecast
function getForecast(city) {
  var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fcd695651489692dd902cf171673c895&units=imperial";

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.cod !== '404') {
        displayForecast(data.list[8], 0); // 24 hrs from 'now'
        displayForecast(data.list[16], 1); // and so on
        displayForecast(data.list[24], 2);
        displayForecast(data.list[32], 3);
        displayForecast(data.list[39], 4);
      }
    })
};

function displayCurrent(data) {

  // MAIN DISPLAY - CITY/DATE/ICON //
  $( '.display-city' ).text(data.name);
  $( '.display-date' ).text(dayjs.unix(data.dt).format("MMMM DD, YYYY"));
  var src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
  $( '.display-wth-icon' ).attr('src', src);
  $( '.display-wth-text' ).text(data.weather[0].main);

  // MAIN DISPLAY - CARDS // 
  $( '#current-temp > .card-title' ).text("temp");
  $( '#current-temp > .card-content' ).text(Math.floor(data.main.temp));
  $( '#current-temp > .card-small-text' ).text("F");

  $( '#current-wind > .card-title' ).text("wind");
  $( '#current-wind > .card-content' ).text(data.wind.speed);
  $( '#current-wind > .card-small-text' ).text("mph");

  $( '#current-hmd > .card-title' ).text("humidity");
  $( '#current-hmd > .card-content' ).text(data.main.humidity);
  $( '#current-hmd > .card-small-text' ).text("%");
}

// for displaying content in specific forecast cards (i = index)
function displayForecast(data, i) {
  $( '.fc-day-title' ).eq(i).text(dayjs.unix(data.dt).format("MM/DD/YY"));
  var src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
  $( '.fc-day-icon' ).eq(i).attr('src', src);
  $( '.fc-day-temp' ).eq(i).text("temp: " + Math.floor(data.main.temp) + "F");
  $( '.fc-day-wind' ).eq(i).text("wind: " + Math.floor(data.wind.speed) + " MPH");
  $( '.fc-day-hmd' ).eq(i).text("humidity: " + Math.floor(data.main.humidity) + "%");
}

function storeHistory(city) {
  if (searchHistory.includes(city)) { // account for duplicate searches
    return;
  }
  if (searchHistory.length === 10) { // max history length of 10
    searchHistory.shift(); // removes oldest search item (first item)
    searchHistory.push(city); // adds recent search to end of array
  } else {
    searchHistory.push(city);
  }
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// loops through array of searchHistory and displays them in dropdown menu
function displayHistory(searchHistory) {
  $( '.dropdown-menu' ).html(''); // clear dropdown each time
  for (let i = 0; i < searchHistory.length; i++) {
    var city = $('<li><a class="dropdown-item historyItem" href="#">' + searchHistory[i].toLowerCase() + '</a></li>');
    city.on('click', function() { // add event listener to item just added
      getWeather(searchHistory[i]); // on click we run getWeather and getForecast for specific city
      getForecast(searchHistory[i]);
    })
    $( '.dropdown-menu' ).append(city);
  }
}

// initialize, start with san diego as placeholder
function init() {
  getWeather("San Diego");
  getForecast("San Diego");
  var search = localStorage.getItem("searchHistory");
  if (search === null) { // accounts for if local storage is empty
    searchHistory = [];
  } else {
    searchHistory = JSON.parse(search);
  }
}

// upon clicking search button we run getWeather and getForecast for whatever we searched
$( '#search-btn' ).on('click', function() {
  var city = $( '#search-text' ).val();
  getWeather(city);
  getForecast(city);
});

init();