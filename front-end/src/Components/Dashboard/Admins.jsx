import React, { useState } from "react";
import "./MainDashboard.css";

function Admins() {
  const [admins, setAdmins] = useState(["John", "Emma"]);
  const [admin, setAdmin] = useState("");

  const addAdmin = () => {
    if (admin.trim()) {
      setAdmins([...admins, admin]);
      setAdmin("");
    }
  };

  const deleteAdmin = (index) => {
    setAdmins(admins.filter((_, i) => i !== index));
  };

  return (
    <div className="dashboard-section">
      <h1 className="dashboard-section-title">Admins</h1>
      <input
        className="dashboard-input"
        value={admin}
        onChange={(e) => setAdmin(e.target.value)}
        placeholder="Admin Name"
      />
      <button className="dashboard-button" onClick={addAdmin}>Add Admin</button>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th className="dashboard-th">Name</th>
            <th className="dashboard-th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((a, index) => (
            <tr key={index} className="dashboard-tr">
              <td className="dashboard-td">{a}</td>
              <td className="dashboard-td">
                <button className="dashboard-delete-button" onClick={() => deleteAdmin(index)}>✖</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admins;
