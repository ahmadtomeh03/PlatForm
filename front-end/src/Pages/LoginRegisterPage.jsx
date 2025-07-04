import Login from "./Login";
import { useParams, useNavigate } from "react-router-dom";
import Register from "./Register";
import "../Pages/LoginRegisterPage.css";
import { useState, useEffect } from "react";

export default function LoginRegisterPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const [fade, setFade] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    setFade(true);
    return () => setFade(false);
  }, [type]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (path) => {
    setFade(false);
    setTimeout(() => {
      navigate(`/acount/${path}`);
    }, 300);
  };
  if (isMobile) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f3f3f3",
          padding: "20px",
        }}
      >
        <div
          className={`fade-container ${fade ? "fade-in" : "fade-out"}`}
          style={{
            width: "100%",
            maxWidth: "400px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            padding: "20px",
          }}
        >
          {type === "login" ? (
            <>
              <Login />
              <div style={{ marginTop: "15px", textAlign: "center" }}>
                <span>Don't have an account? </span>
                <button
                  onClick={() => handleNavigation("register")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2185D5",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </button>
              </div>
            </>
          ) : (
            <>
              <Register />
              <div style={{ marginTop: "15px", textAlign: "center" }}>
                <span>Already have an account? </span>
                <button
                  onClick={() => handleNavigation("login")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2185D5",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "75px",
        background: "#f3f3f3",
      }}
    >
      <div
        className={`fade-container ${fade ? "fade-in" : "fade-out"}`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "70%",
          border: "1px solid #2185D5",
          borderRadius: "10px",
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
          background: "white",
        }}
      >
        {type === "login" ? (
          <>
            <div
              style={{
                width: "55%",
                background: "#2185D5",
                height: "500px",
                borderRadius: "8px 100px 100px 8px",
                color: "#FFFFFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                flexDirection: "column",
              }}
            >
              <label>
                <b style={{ fontSize: "50px" }}>Welcome</b> <br />
                Don't have an account?
              </label>
              <button
                onClick={() => handleNavigation("register")}
                style={{
                  border: "2px #F3F3F3 solid",
                  padding: "5px",
                  width: "200px",
                  marginTop: "10px",
                }}
                className="register-login"
              >
                Register
              </button>
            </div>
            <div style={{ width: "45%", padding: "10px" }}>
              <Login />
            </div>
          </>
        ) : (
          <>
            <div style={{ width: "45%", padding: "10px" }}>
              <Register />
            </div>
            <div
              style={{
                width: "55%",
                background: "#2185D5",
                height: "500px",
                borderRadius: "100px 8px 8px 100px",
                color: "#F3F3F3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                flexDirection: "column",
              }}
            >
              <label>
                <b style={{ fontSize: "50px" }}>Welcome</b> <br />
                Already have an account?
              </label>
              <button
                onClick={() => handleNavigation("login")}
                style={{
                  border: "2px #F3F3F3 solid",
                  padding: "5px",
                  width: "200px",
                  marginTop: "10px",
                }}
                className="register-login"
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
