import { Switch } from "@material-ui/core";
import { WeatherState } from "../WeatherContext";
import { FaPlus } from "react-icons/fa";
import Reset from "./Reset";

const Header = () => {
  const { setChecked, checked, setWeatherValue, weatherValue } = WeatherState();

  return (
    <header className="d-flex py-3 px-5 shadow justify-content-between">
      <h1 className="text-capitalize -color-neutro">
        <span className="-color-primary">w</span>
        eather
        <span className="-color-primary"> mx</span>
      </h1>
      <div className="my-auto py-auto">
        <Switch
          color="default"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {weatherValue && (
          <>
            <span
              className="-pointer mx-2 -color-neutro"
              onClick={() => setWeatherValue(false)}
            >
              <FaPlus />
            </span>
            <Reset />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
