import React, { useState } from "react";
import axios from "axios";
import "./ForgetReset.css";
import { useLocation } from "react-router-dom";

export default function ResetPassword() {
  const [new_password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  console.log("Token:", token);
  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (new_password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/reset-password", {
        token,
        new_password,
        confirmPassword
      });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="forget-pass-container">
      <form className="forget-pass-form">
        <h2>Reset Password</h2>
        <p className="forget-pass-info-msg">
          Please enter the reset code you received and set a new password.
        </p>
        <input
          type="password"
          className="forget-pass-input"
          placeholder="New password"
          required
          value={new_password}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          className="forget-pass-input"
          placeholder="Confirm new password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="forget-pass-button"
          onClick={handleReset}
        >
          Reset Password
        </button>
        {message && <p className="forget-pass-success-msg">{message}</p>}
        {error && <p className="forget-pass-error-msg">{error}</p>}
      </form>
    </div>
  );
}
