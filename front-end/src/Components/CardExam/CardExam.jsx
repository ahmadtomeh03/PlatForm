import "./CardExam.css";
export default function CardExam() {
  return (
    <div>
      <div className="exam-card">
        <div className="exam-card-details">
          <p className="exam-text-title text-lg " style={{}}>
            Programming Language (C++)
          </p>
          <p className="exam-text-body">Mid Exam</p>
        </div>
        <button className="exam-card-button">Download</button>
      </div>
    </div>
  );
}
