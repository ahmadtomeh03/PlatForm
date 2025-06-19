import React, { useEffect, useState } from "react";
import "./MainDashboard.css";
import axios from "axios";

function Courses() {
  const [materials, setMaterials] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses-filters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("get course successfully", response.data.data);
        setMaterials(response.data.data);
      })
      .catch((error) => {
        console.error("error getting course", error);
      });
  }, []);
  const [form, setForm] = useState({ course_id: "", course_name: "", course_note: "" });
  const [invalidFields, setInvalidFields] = useState({});
  const [searchBy, setSearchBy] = useState("courseName");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [editItem, setEditItem] = useState(null); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInvalidFields({ ...invalidFields, [e.target.name]: false });
  };

  const validateForm = () => {
    const missing = {};
    if (!form.course_id) missing.course_id = true;
    if (!form.course_name) missing.course_name = true;
    if (!form.course_note) missing.course_note = true;
  
    if (Object.keys(missing).length > 0) {
      setInvalidFields(missing);
      return false;
    }
    return true;
  };
  

  const addMaterial = () => {
    if (!validateForm()) return;

    const nextId =
      materials.length > 0 ? materials[materials.length - 1].id + 1 : 1;

    const newMaterial = {
      id: nextId,
      courseId: form.course_id.trim(),
      courseName: form.course_name.trim(),
      notes: form.notes.trim(),
    };

    setMaterials([...materials, newMaterial]);
    setForm({ course_id: "", course_name: "", course_note: "" });
    setInvalidFields({});
  };
  const handleEditClick = (course) => {
    setEditItem(course);
    setForm({
      course_id: course.course_id,      
      course_name: course.course_name,
      course_note: course.course_note
    });
  };
  
  const startEdit = (mat) => {
    setForm({
      course_id: mat.course_id,
      course_name: mat.course_name,
      course_note: mat.course_note,
    });
    setEditItem(mat);
  };

  const cancelEdit = () => {
    setForm({ course_id: "", course_name: "", course_note: "" });
    setInvalidFields({});
    setEditItem(null);
  };

  const updateMaterial = () => {
    if (!validateForm()) return;
  
    axios
      .put(
        `http://localhost:3000/admin/course/update/${editItem.course_id}`,
        {
          course_name: form.course_name,
          course_note: form.course_note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Course updated successfully", response.data);
  
        const updatedList = materials.map((mat) =>
          mat.course_id === editItem.course_id
            ? { ...mat, course_name: form.course_name, course_note: form.course_note }
            : mat
        );
        setMaterials(updatedList);
        cancelEdit();
      })
      .catch((error) => {
        console.error("Failed to update course", error);
        alert("Failed to save changes.");
      });
  };
  

  const handleDelete = (id) => setConfirmId(id);
  const confirmDelete = () => {

    
    axios
    .delete(`http://localhost:3000/admin/course/delete/${confirmId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Courses deleted successfully", response.data);
      setMaterials(materials.filter((s) => s.course_id !== confirmId));
      setConfirmId(null);
    })
    .catch((error) => {
    
      console.error("Error deleting admin", error);
      alert(error.response.data.message);
    });


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

      

      {/* Search */}
      <div className="dashboard-filter-group">
        <label className="dashboard-filter-label">Search by:</label>
        <select
          className="dashboard-input"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="course_id">Course ID</option>
          <option value="course_name">Course Name</option>
          <option value="course_note">Notes</option>
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
            <th className="dashboard-th">Course ID</th>
            <th className="dashboard-th">Course Name</th>
            <th className="dashboard-th">Notes</th>
            <th className="dashboard-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
                No courses found.
              </td>
            </tr>
          ) : (
            materials.map((mat) => (
              <tr key={mat.course_id}>
                <td className="dashboard-td">{mat.course_id}</td>
                <td className="dashboard-td">{mat.course_name}</td>
                <td className="dashboard-td">{mat.course_note}</td>
                <td className="dashboard-td">
                  <span
                    onClick={() => startEdit(mat)}
                    style={{ marginRight: 50 }}
                    className="promote-icon"
                  title="Promote"
                  role="button"
                  tabIndex={0}
                    
                  >
                    ✎
                  </span>
                  <button
                    className="dashboard-delete-button"
                    onClick={() => handleDelete(mat.course_id)}
                  >
                    ✖
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {confirmId && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal">
            <p>Are you sure you want to delete this course?</p>
            <button className="dashboard-button" onClick={confirmDelete}>
              Yes
            </button>
            <button className="dashboard-button" onClick={cancelDelete}>
              No
            </button>
          </div>
        </div>
      )}

      {/* Edit Confirmation Modal */}
      {editItem && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal">
            <h3>Edit Course</h3>
            <input
              name="course_id"
              className={`dashboard-input ${invalidFields.course_id ? "dashboard-input-error" : ""}`}
              placeholder="Course ID"
              value={form.course_id}
              readOnly

            />
            <input
              name="course_name"
              className={`dashboard-input ${invalidFields.course_name ? "dashboard-input-error" : ""}`}
              placeholder="Course Name"
              value={form.course_name}
              onChange={handleChange}
            />
            <input
              name="course_note"
              className={`dashboard-input ${invalidFields.course_note ? "dashboard-input-error" : ""}`}
              placeholder="Notes"
              value={form.course_note}
              onChange={handleChange}
            />
            <div style={{ marginTop: "10px" }}>
              <button className="dashboard-button" onClick={updateMaterial}>
                Save Changes
              </button>
              <button className="dashboard-button" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
