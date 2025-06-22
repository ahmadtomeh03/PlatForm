import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useSnackbar } from "../Context/SnackbarContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const { showSnackbar } = useSnackbar();

  const [values, setValues] = useState({
    student_name: "",
    student_username: "",
    student_email: "",
    student_password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:3000/signup", values)
      .then((res) => {
        const { token, user } = res.data.data;
        const { username, role } = user;

        login(token, username, role);
        showSnackbar(
          res.data.message || "Account created successfully!",
          "success"
        );
        navigate("/");
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Registration failed.";
        showSnackbar(message, "error");
        console.log(message);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 style={{ margin: "5px", textAlign: "center" }}>
        <b>Welcome!</b> <br />
        Create your account to start learning
      </h1>

      <label style={{ margin: "5px", width: "100%", textAlign: "left" }}>
        Name
      </label>
      <input
        style={{ margin: "5px", padding: "10px" }}
        className="border-2 rounded-xl border-[#2185D5] w-full"
        placeholder="Enter your Name"
        name="student_name"
        onChange={handleChange}
      />

      <label style={{ margin: "5px", width: "100%", textAlign: "left" }}>
        Username
      </label>
      <input
        style={{ margin: "5px", padding: "10px" }}
        className="border-2 rounded-xl border-[#2185D5] w-full"
        placeholder="Enter your Username"
        name="student_username"
        onChange={handleChange}
      />

      <label style={{ margin: "5px", width: "100%", textAlign: "left" }}>
        Email
      </label>
      <input
        style={{ margin: "5px", padding: "10px" }}
        className="border-2 rounded-xl border-[#2185D5] w-full"
        placeholder="Enter your Email"
        name="student_email"
        onChange={handleChange}
      />

      <label style={{ margin: "5px", width: "100%", textAlign: "left" }}>
        Password
      </label>
      <input
        style={{ margin: "5px", padding: "10px" }}
        className="border-2 rounded-xl border-[#2185D5] w-full"
        placeholder="Enter your Password"
        name="student_password"
        onChange={handleChange}
        type="password"
      />

      <button
        style={{ marginTop: "10px", width: "50%", padding: "10px" }}
        onClick={onSubmit}
        className="register-card"
      >
        Register
      </button>
    </div>
  );
}

export default Register;
