import React from "react";
import axios from "axios";


export default function Weather(props) {

    function handleResponse(response) {
        alert(`The weather in ${response.data.name} is ${response.data.main.temp}°C`)
    }

    let apiKey = "d1a86552de255334f6117b348c4519bd";
    let apiUrt = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrt).then(handleResponse);
    
    return  (
       <h2>Hello</h2>);
    
}