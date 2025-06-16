import "./ButtonAdd.css";

export default function ButtonAdd({ type, handleToAdd }) {
  return (
    <div>
      <button className="button" type="button" onClick={handleToAdd}>
        <span className="button__text">Add {type}</span>
        <span className="button__icon">
          <svg
            className="svg"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
        </span>
      </button>
    </div>
  );
}
