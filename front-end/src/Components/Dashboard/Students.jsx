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
  const [confirmId, setConfirmId] = useState(null); // for delete confirmation
  const [promoteData, setPromoteData] = useState({ id: null, role: "admin" }); // for promote confirmation

  // Form input handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "name" || name === "username") {
      updatedValue = value.trimStart();
    }

    if (name === "email") {
      updatedValue = value.toLowerCase();
    }

    if (name === "date" && value === "") {
      const today = new Date().toISOString().split("T")[0];
      updatedValue = today;
    }

    setForm({ ...form, [name]: updatedValue });
    setInvalidFields({ ...invalidFields, [name]: false });
  };

  // Add student form submission (not used in UI here)
  const handleSubmit = () => {
    const missing = {};
    Object.keys(form).forEach((key) => {
      if (!form[key].trim()) {
        missing[key] = true;
      } else if (key === "email" && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form[key])) {
        missing[key] = true;
      }
    });

    if (Object.keys(missing).length > 0) {
      setInvalidFields(missing);
      return;
    }

    setStudents([...students, { ...form, id: students.length + 1 }]);
    setForm({ name: "", username: "", email: "", date: "" });
    setInvalidFields({});
  };

  // Delete flow
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

  // Promote flow
  const handlePromoteClick = (id) => {
    setPromoteData({ id, role: "admin" }); // default to admin
  };

  const confirmPromote = () => {
    const studentIndex = students.findIndex(s => s.id === promoteData.id);
    if (studentIndex !== -1) {
      // Here you can update the student's role in state or send to server
      // For demo, we just alert and close modal
      alert(`Student "${students[studentIndex].name}" promoted to ${promoteData.role}!`);
    }
    setPromoteData({ id: null, role: "admin" });
  };

  const cancelPromote = () => {
    setPromoteData({ id: null, role: "admin" });
  };

  // Filtering students
  const filtered = students.filter((s) =>
    s[searchBy].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-section">
      <h1 className="dashboard-title">Students</h1>

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
            <th className="dashboard-th">Action</th>
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
                <span
                  className="promote-icon"
                  title="Promote"
                  onClick={() => handlePromoteClick(s.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') handlePromoteClick(s.id); }}
                >
                  🔼
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {confirmId && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="deleteTitle">
            <p id="deleteTitle">Are you sure you want to delete this student?</p>
            <div className="dashboard-modal-buttons">
              <button className="dashboard-button confirm" onClick={confirmDelete}>Yes</button>
              <button className="dashboard-button cancel" onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Promote Confirmation Modal */}
      {promoteData.id !== null && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="promoteTitle">
            <p id="promoteTitle">
              Promote <strong>{students.find(s => s.id === promoteData.id)?.name}</strong> to role:
            </p>

            <div className="role-options">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={promoteData.role === "admin"}
                  onChange={(e) => setPromoteData({ ...promoteData, role: e.target.value })}
                />
                Admin
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="super admin"
                  checked={promoteData.role === "super admin"}
                  onChange={(e) => setPromoteData({ ...promoteData, role: e.target.value })}
                />
                Super Admin
              </label>
            </div>

            <div className="dashboard-modal-buttons">
              <button className="dashboard-button confirm" onClick={confirmPromote}>Yes</button>
              <button className="dashboard-button cancel" onClick={cancelPromote}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
