import "./Summaries.css";
export default function Summaries({
  nameOfMaterial,
  nameOfDector,
  midOrFinal,
  isOpen,
  onToggle,
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="card-sum">
        <div className="text">
          <span>{nameOfMaterial}</span>
          <p className="subtitle">{midOrFinal} Summaries</p>
          <h1
            className="text-[10px]"
            style={{ fontWeight: "normal", marginBottom: "5px" }}
          >
            {nameOfDector}
          </h1>
        </div>
        <div className="icons">
          <button className="btn" onClick={onToggle}>
            {isOpen ? "Hide" : "View"}
          </button>
        </div>
      </div>
    </div>
  );
}
