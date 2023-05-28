import "./App.css";
import Search from "./components/search";
import { CurrentWeather } from "./components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forcast from "./components/forecast-weather/forecast";

function App() {

  const [currentWeather, setcurrentWeather] = useState(null);
  const [forecastWeather, setforecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    // console.log(searchData);
    // console.log(lat, lon);

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forcastWeatherFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forcastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecasetWeatherResponse = await response[1].json();

        setcurrentWeather({ city: searchData.label, ...weatherResponse });
        setforecastWeather({ city: searchData.label, ...forecasetWeatherResponse});
        // console.log(currentWeather);
        // console.log(weatherResponse);
        // console.log(forecasetWeatherResponse);
      })
      .catch((err) => console.log(err));
    // console.log(currentWeather);
    // console.log(forecastWeather);
  };

  return (
    <div className="container ">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather &&  <CurrentWeather data={currentWeather}/>}
      {forecastWeather && < Forcast data={forecastWeather}/>}
    </div>
  );
}

export default App;
