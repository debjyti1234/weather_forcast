// for search bar
const searchFocus = document.getElementById('search-focus');
const keys = [
  { keyCode: 'AltLeft', isTriggered: false },
  { keyCode: 'ControlLeft', isTriggered: false },
];

window.addEventListener('keydown', (e) => {
  keys.forEach((obj) => {
    if (obj.keyCode === e.code) {
      obj.isTriggered = true;
    }
  });

  const shortcutTriggered = keys.filter((obj) => obj.isTriggered).length === keys.length;

  if (shortcutTriggered) {
    searchFocus.focus();
  }
});

window.addEventListener('keyup', (e) => {
  keys.forEach((obj) => {
    if (obj.keyCode === e.code) {
      obj.isTriggered = false;
    }
  });
});



// original javascript code

// get date and time

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const side_bar_date_el = document.getElementById("side_bar_date");
// var city = 'kolkata'
GetDateAndTime("kolkata");
function GetDateAndTime(city) {
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/worldtime?city=' + city,
    headers: { 'X-Api-Key': 'BoAcLd/EPy5VdGMMdJEhPA==wjrmbNOAjdiVk3qY' },
    contentType: 'application/json',
    success: function (result) {
      // console.log(result);
      const hour = result.hour;
      const minutes = result.minute;
      const day = result.day;
      const day_of_week = result.day_of_week;
      const date = new Date(result.date);
      // console.log(result.date)
      var locale = "en-us";
      const month = date.toLocaleString(locale, { month: "long" });
      // month = month.replace('0', '');
      const year = result.year;
      // setInterval(() => {
      const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
      const ampm = hour >= 12 ? 'PM' : 'AM'
      timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`;

      // }, 1000);

      dateEl.innerHTML = day_of_week + ', ' + day + ' ' + month + ' ' + year;
      side_bar_date_el.innerHTML = `<div> <b>Today, ${day} ${month}</b></div>`

      // change weeding note depending on the time
      if (result.hour >= 5 && result.hour < 12) {
        document.getElementById("weeding").innerHTML = `<td> <img src="https://cdn-icons-png.flaticon.com/512/815/815568.png" height="28px" width="28px" alt="not avaliable"></td>
         <td><h5 class="color_blue"> Good morning Debjyoti!</h5></td>`
      }
      else if (result.hour >= 12 && result.hour < 18) {
        document.getElementById("weeding").innerHTML = `<td> <img src="https://cdn-icons-png.flaticon.com/512/815/815568.png" height="28px" width="28px" alt="not avaliable"></td>
         <td><h5 class="color_blue"> Good Afternoon Debjyoti!</h5></td>`
      }
      else if (result.hour >= 18 && result.hour <= 23) {
        document.getElementById("weeding").innerHTML = `<td> <img src="https://cdn-icons-png.flaticon.com/512/815/815568.png" height="28px" width="28px" alt="not avaliable"></td>
         <td><h5 class="color_blue"> Good Evening Debjyoti!</h5></td>`
      }
      console.log(result.hour);

    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
}


// other one api

// work with weather
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


// var weatherApi = {
//   key: "8698689328ae6c900952feb553acfbe5",
//   baseUrl: "https://api.openweathermap.org/data/2.5/weather",
// }
// Get Weather Report
// function getWeatherReport(city) {
//   fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
//     .then(weather => {
//       return weather.json();
//     }).then(showWeatherReport);

// }


// get only air quality
function getWeatherReport_airQuality(city) {
  fetch(`https://api.weatherbit.io/v2.0/current/airquality?city=${city}&key=7c06259afaaa4855a810e925d4bb0900`)
    .then(weather => {
      return weather.json();
    }).then(showWeatherReport_airQuality);

}


function showWeatherReport_airQuality(weather) {
  console.log(weather);
  document.getElementById("air_Quality").innerHTML = `<div class="card col-sm-2 small_item_2">
  <span>${Math.round((weather.data[0].pm25) * 10) / 10}<br>PM25</span>
</div>
<div class="card col-sm-2 small_item_2">
  <span>${Math.round((weather.data[0].pm10) * 10) / 10}<br>PM10</span>
</div>
<div class="card col-sm-2 small_item_2">
<span>${Math.round((weather.data[0].so2) * 10) / 10}<br>so2</span>
</div>
<div class="card col-sm-2 small_item_2">
<span>${Math.round((weather.data[0].no2) * 10) / 10}<br>no2</span>
</div>
<div class="card col-sm-2 small_item_2">
<span>${Math.round((weather.data[0].o3) * 10) / 10}<br>o3</span>
</div>
<div class="card col-sm-2 small_item_2">
<span>${Math.round((weather.data[0].co) * 10) / 10}<br>co</span>
</div>`
}



function getWeatherReport_other(city) {
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/$%7B${city}%7D?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`)
    .then(weather => {
      return weather.json();
    }).then(showWeatherReport);

}
// // Show Weather Report
function showWeatherReport(weather) {
  console.log(weather);
  let temperature = document.getElementById('side_bar_only_temp');
  temperature.innerHTML = `<span style="font-size: 44px;">${Math.round(weather.currentConditions.temp)}&deg;C</span><br>
  <span><b>${weather.currentConditions.conditions}</b></span>`;

  let weatherType = 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/' + (weather.currentConditions.icon) + '.png';
  let weather_icon = document.getElementById('weather_type_iconss');
  weather_icon.innerHTML = `<img src="${weatherType}" width="100px" height="100px" alt="not here">`

  // // weather_type_icon
  // if (weatherType == 'Clear') {
  //   weather_icon.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/3222/3222800.png')";
  // } else if (weatherType == 'Clouds' || 'Partially cloudy') {
  //   weather_icon.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/704/704845.png')";
  // } else if (weatherType == 'Haze') {
  //   weather_icon.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/4234/4234879.png')";
  // } else if (weatherType == 'Rain') {
  //   weather_icon.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/4246/4246656.png')";
  // } else if (weatherType == 'Snow') {
  //   weather_icon.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/2264/2264705.png')";
  // } else if (weatherType == 'Thunderstorm') {
  //   weather_icon.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/7776/7776318.png')";
  // } else if (weatherType == 'Rain, Partially cloudy') {
  //   weather_icon.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/7776/7776318.png')";
  // }

  // side_bar_wind and humidity quality
  document.getElementById("side_bar_wind").innerHTML = `<table class="table">
  <tr>
    <td>
      <i class='fas fa-wind'></i> Wind
    </td>
    <td>
      <b>|</b>
    </td>
    <td>${weather.currentConditions.windspeed} km/h</td>
  </tr>
  <tr>
    <td><i class="fa-solid fa-droplet"></i> Hum</td>
    <td><b>|</b></td>
    <td>${weather.currentConditions.humidity}%</td>
  </tr>
</table>`;


  // 6 days date and temp
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var icons = 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/'

  var date = new Date(weather.days[0].datetime);
  var day1 = days[date.getDay()];
  var day1_temp = Math.round(weather.days[0].temp);
  var icon1 = icons + (weather.days[0].icon) + '.png';


  var date = new Date(weather.days[1].datetime);
  var day2 = days[date.getDay()];
  var day2_temp = Math.round(weather.days[1].temp);
  var icon2 = icons + (weather.days[1].icon) + '.png';

  var date = new Date(weather.days[2].datetime);
  var day3 = days[date.getDay()];
  var day3_temp = Math.round(weather.days[2].temp);
  var icon3 = icons + (weather.days[2].icon) + '.png';

  var date = new Date(weather.days[3].datetime);
  var day4 = days[date.getDay()];
  var day4_temp = Math.round(weather.days[3].temp);
  var icon4 = icons + (weather.days[3].icon) + '.png';

  var date = new Date(weather.days[4].datetime);
  var day5 = days[date.getDay()];
  var day5_temp = Math.round(weather.days[4].temp);
  var icon5 = icons + (weather.days[4].icon) + '.png';

  var date = new Date(weather.days[5].datetime);
  var day6 = days[date.getDay()];
  var day6_temp = Math.round(weather.days[5].temp);
  var icon6 = icons + (weather.days[5].icon) + '.png';

  document.getElementById("six_days_temp").innerHTML = `<div id="current-temp" class="col-sm-2 card small_item">
<img src="${icon1}" height="30%" width="30%"
  alt="not avaliable">
<span>${day1} <br>${day1_temp}°</span>
</div>
<div class="col-sm-2 card small_item">
<img src="${icon2}" height="30%" width="30%"
  alt="not avaliable">
<span>${day2} <br>${day2_temp}°</span>

</div>
<div class="col-sm-2 card small_item">
<img src="${icon3}" height="30%" width="30%"
  alt="not avaliable">
<span>${day3} <br>${day3_temp}°</span>
</div>
<div class="col-sm-2 card small_item">
<img src="${icon4}" height="30%" width="30%"
  alt="not avaliable">
<span>${day4} <br>${day4_temp}°</span>
</div>
<div class="col-sm-2 card small_item">
<img src="${icon5}" height="30%" width="30%"
  alt="not avaliable">
<span>${day5} <br>${day5_temp}°</span>
</div>
<div class="col-sm-2 card small_item">
<img src="${icon6}" height="30%" width="30%"
  alt="not avaliable">
<span>${day6} <br>${day6_temp}°</span>
</div>`


  // only sunrise and sunset data
  document.getElementById("Sunrise_1").innerText = `${weather.currentConditions.sunrise}AM`;
  document.getElementById("Sunset_1").innerText = `${weather.currentConditions.sunset}PM`;





}

getWeatherReport_other("kolkata");
getWeatherReport_airQuality("kolkata");


// work with search box
const countries = [];
const searchInputBox = document.getElementById('input-box');

// // Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {

  if (event.keyCode == 13) {
    // console.log(searchInputBox.value);
    countries.push(searchInputBox.value);
    // console.log(countries);
    for (var i = countries.length; i > 3; i--) {
      console.log(countries[i]);
    }




    getWeatherReport_other(searchInputBox.value);
    getWeatherReport_airQuality(searchInputBox.value);
    GetDateAndTime(searchInputBox.value);
    $(".cuntry_name").text(searchInputBox.value);
  }
});

// get cuntry_name from serch box and show
if (searchInputBox.value) {
  $(".cuntry_name").text(searchInputBox.value);
}
else {
  $(".cuntry_name").text("kolkata");
}




