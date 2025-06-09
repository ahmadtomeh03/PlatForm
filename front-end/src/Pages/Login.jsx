import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import "./Login.css";

function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:3000/login", values)
      .then((res) => {
        const { token, user, role } = res.data.data;
        const { username, id } = user;
        console.log(res.data.data);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("student_id", id);
        login(token, username, role);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response?.data || error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 style={{ margin: "5px", textAlign: "center" }}>
        <b>Welcome back!</b> <br />
        Log in to continue learning with us
      </h1>

      <label style={{ margin: "5px", width: "100%", textAlign: "left" }}>
        Username Or Email
      </label>
      <input
        style={{ margin: "5px", padding: "10px" }}
        className="border-2 rounded-xl border-[#2185D5] w-full"
        placeholder="Enter your Username Or Email"
        name="emailOrUsername"
        onChange={handleChange}
      />

      <label style={{ margin: "5px", width: "100%", textAlign: "left" }}>
        Password
      </label>
      <input
        style={{ margin: "5px", padding: "10px" }}
        className="border-2 rounded-xl border-[#2185D5] w-full"
        placeholder="Enter your Password"
        name="password"
        onChange={handleChange}
        type="password"
      />

      <div className="flex justify-between items-center w-full">
        <div>
          <input type="checkbox" style={{ margin: "5px" }} />
          <span>Remember me</span>
        </div>
          <label style={{ margin: "10px" }}>Forget Password?</label>
      </div>

      <button
        style={{ width: "50%", padding: "10px", marginTop: "10px" }}
        onClick={onSubmit}
        className="login-card"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
