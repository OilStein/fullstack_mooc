import axios from "axios";
import React, { useState, useEffect } from "react";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState([]);

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: country.name,
  };

  const weatherHook = () => {
    axios
      .get("http://api.weatherstack.com/current", {
        params,
      })
      .then((response) => {
        setWeather(response.data);
        console.log("Weather Data fulfilled");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(weatherHook, []);

  // ESlint error

  return (
    <div>
      <BasicInfo
        name={country.name}
        capital={country.capital}
        population={country.population}
      ></BasicInfo>
      <Languages lang={country.languages}></Languages>
      <Flag flag={country.flag}></Flag>
      <Weather weather={weather}></Weather>
    </div>
  );
};

const BasicInfo = ({ name, capital, population }) => {
  return (
    <div>
      <h1>{name}</h1>
      Capital: {capital} <br></br>
      Population: {population}
    </div>
  );
};

const Languages = ({ lang }) => {
  // console.log("Languages props", lang);

  const l = lang;

  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {l.map((l) => (
          <li key={l.iso639_1}>{l.name}</li>
        ))}
      </ul>
    </div>
  );
};

const Flag = ({ flag }) => {
  return (
    <div>
      <img src={flag} alt="flag" width="20%"></img>
    </div>
  );
};

const Weather = ({ weather }) => {
  console.log(weather);
  if (weather.length === 0) return <div> Can't get WeatherCast</div>;
  else {
    return (
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <div>Temperature: {weather.current.temperature} Celsius</div>
        <div>
          <img src={weather.current.weather_icons} alt="Icon"></img>
        </div>

        <div>
          Wind: {weather.current.wind_speed} mph {weather.current.wind_dir}
        </div>
      </div>
    );
  }
};

export default CountryInfo;
