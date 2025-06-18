import React, { useEffect, useState } from "react";
import "./MainDashboard.css";
import axios from "axios";

function Upload() {
  const [files, setFiles] = useState([]);
  const initialForm = {
    id: "",
    course_Id: "",
    std_id: "",
    admin_id: "",
    uploaded_state: "",
    uploaded_type: "",
    uploaded_datetime: "",
    upload_name: "",
    doctor_name: "",
    upload_url: "",
    description: "",
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/uploads-filter", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("get upload successfully", response.data.data);
        setFiles(response.data.data);
      })
      .catch((error) => {
        console.error("error getting upload", error);
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

  const confirmDelete = () => {
    setFiles(files.filter((f) => f !== confirmItem));
    setConfirmItem(null);
  };

  const cancelDelete = () => {
    setConfirmItem(null);
  };

  const handleAccept = (item) => {
    setConfirmAcceptItem(item);
  };

  const confirmAccept = () => {
    setFiles(
      files.map((f) =>
        f === confirmAcceptItem ? { ...f, uploaded_state: "accepted" } : f
      )
    );
    setConfirmAcceptItem(null);
  };

  const handleReject = (item) => {
    setConfirmRejectItem(item);
  };

  const confirmReject = () => {
    setFiles(
      files.map((f) =>
        f === confirmRejectItem ? { ...f, uploaded_state: "rejected" } : f
      )
    );
    setConfirmRejectItem(null);
  };

  const cancelAcceptReject = () => {
    setConfirmAcceptItem(null);
    setConfirmRejectItem(null);
  };

  const formatDateTime = (value) => {
    const date = new Date(value);
    return isNaN(date) ? "" : date.toLocaleString();
  };

  const filtered = files.filter((f) =>
    f[searchBy]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {Object.keys(initialForm).map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
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
            {Object.keys(initialForm).map((field) => (
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
              {Object.entries(f).map(([key, value]) => (
                <td key={key} className="dashboard-td">
                  {key === "uploaded_datetime" ? formatDateTime(value) : value}
                </td>
              ))}
              <td className="dashboard-td">
                <div className="dashboard-operation-buttons">
                  <button
                    title="Accept"
                    className="dashboard-icon-button accept"
                    onClick={() => handleAccept(f)}
                  >
                    ✅
                  </button>
                  <button
                    title="Reject"
                    className="dashboard-icon-button reject"
                    onClick={() => handleReject(f)}
                  >
                    ❌
                  </button>
                  <button
                    title="Delete"
                    className="dashboard-icon-button delete"
                    onClick={() => handleDelete(f)}
                  >
                    🗑
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
