import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

function Login() {
  const { isLogin, login, logout } = useContext(UserContext);
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
        console.log(res.data);
        const token = res.data.data.token;
        const studentId = res.data.data.user.id;
        localStorage.setItem("token", token);
        localStorage.setItem("student_id", studentId);
        console.log(res.data.data.token);
        login();
        navigate("/");
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      {/* welcome  */}
      <h1 style={{ margin: "5px", textAlign: "center" }}>
        <b>Welcome back!</b> <br />
        Log in to continue learning with us
      </h1>
      {/* username */}
      <label style={{ margin: "5px", width: "100%", textAlign: "left" }}>
        Username Or Email
      </label>
      <input
        style={{ margin: "5px", padding: "10px" }}
        className="border-2 rounded-xl border-[#2185D5] w-full"
        placeholder="Enter your Username Or Emial"
        name={"emailOrUsername"}
        id="email"
        onChange={handleChange}
      />
      {/* password */}
      <label style={{ margin: "5px", width: "100%", textAlign: "left" }}>
        Password
      </label>
      <input
        style={{ margin: "5px", padding: "10px" }}
        className="border-2 rounded-xl border-[#2185D5] w-full"
        placeholder="Enter your Password"
        name={"password"}
        id="password"
        onChange={handleChange}
        type="password"
      />
      {/* remember and forget passwaord */}
      <div
        className="flex justify-center items-center w-full"
        style={{ justifyContent: "space-between" }}
      >
        <div>
          <input type="checkbox" style={{ margin: "5px" }} />
          <span>Remember me</span>
        </div>
        <Link>
          <label style={{ margin: "10px" }}>Forget Password ?</label>
        </Link>
      </div>

      {/*login button  */}
      <button
        style={{ width: "50%", padding: "10px", marginTop: "10px" }}
        onClick={onSubmit}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
