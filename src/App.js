import { useEffect, useState } from "react";
import "./App.css";
import Select from "./components/Select";
import LinearProgress from "@material-ui/core/LinearProgress";
import { WeatherState } from "./WeatherContext";
import Header from "./components/Header";

function App() {
  const { loading } = WeatherState();

  const fetchCountries = async () => {};
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <LinearProgress color="primary" />
      ) : (
        <div className="App">
          weather
          <Select />
        </div>
      )}
    </>
  );
}

export default App;
