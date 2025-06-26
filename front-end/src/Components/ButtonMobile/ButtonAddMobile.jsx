import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function ButtonAddMobile({ handleToAdd }) {
  return (
    <button
      onClick={handleToAdd}
      style={{
        backgroundColor: "#16a34a", 
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "0.4rem",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        outline: "none",
        marginTop: "20px",
        marginRight: "10px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#15803d")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
    >
      <AddCircleIcon />
    </button>
  );
}
