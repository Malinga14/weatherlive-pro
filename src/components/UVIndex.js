import React from 'react';
import { Sun, Shield, AlertTriangle } from 'lucide-react';
import './UVIndex.css';

const UVIndex = ({ uvIndex }) => {
  const getUVStatus = (uv) => {
    if (uv <= 2) return { level: 'Low', color: '#4CAF50', icon: <Shield />, advice: 'No protection needed' };
    if (uv <= 5) return { level: 'Moderate', color: '#FF9800', icon: <Sun />, advice: 'Seek shade during midday' };
    if (uv <= 7) return { level: 'High', color: '#F44336', icon: <AlertTriangle />, advice: 'Protection required' };
    if (uv <= 10) return { level: 'Very High', color: '#9C27B0', icon: <AlertTriangle />, advice: 'Extra protection required' };
    return { level: 'Extreme', color: '#B71C1C', icon: <AlertTriangle />, advice: 'Avoid being outside' };
  };

  const uvStatus = getUVStatus(uvIndex || 0);

  return (
    <div className="uv-index glass">
      <h3 className="section-title">
        <Sun className="section-icon" />
        UV Index
      </h3>
      
      <div className="uv-main">
        <div className="uv-circle" style={{ borderColor: uvStatus.color }}>
          <div className="uv-value">{uvIndex?.toFixed(1) || '0.0'}</div>
          <div className="uv-level" style={{ color: uvStatus.color }}>
            {uvStatus.level}
          </div>
        </div>
        
        <div className="uv-info">
          <div className="uv-status" style={{ color: uvStatus.color }}>
            {uvStatus.icon}
            <span>{uvStatus.level}</span>
          </div>
          <p className="uv-advice">{uvStatus.advice}</p>
        </div>
      </div>
      
      <div className="uv-scale">
        <div className="scale-bar">
          <div className="scale-segment low"></div>
          <div className="scale-segment moderate"></div>
          <div className="scale-segment high"></div>
          <div className="scale-segment very-high"></div>
          <div className="scale-segment extreme"></div>
        </div>
        <div className="scale-labels">
          <span>0</span>
          <span>3</span>
          <span>6</span>
          <span>8</span>
          <span>11+</span>
        </div>
      </div>
    </div>
  );
};

export default UVIndex;
