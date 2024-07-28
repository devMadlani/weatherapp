import React, { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState("clear");

  const apikey = "1f42c570e23500a794af65d69c40b367";
  const apiurl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const checkWeather = async () => {
    if (city === "") {
      alert("Please Enter City Name ");
      resetWeatherData();
      return;
    }
    const response = await fetch(`${apiurl}${city}&appid=${apikey}`);
    const data = await response.json();
    console.log(data);

    if (data.name === undefined) {
      alert("Please Enter valid City Name ");
      resetWeatherData();
    } else {
      setWeatherData({
        name: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });

      switch (data.weather[0].main) {
        case "Clouds":
          setWeatherIcon("clouds");
          break;
          case "Clear":
          setWeatherIcon("clear");
          break;
        case "Drizzle":
          setWeatherIcon("drizzle");
          break;
        case "Mist":
          setWeatherIcon("mist");
          break;
        case "Rain":
          setWeatherIcon("rain");
          break;
        case "Snow":
          setWeatherIcon("snow");
          break;

        default:
          setWeatherIcon("clear");
          break;
      }
    }

  };
  const resetWeatherData = () =>{
    setWeatherData(null)
    setWeatherIcon("clear")
  }
  return (
    <>
      <div className="card">      
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            spellCheck="false"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="button" onClick={checkWeather}>
            <img src="./images/search.png" alt="" />
          </button>
        </div>

        <div className="weather">
          <img
            src={`./images/${weatherIcon}.png`}
            alt=""
            className="weather-icon"
          />
          <h1 className="temp">
            {weatherData ? `${Math.ceil(weatherData.temp)}°c` : "°c"}
          </h1>
          <h2 className="city">{weatherData ? weatherData.name : "City"}</h2>
          <div className="details">
            <div className="col">
              <img src="./images/humidity.png" alt="" />
              <div>
                <p className="humidity">
                  {weatherData ? `${weatherData.humidity}%` : "%"}
                </p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="./images/wind.png" alt="" />
              <div>
                <p className="wind">
                  {weatherData ? `${weatherData.wind} km/h` : "km/h"}
                </p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
