import React from 'react';
import './StatusCard.css';

const StatusCard = ({ title, count, type }) => {
  return (
    <div className={`status-card ${type}`}>
      <h3>{title}</h3>
      <div className="count">{count}</div>
    </div>
  );
};

export default StatusCard;