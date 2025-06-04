import React, { useState } from "react";
import "./MainDashboard.css";

function Courses() {
  const [materials, setMaterials] = useState({
    books: ["AI Basics", "Data Structures"],
    exams: ["Final 2023"],
    summaries: ["Week 1 Summary"],
    assignments: ["HW1"]
  });
  const [type, setType] = useState("books");
  const [item, setItem] = useState("");

  const addMaterial = () => {
    if (item.trim()) {
      setMaterials({ ...materials, [type]: [...materials[type], item] });
      setItem("");
    }
  };

  const deleteMaterial = (index) => {
    setMaterials({
      ...materials,
      [type]: materials[type].filter((_, i) => i !== index)
    });
  };

  return (
    <div className="dashboard-section">
      <h1 className="dashboard-section-title">Courses</h1>
      <select
        className="dashboard-input"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="books">Books</option>
        <option value="exams">Exams</option>
        <option value="summaries">Summaries</option>
        <option value="assignments">Assignments</option>
      </select>
      <input
        className="dashboard-input"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder={`Add to ${type}`}
      />
      <button className="dashboard-button" onClick={addMaterial}>Add</button>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th className="dashboard-th">{type.charAt(0).toUpperCase() + type.slice(1)}</th>
            <th className="dashboard-th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {materials[type].map((mat, index) => (
            <tr key={index} className="dashboard-tr">
              <td className="dashboard-td">{mat}</td>
              <td className="dashboard-td">
                <button className="dashboard-delete-button" onClick={() => deleteMaterial(index)}>✖</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Courses;
