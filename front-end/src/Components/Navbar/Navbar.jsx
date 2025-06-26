import * as React from "react";
import "./Navbar.css";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import FadeMenu from "../Menu/FadeMenu";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "../../Context/SnackbarContext";

export default function Navbar() {
  const { isLogin, role, logout } = React.useContext(UserContext);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar" style={{ fontFamily: "Amiri" }}>
      <div
        onClick={() => {
          navigate("/");
          setMobileMenuOpen(false);
        }}
        className="logo"
      >
        <Logo />
      </div>

      <div className="menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      <ul className={`navbarList ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <li>Home</li>
        </Link>
        <Link to="/college" onClick={() => setMobileMenuOpen(false)}>
          <li>college</li>
        </Link>
        <Link to="/aboutSite" onClick={() => setMobileMenuOpen(false)}>
          <li>About site</li>
        </Link>
        <Link to="/help" onClick={() => setMobileMenuOpen(false)}>
          <li>Help</li>
        </Link>
        {(role === "superadmin" || role === "admin") && (
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
            <li>Dashboard</li>
          </Link>
        )}

        <div className="mobile-only-auth">
          {!isLogin ? (
            <>
              <Link to="/acount/login" onClick={() => setMobileMenuOpen(false)}>
                <li className="login">Login</li>
              </Link>
              <Link to="/acount/register" onClick={() => setMobileMenuOpen(false)}>
                <li className="register">Register</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                <li>Profile</li>
              </Link>
              <Link to="/change-password" onClick={() => setMobileMenuOpen(false)}>
                <li>Change Password</li>
              </Link>
              <li
                onClick={() => {
                  logout();
                  showSnackbar("You have been logged out successfully", "info");
                  setMobileMenuOpen(false);
                  navigate("/home");
                }}
                style={{ cursor: "pointer" }}
              >
                Logout
              </li>
            </>
          )}
        </div>
      </ul>

      {!isLogin ? (
        <div className="auth-buttons desktop-only-auth">
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
        </div>
      ) : (
        <div className="desktop-only-auth">
          <FadeMenu />
        </div>
      )}
    </nav>
  );
}
