import "./ButtonUpload.css";

export default function ButtonUpload() {
  return (
    <div>
      <button className="button-upload">
        <span>Upload File</span>
        <svg
          width="15px"
          height="15px"
          viewBox="0 0 13 13"
          className="arrow-icon"
        >
          <path d="M6.5,11 L6.5,3" />
          <polyline points="3.5 6 6.5 3 9.5 6" />
        </svg>
      </button>
    </div>
  );
}
