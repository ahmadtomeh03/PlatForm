import * as React from "react";
import "./Navbar.css";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import FadeMenu from "../Menu/FadeMenu";

export default function Navbar() {
  const { isLogin, login, logout, role } = React.useContext(UserContext);
  const navigate = useNavigate();
  return (
    <nav className="navbar" style={{ fontFamily: "Amiri" }}>
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <Logo />
      </div>

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
        {(role === "superadmin" || role === "admin") && (
          <Link to="/dashboard">
            <li>Dashboard</li>
          </Link>
        )}
      </ul>
      {!isLogin && (
        <>
          <Link to="/acount/login">
            <button className="login" style={{ fontFamily: "Amiri" }}>
              Login
            </button>
          </Link>
          <Link to="/acount/register">
            <button className="register" style={{ fontFamily: "Amiri" }}>
              Register
            </button>
          </Link>
        </>
      )}
      {isLogin && <FadeMenu />}
    </nav>
  );
}
