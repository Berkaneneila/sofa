import React from 'react';
import './Banner.css';
import picture from "../../assets/Rectangle 2.png";

function Banner() {
  return (
    <div className="banner-section">
      <div className="banner-content">
        <div className="banner-text">
          <h1>Discover Our Premium Tea Collection</h1>
          <p>From traditional blends to exotic flavors, find your perfect cup</p>
        </div>
        <div className="banner-image">
          <img 
            src={picture} 
            alt="Premium tea cup with saucer"
            className="hero-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
