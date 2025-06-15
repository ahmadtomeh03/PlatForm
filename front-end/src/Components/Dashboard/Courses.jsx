import React, { useState } from "react";
import "./MainDashboard.css";

function Courses() {
  const [materials, setMaterials] = useState([
    { id: 1, courseId: "CS101", courseName: "AI", notes: "Basics of AI" },
    { id: 2, courseId: "CS102", courseName: "DS", notes: "Trees and graphs" },
  ]);

  const [form, setForm] = useState({ courseId: "", courseName: "", notes: "" });
  const [invalidFields, setInvalidFields] = useState({});
  const [searchBy, setSearchBy] = useState("courseName");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInvalidFields({ ...invalidFields, [e.target.name]: false });
  };

  const addMaterial = () => {
    const missing = {};
    if (!form.courseId.trim()) missing.courseId = true;
    if (!form.courseName.trim()) missing.courseName = true;
    if (!form.notes.trim()) missing.notes = true;

    if (Object.keys(missing).length) {
      setInvalidFields(missing);
      return;
    }

    const nextId =
      materials.length > 0
        ? materials[materials.length - 1].id + 1
        : 1;

    const newMaterial = {
      id: nextId,
      courseId: form.courseId.trim(),
      courseName: form.courseName.trim(),
      notes: form.notes.trim(),
    };

    setMaterials([...materials, newMaterial]);
    setForm({ courseId: "", courseName: "", notes: "" });
    setInvalidFields({});
  };

  const handleDelete = (id) => setConfirmId(id);
  const confirmDelete = () => {
    setMaterials(materials.filter((mat) => mat.id !== confirmId));
    setConfirmId(null);
  };
  const cancelDelete = () => setConfirmId(null);

  const filtered = materials.filter((mat) => {
    const field = mat[searchBy];
    if (!field) return false;
    return field.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="dashboard-section">
      <h1 className="dashboard-title">Courses</h1>

      {/* Add Material Form */}
      <div className="dashboard-form">
        <div>
          <input
            name="courseId"
            className={`dashboard-input ${invalidFields.courseId ? "dashboard-input-error" : ""}`}
            placeholder="Course ID"
            value={form.courseId}
            onChange={handleChange}
          />
          {invalidFields.courseId && (
            <div style={{ color: "#e74c3c" }}>Course ID is required</div>
          )}
        </div>

        <div>
          <input
            name="courseName"
            className={`dashboard-input ${invalidFields.courseName ? "dashboard-input-error" : ""}`}
            placeholder="Course Name"
            value={form.courseName}
            onChange={handleChange}
          />
          {invalidFields.courseName && (
            <div style={{ color: "#e74c3c" }}>Course Name is required</div>
          )}
        </div>

        <div>
          <input
            name="notes"
            className={`dashboard-input ${invalidFields.notes ? "dashboard-input-error" : ""}`}
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
          />
          {invalidFields.notes && (
            <div style={{ color: "#e74c3c" }}>Notes are required</div>
          )}
        </div>

        <button className="dashboard-button" onClick={addMaterial}>
          Add Course
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
          <option value="courseId">Course ID</option>
          <option value="courseName">Course Name</option>
          <option value="notes">Notes</option>
        </select>
        <input
          className="dashboard-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search courses..."
        />
      </div>

      {/* Table */}
      <table className="dashboard-table">
        <thead>
          <tr>
            <th className="dashboard-th">ID</th>
            <th className="dashboard-th">Course ID</th>
            <th className="dashboard-th">Course Name</th>
            <th className="dashboard-th">Notes</th>
            <th className="dashboard-th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
                No courses found.
              </td>
            </tr>
          ) : (
            filtered.map((mat) => (
              <tr key={mat.id}>
                <td className="dashboard-td">{mat.id}</td>
                <td className="dashboard-td">{mat.courseId}</td>
                <td className="dashboard-td">{mat.courseName}</td>
                <td className="dashboard-td">{mat.notes}</td>
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
            <p>Are you sure you want to delete this course?</p>
            <button className="dashboard-button" onClick={confirmDelete}>Yes</button>
            <button className="dashboard-button" onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
