import React from 'react';
import { Sunrise, Sunset, Clock } from 'lucide-react';
import './SunriseSunset.css';

const SunriseSunset = ({ sunrise, sunset, timezone }) => {
  const formatTime = (timestamp, timezoneOffset) => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const calculateDaylight = (sunrise, sunset) => {
    const daylightSeconds = sunset - sunrise;
    const hours = Math.floor(daylightSeconds / 3600);
    const minutes = Math.floor((daylightSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getSunPosition = (sunrise, sunset) => {
    const now = Date.now() / 1000;
    const totalDaylight = sunset - sunrise;
    const elapsed = now - sunrise;
    const percentage = Math.max(0, Math.min(100, (elapsed / totalDaylight) * 100));
    return percentage;
  };

  const sunPosition = getSunPosition(sunrise, sunset);
  const isNightTime = Date.now() / 1000 < sunrise || Date.now() / 1000 > sunset;

  return (
    <div className="sunrise-sunset glass">
      <h3 className="section-title">
        <Clock className="section-icon" />
        Sun & Moon
      </h3>
      
      <div className="sun-arc-container">
        <div className="sun-arc">
          <div 
            className="sun-indicator" 
            style={{ 
              left: `${sunPosition}%`,
              opacity: isNightTime ? 0.5 : 1 
            }}
          >
            {isNightTime ? '🌙' : '☀️'}
          </div>
        </div>
        <div className="arc-endpoints">
          <div className="endpoint sunrise-point">
            <Sunrise className="endpoint-icon" />
          </div>
          <div className="endpoint sunset-point">
            <Sunset className="endpoint-icon" />
          </div>
        </div>
      </div>
      
      <div className="sun-times">
        <div className="sun-time">
          <div className="time-label">
            <Sunrise className="time-icon" />
            Sunrise
          </div>
          <div className="time-value">
            {formatTime(sunrise, timezone)}
          </div>
        </div>
        
        <div className="daylight-duration">
          <div className="duration-label">Daylight</div>
          <div className="duration-value">
            {calculateDaylight(sunrise, sunset)}
          </div>
        </div>
        
        <div className="sun-time">
          <div className="time-label">
            <Sunset className="time-icon" />
            Sunset
          </div>
          <div className="time-value">
            {formatTime(sunset, timezone)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunset;
