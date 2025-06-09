import React from 'react';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';
import './WeatherAlerts.css';

const WeatherAlerts = ({ alerts }) => {
  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'severe':
        return <AlertTriangle className="alert-icon severe" />;
      case 'moderate':
        return <Info className="alert-icon moderate" />;
      default:
        return <CheckCircle className="alert-icon minor" />;
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'severe':
        return '#F44336';
      case 'moderate':
        return '#FF9800';
      default:
        return '#4CAF50';
    }
  };

  // Mock alerts for demo
  const mockAlerts = alerts || [
    {
      id: 1,
      title: 'Heat Advisory',
      description: 'Excessive heat expected. Take precautions to avoid heat-related illness.',
      severity: 'moderate',
      start: Date.now(),
      end: Date.now() + 86400000 * 2
    }
  ];

  const formatAlertTime = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!mockAlerts.length) {
    return (
      <div className="weather-alerts glass">
        <h3 className="section-title">
          <CheckCircle className="section-icon" style={{ color: '#4CAF50' }} />
          Weather Alerts
        </h3>
        <div className="no-alerts">
          <CheckCircle className="no-alerts-icon" />
          <p>No active weather alerts for your area</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-alerts glass">
      <h3 className="section-title">
        <AlertTriangle className="section-icon" />
        Weather Alerts ({mockAlerts.length})
      </h3>
      
      <div className="alerts-list">
        {mockAlerts.map((alert) => (
          <div 
            key={alert.id} 
            className="alert-card glass-subtle"
            style={{ borderLeft: `4px solid ${getAlertColor(alert.severity)}` }}
          >
            <div className="alert-header">
              {getAlertIcon(alert.severity)}
              <div className="alert-title-section">
                <h4 className="alert-title">{alert.title}</h4>
                <span 
                  className="alert-severity"
                  style={{ color: getAlertColor(alert.severity) }}
                >
                  {alert.severity.toUpperCase()}
                </span>
              </div>
            </div>
            
            <p className="alert-description">{alert.description}</p>
            
            <div className="alert-times">
              <div className="alert-time">
                <strong>Start:</strong> {formatAlertTime(alert.start)}
              </div>
              <div className="alert-time">
                <strong>End:</strong> {formatAlertTime(alert.end)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;
