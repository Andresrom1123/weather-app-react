import React, { useEffect, useState } from "react";
import { Countries, States } from "../config/api";
import LinearProgress from "@material-ui/core/LinearProgress";

const Select = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState("Mexico");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");

  const data = async () => {
    setLoading(true);
    try {
      const countriesData = await Countries();
      const statesData = await States(country);
      setCountries(countriesData);
      setStates(statesData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    data();
  }, [country]);

  if (loading) {
    return <LinearProgress color="primary" />;
  }

  return (
    <div>
      <select
        className="form-select"
        onChange={(e) => (setCountry(e.target.value), setState(""))}
        value={country}
      >
        <option selected>Open this select menu</option>
        {countries.map((country, i) => {
          return (
            <option value={country.country_name} key={i}>
              {country.country_name}
            </option>
          );
        })}
      </select>
      <select
        className="form-select"
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        <option selected>Select a state</option>
        {states.map((state, index) => {
          return (
            <option value={state.state_name} key={index}>
              {state.state_name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
