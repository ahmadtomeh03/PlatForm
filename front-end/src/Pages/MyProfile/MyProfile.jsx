import React, { useContext, useEffect, useState } from "react";
import "./MyProfile.css";
import NavbarLoggedIn from "../../Components/Navbar/LoginBar";
import CardMatirial from "../../Components/Card/CardMatirial";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";

import Courses from "../../Components/Dashboard/Courses";

const ProfilePage = () => {
  const { role } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [tempInfoStd, setTempInfoStd] = useState({});
  const [tempInfoAdm, setTempInfoAdm] = useState({});
  const dateAdm = new Date(tempInfoAdm.date_of_register);
  const localDateAdm = dateAdm.toLocaleDateString('en-US', { timeZone: 'Asia/Gaza' });
  const dateStd = new Date(tempInfoStd.date_of_register);
  const localDateStd = dateStd.toLocaleDateString('en-US', { timeZone: 'Asia/Gaza' });
  const token = localStorage.getItem("token");
  const [studentCourses, setStudentCourses] = useState([]);
  const listOfStudentCourses= studentCourses.map((courses) =>{
    return <CardMatirial nameOfCourse={courses.course_name} description={""} courseId={courses.course_id}></CardMatirial>
  });
  useEffect(() => {
    axios.get("http://localhost:3000/student-course-list",{headers: { Authorization: `Bearer ${token}` }},)

    .then((response) => {
      
      console.log("student courses",response.data.data);
      setStudentCourses(response.data.data);
      console.log(studentCourses);
    })
    .catch((error) => {
      console.error("Failed to fetch profile data:", error);
    });




  },[])
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
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    if (role === "student") {
      const updatedStudentData = {
        student_name: tempInfoStd.student_name,
        student_email: tempInfoStd.student_email,
        student_username: tempInfoStd.student_username,
      };
  
      axios
        .put("http://localhost:3000/student/update-profile", updatedStudentData, { headers })
        .then((res) => {
          console.log("Student update successful:", res.data);
          setEditMode(false);
          return axios.get("http://localhost:3000/profile", { headers });
        })
        .then((res) => {
          setTempInfoStd(res.data.data);
        })
        .catch((err) => {
          console.error("Student update failed:", err.response?.data || err.message);
        });
    } else {
      const updatedAdminData = {
        admin_name: tempInfoAdm.admin_name,
        admin_email: tempInfoAdm.admin_email,
        admin_username: tempInfoAdm.admin_username,
      };
  
      axios
        .put("http://localhost:3000/admin/update-profile", updatedAdminData, { headers })
        .then((res) => {
          console.log("Admin update successful:", res.data);
          setEditMode(false);
          return axios.get("http://localhost:3000/admin-profile", { headers });
        })
        .then((res) => {
          setTempInfoAdm(res.data.data[0]);
        })
        .catch((err) => {
          console.error("Admin update failed:", err.response?.data || err.message);
        });
    }
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
                  {localDateStd}
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
                  {localDateAdm}
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
              
              {listOfStudentCourses}
              {console.log("saeed",studentCourses)}
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
                  name={role === "student" ? "student_email" : "admin_email"}
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
                  name={role === "student" ? "student_name" : "admin_name"}
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
                  name={role === "student" ? "student_username" : "admin_username"}
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
