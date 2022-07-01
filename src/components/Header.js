import { Switch } from "@material-ui/core";
import { WeatherState } from "../WeatherContext";
import { FaPlus } from "react-icons/fa";

const Header = () => {
  const { setChecked, checked, setWeatherValue, weatherValue } = WeatherState();
  return (
    <header className="d-flex py-3 mb-5 px-5 shadow justify-content-between">
      <h1 className="text-capitalize -color-neutro">
        <span className="-color-primary">w</span>
        eather
        <span className="-color-primary"> mx</span>
      </h1>
      <div>
        <Switch
          color="default"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {weatherValue && (
          <span
            className="-pointer -color-neutro"
            onClick={() => setWeatherValue(false)}
          >
            <FaPlus />
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
