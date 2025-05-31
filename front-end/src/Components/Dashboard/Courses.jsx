import React, { useState } from "react";

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
    <div>
      <h1>Courses</h1>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="books">Books</option>
        <option value="exams">Exams</option>
        <option value="summaries">Summaries</option>
        <option value="assignments">Assignments</option>
      </select>
      <input value={item} onChange={(e) => setItem(e.target.value)} placeholder={`Add to ${type}`} />
      <button onClick={addMaterial}>Add</button>
      <table>
        <thead>
          <tr>
            <th>{type.charAt(0).toUpperCase() + type.slice(1)}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials[type].map((mat, index) => (
            <tr key={index}>
              <td>{mat}</td>
              <td>
                <button className="delete-button" onClick={() => deleteMaterial(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Courses;
