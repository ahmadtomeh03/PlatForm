import * as React from "react";
import "./LoginBar.css";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarLoggedIn() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (adjust as needed for your auth system)
    localStorage.removeItem("userToken");
    // Redirect to login or homepage
    navigate("/acount/login");
  };

  return (
    <nav className="navbar" style={{ fontFamily: "Amiri" }}>
      <Logo />
      <ul className="navbarList">
        <Link to="/home">
          <li>Home</li>
        </Link>
        <Link to="/college">
          <li>College</li>
        </Link>
        <Link to="/aboutSite">
          <li>About Site</li>
        </Link>
        <Link to="/help">
          <li>Help</li>
        </Link>
        
      </ul>

      <div className="navbarUserArea">
      <img
          src="https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
          alt="Profile"
          className="profile-image"
        />
        <button
          className="logout"
          style={{ fontFamily: "Amiri", backgroundColor: "#f87171", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
