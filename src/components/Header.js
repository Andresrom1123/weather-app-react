import { Switch } from "@material-ui/core";
import { WeatherState } from "../WeatherContext";
import { FaPlus } from "react-icons/fa";

const Header = () => {
  const { setChecked, checked, setWeatherValue, weatherValue } = WeatherState();
  return (
    <header className="d-flex py-3 mb-5 px-5 border justify-content-between">
      <h1>header</h1>
      <div>
        <Switch
          color="default"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {weatherValue && (
          <span className="-pointer" onClick={() => setWeatherValue(false)}>
            <FaPlus />
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
