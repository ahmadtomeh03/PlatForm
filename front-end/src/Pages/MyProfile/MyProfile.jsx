import React from 'react';
import './MyProfile.css';


const ProfilePage = () => {
  const profile = {
    name: "Izkhem Nafee",
    studnetId: "ERD246534",
    phone: "0594946930",
    email: "yasahmadtomeh@studens.ptuk.edu",
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
      { courseName: "Object Oriented Program", courseID: "13188837" },
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
        mCourseName: "Object Orientied Program",
        mUsed: "Final Exam Java 2022 first semster"
      }
    ]
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
        <h2>{profile.name}</h2>
        <p className="light-text">#{profile.studnetId}</p>

        <div className="profile-section">
          <h3 className="profile-heading">About</h3>
          <p><span className="profile-label">Phone:</span> {profile.phone}</p>
          <p><span className="profile-label">Email:</span> {profile.email}</p>
          <p><span className="profile-label">Student ID:</span> {profile.details.studnetNumber}</p>
        </div>

        <div className="profile-section">
          <h3 className="profile-heading">Details</h3>
          <p><span className="profile-label">Faculty:</span> {profile.details.facultyName}</p>
          <p><span className="profile-label">Major:</span> {profile.details.major}</p>
          <p><span className="profile-label">Advisor:</span> {profile.details.advisor}</p>
          <p><span className="profile-label">Status:</span> {profile.details.status}</p>
        </div>

        
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="profile-section">
          <h3 className="profile-heading">Student Schedule</h3>
          <table className="profile-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Course Instructor</th>
                <th>Course Time</th>
                <th>Course Location</th>
              </tr>
            </thead>
            <tbody>
              {profile.studentSchedule.map((course, index) => (
                <tr key={index}>
                  <td>{course.cID}</td>
                  <td>{course.cName}</td>
                  <td>{course.cInstructor}</td>
                  <td>{course.cTime}</td>
                  <td>{course.clocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="profile-section">
          <h3 className="profile-heading">Favorite Courses</h3>
          <table className="profile-table">
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
          </table>
        </div>

        <div className="profile-section">
          <h3 className="profile-heading">Latest Used</h3>
          <table className="profile-table">
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
