import React, { useState, FormEvent } from 'react';
import axios from 'axios';

// Define the shape of the weather data returned by the API
interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
    }
  ];
  name: string;
}

const WeatherComponent2: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = 'YOUR_API_KEY'; // Replace with your API key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  // Fetch weather data from API
  const fetchWeather = async (location: string) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: location,
          appid: API_KEY,
          units: 'metric', // Change to 'imperial' for Fahrenheit
        },
      });
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching weather data.');
      setWeather(null);
    }
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (location.trim()) {
      fetchWeather(location);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent2;
