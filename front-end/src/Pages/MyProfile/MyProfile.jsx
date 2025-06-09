import React, { useContext, useEffect, useState } from "react";
import "./MyProfile.css";
import NavbarLoggedIn from "../../Components/Navbar/LoginBar";
import CardMatirial from "../../Components/Card/CardMatirial";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";

const ProfilePage = () => {
  const { role } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [tempInfoStd, setTempInfoStd] = useState({});
  const [tempInfoAdm, setTempInfoAdm] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (role === "student") {
      axios
        .get("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data.data);
          setTempInfoStd(response.data.data);
        })
        .catch((error) => {
          console.error("Failed to fetch profile data:", error);
        });
    } else {
      let isAdmin = true;
      axios
        .get("http://localhost:3000/admin-profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data.data[0]);
          setTempInfoAdm(response.data.data[0]);
        })
        .catch((error) => {
          console.error("Failed to fetch profile data:", error);
        });
    }
  }, [role]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (role === "student") {
      setTempInfoStd((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setTempInfoAdm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveClick = () => {
    setEditMode(false);
    // You can also send PATCH/PUT request here to save
  };

  const handleCancelClick = () => {
    setEditMode(false);
    // Optional: refetch from server or reset to old values
  };

  return (
    <div>
      <div className="profile-container">
        {/* Left Panel */}
        <div className="left-panel">
          <img
            src="https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
            alt="Profile"
            className="profile-image"
          />
          <h2 style={{ marginLeft: "25px" }}>
            {role === "student"
              ? tempInfoStd.student_username
              : tempInfoAdm.admin_username}
          </h2>

          <div className="profile-section">
            <div className="about-header">
              <h3 className="profile-heading">About</h3>
              <button className="edit-button" onClick={handleEditClick}>
                Edit
              </button>
            </div>

            {role === "student" ? (
              <>
                <p>
                  <span className="profile-label">Email:</span>{" "}
                  {tempInfoStd.student_email}
                </p>
                <p>
                  <span className="profile-label">Full Name:</span>{" "}
                  {tempInfoStd.student_name}
                </p>
                <p>
                  <span className="profile-label">Date Joined:</span>{" "}
                  {tempInfoStd.date_of_register?.slice(0, 10)}
                </p>
              </>
            ) : (
              <>
                <p>
                  <span className="profile-label">Email:</span>{" "}
                  {tempInfoAdm.admin_email}
                </p>
                <p>
                  <span className="profile-label">Full Name:</span>{" "}
                  {tempInfoAdm.admin_name}
                </p>
                <p>
                  <span style={{width:"125px"}} className="profile-label">Date Registered:</span>{" "}
                  {tempInfoAdm.date_of_register?.slice(0, 10)}
                </p>

                <p>
                  <span style={{width:"125px"}} className="profile-label">Department ID:</span>{" "}
                  {tempInfoAdm.department_id}
                </p>

                <p>
                  <span  className="profile-label">Role:</span>{" "}
                  {tempInfoAdm.role}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="profile-section">
            <h3 className="profile-heading">{role} Schedule</h3>
            <div className="card-container">
              {/* Future: Add map rendering here */}
            </div>
          </div>

          <div className="profile-section">
            <h3 className="profile-heading">Favorite Courses</h3>
            <ul>
              {/* Future: Add map rendering here */}
            </ul>
          </div>

          <div className="profile-section">
            <h3 className="profile-heading">Latest Used</h3>
            <ul>
              {/* Future: Add map rendering here */}
            </ul>
          </div>
        </div>

        {/* Edit Modal */}
        {editMode && (
          <>
            <div className="overlay" />
            <div className="edit-modal">
              <h3>Edit Profile Info</h3>
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={
                    role === "student"
                      ? tempInfoStd.student_email
                      : tempInfoAdm.admin_email
                  }
                  onChange={handleChange}
                />
              </label>
              <label>
                Full Name:
                <input
                  type="text"
                  name="name"
                  value={
                    role === "student"
                      ? tempInfoStd.student_name
                      : tempInfoAdm.admin_name
                  }
                  onChange={handleChange}
                />
              </label>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={
                    role === "student"
                      ? tempInfoStd.student_username
                      : tempInfoAdm.admin_username
                  }
                  onChange={handleChange}
                />
              </label>
              <div className="edit-modal-buttons">
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
