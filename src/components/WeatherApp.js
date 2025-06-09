import React, { useState, useEffect } from 'react';
import { MapPin, Thermometer, Sun, Cloud, CloudRain, CloudSnow, Zap } from 'lucide-react';
import WeatherMap from './WeatherMap';
import SearchBar from './SearchBar';
import WeatherDetails from './WeatherDetails';
import ForecastCard from './ForecastCard';
import HourlyForecast from './HourlyForecast';
import AirQuality from './AirQuality';
import UVIndex from './UVIndex';
import SunriseSunset from './SunriseSunset';
import WeatherAlerts from './WeatherAlerts';
import HistoricalWeather from './HistoricalWeather';
import './WeatherApp.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // OpenWeatherMap API key (you'll need to get your own free API key)
  const API_KEY = ''; // Add your OpenWeatherMap API key here

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your location. Please search for a city.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lng) => {
    try {
      setLoading(true);
      setError('');      // For demo purposes, using mock data since API key is not provided
      // Replace this with actual API calls when you have an API key
      const mockWeatherData = {
        name: 'Current Location',
        main: {
          temp: 22,
          feels_like: 25,
          humidity: 65,
          pressure: 1013,
          temp_min: 18,
          temp_max: 26
        },
        weather: [
          {
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        wind: {
          speed: 3.5,
          deg: 180,
          gust: 5.2
        },
        visibility: 10000,
        coord: { lat, lon: lng },
        sys: {
          sunrise: Date.now() / 1000 - 3600,
          sunset: Date.now() / 1000 + 7200,
          country: 'US'
        },
        dt: Date.now() / 1000,
        timezone: -18000,
        // Additional mock data for new features
        uvi: 6.5, // UV Index
        air_quality: {
          aqi: 2, // Air Quality Index (1-5 scale)
          co: 233.67,
          no2: 15.52,
          o3: 68.66,
          pm2_5: 12.87,
          pm10: 15.43
        }
      };

      const mockForecastData = {
        list: [
          {
            dt: Date.now() / 1000,
            main: { temp: 22, humidity: 65 },
            weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
            wind: { speed: 3.5 }
          },
          {
            dt: Date.now() / 1000 + 86400,
            main: { temp: 25, humidity: 70 },
            weather: [{ main: 'Clouds', description: 'few clouds', icon: '02d' }],
            wind: { speed: 4.2 }
          },
          {
            dt: Date.now() / 1000 + 172800,
            main: { temp: 20, humidity: 80 },
            weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
            wind: { speed: 5.1 }
          }
        ]
      };

      setWeatherData(mockWeatherData);
      setForecastData(mockForecastData);
      setCity(mockWeatherData.name);
      setLocation({ lat, lng });

      // Uncomment and use these when you have an API key:
      /*
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
      );
      
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
      );

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
      setCity(weatherResponse.data.name);
      */
      
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather API Error:', err);
    } finally {
      setLoading(false);
    }
  };
  // Mock geocoding for different cities
  const getCityCoordinates = (cityName) => {
    const cityCoords = {
      // Major US cities
      'new york': { lat: 40.7128, lng: -74.0060 },
      'los angeles': { lat: 34.0522, lng: -118.2437 },
      'chicago': { lat: 41.8781, lng: -87.6298 },
      'houston': { lat: 29.7604, lng: -95.3698 },
      'phoenix': { lat: 33.4484, lng: -112.0740 },
      'philadelphia': { lat: 39.9526, lng: -75.1652 },
      'san antonio': { lat: 29.4241, lng: -98.4936 },
      'san diego': { lat: 32.7157, lng: -117.1611 },
      'dallas': { lat: 32.7767, lng: -96.7970 },
      'san jose': { lat: 37.3382, lng: -121.8863 },
      'miami': { lat: 25.7617, lng: -80.1918 },
      'seattle': { lat: 47.6062, lng: -122.3321 },
      'boston': { lat: 42.3601, lng: -71.0589 },
      'denver': { lat: 39.7392, lng: -104.9903 },
      'las vegas': { lat: 36.1699, lng: -115.1398 },
      
      // International cities
      'london': { lat: 51.5074, lng: -0.1278 },
      'paris': { lat: 48.8566, lng: 2.3522 },
      'tokyo': { lat: 35.6762, lng: 139.6503 },
      'sydney': { lat: -33.8688, lng: 151.2093 },
      'berlin': { lat: 52.5200, lng: 13.4050 },
      'rome': { lat: 41.9028, lng: 12.4964 },
      'madrid': { lat: 40.4168, lng: -3.7038 },
      'amsterdam': { lat: 52.3676, lng: 4.9041 },
      'barcelona': { lat: 41.3851, lng: 2.1734 },
      'toronto': { lat: 43.6532, lng: -79.3832 },
      'vancouver': { lat: 49.2827, lng: -123.1207 },
      'mexico city': { lat: 19.4326, lng: -99.1332 },
      'moscow': { lat: 55.7558, lng: 37.6176 },
      'mumbai': { lat: 19.0760, lng: 72.8777 },
      'beijing': { lat: 39.9042, lng: 116.4074 },
      'shanghai': { lat: 31.2304, lng: 121.4737 },
      'singapore': { lat: 1.3521, lng: 103.8198 },
      'dubai': { lat: 25.2048, lng: 55.2708 },
      'istanbul': { lat: 41.0082, lng: 28.9784 },
      'cairo': { lat: 30.0444, lng: 31.2357 },
      'cape town': { lat: -33.9249, lng: 18.4241 },
      'buenos aires': { lat: -34.6118, lng: -58.3960 },
      'rio de janeiro': { lat: -22.9068, lng: -43.1729 },
      'sao paulo': { lat: -23.5505, lng: -46.6333 }
    };
    
    const normalizedCity = cityName.toLowerCase().trim();
    return cityCoords[normalizedCity] || { lat: 40.7128, lng: -74.0060 }; // Default to NYC
  };

  const fetchWeatherByCity = async (cityName) => {
    try {
      setLoading(true);
      setError('');
        const coordinates = getCityCoordinates(cityName);
      
      // Generate varied weather conditions based on city
      const weatherConditions = [
        { main: 'Clear', description: 'clear sky', icon: '01d' },
        { main: 'Clouds', description: 'scattered clouds', icon: '03d' },
        { main: 'Clouds', description: 'broken clouds', icon: '04d' },
        { main: 'Rain', description: 'light rain', icon: '10d' },
        { main: 'Rain', description: 'moderate rain', icon: '09d' },
        { main: 'Thunderstorm', description: 'thunderstorm', icon: '11d' },
        { main: 'Snow', description: 'light snow', icon: '13d' },
        { main: 'Mist', description: 'mist', icon: '50d' }
      ];
      
      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

      // Mock data for demo - replace with actual API call
      const mockWeatherData = {
        name: cityName,
        main: {
          temp: Math.round(15 + Math.random() * 20), // Random temp between 15-35°C
          feels_like: Math.round(18 + Math.random() * 20),
          humidity: Math.round(40 + Math.random() * 40), // 40-80%
          pressure: Math.round(1000 + Math.random() * 40) // 1000-1040 hPa
        },
        weather: [randomWeather],
        wind: {
          speed: Math.round((2 + Math.random() * 8) * 10) / 10 // 2-10 m/s
        },
        visibility: Math.round(5000 + Math.random() * 5000), // 5-10km
        coord: { lat: coordinates.lat, lon: coordinates.lng },
        sys: {
          sunrise: Date.now() / 1000 - 3600,
          sunset: Date.now() / 1000 + 7200,
          country: 'XX'
        },
        dt: Date.now() / 1000,
        timezone: 0,
        // Additional mock data for new features
        uvi: Math.round(Math.random() * 10 * 10) / 10, // UV Index 0-10
        air_quality: {
          aqi: Math.floor(Math.random() * 5) + 1, // Air Quality Index (1-5 scale)
          co: Math.round(200 + Math.random() * 100),
          no2: Math.round(10 + Math.random() * 20),
          o3: Math.round(50 + Math.random() * 50),
          pm2_5: Math.round(5 + Math.random() * 20),
          pm10: Math.round(10 + Math.random() * 25)
        }
      };

      setWeatherData(mockWeatherData);
      setCity(cityName);
      setLocation({ lat: coordinates.lat, lng: coordinates.lng });

      // Uncomment when you have an API key:
      /*
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      setWeatherData(response.data);
      setCity(response.data.name);
      setLocation({ lat: response.data.coord.lat, lng: response.data.coord.lon });
      */

    } catch (err) {
      setError('City not found. Please try another city name.');
      console.error('City search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return <Sun className="weather-icon" />;
      case 'Clouds':
        return <Cloud className="weather-icon" />;
      case 'Rain':
        return <CloudRain className="weather-icon" />;
      case 'Snow':
        return <CloudSnow className="weather-icon" />;
      case 'Thunderstorm':
        return <Zap className="weather-icon" />;
      default:
        return <Sun className="weather-icon" />;
    }
  };

  if (loading) {
    return (
      <div className="weather-app">
        <div className="loading-container glass">
          <div className="loading-spinner"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-app">      <div className="weather-header">
        <h1 className="app-title">
          <Thermometer className="title-icon" />
          WeatherLive Pro
        </h1>
        <SearchBar 
          onSearch={fetchWeatherByCity} 
          onLocationUpdate={fetchWeatherByCoords}
        />
      </div>

      {error && (
        <div className="error-message glass">
          <p>{error}</p>
          {!API_KEY && (
            <p className="api-notice">
              Note: This is a demo with mock data. To get real weather data, add your OpenWeatherMap API key.
            </p>
          )}
        </div>
      )}

      {weatherData && (
        <div className="weather-content">
          <div className="main-weather glass">
            <div className="current-weather">
              <div className="weather-main">
                {getWeatherIcon(weatherData.weather[0].main)}
                <div className="temperature">
                  <span className="temp-value">{Math.round(weatherData.main.temp)}°</span>
                  <span className="temp-unit">C</span>
                </div>
              </div>
              
              <div className="weather-info">
                <h2 className="location">
                  <MapPin className="location-icon" />
                  {city}
                </h2>
                <p className="weather-description">
                  {weatherData.weather[0].description}
                </p>
                <p className="feels-like">
                  Feels like {Math.round(weatherData.main.feels_like)}°C
                </p>
              </div>
            </div>

            <WeatherDetails weatherData={weatherData} />
          </div>          <div className="weather-map glass">
            <WeatherMap 
              location={location} 
              weatherData={{
                location: city,
                temperature: Math.round(weatherData.main.temp),
                description: weatherData.weather[0].description,
                ...weatherData
              }} 
            />
          </div><div className="additional-info">
            <div className="info-grid">
              <HourlyForecast />
              <AirQuality airQuality={weatherData.air_quality} />
              <UVIndex uvIndex={weatherData.uvi} />
              <SunriseSunset 
                sunrise={weatherData.sys?.sunrise} 
                sunset={weatherData.sys?.sunset}
                timezone={weatherData.timezone}
              />
              <WeatherAlerts alerts={weatherData.alerts} />
            </div>
          </div>

          <HistoricalWeather location={location} city={city} />

          {forecastData && (
            <div className="forecast-section">
              <h3>5-Day Forecast</h3>
              <div className="forecast-container">
                {forecastData.list.slice(0, 5).map((forecast, index) => (
                  <ForecastCard key={index} forecast={forecast} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
