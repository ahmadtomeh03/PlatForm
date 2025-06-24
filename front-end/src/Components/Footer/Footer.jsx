import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Our Facilities */}
        <div className="footer-section">
          <h3>Our EduGate</h3>
          <div className="footer-links">

          
            <a href="http://localhost:5173/aboutSite">About Site</a>
            
          </div>
        </div>

        {/* Logo & Social */}
        <div className="footer-center">
          <div className="logo">📓 <span>PTUK Edu Gate</span></div>
          
        </div>

        {/* Address Info */}
        <div className="footer-section">
          <h3>Address Info</h3>
          <div className="footer-links">

          <a href="http://localhost:5173/help">Contact US</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>©Copyright by Mokafa7a, All Right Reserved.</p>
        <div>
          <a href="#">Privacy & Policy</a> | <a href="#">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
