import React, { useContext, useState } from "react";
import axios from "axios";
import "../../ForgetReset.css";
import { UserContext } from "../../Context/UserContext";
import { useSnackbar } from "../../Context/SnackbarContext";

export default function ChangePassword() {
  const [new_password, setNewPassword] = useState("");
  const [current_password, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { showSnackbar } = useSnackbar();

  //edit
  const token = localStorage.getItem("token");
  const { role } = useContext(UserContext);
  //
  console.log("Token:", token);
  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (new_password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (role === "student") {
      try {
        const res = await axios.put(
          "http://localhost:3000/student/change-password",
          {
            new_password,
            student_password: current_password,
            confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage(res.data.message);
        showSnackbar(
          res.data.message || "Account created successfully!",
          "success"
        );
      } catch (error) {
        const errors = error.response?.data?.errors;
        if (Array.isArray(errors)) {
          errors.forEach((e) => showSnackbar(e.msg, "error"));
        } else {
          const message =
            error.response?.data?.message || "Registration failed.";
          showSnackbar(message, "error");
        }
        console.log(error);
      }
    } else {
      try {
        const res = await axios.put(
          "http://localhost:3000/admin/change-password",
          {
            new_password,
            admin_password: current_password,
            confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
          const message =
            error.response?.data?.message || " failed.";
          showSnackbar(message, "error");
        }
        console.log(error);
      }
    }
  };

  return (
    <div className="forget-pass-container">
      <form className="forget-pass-form">
        <h2>Change Password</h2>
        <p className="forget-pass-info-msg">
          Enter your current password and set a new one.
        </p>

        <input
          type="password"
          className="forget-pass-input"
          placeholder="Current Password"
          required
          value={current_password}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
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
          Change Password
        </button>
        {message && <p className="forget-pass-success-msg">{message}</p>}
        {error && <p className="forget-pass-error-msg">{error}</p>}
      </form>
    </div>
  );
}
