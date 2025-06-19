import Search from "../Search/Search";
import CardNote from "./CardNote";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function ListCardNote() {
  return (
    <div className="containers min-h-screen" style={{ padding: "20px" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <div
            className="flex justify-between items-center"
            style={{ marginBottom: "20px" }}
          >
            <Search />
            <button
              className="flex items-center gap-1"
              style={{
                padding: "5px",
                background: "var(--color1)",
                borderRadius: "8px",
              }}
            >
              <AddBoxIcon style={{ color: "white" }} />
            </button>
          </div>

          <h1
            className="text2 text-2xl font-bold"
            style={{ marginBottom: "20px" }}
          >
            All Notes
          </h1>
        </div>

        <div
          style={{
            overflowY: "auto",
            maxHeight: "550px",
            paddingRight: "10px",
          }}
        >
          <div className="grid grid-cols-1 gap-4">
            <CardNote />
            <CardNote />
            <CardNote />
            <CardNote />
          </div>
        </div>
      </div>
    </div>
  );
}
