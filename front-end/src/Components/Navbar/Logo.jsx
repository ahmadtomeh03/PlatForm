import "./Navbar.css";
export default function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center" }} className="logo">
      <img
        src="graduation.png"
        alt=""
        style={{
          marginLeft: "10px",
          width: "30px",
          height: "30px",
        }}
      />
      <h1
        style={{
          marginLeft: "10px",
          color: "#F3F3F3",
          fontSize: "20px",
        }}
      >
        PlatForm
      </h1>
    </div>
  );
}
