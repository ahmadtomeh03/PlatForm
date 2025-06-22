import React, { useState } from "react";
import axios from "axios";
import "./ForgetReset.css";

export default function ForgetPassword() {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/forgot-password", {
        email,
      });
      console.log(res.data);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="forget-pass-container">
      <form onSubmit={handleSubmit} className="forget-pass-form">
        <h2>Forgot Password</h2>
        <p className="forget-pass-info-msg">
          Please enter your email address. A reset code will be sent to your
          inbox.
        </p>
        <input
          type="email"
          className="forget-pass-input"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="forget-pass-button">
          Send Reset Code
        </button>
        {message && <p className="forget-pass-success-msg">{message}</p>}
        {error && <p className="forget-pass-error-msg">{error}</p>}
      </form>
    </div>
  );
}
