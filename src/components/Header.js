import { Switch } from "@material-ui/core";
import { WeatherState } from "../WeatherContext";

const Header = () => {
  const { setChecked, checked } = WeatherState();
  return (
    <div>
      <h1>header</h1>
      <Switch
        color="default"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    </div>
  );
};

export default Header;
