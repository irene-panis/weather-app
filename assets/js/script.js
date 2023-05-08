function getWeather(city) {
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fcd695651489692dd902cf171673c895&units=imperial";

  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    console.log("Temp: " + data.main.temp);
    console.log("Wind: " + data.wind.speed + " mph");
    console.log("Humidity: " + data.main.humidity + "%");
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

$( '#search-btn' ).on('click', function() {
  var city = $( '#search-text' ).val();
  getWeather(city);
});