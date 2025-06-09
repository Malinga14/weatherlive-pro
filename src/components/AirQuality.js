import React from 'react';
import { Leaf, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import './AirQuality.css';

const AirQuality = ({ airQuality }) => {
  const getAQIStatus = (aqi) => {
    switch (aqi) {
      case 1:
        return { status: 'Good', color: '#4CAF50', icon: <CheckCircle /> };
      case 2:
        return { status: 'Fair', color: '#8BC34A', icon: <CheckCircle /> };
      case 3:
        return { status: 'Moderate', color: '#FF9800', icon: <AlertTriangle /> };
      case 4:
        return { status: 'Poor', color: '#F44336', icon: <XCircle /> };
      case 5:
        return { status: 'Very Poor', color: '#9C27B0', icon: <XCircle /> };
      default:
        return { status: 'Unknown', color: '#757575', icon: <AlertTriangle /> };
    }
  };

  const aqiStatus = getAQIStatus(airQuality?.aqi || 2);

  const pollutants = [
    { name: 'CO', value: airQuality?.co || 233.67, unit: 'μg/m³', label: 'Carbon Monoxide' },
    { name: 'NO₂', value: airQuality?.no2 || 15.52, unit: 'μg/m³', label: 'Nitrogen Dioxide' },
    { name: 'O₃', value: airQuality?.o3 || 68.66, unit: 'μg/m³', label: 'Ozone' },
    { name: 'PM2.5', value: airQuality?.pm2_5 || 12.87, unit: 'μg/m³', label: 'Fine Particles' },
    { name: 'PM10', value: airQuality?.pm10 || 15.43, unit: 'μg/m³', label: 'Coarse Particles' }
  ];

  return (
    <div className="air-quality glass">
      <h3 className="section-title">
        <Leaf className="section-icon" />
        Air Quality Index
      </h3>
      
      <div className="aqi-main">
        <div className="aqi-status" style={{ color: aqiStatus.color }}>
          <div className="aqi-icon">{aqiStatus.icon}</div>
          <div className="aqi-info">
            <div className="aqi-level">{airQuality?.aqi || 2}</div>
            <div className="aqi-label">{aqiStatus.status}</div>
          </div>
        </div>
        
        <div className="aqi-description">
          <p>Air quality is {aqiStatus.status.toLowerCase()}. {getAQIDescription(airQuality?.aqi || 2)}</p>
        </div>
      </div>

      <div className="pollutants-grid">
        {pollutants.map((pollutant, index) => (
          <div key={index} className="pollutant-card glass-subtle">
            <div className="pollutant-name">{pollutant.name}</div>
            <div className="pollutant-value">
              {pollutant.value.toFixed(1)}
              <span className="pollutant-unit">{pollutant.unit}</span>
            </div>
            <div className="pollutant-label">{pollutant.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getAQIDescription = (aqi) => {
  switch (aqi) {
    case 1:
      return 'Ideal for outdoor activities.';
    case 2:
      return 'Acceptable for outdoor activities.';
    case 3:
      return 'Sensitive individuals should consider reducing outdoor activities.';
    case 4:
      return 'Everyone should reduce outdoor activities.';
    case 5:
      return 'Avoid outdoor activities.';
    default:
      return 'Monitor air quality regularly.';
  }
};

export default AirQuality;
