import React, { useEffect, useState } from "react";
import { WeatherState } from "../WeatherContext";

const Alert = () => {
  const { showAlert, weather, alert, contentWeather } = WeatherState();

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert, weather, contentWeather]);

  return (
    <div
      className={`position-fixed bottom-0 end-0 p-3`}
      style={{ zIndex: "11" }}
    >
      <div className={`toast ${alert.show ? "show" : "hide"}`}>
        <div className={`toast-header bg-${alert.type}`}>
          <strong className="me-auto text-white">Weather MX</strong>
          <button
            onClick={() => showAlert(false, "", "")}
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div
          className="toast-body -color-neutro"
          style={{ backgroundColor: "var(--clr-bcg)" }}
        >
          {alert.msg}
        </div>
      </div>
    </div>
  );
};

export default Alert;
