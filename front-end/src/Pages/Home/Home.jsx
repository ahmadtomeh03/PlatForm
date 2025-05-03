import Welcome from "./welcome";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Login from "../Login";
import "../Home/Home.css";
import About from "../About/About";
export default function Home() {
  return (
    <div>
      <div
        style={{
          background: "#303841",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "flex-start",
          alignItems: "center",
          fontFamily: "Amiri",
          borderRadius: "0px 0px 100px 100px",
        }}
        className="home"
      >
        <div
          style={{
            position: "absolute",
            left: "100px",
            top: "35%",
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
            right: "100px",
            top: "73%",
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
          Explore our educational platform <br></br> & access All your study
          resources with ease.
        </h3>
        <p
          style={{ fontFamily: "cursive", color: "#f3f3f3", margin: "10px" }}
          className="ourPlatForm"
        >
          Our platform provides lecture slides, past exams, summaries, and smart
          tools like AI-powered assistance to help you study better and smarter.
        </p>
        <button className="explore-button">Explore More</button>
      </div>
    </div>
  );
}
