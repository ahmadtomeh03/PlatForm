import React, { useContext, useState } from "react";
import Students from "./Students";
import Admins from "./Admins";
import Courses from "./Courses";
import "./MainDashboard.css";
import Upload from "./Upload";
import Archive from "./Archive";
import { UserContext } from "../../Context/UserContext";

function MainDashboard() {
  const { role } = useContext(UserContext);
  const defaultSelection = role === "admin" ? "upload" : "students";
  const [section, setSection] = useState(defaultSelection);

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        {role === "admin" ? (
          <h2 className="dashboard-sidebar-title">Admin Panel</h2>
        ) : (
          <h2 className="dashboard-sidebar-title">Super Admin Panel</h2>
        )}

        <nav className="dashboard-nav">
          {role === "admin" ? (
            <button onClick={() => setSection("upload")}>Uploaded</button>
          ) : (
            <div>
              <button onClick={() => setSection("students")}>Students</button>
              <button onClick={() => setSection("admins")}>Admins</button>
              <button onClick={() => setSection("courses")}>Courses</button>
              <button onClick={() => setSection("upload")}>Uploaded</button>
              <button onClick={() => setSection("Archive")}>Archived</button>
            </div>
          )}
        </nav>
      </aside>
      <main className="dashboard-main-content">
        {role === "admin" ? (
          <div>{section === "upload" && <Upload />}</div>
        ) : (
          <div>
            {section === "students" && <Students />}
            {section === "admins" && <Admins />}
            {section === "courses" && <Courses />}
            {section === "upload" && <Upload />}
            {section === "Archive" && <Archive />}
          </div>
        )}
      </main>
    </div>
  );
}

export default MainDashboard;
