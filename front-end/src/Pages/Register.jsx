import React from "react";

function Register() {
  return (
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
        placeholder="Enter your Username "
      />

      <label style={{ margin: "5px", width: "100%", textAlign: "left" }}>
        Email
      </label>
      <input
        style={{ margin: "5px", padding: "10px" }}
        className="border-2 rounded-xl border-[#2185D5] w-full"
        placeholder="Enter your Email "
      />

      <label style={{ margin: "5px", width: "100%", textAlign: "left" }}>
        Password
      </label>
      <input
        style={{ margin: "5px", padding: "10px" }}
        className="border-2 rounded-xl border-[#2185D5] w-full"
        placeholder="Enter your Password"
      />

      <button style={{ marginTop: "10px", width: "50%", padding: "10px" }}>
        Register
      </button>
    </div>
  );
}

export default Register;
