import React, { useEffect, useState } from "react";
import "./MainDashboard.css";
import axios from "axios";

function Archive() {
  const [archives, setArchives] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/list-archive", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("get archive successfully", response.data.data);
        setArchives(response.data.data);
      })
      .catch((error) => {
        console.error("error getting archive", error);
      });
  }, []);

  const [searchBy, setSearchBy] = useState("content_id");
  const [searchQuery, setSearchQuery] = useState("");

  // For Restore confirmation
  const [confirmRestoreItem, setConfirmRestoreItem] = useState(null);
  // For Delete confirmation
  const [confirmDeleteItem, setConfirmDeleteItem] = useState(null);

  const formatDateTime = (value) => {
    const date = new Date(value);
    return isNaN(date) ? "" : date.toLocaleString();
  };

  const fields = [
    "id",
    "content_id",
    "content_type",
    "file_path",
    "deleted_by",
    "deleted_at",
    "original_data",
  ];

  const filtered = archives.filter((f) =>
    f[searchBy]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Restore handlers
  const requestRestore = (item) => {
    setConfirmRestoreItem(item);
  };

  const confirmRestore = () => {
    if (!confirmRestoreItem) return;
  
    axios
      .post(
        `http://localhost:3000/admin/restore-archive/${confirmRestoreItem.id}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Archive restored successfully", response.data);
        setArchives(archives.filter((f) => f.id !== confirmRestoreItem.id));
        setConfirmRestoreItem(null);
        alert("Archive restored successfully");
      })
      .catch((error) => {
        console.error("Error restoring archive", error);
        alert("Failed to restore archive.");
      });
  };
  

  const cancelRestore = () => {
    setConfirmRestoreItem(null);
  };

  // Delete handlers
  const requestDelete = (item) => {
    console.log(item);
    
    setConfirmDeleteItem(item);
  };

  const confirmDelete = () => {
    console.log(confirmDeleteItem.id)
    axios
    .delete(`http://localhost:3000/admin/delete-archive/${confirmDeleteItem.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Archive deleted successfully", response.data);
      setArchives(archives.filter((s) => s.id !== confirmDeleteItem.id));
      setConfirmDeleteItem(null);
      alert("Archive deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting Archive", error);
      alert("Failed to delete Archive.");
    });
    if (confirmDeleteItem) {
      setArchives(archives.filter((f) => f !== confirmDeleteItem));
      setConfirmDeleteItem(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteItem(null);
  };

  return (
    <div className="dashboard-section">
      <h1 className="dashboard-title">Archived Files</h1>

      {/* Search Filter */}
      <div className="dashboard-filter-group">
        <label className="dashboard-filter-label">Search by:</label>
        <select
          className="dashboard-input"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          {fields.map((field) => (
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
            {fields.map((field) => (
              <th key={field} className="dashboard-th">
                {field}
              </th>
            ))}
            <th className="dashboard-th">Operation</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, index) => (
            <tr key={index}>
              {fields.map((key) => (
                <td key={key} className="dashboard-td">
                  {key === "deleted_at" ? formatDateTime(item[key]) : item[key]}
                </td>
              ))}
              <td className="dashboard-td">
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>    
                <button
                  title="Restore"
                  className="dashboard-icon-button accept"
                  onClick={() => requestRestore(item)}
                >
                  ♻️
                </button>
                <button
                  title="Delete"
                  className="dashboard-icon-button delete"
                  onClick={() => requestDelete(item)}
                >
                  🗑️
                </button>
                <button
                        title="View Material"
                        className="dashboard-icon-button view"
                        onClick={() => {
                            const originalUrl = item.file_path || item.upload_url || "";
                            const newUrl = `http://localhost:3000/${originalUrl}`;
                            console.log("Opening URL:", newUrl);
                            window.open(newUrl, "_blank");
                        }}
                        >
                        👁️
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirm Restore Modal */}
      {confirmRestoreItem && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal">
            <p>
              Are you sure you want to restore this file{" "}
              <strong>{confirmRestoreItem.content_id}</strong>?
            </p>
            <button className="dashboard-button" onClick={confirmRestore}>
              Yes
            </button>
            <button className="dashboard-button" onClick={cancelRestore}>
              No
            </button>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDeleteItem && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal">
            <p>
              Are you sure you want to permanently delete this file{" "}
              <strong>{confirmDeleteItem.content_id}</strong>?
            </p>
            <button className="dashboard-button" onClick={confirmDelete}>
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

export default Archive;
