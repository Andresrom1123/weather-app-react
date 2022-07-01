import { useEffect, useState } from "react";
import "./App.css";
import Select from "./components/Select";
import LinearProgress from "@material-ui/core/LinearProgress";
import { WeatherState } from "./WeatherContext";
import Header from "./components/Header";
import { MdDelete } from "react-icons/md";
import Alert from "./components/Alert";

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
    showAlert(true, "danger", `You remove ${city} from your list`);

    setContentWeather(data);
  };

  useEffect(() => {
    if (weather) {
      setWeatherValue(true);
    }
  }, [weather]);

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
      <section className="px-5">
        {loading && (
          <LinearProgress
            color="secondary"
            style={{
              backgroundColor: "var(--clr-font)",
            }}
          />
        )}
        <div className="rounded p-5 shadow">
          {weatherValue ? (
            "xd"
          ) : (
            <>
              <Select />

              {!contentWeather.length ? (
                ""
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
              {weatherData().map((data, i) => {
                return (
                  <div key={i} className="d-flex gap-3 align-items-center">
                    <div
                      onClick={() => setStorageWeather(data)}
                      className="p-4 mt-4 shadow -color-neutro rounded-pill col-11 -pointer"
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
      <Alert />
    </>
  );
}

export default App;
