import React, { useEffect, useState } from "react";
import "./MainDashboard.css";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [invalidFields, setInvalidFields] = useState({});
  const [searchBy, setSearchBy] = useState("id");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [promoteData, setPromoteData] = useState({ id: null, role: "admin" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/all-student-filters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("get student successfully", response.data.data);
        setStudents(response.data.data);
      })
      .catch((error) => {
        console.error("error getting student", error);
      });
  }, []);

  const handleDelete = (id) => {
    setConfirmId(id);
  };

  const confirmDelete = () => {
    console.log(confirmId)
    if (!confirmId) return;

    axios
      .delete(`http://localhost:3000/admin/delete-student/${confirmId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Student deleted successfully", response.data);
        setStudents(students.filter((s) => s.student_id !== confirmId));
        setConfirmId(null);
      })
      .catch((error) => {
        console.error("Error deleting student", error);
        alert("Failed to delete student.");
      });
  };

  const cancelDelete = () => {
    setConfirmId(null);
  };

  const handlePromoteClick = (id) => {
    setPromoteData({ id, role: "admin" });
  };

  const confirmPromote = () => {
    axios
      .put("http://localhost:3000/admin/all-student-filters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("get student successfully", response.data.data);
        setStudents(response.data.data);
      })
      .catch((error) => {
        console.error("error getting student", error);
      });



    console.log(promoteData);

    const studentIndex = students.findIndex((s) => s.id === promoteData.id);
    if (studentIndex !== -1) {
      alert(
        `Student "${students[studentIndex].student_name}" promoted to ${promoteData.role}!`
      );
    }
    setPromoteData({ id: null, role: "admin" });
  };

  const cancelPromote = () => {
    setPromoteData({ id: null, role: "admin" });
  };

  const filteredStudents = students.filter((s) => {
    const fieldMap = {
      id: s.student_id?.toString(),
      name: s.student_name?.toLowerCase(),
      username: s.student_username?.toLowerCase(),
    };

    const fieldValue = fieldMap[searchBy] || "";
    return fieldValue.includes(searchQuery.toLowerCase());
  });

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
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="username">Username</option>
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
          {filteredStudents.map((s) => (
            <tr key={s.student_id}>
              <td className="dashboard-td">{s.student_id}</td>
              <td className="dashboard-td">{s.student_name}</td>
              <td className="dashboard-td">{s.student_username}</td>
              <td className="dashboard-td">{s.student_email}</td>
              <td className="dashboard-td">
                {new Date(s.date_of_register).toLocaleDateString("en-US", {
                  timeZone: "Asia/Gaza",
                })}
              </td>
              <td className="dashboard-td">
                <button
                  className="dashboard-delete-button"
                  onClick={() => handleDelete(s.student_id)}
                >
                  ✖
                </button>
                <span
                  className="promote-icon"
                  title="Promote"
                  onClick={() => handlePromoteClick(s.student_id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlePromoteClick(s.student_id);
                  }}
                >
                  🔼
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Modal */}
      {confirmId && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal" role="dialog" aria-modal="true">
            <p>Are you sure you want to delete this student?</p>
            <div className="dashboard-modal-buttons">
              <button className="dashboard-button confirm" onClick={confirmDelete}>
                Yes
              </button>
              <button className="dashboard-button cancel" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promote Modal */}
      {promoteData.id !== null && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal" role="dialog" aria-modal="true">
            <p>
              Promote{" "}
              <strong>
                {students.find((s) => s.id === promoteData.id)?.student_name}
              </strong>{" "}
              to role:
            </p>
            <div className="role-options">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={promoteData.role === "admin"}
                  onChange={(e) =>
                    setPromoteData({ ...promoteData, role: e.target.value })
                  }
                />
                Admin
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="super admin"
                  checked={promoteData.role === "super admin"}
                  onChange={(e) =>
                    setPromoteData({ ...promoteData, role: e.target.value })
                  }
                />
                Super Admin
              </label>
            </div>
            <div className="dashboard-modal-buttons">
              <button className="dashboard-button confirm" onClick={confirmPromote}>
                Yes
              </button>
              <button className="dashboard-button cancel" onClick={cancelPromote}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
