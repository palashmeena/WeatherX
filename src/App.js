import React, { useState } from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState(false);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=0446e292892d8e8326a22dcac2c76fc4`;

    const searchLocation = (event) => {
        if (event.key === "Enter") {
            axios
                .get(url)
                .then((response) => {
                    setData(response.data);
                    setLocationError(false);
                })
                .catch((error) => {
                    setLocationError(true);
                    console.error(error);
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
                        {data.name ? (
                            <p>{data.name}</p>
                        ) : (
                            <p>{locationError ? "Location not found" : ""}</p>
                        )}
                    </div>
                    <div className="temp">
                        {data.main ? (
                            <h1>{data.main.temp.toFixed()}°C</h1>
                        ) : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>

                {data.name !== undefined && (
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? (
                                <p className="bold">
                                    {data.main.feels_like.toFixed()}°C
                                </p>
                            ) : null}
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main ? (
                                <p className="bold">{data.main.humidity}%</p>
                            ) : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind ? (
                                <p className="bold">
                                    {data.wind.speed.toFixed()} MPS
                                </p>
                            ) : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
