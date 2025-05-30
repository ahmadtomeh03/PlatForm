import "./CardSlides.css";

export default function CardSlides({
  nameOfMaterial,
  nameOfDector,
  midOrFinal,
  isOpen,
  onToggle,
}) {
  return (
    <div className="card-slide">
      <div className="card-bg-slide">
        <div className="card-content-slide">
          <h1 className="material-name-slide">{nameOfMaterial}</h1>
          <p className="exam-type-slide">{midOrFinal}</p>
          <div className="doctor-info-slide">
            <span className="doctor-label-slide">By:</span>
            <h3 className="doctor-name-slide">{nameOfDector}</h3>
          </div>
          <button className="btn-slide" onClick={onToggle}>
            {isOpen ? "Hide" : "View"}
          </button>
        </div>
      </div>
      <div className="blob-slide"></div>
    </div>
  );
}
