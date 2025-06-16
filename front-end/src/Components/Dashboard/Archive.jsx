import React, { useState } from "react";
import "./MainDashboard.css";

function Archive() {
  const [archives, setArchives] = useState([
    {
      content_id: "CNT123",
      type: "pdf",
      file_path: "http://example.com/report.pdf",
      deleted_by: "Admin1",
      deleted_at: "2024-06-10T15:30",
      original_data: "Assignment report content"
    }
  ]);

  const [searchBy, setSearchBy] = useState("content_id");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmItem, setConfirmItem] = useState(null); // لحفظ العنصر اللي نبي نرجعه

  const formatDateTime = (value) => {
    const date = new Date(value);
    return isNaN(date) ? "" : date.toLocaleString();
  };

  const filtered = archives.filter((f) =>
    f[searchBy]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fields = ["content_id", "type", "file_path", "deleted_by", "deleted_at", "original_data"];

  const requestRestore = (item) => {
    setConfirmItem(item); // نفتح المودال مع العنصر الحالي
  };

  const confirmRestore = () => {
    if (confirmItem) {
      setArchives(archives.filter((f) => f !== confirmItem));
      setConfirmItem(null);
    }
  };

  const cancelRestore = () => {
    setConfirmItem(null);
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
            <option key={field} value={field}>{field}</option>
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
              <th key={field} className="dashboard-th">{field}</th>
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
                <button
                  title="Restore"
                  className="dashboard-icon-button accept"
                  onClick={() => requestRestore(item)}
                >
                  ♻️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirm Modal */}
      {confirmItem && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal">
            <p>Are u sure you want to restore this file <strong>{confirmItem.content_id}</strong>?</p>
            <button className="dashboard-button" onClick={confirmRestore}>نعم</button>
            <button className="dashboard-button" onClick={cancelRestore}>لا</button>
          </div>
        </div>
      )} 
    </div>
  );
}

export default Archive;
