import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Cloud, CloudRain, Sun, MapPin, Layers, Wind, Thermometer } from 'lucide-react';
import './WeatherMap.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map center when location changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  
  return null;
};

// Custom weather icon for marker
const createWeatherIcon = (iconCode) => {
  return L.divIcon({
    html: `<div class="weather-marker">
      <div class="weather-icon-marker">
        ${getWeatherEmoji(iconCode)}
      </div>
    </div>`,
    className: 'custom-div-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

const getWeatherEmoji = (iconCode) => {
  const iconMap = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };
  return iconMap[iconCode] || '🌤️';
};

const WeatherMap = ({ location, weatherData }) => {
  const [mapType, setMapType] = useState('street');
  const [weatherLayer, setWeatherLayer] = useState('none');
  const [nearbyStations, setNearbyStations] = useState([]);
  const mapRef = useRef();

  // Mock nearby weather stations for demonstration
  useEffect(() => {
    if (location.lat && location.lng) {
      const mockStations = [
        {
          id: 1,
          name: 'Downtown Station',
          lat: location.lat + 0.01,
          lng: location.lng + 0.01,
          temp: 23,
          condition: 'Clear',
          icon: '01d'
        },
        {
          id: 2,
          name: 'Airport Station',
          lat: location.lat - 0.015,
          lng: location.lng + 0.02,
          temp: 21,
          condition: 'Partly Cloudy',
          icon: '02d'
        },
        {
          id: 3,
          name: 'Harbor Station',
          lat: location.lat + 0.02,
          lng: location.lng - 0.01,
          temp: 24,
          condition: 'Sunny',
          icon: '01d'
        }
      ];
      setNearbyStations(mockStations);
    }
  }, [location]);

  const mapTypes = {
    street: {
      name: 'Street',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors'
    },
    satellite: {
      name: 'Satellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '© Esri'
    },
    terrain: {
      name: 'Terrain',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '© OpenTopoMap contributors'
    }
  };

  const weatherLayers = {
    none: { name: 'None', url: null },
    precipitation: {
      name: 'Precipitation',
      url: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY',
      attribution: '© OpenWeatherMap'
    },
    clouds: {
      name: 'Clouds',
      url: 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY',
      attribution: '© OpenWeatherMap'
    },
    temperature: {
      name: 'Temperature',
      url: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY',
      attribution: '© OpenWeatherMap'
    }
  };

  if (!location.lat || !location.lng) {
    return (
      <div className="weather-map-placeholder">
        <MapPin className="map-placeholder-icon" />
        <p>Location not available</p>
        <p className="map-placeholder-subtitle">Please allow location access or search for a city</p>
      </div>
    );
  }

  return (
    <div className="weather-map-container">
      <div className="map-header">
        <h3 className="map-title">
          <MapPin className="map-title-icon" />
          Weather Map
        </h3>
        
        <div className="map-controls">
          <div className="control-group">
            <label>Map Type:</label>
            <select 
              value={mapType} 
              onChange={(e) => setMapType(e.target.value)}
              className="map-control-select"
            >
              {Object.entries(mapTypes).map(([key, type]) => (
                <option key={key} value={key}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <label>Weather Layer:</label>
            <select 
              value={weatherLayer} 
              onChange={(e) => setWeatherLayer(e.target.value)}
              className="map-control-select"
            >
              {Object.entries(weatherLayers).map(([key, layer]) => (
                <option key={key} value={key}>{layer.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>      <div className="map-wrapper">
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={11}
          className="weather-map"
          ref={mapRef}
        >
          {/* Component to update map center when location changes */}
          <MapUpdater center={[location.lat, location.lng]} />
          
          {/* Base map layer */}
          <TileLayer
            url={mapTypes[mapType].url}
            attribution={mapTypes[mapType].attribution}
          />
          
          {/* Weather overlay layer */}
          {weatherLayer !== 'none' && weatherLayers[weatherLayer].url && (
            <TileLayer
              url={weatherLayers[weatherLayer].url}
              attribution={weatherLayers[weatherLayer].attribution}
              opacity={0.6}
            />
          )}
          
          {/* Main location marker */}
          <Marker 
            position={[location.lat, location.lng]}
            icon={createWeatherIcon(weatherData?.weather?.[0]?.icon || '01d')}
          >
            <Popup className="weather-popup">
              <div className="popup-content">
                <h4>{weatherData?.location || 'Current Location'}</h4>
                <div className="popup-weather">
                  <span className="popup-temp">{weatherData?.temperature || '--'}°C</span>
                  <span className="popup-desc">{weatherData?.description || 'No data'}</span>
                </div>
                {weatherData?.wind && (
                  <div className="popup-wind">
                    <Wind className="popup-icon" />
                    <span>{weatherData.wind.speed} m/s</span>
                  </div>
                )}
                {weatherData?.main?.humidity && (
                  <div className="popup-humidity">
                    <Cloud className="popup-icon" />
                    <span>{weatherData.main.humidity}% humidity</span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
          
          {/* Nearby weather stations */}
          {nearbyStations.map((station) => (
            <CircleMarker
              key={station.id}
              center={[station.lat, station.lng]}
              radius={8}
              fillColor="#3b82f6"
              fillOpacity={0.8}
              color="#1e40af"
              weight={2}
            >
              <Popup>
                <div className="station-popup">
                  <h5>{station.name}</h5>
                  <div className="station-weather">
                    <span className="station-temp">{station.temp}°C</span>
                    <span className="station-condition">{station.condition}</span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      
      <div className="map-legend">
        <div className="legend-item">
          <div className="legend-marker main-location"></div>
          <span>Current Location</span>
        </div>
        <div className="legend-item">
          <div className="legend-marker weather-station"></div>
          <span>Weather Stations</span>
        </div>
        {weatherLayer !== 'none' && (
          <div className="legend-item">
            <Layers className="legend-icon" />
            <span>{weatherLayers[weatherLayer].name} Layer Active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherMap;