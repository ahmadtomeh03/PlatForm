import React, { useState } from "react";
import "./MainDashboard.css";

function Admins() {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Alice",
      username: "alice123",
      email: "alice@example.com",
      date: "2024-01-01",
      role: "superadmin",
    },
    {
      id: 2,
      name: "Bob",
      username: "bobster",
      email: "bob@example.com",
      date: "2024-02-15",
      role: "moderator",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    date: "",
    role: "",
  });

  const [invalidFields, setInvalidFields] = useState({});
  const [searchBy, setSearchBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInvalidFields({ ...invalidFields, [e.target.name]: false });
  };

  const addAdmin = () => {
    const missing = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) missing[key] = true;
    });
    if (Object.keys(missing).length > 0) {
      setInvalidFields(missing);
      return;
    }

    setAdmins([...admins, { ...form, id: admins.length + 1 }]);
    setForm({ name: "", username: "", email: "", date: "", role: "" });
    setInvalidFields({});
  };

  const handleDelete = (id) => {
    setConfirmId(id);
  };

  const confirmDelete = () => {
    setAdmins(admins.filter((admin) => admin.id !== confirmId));
    setConfirmId(null);
  };

  const cancelDelete = () => {
    setConfirmId(null);
  };

  const filtered = admins.filter((admin) =>
    admin[searchBy]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-section">
      <h1 className="dashboard-title">Admins</h1>

      {/* Add Admin Form */}
      <div className="dashboard-form">
        {["name", "username", "email", "date", "role"].map((field) => (
          <div key={field} style={{ marginBottom: 10 }}>
            <input
              type={field === "date" ? "date" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              className={`dashboard-input ${
                invalidFields[field] ? "dashboard-input-error" : ""
              }`}
            />
            {invalidFields[field] && (
              <div className="dashboard-error-text">Please enter {field}</div>
            )}
          </div>
        ))}
        <button className="dashboard-button" onClick={addAdmin}>
          Add Admin
        </button>
      </div>

      {/* Search */}
      <div className="dashboard-filter-group" style={{ marginTop: 20 }}>
        <label className="dashboard-filter-label" htmlFor="searchBy">
          Search Admin by:
        </label>
        <select
          id="searchBy"
          className="dashboard-input"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          style={{ width: 150, marginLeft: 10, marginRight: 10 }}
        >
          <option value="name">Name</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
          <option value="date">Date</option>
          <option value="role">Role</option>
        </select>
        <input
          className="dashboard-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          style={{ flex: 1, minWidth: 150 }}
        />
      </div>

      {/* Admins Table */}
      <table className="dashboard-table" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th className="dashboard-th">ID</th>
            <th className="dashboard-th">Name</th>
            <th className="dashboard-th">Username</th>
            <th className="dashboard-th">Email</th>
            <th className="dashboard-th">Date</th>
            <th className="dashboard-th">Role</th>
            <th className="dashboard-th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((admin) => (
            <tr key={admin.id}>
              <td className="dashboard-td">{admin.id}</td>
              <td className="dashboard-td">{admin.name}</td>
              <td className="dashboard-td">{admin.username}</td>
              <td className="dashboard-td">{admin.email}</td>
              <td className="dashboard-td">{admin.date}</td>
              <td className="dashboard-td">{admin.role}</td>
              <td className="dashboard-td">
                <button
                  className="dashboard-delete-button"
                  onClick={() => handleDelete(admin.id)}
                  aria-label={`Delete ${admin.name}`}
                >
                  ✖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {confirmId && (
        <div className="dashboard-modal-overlay" role="dialog" aria-modal="true">
          <div className="dashboard-modal">
            <p>Are you sure you want to delete this admin?</p>
            <button
              className="dashboard-button"
              onClick={confirmDelete}
              style={{ marginRight: 10 }}
            >
              Yes
            </button>
            <button className="dashboard-button" onClick={cancelDelete}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admins;
