import * as React from "react";
import "./Navbar.css";
import Logo from "./Logo";
import Button from "@mui/material/Button";
import Login from "../../Pages/Login";

export default function Navbar() {
  return (
    <nav className="navbar" style={{ fontFamily: "Amiri" }}>
      <Logo />
      <ul className="navbarList">
        <li>Home</li>
        <li>college</li>
        <li>About site</li>
        <li>Help</li>
      </ul>
      <button
        className="login"
        style={{ fontFamily: "Amiri" }}
        onClick={<Login />}
      >
        Login
      </button>
      <button className="register" style={{ fontFamily: "Amiri" }}>
        Register
      </button>
    </nav>
  );
}
