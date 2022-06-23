import { WeatherState } from "../WeatherContext";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

const Select = () => {
  const { setState, states, cities, setCity, city, state } = WeatherState();

  return (
    <div>
      <Autocomplete
        className="mb-3"
        value={state}
        onChange={(e, newValue) => (setState(newValue), setCity(null))}
        options={states}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Select a state" variant="outlined" />
        )}
      />

      <Autocomplete
        value={city}
        onChange={(e, newValue) => setCity(newValue)}
        options={cities}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Select a city" variant="outlined" />
        )}
      />
    </div>
  );
};

export default Select;
