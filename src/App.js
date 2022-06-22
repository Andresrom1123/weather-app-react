import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Select from "./components/Select";

function App() {
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {};
  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <div className="App">
      weather
      <Select />
    </div>
  );
}

export default App;
