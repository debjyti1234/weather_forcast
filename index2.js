const weatherApi = {
  key: "8698689328ae6c900952feb553acfbe5",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}
fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
      return weather.json();
    }).then(showWeatherReport);

    function showWeatherReport(weather) {

const time = new Date();
    }