import "./MainDashboard.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ClearIcon from '@mui/icons-material/Clear';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';


function Admins() {
  const [admins, setAdmins] = useState([]);
  const [promoteRole, setPromoteRole] = useState("admin");


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
  const confirmPromote = () => {
    axios
      .put(
        `http://localhost:3000/admin/change-role/${promoteId}`,
        {
          role: promoteRole,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Update UI
        setAdmins(
          admins.map((admin) =>
            admin.admin_id === promoteId
              ? { ...admin, role: promoteRole }
              : admin
          )
        );
        setPromoteId(null);
        setPromoteRole("admin");
  
        // ✅ Show success feedback
        Swal.fire({
          icon: "success",
          title: "تمت الترقية بنجاح",
          text: `تم تغيير دور المستخدم إلى ${promoteRole}.`,
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error("Promotion failed:", error);
  
        // ❌ Show error feedback
        Swal.fire({
          icon: "error",
          title: "فشل الترقية",
          text: "حدث خطأ أثناء محاولة ترقية المستخدم.",
        });
      });
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
  console.log(confirmId)
  const confirmDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/admins-delete/${confirmId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("Admin deleted successfully", response.data);
            setAdmins(admins.filter((s) => s.admin_id !== confirmId));
            setConfirmId(null);
  
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Admin has been deleted.",
              confirmButtonColor: "#3085d6",
            });
          })
          .catch((error) => {
            console.error("Error deleting admin", error);
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Failed to delete admin.",
              confirmButtonColor: "#d33",
            });
          });
      }
    });
  };
  const cancelDelete = () => setConfirmId(null);

  const handlePromoteClick = (id) => setPromoteId(id);
  const cancelPromote = () => {
    setPromoteId(null);
    setPromoteRole("admin");
  };

  const filtered = admins.filter((admin) =>
    admin[searchBy]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const promoteAdminName =
  promoteId != null
    ? admins.find((admin) => admin.id === promoteId || admin.admin_id === promoteId)?.admin_username || ""
    : "";

      
  return (
    <div className="dashboard-section">
      <h1 className="dashboard-title">Admins</h1>

      

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
                  onClick={() => handleDelete(admin.admin_id)}
                  title="Delete"
                >
                  <ClearIcon className="dashboard-icon-button reject"/>

                </button>
                <span
                  onClick={() => handlePromoteClick(admin.admin_id)}
                  className="promote-icon"
                  role="button"
                  tabIndex={0}
                  title="Promote"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlePromoteClick(admin.admin_id);
                  }}
                >
                  <ArrowUpwardSharpIcon/>
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
      {promoteId !== null && (
        <div className="dashboard-modal-overlay" role="dialog" aria-modal="true">
          <div className="dashboard-modal">
            <p>
              Promote <strong>{promoteAdminName}</strong> to <strong>?</strong>
            </p>
                  <select
                value={promoteRole}
                onChange={(e) => setPromoteRole(e.target.value)}
                className="dashboard-input"
                style={{ margin: "10px 0" }}
      >
        <option value="admin">Admin</option>
        <option value="superadmin">Superadmin</option>
      </select>

            <button className="dashboard-button confirm" onClick={confirmPromote}>
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
