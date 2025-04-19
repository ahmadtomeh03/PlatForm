import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Login visual"
          />
        </div>

        <div className="login-form">
          <h2>Sign in with</h2>
          <div className="social-buttons">
            <button className="btn facebook">Facebook</button>
            <button className="btn google">Google</button>
            <button className="btn linkedin">LinkedIn</button>
          </div>

          <div className="divider">Or</div>

          <input type="email" placeholder="Email address" />
          <input type="password" placeholder="Password" />

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button className="btn login">Login</button>

          <p className="register-text">
            Don't have an account? <a href="#">Register</a>
          </p>
        </div>
      </div>

      <footer className="login-footer">
        <div className="footer-icons">
          <span>Facebook</span>
          <span>Google</span>
          <span>LinkedIn</span>
        </div>
      </footer>
    </div>
  );
}

export default Login;
