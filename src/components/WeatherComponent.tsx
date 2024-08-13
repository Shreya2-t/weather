import React, { useState } from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

const WeatherComponent: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const apiKey = '5a50c0ce80e5a83c7ce9954b3b5fe581'; 
  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (err) {
      setError((err as Error).message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city) {
      fetchWeather();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="weather-container" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city"
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px' }}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Feels Like: {weather.main.feels_like} °C</p>
          <p>Max: {weather.main.temp_max} °C, Min: {weather.main.temp_min} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw2.webp"
            alt="Weather"
            style={{ width: '100%', maxWidth: '600px', marginTop: '20px' }}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
