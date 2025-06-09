# WeatherLive Pro 🌤️

A comprehensive and visually stunning weather application built with React that provides real-time weather data, forecasts, and advanced meteorological insights with a modern glassmorphism UI design.

![Weather App Screenshot](https://img.shields.io/badge/React-18+-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

## ✨ Features

### 🌟 Core Weather Features
- **Real-time Weather Data** - Current conditions with temperature, humidity, pressure, and wind information
- **5-Day Forecast** - Extended weather predictions with detailed daily breakdowns
- **Hourly Forecast** - 24-hour weather timeline with temperature and condition trends
- **Location-based Weather** - Automatic geolocation detection or manual city search
- **Global City Support** - Weather data for major cities worldwide

### 🗺️ Interactive Weather Map
- **Multiple Map Types** - Street, satellite, and terrain view options
- **Weather Overlays** - Precipitation, cloud cover, and temperature layers
- **Nearby Weather Stations** - Real-time data from local weather monitoring stations
- **Interactive Markers** - Detailed popups with location-specific weather information

### 🌍 Advanced Meteorological Data
- **Air Quality Index (AQI)** - Comprehensive air pollution monitoring with pollutant breakdowns
- **UV Index Monitoring** - Real-time UV radiation levels with safety recommendations
- **Sunrise/Sunset Times** - Solar position tracking with daylight duration calculations
- **Weather Alerts** - Severe weather warnings and advisories
- **Historical Weather** - 7-day and monthly weather trend analysis

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Modern glass-effect UI with backdrop blur
- **Dark Theme** - Elegant dark color scheme optimized for readability
- **Responsive Design** - Fully responsive layout supporting all device sizes
- **Smooth Animations** - Fluid transitions and hover effects
- **Intuitive Navigation** - User-friendly interface with clear visual hierarchy

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- OpenWeatherMap API key (optional for full functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up API Key (Optional)**
   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Open `src/components/WeatherApp.js`
   - Replace the empty `API_KEY` variable with your key:
   ```javascript
   const API_KEY = 'your_openweathermap_api_key_here';
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open the application**
   - Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Available Scripts

### Development
```bash
npm start          # Run the app in development mode
npm test           # Launch the test runner in interactive watch mode
npm run build      # Build the app for production
npm run eject      # Eject from Create React App (one-way operation)
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── WeatherApp.js         # Main application component
│   ├── SearchBar.js          # City search functionality
│   ├── WeatherDetails.js     # Current weather details grid
│   ├── ForecastCard.js       # Individual forecast day component
│   ├── HourlyForecast.js     # 24-hour weather timeline
│   ├── WeatherMap.js         # Interactive map with weather overlays
│   ├── AirQuality.js         # Air quality index and pollutants
│   ├── UVIndex.js            # UV radiation monitoring
│   ├── SunriseSunset.js      # Solar position and daylight tracking
│   ├── WeatherAlerts.js      # Severe weather warnings
│   ├── HistoricalWeather.js  # Historical weather trends
│   └── [Component].css       # Individual component styles
├── App.js                    # Root application component
├── App.css                   # Global application styles
└── index.js                  # Application entry point
```

## 🛠️ Technologies Used

### Frontend Framework
- **React 19.1.0** - Modern React with hooks and functional components
- **Create React App** - Zero-configuration React build setup

### UI Libraries & Icons
- **Lucide React** - Beautiful, customizable SVG icons
- **CSS3** - Modern CSS with custom properties and grid/flexbox layouts

### Data & APIs
- **Axios** - HTTP client for API requests
- **OpenWeatherMap API** - Weather data provider
- **Geolocation API** - Browser-based location detection

### Mapping & Visualization
- **React Leaflet** - Interactive map components
- **Leaflet** - Open-source mapping library
- **Mapbox GL** - Advanced mapping capabilities

### Development Tools
- **Testing Library** - Comprehensive testing utilities
- **Jest** - JavaScript testing framework
- **ESLint** - Code linting and formatting

## 🌐 API Integration

The application supports integration with OpenWeatherMap API for real-time data:

### Current Weather
```javascript
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_key}&units=metric
```

### 5-Day Forecast
```javascript
https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_key}&units=metric
```

### Mock Data
When no API key is provided, the application uses comprehensive mock data for demonstration purposes, showcasing all features with realistic weather patterns.

## 🎨 Design Features

### Color Scheme
- **Primary**: Deep sea blue gradients (`#1a237e` to `#4a148c`)
- **Accent**: Cyan highlights (`#00e5ff`)
- **Text**: Silver/white for optimal contrast (`#e0e7ff`)

### Visual Effects
- **Glassmorphism**: Translucent cards with backdrop blur
- **Responsive Grid**: CSS Grid and Flexbox for adaptive layouts
- **Smooth Animations**: CSS transitions and transforms
- **Icon Integration**: Weather-appropriate Lucide React icons

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+): Full feature layout with side-by-side panels
- **Tablet** (768px-1199px): Stacked layout with touch-friendly controls
- **Mobile** (320px-767px): Single-column layout with optimized navigation

## 🔄 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** for providing comprehensive weather data APIs
- **Lucide** for the beautiful icon library
- **React Leaflet** community for excellent mapping components
- **Create React App** team for the fantastic development setup

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Built with ❤️ using React and modern web technologies**


