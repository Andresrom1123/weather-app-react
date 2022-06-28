import { useEffect, useState } from "react";
import "./App.css";
import Select from "./components/Select";
import LinearProgress from "@material-ui/core/LinearProgress";
import { WeatherState } from "./WeatherContext";
import Header from "./components/Header";
import { MdDelete } from "react-icons/md";
import Alert from "./components/Alert";

function App() {
  const {
    loading,
    contentWeather,
    setWeather,
    setContentWeather,
    weather,
    weatherValue,
    setWeatherValue,
    setAlert,
    alert,
    showAlert,
  } = WeatherState();

  const setStorageWeather = (data) => {
    localStorage.setItem("weather", JSON.stringify(data));
    setWeather(data);
    setWeatherValue(true);
  };

  const buttonDelete = (city) => {
    if (weather && city === weather.city) {
      localStorage.setItem("weather", []);
      setWeather(null);
    }
    const data = contentWeather.filter((weather) => {
      return city !== weather.city;
    });
    localStorage.setItem("weather-data", JSON.stringify(data));
    showAlert(true, "danger", "test");

    setContentWeather(data);
  };

  useEffect(() => {
    if (weather) {
      setWeatherValue(true);
    }
  }, [weather, contentWeather]);

  return (
    <>
      <Header />
      <section className="px-5">
        {loading && <LinearProgress color="primary" />}
        <div className="border rounded p-5">
          {weatherValue ? (
            "xd"
          ) : (
            <>
              <Alert />
              <Select />
              {contentWeather.map((data, i) => {
                return (
                  <div key={i} className="d-flex gap-3  align-items-center">
                    <div
                      onClick={() => setStorageWeather(data)}
                      className="p-4 mt-3 border rounded-pill col-11 my-auto -pointer"
                    >
                      <p className="d-flex align-items-center my-auto">
                        {data.city}
                      </p>
                    </div>
                    <span
                      onClick={() => buttonDelete(data.city)}
                      className="-pointer text-danger"
                    >
                      <MdDelete />
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
