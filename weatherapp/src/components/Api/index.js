const apiUrl = process.env.REACT_APP_WEATHER_API_URL;
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeatherData = async (cityName) => {
  const url = `${apiUrl}?q=${cityName}&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Resource was not found");
    }
  } catch (error) {
    console.log("Eoor while fetching data");
  }
};
