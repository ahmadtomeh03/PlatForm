import React, { useState } from "react";
import "./MyProfile.css";
import NavbarLoggedIn from "../../Components/Navbar/LoginBar";
import CardMatirial from "../../Components/Card/CardMatirial";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "Izkhem Nafee",
    username: "Izkehm",
    datejoined: "2024/10/30",
    email: "ahmadtomeh@gmail.com",
    address: {
      street: "390 Market Street",
      city: "San Francisco, CA",
      zip: "94102",
    },
    details: {
      facultyName: "College of Engineering and Technology",
      major: "Computer System Engineering",
      status: "Regular",
      advisor: "Dr.Yazeed Sleet",
      studnetNumber: "202110871",
    },
    studentSchedule: [
      {
        cID: "13139487",
        cName: "Object Orientied Program",
        cInstructor: "We use in this material Java language",
        cTime: "11AM - 12 PM 'Sun,Tues,Th' ",
        clocation: "H021",
      },
      {
        cID: "13137787",
        cName: "Data Structure",
        cInstructor:
          "In this course we use java language and use oop to create data structure",
        cTime: "10AM - 11AM 'Sun,Tues,Th' ",
        clocation: "H012",
      },
    ],
    activity: [
      { courseName: "Data Structre", courseID: "13139837" },
      { courseName: "OOP", courseID: "13188837" },
      { courseName: "Digital", courseID: "13299807" },
    ],
    studentUsed: [
      {
        mID: "#128930EA",
        mCourseName: "Engineering Economics",
        mUsed: "Summary of engineering economics by Saeed Jaber 2022",
      },
      {
        mID: "#128989EA",
        mCourseName: "OOP",
        mUsed: "Final Exam Java 2022 first semster",
      },
    ],
  });

  const [editMode, setEditMode] = useState(false);
  const [tempInfo, setTempInfo] = useState({
    name: profile.name,
    email: profile.email,
    datejoined: profile.datejoined,
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    setProfile((prev) => ({
      ...prev,
      name: tempInfo.name,
      email: tempInfo.email,
      datejoined: tempInfo.datejoined,
    }));
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setTempInfo({
      name: profile.name,
      email: profile.email,
      datejoined: profile.datejoined,
    });
    setEditMode(false);
  };

  return (
    <div>
      <NavbarLoggedIn />

      <div className="profile-container">
        {/* Left Panel */}
        <div className="left-panel">
          <img
            src="https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
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

            <p>
              <span className="profile-label">Email:</span> {profile.email}
            </p>
            <p>
              <span className="profile-label">Full Name:</span> {profile.name}
            </p>
            <p>
              <span className="profile-label">Date Joined:</span>{" "}
              {profile.datejoined}
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="profile-section">
            <h3 className="profile-heading">Student Schedule</h3>
            <div className="card-container">
              {profile.studentSchedule.map((course, index) => (
                <div className="course-card" key={index}>
                  <CardMatirial
                    description={course.cInstructor}
                    nameOfCourse={course.cName}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h3 className="profile-heading">Favorite Courses</h3>
            {/* You can uncomment and render the activity list here */}
          </div>

          <div className="profile-section">
            <h3 className="profile-heading">Latest Used</h3>
            {/* You can uncomment and render the studentUsed list here */}
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
                  value={tempInfo.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Full Name:
                <input
                  type="text"
                  name="name"
                  value={tempInfo.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Date Joined:
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
    </div>
  );
};

export default ProfilePage;
