import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h5>Customer Services</h5>
          <ul>
            <li><a href="#">Help & Contact Us</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Online Stores</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h5>Company</h5>
          <ul>
            <li><a href="#">What We Do</a></li>
            <li><a href="#">Available Services</a></li>
            <li><a href="#">Latest Posts</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h5>Social Media</h5>
          <ul>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Pinterest</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;