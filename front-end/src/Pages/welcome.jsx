import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import "./Home.css";
export default function Welcome() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        marginBottom: "20px",
      }}
      className="welcome"
    >
      <AutoStoriesIcon
        style={{ color: "#2185d5", margin: "10px", fontSize: "30px" }}
      />
      <h1 style={{ color: "#2185d5", fontSize: "40px" }}>Welcome</h1>

      <AutoStoriesIcon
        style={{ color: "#2185d5", margin: "10px", fontSize: "30px" }}
      />
    </div>
  );
}
