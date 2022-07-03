import React, { createContext, useContext, useEffect, useState } from "react";
import { State, City } from "country-state-city";
import { WeatherApi } from "./config/api";

const Weather = createContext();

const getStorageTheme = () => {
  let theme = "ligh-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

const getStorageContentWeather = () => {
  let data = [];
  if (localStorage.getItem("weather-data")) {
    data = JSON.parse(localStorage.getItem("weather-data"));
  }
  return data;
};

const getStorageWeather = () => {
  let data = null;
  if (localStorage.getItem("weather")) {
    data = JSON.parse(localStorage.getItem("weather"));
  }
  return data;
};

const WeatherContext = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    type: "",
    msg: "",
  });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const [states, setStates] = useState([]);
  const [state, setState] = useState(null);

  const [city, setCity] = useState(null);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState(getStorageTheme());
  const [checked, setChecked] = useState(false);

  const [contentWeather, setContentWeather] = useState(
    getStorageContentWeather()
  );
  const [weather, setWeather] = useState(getStorageWeather());
  const [weatherValue, setWeatherValue] = useState(false);

  const fetchState = () => {
    const data = State.getStatesOfCountry("MX");
    setStates(data);
  };

  const fetchCities = () => {
    const data = City.getCitiesOfState("MX", state.isoCode);
    setCities(data);
  };
  const fetchWeather = async () => {
    setLoading(true);
    try {
      const condition = contentWeather.find((data) => {
        return city.name === data.city;
      });
      if (!condition) {
        const data = await WeatherApi(city.latitude, city.longitude);
        console.log(data);
        setContentWeather([
          ...contentWeather,
          { ...data, city: city.name, state: state.name },
        ]);
        localStorage.setItem(
          "weather-data",
          JSON.stringify([
            ...contentWeather,
            { ...data, city: city.name, state: state.name },
          ])
        );
        showAlert(true, "success", `You have added ${city.name}`);
      } else {
        showAlert(true, "danger", "You alredy added that city");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showAlert(true, "danger", error.message);
    }
  };

  const resetData = async (cityData) => {
    setLoading(true);
    try {
      const data = await WeatherApi(cityData.coord.lat, cityData.coord.lon);
      console.log(data, cityData);
      if (
        weather &&
        cityData.coord.lat === data.coord.lat &&
        cityData.coord.lon === data.coord.lon
      ) {
        localStorage.setItem(
          "weather",
          JSON.stringify({
            ...cityData,
          })
        );
        setWeather({ ...cityData });
      }
      const filterWeather = contentWeather.filter((weather) => {
        return cityData.city !== weather.city;
      });
      setContentWeather([
        { ...data, city: cityData.city, state: cityData.state },
        ...filterWeather,
      ]);
      localStorage.setItem(
        "weather-data",
        JSON.stringify([
          { ...data, city: cityData.city, state: cityData.state },
          ...filterWeather,
        ])
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showAlert(true, "danger", error.message);
    }
  };

  // theme
  useEffect(() => {
    if (theme === "dark-theme") {
      setChecked(true);
    }
    if (checked) {
      setTheme("light-theme");
    } else if (!checked) {
      setTheme("dark-theme");
    }
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [checked]);

  // state & city
  useEffect(() => {
    fetchState();
    if (state) {
      setCities([]);
      fetchCities();
    } else {
      setCities([]);
    }
  }, [state]);

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <Weather.Provider
      value={{
        setState,
        loading,
        setLoading,
        states,
        checked,
        setChecked,
        setCity,
        cities,
        setCities,
        city,
        state,
        contentWeather,
        setContentWeather,
        weather,
        setWeather,
        setWeatherValue,
        weatherValue,
        alert,
        setAlert,
        showAlert,
        resetData,
      }}
    >
      {children}
    </Weather.Provider>
  );
};

export default WeatherContext;

export const WeatherState = () => {
  return useContext(Weather);
};
