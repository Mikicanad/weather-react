import React, { useState } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";
import WeatherInfo from "./WeatherInfo";
import "./Weather.css";



export default function Weather(props) {
    const [weatherData, setWEatherData]=useState({ ready: false});
    const [city, setCity] = useState(props.defaultCity);



    function handleResponse(response) {
        setWEatherData({
            ready: true,
            coordinates: response.data.coord,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            date: new Date(response.data.dt * 1000),
            description: response.data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            wind: response.data.wind.speed,
            city: response.data.name,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        search();
      }
    
      function handleCityChange(event) {
        setCity(event.target.value);
      }

      function search() {
        const apiKey = "616b14cbd38253313b3b8852fa77335d";
        const units = "metric";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
        axios.get(apiUrl).then(handleResponse);
      }
    

    if (weatherData.ready) {
        return (
          <div className="Weather">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-9 ">
                  <input
                    type="search"
                    placeholder="Enter a city.."
                    className="form-control search-input"
                    onChange={handleCityChange}
                  />
                </div>
                <div className="col-3 p-0">
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-primary w-100"
                  />
                </div>
              </div>
            </form>
            <WeatherInfo data={weatherData} />
            <WeatherForecast coordinates={weatherData.coordinates} city={weatherData.city} />
          
            <footer>
              This project was coded by{" "}
              <a
                href="https://www.shecodes.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Miki.I
              </a>{" "}
              and is{" "}
              <a
                href="https://github.com/Mikicanad/weather-react"
                target="_blank"
                rel="noopener noreferrer"
              >
                open-sourced on GitHub
              </a>{" "}
              and{" "}
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                hosted on Netlify
              </a>
            </footer>
          </div>
        );
      } else {
        search();
        return "Loading...";
      }
      
      }
      