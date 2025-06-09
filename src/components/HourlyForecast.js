import React from 'react';
import { Clock, Thermometer, Droplets, Wind } from 'lucide-react';
import './HourlyForecast.css';

const HourlyForecast = () => {
  // Mock hourly data for demo
  const hourlyData = [
    { time: '12:00', temp: 22, humidity: 65, wind: 3.5, icon: '☀️' },
    { time: '13:00', temp: 24, humidity: 62, wind: 4.1, icon: '⛅' },
    { time: '14:00', temp: 26, humidity: 58, wind: 4.8, icon: '☀️' },
    { time: '15:00', temp: 25, humidity: 60, wind: 4.2, icon: '⛅' },
    { time: '16:00', temp: 23, humidity: 68, wind: 3.9, icon: '🌤️' },
    { time: '17:00', temp: 21, humidity: 72, wind: 3.2, icon: '☁️' },
    { time: '18:00', temp: 19, humidity: 75, wind: 2.8, icon: '🌧️' },
    { time: '19:00', temp: 18, humidity: 78, wind: 2.5, icon: '🌧️' }
  ];

  return (
    <div className="hourly-forecast glass">
      <h3 className="section-title">
        <Clock className="section-icon" />
        24-Hour Forecast
      </h3>
      <div className="hourly-scroll">
        {hourlyData.map((hour, index) => (
          <div key={index} className="hourly-card glass-subtle">
            <div className="hour-time">{hour.time}</div>
            <div className="hour-icon">{hour.icon}</div>
            <div className="hour-temp">
              <Thermometer className="metric-icon" />
              {hour.temp}°C
            </div>
            <div className="hour-detail">
              <Droplets className="metric-icon" />
              {hour.humidity}%
            </div>
            <div className="hour-detail">
              <Wind className="metric-icon" />
              {hour.wind}m/s
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
