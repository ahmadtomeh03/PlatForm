import React, { useState } from 'react';
import './MyProfile.css';

const ProfilePage = () => {
  const profile = {
    name: "Izkhem Nafee",
    username: "Izkehm",
    datejoined: "2024/10/30",
    email: "ahmadtomeh@gmail.com",
    address: {
      street: "390 Market Street",
      city: "San Francisco, CA",
      zip: "94102"
    },
    details: {
      facultyName: "College of Engineering and Technology",
      major: "Computer System Engineering",
      status: "Regular",
      advisor: "Dr.Yazeed Sleet",
      studnetNumber: "202110871"
    },
    studentSchedule: [
      {
        cID: "13139487",
        cName: "Object Orientied Program",
        cInstructor: "Dr. Nael Salman ",
        cTime: "11AM - 12 PM 'Sun,Tues,Th' ",
        clocation: "H021"
      },
      {
        cID: "13137787",
        cName: "Data Structure",
        cInstructor: "Dr. Nael Salman",
        cTime: "10AM - 11AM 'Sun,Tues,Th' ",
        clocation: "H012"
      }
    ],
    activity: [
      { courseName: "Data Structre", courseID: "13139837" },
      { courseName: "OOP", courseID: "13188837" },
      { courseName: "Digital", courseID: "13299807" }
    ],
    studentUsed: [
      {
        mID: "#128930EA",
        mCourseName: "Engineering Economics",
        mUsed: "Summary of engineering economics by Saeed Jaber 2022"
      },
      {
        mID: "#128989EA",
        mCourseName: "OOP",
        mUsed: "Final Exam Java 2022 first semster"
      }
    ]
  };

  const [editMode, setEditMode] = useState(false);
  const [tempInfo, setTempInfo] = useState({
    name: profile.name,
    email: profile.email,
    datejoined: profile.datejoined
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveClick = () => {
    profile.name = tempInfo.name;
    profile.email = tempInfo.email;
    profile.datejoined = tempInfo.datejoined;
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setTempInfo({
      name: profile.name,
      email: profile.email,
      datejoined: profile.datejoined
    });
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      {/* Left Panel */}
      <div className="left-panel">
        <img
          src="https://upload.wikimedia.org/wikipedia/ar/0/0c/%D8%B4%D8%B9%D8%A7%D8%B1_%D9%83%D8%AA%D8%A7%D8%A6%D8%A8_%D8%A7%D9%84%D9%82%D8%B3%D8%A7%D9%85.png"
          alt="Profile"
          className="profile-image"
        />
        <h2>{profile.username}</h2>

        <div className="profile-section">
          <div className="about-header">
            <h3 className="profile-heading">About</h3>
            <button className="edit-button" onClick={handleEditClick}>
              Edit
            </button>
          </div>

          <p><span className="profile-label">Email:</span> {profile.email}</p>
          <p><span className="profile-label">Full Name:</span> {profile.name}</p>
          <p><span className="profile-label">Date Joined:</span> {profile.datejoined}</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        {/* Student Schedule as Cards */}
        <div className="profile-section">
          <h3 className="profile-heading">Student Schedule</h3>
          <div className="card-container">
            {profile.studentSchedule.map((course, index) => (
              <div className="course-card" key={index}>
                <h4>{course.cName}</h4>
                <p><strong>ID:</strong> {course.cID}</p>
                <p><strong>Instructor:</strong> {course.cInstructor}</p>
                <p><strong>Time:</strong> {course.cTime}</p>
                <p><strong>Location:</strong> {course.clocation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Courses */}
        <div className="profile-section">
          <h3 className="profile-heading">Favorite Courses</h3>
          {/* <table className="profile-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
              </tr>
            </thead>
            <tbody>
              {profile.activity.map((c, index) => (
                <tr key={index}>
                  <td>{c.courseID}</td>
                  <td>{c.courseName}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>

        {/* Latest Used */}
        <div className="profile-section">
          <h3 className="profile-heading">Latest Used</h3>
          {/* <table className="profile-table">
            <thead>
              <tr>
                <th>Material ID</th>
                <th>Course Name</th>
                <th>Material Used</th>
              </tr>
            </thead>
            <tbody>
              {profile.studentUsed.map((material, index) => (
                <tr key={index}>
                  <td>{material.mID}</td>
                  <td>{material.mCourseName}</td>
                  <td>{material.mUsed}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <>
          <div className="overlay" />
          <div className="edit-modal">
            <h3>Edit Profile Info</h3>
            <label>Email:
              <input
                type="text"
                name="email"
                value={tempInfo.email}
                onChange={handleChange}
              />
            </label>
            <label>Full Name:
              <input
                type="text"
                name="name"
                value={tempInfo.name}
                onChange={handleChange}
              />
            </label>
            <label>Date Joined:
              <input
                type="text"
                name="datejoined"
                value={tempInfo.datejoined}
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
  );
};

export default ProfilePage;
