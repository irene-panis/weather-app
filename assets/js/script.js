const API_KEY = "fcd695651489692dd902cf171673c895";

function getWeather(city) {
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY + "&units=imperial";

  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    displayCurrent(data);
  })

}

function getForecast() {
  var url = "https://api.openweathermap.org/data/2.5/forecast?q=wellington&appid=fcd695651489692dd902cf171673c895&units=imperial";

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      console.log(data.list[8]);
      console.log(data.list[16]);
      console.log(data.list[24]);
      console.log(data.list[32]);
      console.log(data.list[39]);
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

$( '#search-btn' ).on('click', function() {
  var city = $( '#search-text' ).val();
  getWeather(city);
});

getForecast();