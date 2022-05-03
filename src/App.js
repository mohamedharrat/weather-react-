import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c7d0116d59f52703a9b4afabfa3d4258`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p> {data.name} </p>
            {data.sys ? <p> {data.sys.country}</p> : null}
          </div>
          <div className="temp">
            {data.main ? (
              <h1> {Math.round(data.main.temp) - 273}° C </h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p> {data.weather[0].main} </p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {Math.round(data.main.feels_like) - 273}°C
                </p>
              ) : null}
              <p> Feels like </p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity} %</p>
              ) : null}
              <p> Humidity </p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{Math.round(data.wind.speed)} km/h</p>
              ) : null}{" "}
              <p> Wind Speed </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
