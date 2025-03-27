import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/feature1', icon: '📍', label: 'Checkpoints' },
    { path: '/feature2', icon: '🔥', label: 'Crime Heatmap' },
    { path: '/feature3', icon: '🗺️', label: 'Routes' },
    { path: '/feature4', icon: '👥', label: 'Community' },
    { path: '/feature5', icon: '💡', label: 'Tips' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav; 