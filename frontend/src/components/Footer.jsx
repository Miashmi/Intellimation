import "/src/App.css";  // ✅ Use absolute path for Vite
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h3>Intellimation</h3>
          <p>Where life moves fasther.</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Works</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li><a href="#">Customer Support</a></li>
            <li><a href="#">Delivery Details</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-section">
          <h4>Subscribe</h4>
          <p>Get updates about our services.</p>
          <div className="subscribe-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; 2025 Intellimation. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
