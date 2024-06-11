import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BsFillCloudSunFill, BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { useState } from "react";
import { fetchWeatherData } from "../Api";
import "./index.css";

const WeatherDetails = () => {
  const [weather, setWeather] = useState({});
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = async () => {
    const data = await fetchWeatherData(cityName);
    if (data) {
      const currentDate = new Date();
      const newDate = currentDate.toLocaleString("en-US");
      const newObj = {
        country: data.sys.country,
        city: data.name,
        temperature: Math.round(data.main.temp - 273.15),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        time: newDate,
      };
      setWeather(newObj);
      setDataFetched(true);
      setError(false);
    } else {
      setError(true);
      setDataFetched(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && cityName !== "") {
      fetchData();
    }
  };

  const handleSearch = () => {
    if (cityName !== "") {
      fetchData();
    }
  };

  const handleUserInput = (e) => {
    const userSearch = e.target.value;
    if (userSearch === "") {
      setDataFetched(false);
      setError(false);
      setCityName("");
    } else {
      setCityName(userSearch);
    }
  };

  const ErrorContainer = () => (
    <div className="error-container">
      <h1>Oops...</h1>
      <p className="error-color">Your city was not found.....</p>
    </div>
  );

  const WeatherData = () => (
    <>
      <div className="temperature">
        <BsFillCloudSunFill className="sun-icon" />
        <div>
          <p>
            {dataFetched ? weather.city : "- "},{" "}
            {dataFetched ? weather.country : "- "}
          </p>
          <p>{dataFetched ? weather.time : "- "}</p>
          <h1 className="degrees">
            {dataFetched ? weather.temperature : "- "}
            <sup>o</sup>C
          </h1>
          <p>{dataFetched ? weather.description : "- "}</p>
        </div>
      </div>
      <div className="humidity-wind-container">
        <div className="humidity">
          <WiHumidity className="humidity-icon" />
          <div>
            <p>{dataFetched ? weather.humidity : "- "} %</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="wind">
          <BsWind className="wind-icon" />
          <div>
            <p>{dataFetched ? weather.windSpeed : "- "} Km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="app-bg">
      <h1 className="heading">WEATHERVUE</h1>
      <div className="weather-card">
        <div className="search-container">
          <FaLocationDot className="icon" />
          <input
            value={cityName}
            onChange={handleUserInput}
            onKeyDown={handleKeyDown}
            placeholder="Enter your city name ..."
            type="text"
            className="city-input"
          />
          <FaSearch onClick={handleSearch} className="search-icon" />
        </div>
        {error ? <ErrorContainer /> : <WeatherData />}
      </div>
    </div>
  );
};

export default WeatherDetails;
