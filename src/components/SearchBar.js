import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onLocationUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Trigger location-based update in the parent component
          if (onLocationUpdate) {
            onLocationUpdate(latitude, longitude);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your current location. Please check your browser settings.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container glass">
          <Search className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      
      <button 
        onClick={handleGetCurrentLocation}
        className="location-button glass"
        title="Get current location"
      >
        <MapPin className="location-btn-icon" />
        Current Location
      </button>
    </div>
  );
};

export default SearchBar;
