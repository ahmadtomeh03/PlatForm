import "./CardBook.css";
export default function CardBook({
  nameOfMaterial,
  nameOfDector,
  midOrFinal,
  isOpen,
  onToggle,
}) {
  return (
    <div className="card-book">
      <p class="heading-book">{nameOfMaterial}</p>
      <p class="para-book">{midOrFinal} </p>
      <h3>{nameOfDector}</h3>
      <div class="overlay-book"></div>
      <button class="card-btn-book" onClick={onToggle}>
        {isOpen ? "Hide" : "View"}
      </button>
    </div>
  );
}
