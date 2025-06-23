import React, { useState } from "react";
import axios from "axios";
import "./ForgetReset.css";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "./Context/SnackbarContext";

export default function ResetPassword() {
  const [new_password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const { showSnackbar } = useSnackbar();

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
        confirmPassword,
      });
      showSnackbar(
        res.data.message || "Account created successfully!",
        "success"
      );
      setMessage(res.data.message);
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (Array.isArray(errors)) {
        errors.forEach((e) => showSnackbar(e.msg, "error"));
      } else {
        const message = error.response?.data?.message || "Registration failed.";
        showSnackbar(message, "error");
      }
      console.log(error);
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
