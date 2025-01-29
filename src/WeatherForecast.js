import React, { useState, useEffect } from "react";
import WeatherForecastPreview from "./WeatherForecastPreview";
import axios from "axios";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false); 
  const [forecast, setForecast] = useState([]); 

  
  useEffect(() => {
    if (props.coordinates) {
      setLoaded(false); 
      const apiKey = "d1a86552de255334f6117b348c4519bd";
      const { lat, lon } = props.coordinates; 
      const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      axios.get(apiUrl).then(handleForecastResponse).catch((error) => {
        console.error("Error fetching forecast data:", error);
        setLoaded(true); 
      });
    }
  }, [props.coordinates]); 

  
  function handleForecastResponse(response) {
    setForecast(response.data.daily); 
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast row">
        {forecast.slice(0, 5).map((day, index) => (
          <div className="col" key={index}>
            <WeatherForecastPreview data={day} />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="WeatherForecast row">
        <div className="col">
          <p>Loading forecast...</p>
        </div>
      </div>
    );
  }
}
