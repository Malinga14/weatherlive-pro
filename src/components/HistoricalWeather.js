import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, TrendingDown, BarChart3, History } from 'lucide-react';
import './HistoricalWeather.css';

const HistoricalWeather = ({ location, city }) => {
  const [activeTab, setActiveTab] = useState('week');
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.lat && location.lng) {
      generateMockHistoricalData();
    }
  }, [location]);

  const generateMockHistoricalData = () => {
    setLoading(true);
    
    // Mock data for last 7 days
    const weekData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      weekData.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        high: Math.round(20 + Math.random() * 15),
        low: Math.round(10 + Math.random() * 10),
        humidity: Math.round(40 + Math.random() * 40),
        rainfall: Math.round(Math.random() * 25 * 10) / 10,
        windSpeed: Math.round((2 + Math.random() * 8) * 10) / 10,
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        icon: ['☀️', '☁️', '🌧️', '⛅'][Math.floor(Math.random() * 4)]
      });
    }

    // Mock data for last 30 days (weekly averages)
    const monthData = [];
    for (let i = 3; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      
      monthData.push({
        week: `Week ${4 - i}`,
        dateRange: `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
        avgHigh: Math.round(18 + Math.random() * 12),
        avgLow: Math.round(8 + Math.random() * 8),
        totalRainfall: Math.round(Math.random() * 50 * 10) / 10,
        avgHumidity: Math.round(45 + Math.random() * 30),
        avgWindSpeed: Math.round((3 + Math.random() * 6) * 10) / 10,
        dominantCondition: ['Sunny', 'Cloudy', 'Mixed', 'Rainy'][Math.floor(Math.random() * 4)]
      });
    }

    setWeeklyData(weekData);
    setMonthlyData(monthData);
    setLoading(false);
  };

  const getTemperatureTrend = (data, type = 'week') => {
    if (data.length < 2) return 'stable';
    const recent = type === 'week' ? data.slice(-3) : data.slice(-2);
    const earlier = type === 'week' ? data.slice(0, 3) : data.slice(0, 2);
    
    const recentAvg = recent.reduce((sum, d) => sum + (type === 'week' ? d.high : d.avgHigh), 0) / recent.length;
    const earlierAvg = earlier.reduce((sum, d) => sum + (type === 'week' ? d.high : d.avgHigh), 0) / earlier.length;
    
    if (recentAvg > earlierAvg + 2) return 'rising';
    if (recentAvg < earlierAvg - 2) return 'falling';
    return 'stable';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="trend-icon rising" />;
      case 'falling':
        return <TrendingDown className="trend-icon falling" />;
      default:
        return <BarChart3 className="trend-icon stable" />;
    }
  };

  if (loading) {
    return (
      <div className="historical-weather glass">
        <div className="loading-historical">
          <div className="loading-spinner"></div>
          <p>Loading historical data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="historical-weather glass">
      <div className="historical-header">
        <h3 className="section-title">
          <History className="section-icon" />
          Historical Weather
        </h3>
        
        <div className="time-tabs">
          <button 
            className={`tab-button ${activeTab === 'week' ? 'active' : ''}`}
            onClick={() => setActiveTab('week')}
          >
            Last 7 Days
          </button>
          <button 
            className={`tab-button ${activeTab === 'month' ? 'active' : ''}`}
            onClick={() => setActiveTab('month')}
          >
            Last Month
          </button>
        </div>
      </div>

      {activeTab === 'week' && (
        <div className="weekly-data">
          <div className="trend-summary">
            <div className="trend-item">
              <span>Temperature Trend</span>
              {getTrendIcon(getTemperatureTrend(weeklyData, 'week'))}
            </div>
            <div className="trend-item">
              <span>Avg High: {Math.round(weeklyData.reduce((sum, d) => sum + d.high, 0) / weeklyData.length)}°C</span>
            </div>
            <div className="trend-item">
              <span>Total Rain: {weeklyData.reduce((sum, d) => sum + d.rainfall, 0).toFixed(1)}mm</span>
            </div>
          </div>

          <div className="daily-grid">
            {weeklyData.map((day, index) => (
              <div key={index} className="daily-card glass-subtle">
                <div className="day-header">
                  <span className="day-name">{day.day}</span>
                  <span className="day-icon">{day.icon}</span>
                </div>
                <div className="temperature-range">
                  <span className="high">{day.high}°</span>
                  <span className="low">{day.low}°</span>
                </div>
                <div className="day-details">
                  <div className="detail">
                    <span>💧 {day.humidity}%</span>
                  </div>
                  <div className="detail">
                    <span>🌧️ {day.rainfall}mm</span>
                  </div>
                  <div className="detail">
                    <span>💨 {day.windSpeed}m/s</span>
                  </div>
                </div>
                <div className="condition">{day.condition}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'month' && (
        <div className="monthly-data">
          <div className="trend-summary">
            <div className="trend-item">
              <span>Monthly Trend</span>
              {getTrendIcon(getTemperatureTrend(monthlyData, 'month'))}
            </div>
            <div className="trend-item">
              <span>Total Rain: {monthlyData.reduce((sum, d) => sum + d.totalRainfall, 0).toFixed(1)}mm</span>
            </div>
          </div>

          <div className="weekly-grid">
            {monthlyData.map((week, index) => (
              <div key={index} className="weekly-card glass-subtle">
                <div className="week-header">
                  <h4>{week.week}</h4>
                  <span className="date-range">{week.dateRange}</span>
                </div>
                <div className="week-stats">
                  <div className="stat-row">
                    <span className="stat-label">Avg High/Low:</span>
                    <span className="stat-value">{week.avgHigh}° / {week.avgLow}°</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Total Rainfall:</span>
                    <span className="stat-value">{week.totalRainfall}mm</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Avg Humidity:</span>
                    <span className="stat-value">{week.avgHumidity}%</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Avg Wind:</span>
                    <span className="stat-value">{week.avgWindSpeed}m/s</span>
                  </div>
                  <div className="dominant-condition">
                    <Calendar className="condition-icon" />
                    <span>{week.dominantCondition}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalWeather;
