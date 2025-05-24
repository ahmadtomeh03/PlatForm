import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    if (showForgetPassword) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [showForgetPassword]);

  const handleVerificationSubmit = () => {
    console.log("Verification Code:", verificationCode);
    setShowForgetPassword(false);
  };

  return (
    <>
      {/* Main Login Form */}
      <div className="flex flex-col justify-center items-center">
        <h1 style={{ margin: "5px", textAlign: "center" }}>
          <b>Welcome back!</b> <br />
          Log in to continue learning with us
        </h1>

        <label style={{ margin: "5px", width: "100%", textAlign: "left" }}>
          Username
        </label>
        <input
          style={{ margin: "5px", padding: "10px" }}
          className="border-2 rounded-xl border-[#2185D5] w-full"
          placeholder="Enter your Username"
        />

        <label style={{ margin: "5px", width: "100%", textAlign: "left" }}>
          Password
        </label>
        <input
          style={{ margin: "5px", padding: "10px" }}
          className="border-2 rounded-xl border-[#2185D5] w-full"
          placeholder="Enter your Password"
        />

        <div
          className="flex justify-center items-center w-full"
          style={{ justifyContent: "space-between" }}
        >
          <div>
            <input type="checkbox" style={{ margin: "5px" }} />
            <span>Remember me</span>
          </div>
          <label
            style={{ margin: "10px", color: "#2185d5", cursor: "pointer" }}
            onClick={() => setShowForgetPassword(true)}
          >
            Forget Password?
          </label>
        </div>

        <button style={{ width: "50%", padding: "10px", marginTop: "10px" }}>
          Login
        </button>
      </div>

      {/* Forget Password Overlay */}
      {showForgetPassword && (
        <div className="forgot-password-overlay">
          <div className="forgot-password-panel">
            <h3>Enter Verification Code</h3>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Verification Code"
            />
            <button onClick={handleVerificationSubmit}>Submit</button>
            <div
              className="cancel-link"
              onClick={() => setShowForgetPassword(false)}
            >
              Cancel
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
