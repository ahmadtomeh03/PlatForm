import Welcome from "./welcome";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Login from "../Login";
import "../Home/Home.css";
import About from "../About/About";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <div
        style={{
          background: "#303841",
          display: "flex",
          flexDirection: "column",
          height: isMobile ? "60vh" : "100vh",
          justifyContent: "flex-start",
          alignItems: "center",
          fontFamily: "Amiri",
        }}
        className="home"
      >
        <div
          style={{
            position: "absolute",
            left: isMobile ? "10px" : "100px",
            top: isMobile ? "10%" : "20%",
            transform: "translateY(-50%)",
          }}
        >
          <MenuBookIcon
            className="animated-icon"
            style={{ fontSize: "200px", color: "#2185d5", opacity: "0.3" }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            right: isMobile ? "10px" : "100px",
            top: isMobile ? "50%" : "73%",
            transform: "translateY(-50%)",
          }}
        >
          <LibraryBooksIcon
            className="animated-icon"
            style={{ fontSize: "200px", color: "#2185d5", opacity: "0.3" }}
          />
        </div>

        <Welcome />

        <h3
          style={{
            fontSize: "60px",
            color: "#f3f3f3",
            textAlign: "center",
            margin: "10px",
          }}
          className="explore"
        >
          Explore our educational platform <br />& access All your study
          resources with ease.
        </h3>

        <p
          style={{ fontFamily: "cursive", color: "#f3f3f3", margin: "10px" }}
          className="ourPlatForm"
        >
          Our platform provides lecture slides, past exams, summaries, and smart
          tools like AI-powered assistance to help you study better and smarter.
        </p>

        <button
          className="explore-button"
          onClick={() => {
            navigate("/college");
          }}
        >
          Explore More
        </button>
      </div>
    </div>
  );
}
