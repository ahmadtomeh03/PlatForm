import React, { useState } from 'react';
import axios from 'axios';
import './ForgetReset.css';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const res = await axios.post('/reset-password', {
        token,
        newPassword,
      });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="forget-pass-container">
      <form onSubmit={handleReset} className="forget-pass-form">
        <h2>Reset Password</h2>
        <p className="forget-pass-info-msg">
          Please enter the reset code you received and set a new password.
        </p>
        <input
          type="text"
          className="forget-pass-input"
          placeholder="Enter the reset code"
          required
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          type="password"
          className="forget-pass-input"
          placeholder="New password"
          required
          value={newPassword}
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
        <button type="submit" className="forget-pass-button">Reset Password</button>
        {message && <p className="forget-pass-success-msg">{message}</p>}
        {error && <p className="forget-pass-error-msg">{error}</p>}
      </form>
    </div>
  );
}
