import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Zap } from 'lucide-react';
import './ForecastCard.css';

const ForecastCard = ({ forecast }) => {
  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return <Sun className="forecast-weather-icon" />;
      case 'Clouds':
        return <Cloud className="forecast-weather-icon" />;
      case 'Rain':
        return <CloudRain className="forecast-weather-icon" />;
      case 'Snow':
        return <CloudSnow className="forecast-weather-icon" />;
      case 'Thunderstorm':
        return <Zap className="forecast-weather-icon" />;
      default:
        return <Sun className="forecast-weather-icon" />;
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="forecast-card glass-subtle">
      <div className="forecast-date">
        {formatDate(forecast.dt)}
      </div>
      
      <div className="forecast-icon-container">
        {getWeatherIcon(forecast.weather[0].main)}
      </div>
      
      <div className="forecast-temp">
        <span className="forecast-temp-value">
          {Math.round(forecast.main.temp)}°
        </span>
      </div>
      
      <div className="forecast-description">
        {forecast.weather[0].description}
      </div>
      
      <div className="forecast-details">
        <div className="forecast-detail">
          <span className="forecast-detail-label">Humidity</span>
          <span className="forecast-detail-value">{forecast.main.humidity}%</span>
        </div>
        <div className="forecast-detail">
          <span className="forecast-detail-label">Wind</span>
          <span className="forecast-detail-value">{forecast.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
