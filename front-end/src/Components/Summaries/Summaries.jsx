import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import "./Summaries.css";

export default function Summaries({
  nameOfMaterial,
  nameOfDector,
  midOrFinal,
}) {
  return (
    <div style={{ margin: "10px" }}>
      <div className="card-sum">
        <div className="text">
          <span>{nameOfMaterial}</span>
          <p className="subtitle">{midOrFinal}Summaries</p>
          <h1
            className="text-[10px] "
            style={{ fontWeight: "normal", marginBottom: "5px" }}
          >
            {nameOfDector}
          </h1>
        </div>
        <div className="icons">
          <a
            className="btn"
            href="/ISAD.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <SimCardDownloadIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
