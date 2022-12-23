const getWeatherForecast = async (cityName) => {
    try {
      const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=3`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          "x-rapidapi-key": "f02535c964msh89df00044beb6d3p1e79f8jsn8b3a250bdedf"
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
}

const displayCity = async (weatherData) => {
    const cityDescription = document.getElementById("city-description");
    const cityName = weatherData.location.name;
    const countryName = weatherData.location.country;
    const addElement = `<h2>Show Weather Of ${cityName}, ${countryName}</h2>`;
    cityDescription.innerHTML = addElement;
}

const displayCurrentWeather = async (weatherData) => {
    const currentWeatherDiv = document.getElementById("current-weather");

    const currentWeather = {
        condition: weatherData.current.condition.text,
        conditionImage: weatherData.current.condition.icon,
        temperature: weatherData.current.temp_c,
        humidity: weatherData.current.humidity,
        time: weatherData.current.last_updated
    }

    const addElement = `
    <div class="weather-container">
      <h2>Current Weather</h2>
      <p style="text">"${currentWeather.condition}"</p>
      <img src="https:${currentWeather.conditionImage}" class="weather-image">
      <p>temperature: ${currentWeather.temperature}℃</p>
      <p>humidity: ${currentWeather.humidity}%</p>
      <p>(updated at ${currentWeather.time})</p>
    </div>
  `;

    currentWeatherDiv.innerHTML = addElement;
}

const displayWeatherForecast = (weatherData) => {
    const forecastDiv = document.getElementById("weather-forecast");
    forecasts = weatherData.forecast.forecastday;

    let listOfElement = "";
    for(let x = 0 ; x <forecasts.length ; x++) {
        const forecastData = {
            date: forecasts[x].date,
            condition: forecasts[x].day.condition.text,
            conditionImage: forecasts[x].day.condition.icon,
            avg_temp: forecasts[x].day.avgtemp_c,
            max_temp: forecasts[x].day.maxtemp_c,
            min_temp: forecasts[x].day.mintemp_c,
            avg_humidity: forecasts[x].day.avghumidity
          }
    
          const addElement = `
            <div class="weather-container">
              <h2>Weather of ${forecastData.date}</h2>
              <p style="text">"${forecastData.condition}"</p>
              <img src="https:${forecastData.conditionImage}" class="weather-image">
              <p>Average Temperture: ${forecastData.avg_temp}℃</p>
              <p>(Maximum: ${forecastData.max_temp}℃, Minimum: ${forecastData.min_temp}℃)</p>
              <p>Average Humidity: ${forecastData.avg_humidity}%</p>
            </div>
          `;
          listOfElement += addElement;
    }
    forecastDiv.innerHTML = listOfElement;
}

const searchWeather = async() => {
    const cityName = document.getElementById("city-name").value;
    const weatherData = await getWeatherForecast(cityName);
    displayCity(weatherData);
    displayCurrentWeather(weatherData);
    displayWeatherForecast(weatherData);
}