import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import WeatherContext from "./WeatherContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WeatherContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WeatherContext>
);
