import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  const navigate = useNavigate();

  const handleBrowseCollections = () => {
    navigate('/shop');
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <div className="banner-text">
          <p className="banner-subtitle">NEW INSPIRATION 2020</p>
          <h2 className="banner-title">20% OFF ON NEW SEASON</h2>
          <button 
            className="banner-button" 
            onClick={handleBrowseCollections}
          >
            Browse collections
          </button>
        </div>
        <div className="banner-image">
          <img src="/banner1.jpg" alt="Clock" className="clock-image" />
        </div>
      </div>
    </div>
  );
};

export default Banner;