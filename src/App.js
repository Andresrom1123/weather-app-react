import { useEffect, useRef, useState } from "react";
import "./App.css";
import Select from "./components/Select";
import LinearProgress from "@material-ui/core/LinearProgress";
import { WeatherState } from "./WeatherContext";
import Header from "./components/Header";
import { MdDelete } from "react-icons/md";
import Alert from "./components/Alert";
import WeatherData from "./components/WeatherData";
import Reset from "./components/Reset";

function App() {
  const [search, setSearch] = useState("");

  const {
    loading,
    contentWeather,
    setWeather,
    setContentWeather,
    weather,
    weatherValue,
    setWeatherValue,
    showAlert,
    resetData,
  } = WeatherState();

  const setStorageWeather = (data) => {
    setWeatherValue(true);
    resetData(data);
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
    showAlert(true, "danger", `You remove ${city} from your list`);

    setContentWeather(data);
  };

  useEffect(() => {
    if (weather) {
      setWeatherValue(true);
    }
  }, []);

  const weatherData = () => {
    return contentWeather.filter(
      (data) =>
        data.city.toLowerCase().includes(search) ||
        data.state.toLowerCase().includes(search)
    );
  };

  return (
    <>
      <Header />
      <section className="px-5 my-5">
        {loading && (
          <LinearProgress
            color="secondary"
            style={{
              backgroundColor: "var(--clr-font)",
            }}
          />
        )}
        <div className="rounded px-4 py-5 shadow">
          {weatherValue ? (
            <WeatherData />
          ) : (
            <>
              <Select />

              {!contentWeather.length ? (
                <></>
              ) : (
                <>
                  <h3 className="-color-neutro text-center mt-3">
                    Your cities
                  </h3>
                  <div className="mx-auto -decorator"></div>
                  <input
                    className="-color-neutro shadow -search form-control"
                    placeholder="Search for state or city"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </>
              )}
              <div className="mt-4">
                {weatherData().map((data, i) => {
                  return (
                    <div key={i} className="d-flex gap-2 align-items-center">
                      <div
                        onClick={() => setStorageWeather(data)}
                        className="p-4 mt-4 shadow -color-neutro rounded-pill col-11 -pointer"
                      >
                        <p className="d-flex align-items-center my-auto">
                          <span className="-color-primary">{data.city}</span>
                          <span className="ps-2">{data.main.temp} °C</span>
                        </p>
                      </div>
                      <div className="d-flex flex-column">
                        <span
                          onClick={() => buttonDelete(data.city)}
                          className="-pointer text-danger"
                        >
                          <MdDelete />
                        </span>
                        <Reset />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
      <Alert />
    </>
  );
}

export default App;
