import { WeatherState } from "../WeatherContext";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

const Select = () => {
  const { setState, states, cities, setCity, city, state } = WeatherState();

  return (
    <div className="d-md-flex">
      <div className="col-md-6 pe-md-3 mb-3">
        <Autocomplete
          value={state}
          onChange={(e, newValue) => (setState(newValue), setCity(null))}
          options={states}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Select a state" variant="outlined" />
          )}
        />
      </div>
      <div className="col-md-6 ps-md-3">
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
    </div>
  );
};

export default Select;
