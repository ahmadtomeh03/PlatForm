import React, { useState } from "react";
import "./MainDashboard.css";

function Courses() {
  const [materials, setMaterials] = useState({
    books: [
      { id: 1, courseName: "AI", title: "AI Basics", date: "2024-01-01" },
      { id: 2, courseName: "DS", title: "Data Structures", date: "2024-02-10" },
    ],
    exams: [{ id: 1, courseName: "JAVA", title: "Final 2023", date: "2023-12-15" }],
    summaries: [{ id: 1, courseName: "JAVA", title: "Week 1 Summary", date: "2024-01-07" }],
    assignments: [{ id: 1, courseName: "C++", title: "HW1", date: "2024-01-05" }],
  });

  const [type, setType] = useState("books");
  const [form, setForm] = useState({ courseName: "", title: "", date: "" });
  const [invalidFields, setInvalidFields] = useState({});
  const [searchBy, setSearchBy] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInvalidFields({ ...invalidFields, [e.target.name]: false });
  };

  const addMaterial = () => {
    const missing = {};
    if (!form.courseName.trim()) missing.courseName = true;
    if (!form.title.trim()) missing.title = true;
    if (!form.date.trim()) missing.date = true;
    if (Object.keys(missing).length) {
      setInvalidFields(missing);
      return;
    }

    const nextId =
      materials[type].length > 0
        ? materials[type][materials[type].length - 1].id + 1
        : 1;

    const newMaterial = {
      id: nextId,
      courseName: form.courseName.trim(),
      title: form.title.trim(),
      date: form.date,
    };

    setMaterials({
      ...materials,
      [type]: [...materials[type], newMaterial],
    });

    setForm({ courseName: "", title: "", date: "" });
    setInvalidFields({});
  };

  const handleDelete = (id) => setConfirmId(id);
  const confirmDelete = () => {
    setMaterials({
      ...materials,
      [type]: materials[type].filter((mat) => mat.id !== confirmId),
    });
    setConfirmId(null);
  };
  const cancelDelete = () => setConfirmId(null);

  const filtered = materials[type].filter((mat) => {
    const field = mat[searchBy];
    if (!field) return false;
    return field.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="dashboard-section">
      <h1 className="dashboard-title">Courses</h1>

      {/* Add Material Form */}
      <div className="dashboard-form">
        <select
          className="dashboard-input"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setForm({ courseName: "", title: "", date: "" });
            setSearchQuery("");
            setSearchBy("title");
            setInvalidFields({});
          }}
        >
          <option value="books">Books</option>
          <option value="exams">Exams</option>
          <option value="summaries">Summaries</option>
          <option value="assignments">Assignments</option>
        </select>

        <div><input
          name="courseName"
          className={`dashboard-input ${invalidFields.courseName ? "dashboard-input-error" : ""}`}
          placeholder="Course Name"
          value={form.courseName}
          onChange={handleChange}
        />
        {invalidFields.courseName && (
          <div style={{ color: "#e74c3c" }}>Course Name is required</div>
        )}</div>

        <div><input
          name="title"
          className={`dashboard-input ${invalidFields.title ? "dashboard-input-error" : ""}`}
          placeholder={`Material Title`}
          value={form.title}
          onChange={handleChange}
        /></div>
        {invalidFields.title && (
          <div style={{ color: "#e74c3c" }}>Title is required</div>
        )}

        <div><input
          name="date"
          type="date"
          className={`dashboard-input ${invalidFields.date ? "dashboard-input-error" : ""}`}
          value={form.date}
          onChange={handleChange}
        />
        {invalidFields.date && (
          <div style={{ color: "#e74c3c" }}>Date is required</div>
        )}</div>

        <button className="dashboard-button" onClick={addMaterial}>
          Add {type.slice(0, -1)}
        </button>
      </div>

      {/* Search */}
      <div className="dashboard-filter-group">
        <label className="dashboard-filter-label">Search by:</label>
        <select
          className="dashboard-input"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="courseName">Course Name</option>
          <option value="date">Date</option>
        </select>
        <input
          className="dashboard-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${type}...`}
        />
      </div>

      {/* Table */}
      <table className="dashboard-table">
        <thead>
          <tr>
            <th className="dashboard-th">ID</th>
            <th className="dashboard-th">Course</th>
            <th className="dashboard-th">Title</th>
            <th className="dashboard-th">Date</th>
            <th className="dashboard-th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
                No {type} found.
              </td>
            </tr>
          ) : (
            filtered.map((mat) => (
              <tr key={mat.id}>
                <td className="dashboard-td">{mat.id}</td>
                <td className="dashboard-td">{mat.courseName}</td>
                <td className="dashboard-td">{mat.title}</td>
                <td className="dashboard-td">{mat.date}</td>
                <td className="dashboard-td">
                  <button
                    className="dashboard-delete-button"
                    onClick={() => handleDelete(mat.id)}
                  >
                    ✖
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {confirmId && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal">
            <p>Are you sure you want to delete this {type.slice(0, -1)}?</p>
            <button className="dashboard-button" onClick={confirmDelete}>Yes</button>
            <button className="dashboard-button" onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
