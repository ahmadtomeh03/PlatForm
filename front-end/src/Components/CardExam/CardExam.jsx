import "./CardExam.css";
export default function CardExam({
  nameOfMaterial,
  nameOfDector,
  midOrFinal,
  isOpen,
  onToggle,
}) {
  return (
    <div>
      <div className="exam-card">
        <div className="exam-card-details">
          <p className="exam-text-title text-lg ">{nameOfMaterial}</p>
          <p className="exam-text-body">{midOrFinal}</p>
          <h3>{nameOfDector}</h3>
        </div>
        <button className="exam-card-button" onClick={onToggle}>
          {isOpen ? "Hide" : "View"}
        </button>
      </div>
    </div>
  );
}
