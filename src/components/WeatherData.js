import React from "react";
import { WeatherState } from "../WeatherContext";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { TbTemperature } from "react-icons/tb";

const WeatherData = () => {
  const { weather, loading } = WeatherState();

  if (!loading) {
    return (
      <div className="text-center -color-neutro">
        <h2>{weather.state}</h2>
        <h5 className="-color-primary">{weather.city}</h5>
        <div className=" d-inline-block p-3 rounded mt-3">
          <p className="fs-1 mb-0">{weather.main.temp} °C</p>
          <p>{weather.weather[0].description}</p>
        </div>
        <div>
          <div
            className="d-flex justify-content-center gap-3 p-3 rounded"
            style={{ border: "1px solid var(--clr-font)" }}
          >
            <div>
              <span className="d-block mb-1">{weather.main.temp} °C</span>
              <span>
                Temperature <TbTemperature />
              </span>
            </div>
            <div>
              <span className="d-block mb-1">{weather.main.humidity}</span>
              <span>
                Humidity <WiHumidity />
              </span>
            </div>
            <div>
              <span className="d-block mb-1">{weather.wind.speed}</span>
              <span>
                Wind Speed <FaWind />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default WeatherData;
