import React from "react";
import { BiReset } from "react-icons/bi";
import { WeatherState } from "../WeatherContext";

const Reset = () => {
  const { resetData, weather } = WeatherState();
  return (
    <span
      className="text-primary -pointer fs-5"
      onClick={() => resetData(weather)}
    >
      <BiReset />
    </span>
  );
};

export default Reset;
