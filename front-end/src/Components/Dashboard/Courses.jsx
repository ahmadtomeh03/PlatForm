import React, { useEffect, useState } from "react";
import "./MainDashboard.css";
import axios from "axios";
import Swal from "sweetalert2";
import ClearIcon from '@mui/icons-material/Clear';
import ModeSharpIcon from '@mui/icons-material/ModeSharp';

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
  const [searchBy, setSearchBy] = useState("course_name");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [editItem, setEditItem] = useState(null); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInvalidFields({ ...invalidFields, [e.target.name]: false });
  };

  const validateForm = () => {
    const missing = {};
    
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

  axios
    .post(
      "http://localhost:3000/admin/courses/create",
      {
        course_id: form.course_id.trim(),
        course_name: form.course_name.trim(),
        course_note: form.course_note.trim(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log("Course added successfully", response.data);

      // Update local state
      setMaterials([...materials, response.data.data]);

      // Clear the form
      setForm({ course_id: "", course_name: "", course_note: "" });
      setInvalidFields({});

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Course Added",
        text: "The course was added successfully!",
        confirmButtonColor: "#3085d6",
      });
    })
    .catch((error) => {
      console.error("Failed to add course", error);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add course. Please try again.",
        confirmButtonColor: "#d33",
      });
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

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Course updated successfully.",
        confirmButtonColor: "#3085d6",
      });
    })
    .catch((error) => {
      console.error("Failed to update course", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to save changes. Please try again.",
        confirmButtonColor: "#d33",
      });
    });
};

  

const handleDelete = (id) => setConfirmId(id);



const confirmDelete = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "This course will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:3000/admin/course/delete/${confirmId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Course deleted successfully", response.data);
          setMaterials(materials.filter((s) => s.course_id !== confirmId));
          setConfirmId(null);

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Course has been deleted successfully.",
            confirmButtonColor: "#3085d6",
          });
        })
        .catch((error) => {
          console.error("Error deleting course", error);
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: error?.response?.data?.message || "Failed to delete course.",
            confirmButtonColor: "#d33",
          });
        });
    }
  });
};

  const cancelDelete = () => setConfirmId(null);

    const filtered = materials.filter((mat) => {
      if (!mat || typeof mat[searchBy] !== "string") return false;
      return mat[searchBy].toLowerCase().includes(searchQuery.toLowerCase());
    });
  

  return (
    <div className="dashboard-section">
      <h1 className="dashboard-title">Courses</h1>
      {/* Add New Course Form */}
<div className="dashboard-form">
    {/* <div>
      <input
        name="course_id"
        className={`dashboard-input ${invalidFields.course_id ? "dashboard-input-error" : ""}`}
        placeholder="Course ID"
        value={form.course_id}
        onChange={handleChange}
      />
      {invalidFields.course_id && (
        <div style={{ color: "#e74c3c" }}>Course ID is required</div>
      )}
  </div> */}
    <div><input
      style={{marginTop: "10px", marginBottom:"20px"}}
      name="course_name"
      className={`dashboard-input ${invalidFields.course_name ? "dashboard-input-error" : ""}`}
      placeholder="Course Name"
      value={form.course_name}
      onChange={handleChange}
    /></div>
    <div><input
      name="course_note"
      className={`dashboard-input ${invalidFields.course_note ? "dashboard-input-error" : ""}`}
      placeholder="Notes"
      value={form.course_note}
      onChange={handleChange}
    /></div>
    <div><button className="dashboard-button" onClick={addMaterial}>
      Add Course
    </button></div>
  </div>

      

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
          materials
            .filter(mat => mat) // filter out null/undefined entries
            .map((mat) => (
              <tr key={mat.course_id || mat.id || Math.random()}>
                <td className="dashboard-td">{mat.course_id}</td>
                <td className="dashboard-td">{mat.course_name}</td>
                <td className="dashboard-td">{mat.course_note}</td>
                <td className="dashboard-td">
                  <span
                    onClick={() => startEdit(mat)}
                    style={{ marginRight: 50, cursor: 'pointer' }}
                    className="edit-icon"
                    title="Edit"
                    role="button"
                    tabIndex={0}
                  >
                    <ModeSharpIcon/>
                  </span>
                  <button
                    className="dashboard-delete-button"
                    onClick={() => handleDelete(mat.course_id)}
                  >
                    <ClearIcon className="dashboard-icon-button reject"/>
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
            <h1>Edit Course</h1>
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
