import React, { useContext, useState, useEffect } from "react";
import Students from "./Students";
import Admins from "./Admins";
import Courses from "./Courses";
import Upload from "./Upload";
import Archive from "./Archive";
import "./MainDashboard.css";
import { UserContext } from "../../Context/UserContext";
import { FiMenu } from "react-icons/fi";

function MainDashboard() {
  const { role } = useContext(UserContext);
  const defaultSelection = role === "admin" ? "upload" : "students";
  const [section, setSection] = useState(defaultSelection);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // show sidebar by default on desktop
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavClick = (sectionName) => {
    setSection(sectionName);
    if (isMobile) setSidebarOpen(false); // close sidebar after click on mobile
  };

  return (
    <div className="dashboard-container">
      {/* زر الهامبرغر يظهر فقط بالجوال */}
      {isMobile && (
        <button className="mobile-toggle-button" onClick={toggleSidebar}>
          <FiMenu />
        </button>
      )}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isMobile ? (sidebarOpen ? "open" : "hidden") : ""}`}>
        {role === "admin" ? (
          <h2 className="dashboard-sidebar-title">Admin Panel</h2>
        ) : (
          <h2 className="dashboard-sidebar-title">Super Admin Panel</h2>
        )}

        <nav className="dashboard-nav">
          {role === "admin" ? (
            <button onClick={() => handleNavClick("upload")}>Uploaded</button>
          ) : (
            <>
              <button onClick={() => handleNavClick("students")}>Students</button>
              <button onClick={() => handleNavClick("admins")}>Admins</button>
              <button onClick={() => handleNavClick("courses")}>Courses</button>
              <button onClick={() => handleNavClick("upload")}>Uploaded</button>
              <button onClick={() => handleNavClick("Archive")}>Archived</button>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main-content">
        {role === "admin" ? (
          section === "upload" && <Upload />
        ) : (
          <>
            {section === "students" && <Students />}
            {section === "admins" && <Admins />}
            {section === "courses" && <Courses />}
            {section === "upload" && <Upload />}
            {section === "Archive" && <Archive />}
          </>
        )}
      </main>
    </div>
  );
}

export default MainDashboard;
