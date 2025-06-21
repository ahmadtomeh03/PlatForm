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
            <ul>
              <li>Colleges</li>
              <li>Contact Us</li>
              <li>Help</li>
              <li>Main Menu</li>
            </ul>
            
          </div>
        </div>

        {/* Logo & Social */}
        <div className="footer-center">
          <div className="logo">📓 <span>Ptuk Edu Gate</span></div>
          <div className="social-icons">
            <i className="fab fa-facebook-f"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1877F2" viewBox="0 0 24 24">
  <path d="M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.406.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.505 0-1.796.716-1.796 1.765v2.313h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.594 1.324-1.326V1.326C24 .594 23.405 0 22.675 0z"/>
</svg>
</i>
            <i className="fab fa-instagram"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#E4405F" viewBox="0 0 24 24">
  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm8.5 1.5h-8.5a4.25 4.25 0 00-4.25 4.25v8.5a4.25 4.25 0 004.25 4.25h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25zm-4.25 3.75a5 5 0 11-.001 10.001A5 5 0 0112 7.25zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.75-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
</svg>
</i>
            <i className="fab fa-linkedin-in"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0A66C2" viewBox="0 0 24 24">
  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.038-1.85-3.038-1.85 0-2.133 1.445-2.133 2.938v5.669h-3.554V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.602 0 4.268 2.37 4.268 5.452v6.289zM5.337 7.433a2.067 2.067 0 11.002-4.134 2.067 2.067 0 01-.002 4.134zm1.778 13.019H3.56V9h3.555v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.227.792 24 1.771 24h20.451C23.204 24 24 23.227 24 22.271V1.728C24 .774 23.204 0 22.225 0z"/>
</svg>
</i>
            <i className="fab fa-twitter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1DA1F2" viewBox="0 0 24 24">
  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.724 9.864 9.864 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482A13.978 13.978 0 011.671 3.149a4.822 4.822 0 001.523 6.574 4.897 4.897 0 01-2.229-.616v.06a4.922 4.922 0 003.946 4.827 4.996 4.996 0 01-2.224.084 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.395 0-.779-.023-1.158-.067a13.945 13.945 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646a9.936 9.936 0 002.46-2.548l-.001-.001z"/>
</svg>
</i>
          </div>
        </div>

        {/* Address Info */}
        <div className="footer-section">
          <h3>Address Info</h3>
          <p><strong>Phone:</strong> +970 5999999</p>
          <p><strong>Email:</strong> ptukgate@gmail.com</p>
          <p><strong>Location:</strong> Westbank, Tulkarem,<br />Al Nozha st</p>
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
