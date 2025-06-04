import React, { useState } from "react";
import Students from "./Students";
import Admins from "./Admins";
import Courses from "./Courses";
//  import "./dashboard.css";

function MainDashboard() {
  const [section, setSection] = useState("students");

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <button onClick={() => setSection("students")}>Students</button>
            </li>
            <li>
              <button onClick={() => setSection("admins")}>Admins</button>
            </li>
            <li>
              <button onClick={() => setSection("courses")}>Courses</button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        {section === "students" && <Students />}
        {section === "admins" && <Admins />}
        {section === "courses" && <Courses />}
      </main>
    </div>
  );
}

export default MainDashboard;
