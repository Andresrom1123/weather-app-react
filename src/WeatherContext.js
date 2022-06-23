import React, { createContext, useContext, useEffect, useState } from "react";
import { State, City } from "country-state-city";
import { WeatherApi } from "./config/api";

const Weather = createContext();

const WeatherContext = ({ children }) => {
  const [states, setStates] = useState([]);
  const [state, setState] = useState(null);

  const [city, setCity] = useState(null);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

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
      const data = await WeatherApi(city.latitude, city.longitude);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
