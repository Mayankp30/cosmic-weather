// Define the API key and base URL for OpenWeatherMap
const API_KEY = '70085da72ee43283daa761fe55c3ab67';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Define the API endpoints for weather and forecast
const WEATHER_PATH = '/weather';
const FORECAST_PATH = '/forecast';

const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

// Function to fetch weather data for a given latitude and longitude
const fetchWeatherData = async (lat, lon) => {
  try {
    // Fetch weather and forecast data in parallel
    const [weatherPromise, forecastPromise] = await Promise.all([
      fetch(getWeatherURL(lat, lon)),
      fetch(getForecastURL(lat, lon)),
    ]);

    // Parse the JSON responses
    const [weatherResponse, forecastResponse] = await Promise.all([
      weatherPromise.json(),
      forecastPromise.json(),
    ]);

    return [weatherResponse, forecastResponse];
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching weather data.');
  }
};

// Function to construct the URL for weather data
const getWeatherURL = (lat, lon) => {
  return `${API_BASE_URL}${WEATHER_PATH}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
};

// Function to construct the URL for forecast data
const getForecastURL = (lat, lon) => {
  return `${API_BASE_URL}${FORECAST_PATH}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
};

// Function to fetch city data based on user input
const fetchCities = async (input) => {
  try {
    // Validate input
    if (!isValidInput(input)) {
      // Return null if input is empty
      return null;
    }

    // Declare response variable outside of the if block
    let response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    if (!response.ok) {
      throw new Error(`City API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching city data:', error);
    throw new Error('Error fetching city data. Please try again later.');
  }
};

// Function to validate input
const isValidInput = (input) => {
  // Validate input
  return input && input.trim().length > 0;
};

export { fetchWeatherData, fetchCities };