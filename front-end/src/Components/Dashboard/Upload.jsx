import React, { useEffect, useState } from "react";
import "./MainDashboard.css";
import axios from "axios";
import Swal from "sweetalert2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

function Upload() {
  const [files, setFiles] = useState([]);
  const initialForm = {
    upload_id: "",
    student_id: "",
    admin_id: "",
    course: "",
    uploaded_state: "",
    uploaded_type: "",
    uploaded_datetime: "",
    upload_name: "",
    doctor_name: "",
    upload_url: "",
    description: "",
  };

  const token = localStorage.getItem("token");
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses-filters")
      .then((res) => {
        setAllCourses(res.data.data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/uploads-filter", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFiles(response.data.data);
      })
      .catch((error) => {
        console.error("Error getting uploads", error);
      });
  }, []);

  const [form, setForm] = useState(initialForm);
  const [invalidFields, setInvalidFields] = useState({});
  const [searchBy, setSearchBy] = useState("upload_name");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmItem, setConfirmItem] = useState(null);
  const [confirmAcceptItem, setConfirmAcceptItem] = useState(null);
  const [confirmRejectItem, setConfirmRejectItem] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.trimStart() });
    setInvalidFields({ ...invalidFields, [name]: false });
  };

  const handleSubmit = () => {
    const missing = {};
    Object.keys(form).forEach((key) => {
      if (!form[key].trim()) {
        missing[key] = true;
      }
    });

    if (Object.keys(missing).length > 0) {
      setInvalidFields(missing);
      return;
    }

    setFiles([...files, { ...form }]);
    setForm(initialForm);
    setInvalidFields({});
  };

  const handleDelete = (item) => {
    setConfirmItem(item);
  };

  const confirmDelete = async () => {
    console.log(confirmRejectItem);
    try {
      await axios.put(
        `http://localhost:3000/admin/approve-upload/${confirmRejectItem.upload_id}`,
        {
          action: "rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFiles(
        files.map((f) =>
          f === confirmRejectItem ? { ...f, uploaded_state: "rejected" } : f
        )
      );

      Swal.fire({
        icon: "info",
        title: "تم الرفض",
        text: "تم رفض الملف بنجاح.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "فشل الرفض",
        text: err.response.data.message,
      });
    } finally {
      setConfirmRejectItem(null);
    }
  };

  const cancelDelete = () => {
    setConfirmItem(null);
  };

  const handleAccept = (item) => {
    setConfirmAcceptItem(item);
    console.log(item);
  };

  const confirmAccept = async () => {
    try {
      await axios.put(
        `http://localhost:3000/admin/approve-upload/${confirmAcceptItem.upload_id}`,
        {
          action: "approved",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFiles(
        files.map((f) =>
          f === confirmAcceptItem ? { ...f, uploaded_state: "approved" } : f
        )
      );

      Swal.fire({
        icon: "success",
        title: "تم القبول بنجاح",
        text: "تم قبول الملف.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "فشل القبول",
        text: err.response.data.message,
      });
    } finally {
      setConfirmAcceptItem(null);
    }
  };

  const handleReject = (item) => {
    setConfirmRejectItem(item);
  };

  const confirmReject = async () => {
    try {
      await axios.put(
        `http://localhost:3000/admin/approve-upload/${confirmRejectItem.upload_id}`,
        {
          action: "rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFiles(
        files.map((f) =>
          f === confirmRejectItem ? { ...f, uploaded_state: "rejected" } : f
        )
      );

      Swal.fire({
        icon: "info",
        title: "تم رفض الملف بنجاح",
        text: "تم رفض الملف.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "فشل الرفض",
        text: err.response.data.message,
      });
    } finally {
      setConfirmRejectItem(null);
    }
  };

  const cancelAcceptReject = () => {
    setConfirmAcceptItem(null);
    setConfirmRejectItem(null);
  };

  const formatDateTime = (value) => {
    const date = new Date(value);
    return isNaN(date) ? "" : date.toLocaleString();
  };

  const filtered = files.filter((f) => {
    const value = f?.[searchBy];

    if (typeof value === "number") {
      return value.toString().includes(searchQuery.trim());
    }

    if (typeof value === "string") {
      return value.toLowerCase().includes(searchQuery.trim().toLowerCase());
    }

    return false;
  });

  return (
    <div className="dashboard-section">
      <h1 className="dashboard-title">Uploaded Files</h1>

      {/* Search Filter */}
      <div className="dashboard-filter-group">
        <label className="dashboard-filter-label">Search by:</label>
        <select
          className="dashboard-input"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="upload_id">Upload ID</option>
          <option value="upload_name">File Name</option>
          <option value="student_id">Student ID</option>
          <option value="admin_id">Admin</option>
          <option value="course_id">Course</option>
          <option value="uploaded_state">Status</option>
          <option value="uploaded_type">Type</option>
          <option value="uploaded_datetime">Upload Date</option>
          <option value="doctor_name">Doctor</option>
          <option value="description">Description</option>
        </select>

        <input
          className="dashboard-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>

      {/* Table */}
      <table className="dashboard-table">
        <thead>
          <tr>
            {Object.keys(initialForm)
              .filter((field) => field !== "upload_url") // استبعاد العمود
              .map((field) => (
                <th key={field} className="dashboard-th">
                  {field}
                </th>
              ))}

            <th className="dashboard-th">Operation</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((f, index) => (
            <tr key={index}>
              {Object.entries(f)
                .filter(([key]) => key !== "upload_url")
                .map(([key, value]) => {
                  if (key === "uploaded_datetime") {
                    return (
                      <td key={key} className="dashboard-td">
                        {formatDateTime(value)}
                      </td>
                    );
                  }

                  if (key === "course_id") {
                    const matchedCourse = allCourses.find(
                      (course) => course.course_id === value
                    );
                    return (
                      <td key={key} className="dashboard-td">
                        {matchedCourse?.course_name || value}
                      </td>
                    );
                  }

                  return (
                    <td key={key} className="dashboard-td">
                      {value ?? "N/A"}
                    </td>
                  );
                })}

              <td className="dashboard-td">
                <div className="dashboard-operation-buttons">
                  <button
                    title="Accept"
                    className="dashboard-icon-button accept"
                    onClick={() => handleAccept(f)}
                  >
                    <DoneIcon className="dashboard-icon-button accept" />
                  </button>
                  <button
                    title="Reject"
                    className="dashboard-icon-button reject"
                    onClick={() => handleReject(f)}
                  >
                    <ClearIcon className="dashboard-icon-button reject" />
                  </button>
                  <button
                    title="View Material"
                    className="dashboard-icon-button view"
                    onClick={() => {
                      let originalUrl = f.upload_url;
                      const newUrl = "http://localhost:3000/" + originalUrl;
                      console.log("Opening URL:", newUrl);
                      window.open(newUrl, "_blank");
                    }}
                  >
                    <VisibilityIcon className="custom-visibility-icon" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirm Delete Modal */}
      {confirmItem && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal">
            <p>Are you sure you want to delete this file?</p>
            <button className="dashboard-button" onClick={confirmDelete}>
              Yes
            </button>
            <button className="dashboard-button" onClick={cancelDelete}>
              No
            </button>
          </div>
        </div>
      )}

      {/* Confirm Accept Modal */}
      {confirmAcceptItem && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal">
            <p>Are you sure you want to accept this file?</p>
            <button className="dashboard-button" onClick={confirmAccept}>
              Yes
            </button>
            <button className="dashboard-button" onClick={cancelAcceptReject}>
              No
            </button>
          </div>
        </div>
      )}

      {/* Confirm Reject Modal */}
      {confirmRejectItem && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal">
            <p>Are you sure you want to reject this file?</p>
            <button className="dashboard-button" onClick={confirmReject}>
              Yes
            </button>
            <button className="dashboard-button" onClick={cancelAcceptReject}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
