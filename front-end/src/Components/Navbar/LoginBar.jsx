import * as React from "react";
// import "./LoginBar.css";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarLoggedIn() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      // Just navigate after a delay
      navigate("/acount/login");
    }, 2000); // wait 2 seconds before redirect
  };

  return (
    <>
      {isLoggingOut && (
        <div className="logout-overlay">
          <div className="logout-message">Logging out...</div>
        </div>
      )}

      <nav className="navbar" style={{ fontFamily: "Amiri" }}>
        <Logo />

        <ul className="navbarList">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/college">College</Link></li>
          <li><Link to="/aboutSite">About Site</Link></li>
          <li><Link to="/help">Help</Link></li>
        </ul>

        <div className="navbarUserArea">
          <img
            src="https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
            alt="Profile"
            className="profile-image"
          />
          <button
            className="logout"
            onClick={handleLogout}
            style={{
              fontFamily: "Amiri",
              backgroundColor: "#ef4444",
              color: "#fff",
              border: "none",
              padding: "8px 15px",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#dc2626")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
