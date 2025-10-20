import React from "react";
import "./Infor.css";

const Infor = () => {
  return (
    <div className="infor">
      
      <div className="infor-services">
        <div className="service-item">
          <h4>FREE SHIPPING</h4>
          <p>Free shipping worldwide</p>
        </div>
        <div className="service-item">
          <h4>24 X 7 SERVICE</h4>
          <p>Free shipping worldwide</p>
        </div>
        <div className="service-item">
          <h4>FESTIVAL OFFER</h4>
          <p>Free shipping worldwide</p>
        </div>
      </div>

      
      <div className="infor-subscribe">
        <div className="subscribe-text">
          <h4>LET'S BE FRIENDS!</h4>
          <p>Nisi nisi tempor consequat laboris nisi.</p>
        </div>
        <div className="subscribe-form">
          <input
            type="email"
            placeholder="Enter your email address"
            className="email-input"
          />
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Infor;
