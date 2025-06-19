import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

export default function CardNote() {
  const handleToEdit = () => {};
  const handleToDelete = () => {};

  return (
    <div
      style={{
        backgroundColor: "#FFF7F4",
        border: "1px solid #F6E0D9",
        borderRadius: "0.75rem",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)")
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#914632",
              margin: 0,
            }}
          >
            The Title Of Note
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#4B5563", margin: 0 }}>
            The description of title
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "0.875rem",
          color: "#6B7280",
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          ✍️ 5, Dec 2023 - 4:58PM
        </span>

        <IconButton
          onClick={handleToEdit}
          size="small"
          sx={{
            color: "#6B7280",
            "&:hover": { color: "#374151" },
          }}
        >
          <EditNoteIcon fontSize="small" />
        </IconButton>

        <ButtonDelete handleToDelete={handleToDelete} />
      </div>
    </div>
  );
}
