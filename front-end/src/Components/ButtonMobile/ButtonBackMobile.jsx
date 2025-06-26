import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function ButtonBackMobile({ onClickButton }) {
  return (
    <button
      onClick={onClickButton}
      style={{
        backgroundColor: "#2563eb", 
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "0.4rem",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        outline: "none",
        marginTop: "20px",
        marginLeft: "10px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
    >
      <ArrowCircleLeftIcon />
    </button>
  );
}
