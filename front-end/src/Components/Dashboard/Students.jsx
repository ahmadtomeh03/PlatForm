import React, { useState } from "react";
import "./MainDashboard.css";

function Students() {
  const [students, setStudents] = useState([
    { id: 1, name: "Alice", username: "alice123", email: "alice@example.com", date: "2024-01-01" },
    { id: 2, name: "Bob", username: "bobster", email: "bob@example.com", date: "2024-02-15" }
  ]);
  const [form, setForm] = useState({ name: "", username: "", email: "", date: "" });
  const [invalidFields, setInvalidFields] = useState({});
  const [searchBy, setSearchBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInvalidFields({ ...invalidFields, [e.target.name]: false });
  };

  const handleSubmit = () => {
    const missing = {};
    Object.keys(form).forEach((key) => {
      if (!form[key].trim()) missing[key] = true;
    });

    if (Object.keys(missing).length > 0) {
      setInvalidFields(missing);
      return;
    }

    setStudents([...students, { ...form, id: students.length + 1 }]);
    setForm({ name: "", username: "", email: "", date: "" });
    setInvalidFields({});
  };

  const handleDelete = (id) => {
    setConfirmId(id);
  };

  const confirmDelete = () => {
    setStudents(students.filter((s) => s.id !== confirmId));
    setConfirmId(null);
  };

  const cancelDelete = () => {
    setConfirmId(null);
  };

  const filtered = students.filter((s) =>
    s[searchBy].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-section">
      <h1 className="dashboard-title">Students</h1>

      <div className="dashboard-form">
        {["name", "username", "email", "date"].map((field) => (
          <div key={field}>
            <input
              className={`dashboard-input ${invalidFields[field] ? "dashboard-input-error" : ""}`}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field[0].toUpperCase() + field.slice(1)}
            />
            {invalidFields[field] && (
              <div className="dashboard-error-text">Please fill in the {field}</div>
            )}
          </div>
        ))}
        <button className="dashboard-button" onClick={handleSubmit}>Add Student</button>
      </div>

      <div className="dashboard-filter-group">
        <label className="dashboard-filter-label">Search students by:</label>
        <select
          className="dashboard-input"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
          <option value="date">Date</option>
        </select>
        <input
          className="dashboard-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th className="dashboard-th">ID</th>
            <th className="dashboard-th">Name</th>
            <th className="dashboard-th">Username</th>
            <th className="dashboard-th">Email</th>
            <th className="dashboard-th">Date</th>
            <th className="dashboard-th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id}>
              <td className="dashboard-td">{s.id}</td>
              <td className="dashboard-td">{s.name}</td>
              <td className="dashboard-td">{s.username}</td>
              <td className="dashboard-td">{s.email}</td>
              <td className="dashboard-td">{s.date}</td>
              <td className="dashboard-td">
                <button className="dashboard-delete-button" onClick={() => handleDelete(s.id)}>✖</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmId && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal">
            <p>Are you sure you want to delete this student?</p>
            <button className="dashboard-button" onClick={confirmDelete}>Yes</button>
            <button className="dashboard-button" onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
