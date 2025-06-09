import React from 'react';
import { Droplets, Wind, Eye, Gauge } from 'lucide-react';
import './WeatherDetails.css';

const WeatherDetails = ({ weatherData }) => {
  const details = [
    {
      icon: <Droplets className="detail-icon" />,
      label: 'Humidity',
      value: `${weatherData.main.humidity}%`,
      color: 'var(--accent-cyan)'
    },
    {
      icon: <Wind className="detail-icon" />,
      label: 'Wind Speed',
      value: `${weatherData.wind.speed} m/s`,
      color: 'var(--ocean-teal)'
    },
    {
      icon: <Eye className="detail-icon" />,
      label: 'Visibility',
      value: `${(weatherData.visibility / 1000).toFixed(1)} km`,
      color: 'var(--dark-purple)'
    },
    {
      icon: <Gauge className="detail-icon" />,
      label: 'Pressure',
      value: `${weatherData.main.pressure} hPa`,
      color: 'var(--deep-sea-blue)'
    }
  ];

  return (
    <div className="weather-details">
      <h3 className="details-title">Weather Details</h3>
      <div className="details-grid">
        {details.map((detail, index) => (
          <div key={index} className="detail-card glass-subtle">
            <div className="detail-icon-container" style={{ color: detail.color }}>
              {detail.icon}
            </div>
            <div className="detail-info">
              <span className="detail-label">{detail.label}</span>
              <span className="detail-value">{detail.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
