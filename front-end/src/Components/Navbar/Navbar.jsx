import * as React from "react";
import "./Navbar.css";
import Logo from "./Logo";
import Button from "@mui/material/Button";
import Login from "../../Pages/Login";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar" style={{ fontFamily: "Amiri" }}>
      <Logo />
      <ul className="navbarList">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/college">
          <li>college</li>
        </Link>
        <Link to="/aboutSite">
          <li>About site</li>
        </Link>
        <Link to="/help">
          <li>Help</li>
        </Link>
      </ul>
      <Link to="/login">
        <button
          className="login"
          style={{ fontFamily: "Amiri" }}
          onClick={<Login />}
        >
          Login
        </button>
      </Link>
      <Link to="/register">
        <button className="register" style={{ fontFamily: "Amiri" }}>
          Register
        </button>
      </Link>
    </nav>
  );
}
