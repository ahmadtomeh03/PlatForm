import "./MainDashboard.css";
import axios from "axios";
import React, { useEffect, useState } from "react";


function Admins() {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Alice",
      username: "alice123",
      email: "alice@example.com",
      date: "2024-01-01",
      role: "superadmin",
      std_id: "STD001",
      dep_id: "DEP-A",
    },
    {
      id: 2,
      name: "Bob",
      username: "bobster",
      email: "bob@example.com",
      date: "2024-02-15",
      role: "moderator",
      std_id: "STD002",
      dep_id: "DEP-B",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    date: "",
    role: "",
    std_id: "",
    dep_id: "",
  });
  const token = localStorage.getItem("token");

  const [invalidFields, setInvalidFields] = useState({});
  const [searchBy, setSearchBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  const [confirmId, setConfirmId] = useState(null);
  const [promoteId, setPromoteId] = useState(null);

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
    setForm({
      name: "",
      username: "",
      email: "",
      date: "",
      role: "",
      std_id: "",
      dep_id: "",
    });
    setInvalidFields({});
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/admins-list-filters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("get admin successfully", response.data.data);
        setAdmins(response.data.data);
      })
      .catch((error) => {
        console.error("error getting student", error);
      });
  }, []);

  const handleDelete = (id) => setConfirmId(id);
  const confirmDelete = () => {
    setAdmins(admins.filter((admin) => admin.id !== confirmId));
    setConfirmId(null);
  };
  const cancelDelete = () => setConfirmId(null);

  const handlePromoteClick = (id) => setPromoteId(id);
  const cancelPromote = () => setPromoteId(null);

  const filtered = admins.filter((admin) =>
    admin[searchBy]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const promoteAdminName =
    promoteId != null
      ? admins.find((admin) => admin.id === promoteId)?.name || ""
      : "";
      
  return (
    <div className="dashboard-section">
      <h1 className="dashboard-title">Admins</h1>

      {/* Form for Adding Admin */}
      {/* <div className="dashboard-form">
        <input
          className="dashboard-input"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="dashboard-input"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          className="dashboard-input"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="dashboard-input"
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
        />
        <input
          className="dashboard-input"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
        />
        <input
          className="dashboard-input"
          name="std_id"
          value={form.std_id}
          onChange={handleChange}
          placeholder="Student ID"
        />
        <input
          className="dashboard-input"
          name="dep_id"
          value={form.dep_id}
          onChange={handleChange}
          placeholder="Department ID"
        />
        <button className="dashboard-button" onClick={addAdmin}>
          Add Admin
        </button>
      </div> */}

      {/* Search Filter */}
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
          <option value="std_id">Student ID</option>
          <option value="dep_id">Department ID</option>
        </select>
        <input
          className="dashboard-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          style={{ flex: 1, minWidth: 150 }}
        />
      </div>

      {/* Admin Table */}
      <table className="dashboard-table" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th className="dashboard-th">ID</th>
            <th className="dashboard-th">Name</th>
            <th className="dashboard-th">Username</th>
            <th className="dashboard-th">Email</th>
            <th className="dashboard-th">Date</th>
            <th className="dashboard-th">Role</th>
            <th className="dashboard-th">Student ID</th>
            <th className="dashboard-th">Department ID</th>
            <th className="dashboard-th">Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="dashboard-td">{admin.admin_id}</td>
              <td className="dashboard-td">{admin.admin_name}</td>
              <td className="dashboard-td">{admin.admin_username}</td>
              <td className="dashboard-td">{admin.admin_email}</td>
              <td className="dashboard-td">{admin.date_of_register}</td>
              <td className="dashboard-td">{admin.role}</td>
              <td className="dashboard-td">{admin.student_id}</td>
              <td className="dashboard-td">{admin.department_id}</td>
              <td className="dashboard-td">
                <button
                  className="dashboard-delete-button"
                  onClick={() => handleDelete(admin.id)}
                  title="Delete"
                >
                  ✖
                </button>
                <span
                  onClick={() => handlePromoteClick(admin.id)}
                  className="promote-icon"
                  role="button"
                  tabIndex={0}
                  title="Promote"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlePromoteClick(admin.id);
                  }}
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
        <div className="dashboard-modal-overlay" role="dialog" aria-modal="true">
          <div className="dashboard-modal">
            <p>Are you sure you want to delete this admin?</p>
            <button className="dashboard-button confirm" onClick={confirmDelete}>
              Yes
            </button>
            <button className="dashboard-button cancel" onClick={cancelDelete}>
              No
            </button>
          </div>
        </div>
      )}

      {/* Promote Confirmation Modal */}
      {promoteId && (
        <div className="dashboard-modal-overlay" role="dialog" aria-modal="true">
          <div className="dashboard-modal">
            <p>
              Promote <strong>{promoteAdminName}</strong> to{" "}
              <strong>superadmin</strong>?
            </p>
            <button
              className="dashboard-button confirm"
              onClick={() => {
                setAdmins(
                  admins.map((admin) =>
                    admin.id === promoteId ? { ...admin, role: "superadmin" } : admin
                  )
                );
                setPromoteId(null);
              }}
            >
              Yes
            </button>
            <button className="dashboard-button cancel" onClick={cancelPromote}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admins;
