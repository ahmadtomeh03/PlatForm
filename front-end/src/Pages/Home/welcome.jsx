import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import "./Home.css";
import { useEffect, useState } from "react";

export default function Welcome() {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: isMobile ? "10px" : "100px",
        marginBottom: "20px",
      }}
      className="welcome"
    >
      <AutoStoriesIcon
        style={{ color: "#2185d5", margin: "10px", fontSize: "30px" }}
      />
      <h1 style={{ color: "#2185d5", fontSize: "40px", textAlign: "center" }}>
        Welcome
      </h1>
      <AutoStoriesIcon
        style={{ color: "#2185d5", margin: "10px", fontSize: "30px" }}
      />
    </div>
  );
}
