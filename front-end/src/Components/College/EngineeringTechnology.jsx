import { Link } from "react-router-dom";
import React, { useState } from "react";
import Majer from "../Majer/Majer";
import { faculties } from "./faculties";
import { listOfMajerEngineering } from "./MajerEngineering";
export default function EngineeringTechnology() {
  const [selectedFaculty, setSelectedFaculty] = useState(
    faculties.find((f) => f.path === "tech")
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (faculty) => {
    setSelectedFaculty(faculty);
    setShowDropdown(false);
  };

  const listOfMajer = listOfMajerEngineering.map((majer) => {
    return (
      <Majer nameOfMajer={majer.nameOfMajer} decription={majer.decription} />
    );
  });
  return (
    <div className="p-4 relative">
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.49)",
            backdropFilter: "blur(4px)",
            zIndex: 10,
          }}
          onClick={() => setShowDropdown(false)}
        ></div>
      )}

      <div
        className="relative inline-block text-right "
        style={{ margin: "10px", zIndex: 20 }}
      >
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="rounded-xl text-white px-6 py-3 w-[220px] flex justify-between items-center shadow-lg curser-pointer"
          style={{
            backgroundColor: "#2185D5",
            padding: "10px",
          }}
        >
          <span className="text-sm font-semibold">{selectedFaculty.name}</span>
          <span>{selectedFaculty.icon}</span>
        </button>

        {showDropdown && (
          <div
            style={{
              position: "absolute",
              zIndex: 30,
              marginTop: "8px",
              width: "220px",
              borderRadius: "12px",
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              padding: "10px",
            }}
          >
            {faculties
              .filter((f) => f.path !== selectedFaculty.path)
              .map((faculty, index) => (
                <Link
                  key={index}
                  to={`/college/${faculty.path}`}
                  onClick={() => handleSelect(faculty)}
                >
                  <div
                    className="text-right flex justify-between items-center"
                    style={{
                      padding: "10px",
                      color: "#303841",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      borderRadius: "8px",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f3f3f3")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <span>{faculty.name}</span>
                    {faculty.icon}
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
      {listOfMajer}
    </div>
  );
}
