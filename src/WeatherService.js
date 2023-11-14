const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = '70085da72ee43283daa761fe55c3ab67';

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

/**
 * Utility function to handle API requests.
 *
 * @param {string} url - The URL of the API endpoint.
 * @returns {Promise} A promise that resolves with the JSON response.
 * @throws {Error} If the API request fails or the response is not OK.
 */
async function fetchFromAPI(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Fetch current weather and 5-day forecast data for a specific location.
 *
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {Promise} A promise that resolves with an array of weather and forecast data.
 * If an error occurs, it returns null.
 */
export async function fetchWeatherData(lat, lon) {
  try {
    const weatherUrl = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const forecastUrl = `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    const [weatherResponse, forecastResponse] = await Promise.all([
      fetchFromAPI(weatherUrl),
      fetchFromAPI(forecastUrl),
    ]);

    return [weatherResponse, forecastResponse];
  } catch (error) {
    console.error(error);
    return null;
  }
}
