import axios from "axios";
const apiKey = "ca5c8e63e9099f2ea634d259339d363c";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?`;

export const WeatherApi = async (lat, lon) => {
  const { data } = await axios.get(
    `${weatherUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  return data;
};
