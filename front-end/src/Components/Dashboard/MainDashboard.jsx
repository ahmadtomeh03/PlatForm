import React, { useState } from "react";
import Students from "./Students";
import Admins from "./Admins";
import Courses from "./Courses";
import "./MainDashboard.css";
import Upload from "./Upload";

function MainDashboard() {
  const [section, setSection] = useState("students");

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-sidebar-title">Admin Panel</h2>
        <nav className="dashboard-nav">
          <button onClick={() => setSection("students")}>Students</button>
          <button onClick={() => setSection("admins")}>Admins</button>
          <button onClick={() => setSection("courses")}>Courses</button>
          <button onClick={() => setSection("upload")}>Uploaded</button>
        </nav>
      </aside>
      <main className="dashboard-main-content">
        {section === "students" && <Students />}
        {section === "admins" && <Admins />}
        {section === "courses" && <Courses />}
        {section ==="upload" && <Upload />}
      </main>
    </div>
  );
}

export default MainDashboard;
