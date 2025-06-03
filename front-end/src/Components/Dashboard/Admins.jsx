import React, { useState } from "react";

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
    <div>
      <h1>Admins</h1>
      <input value={admin} onChange={(e) => setAdmin(e.target.value)} placeholder="Admin Name" />
      <button onClick={addAdmin}>Add Admin</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((a, index) => (
            <tr key={index}>
              <td>{a}</td>
              <td>
                <button className="delete-button" onClick={() => deleteAdmin(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admins;