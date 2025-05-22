import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import { faculties } from "./faculties";
import CardMajer from "../CardMajer/CardMajer";
import ComputerIcon from "@mui/icons-material/Computer";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import BuildIcon from "@mui/icons-material/Build";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SecurityIcon from "@mui/icons-material/Security";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

export default function EngineeringTechnology() {
  const listOfMajerEngineering = [
    {
      nameOfMajer: "Computer Engineering",
      decription:
        "Focuses on designing and developing computer systems, both hardware and software.",
      icon: <ComputerIcon fontSize="large" color="primary" />,
    },
    {
      nameOfMajer: "Electrical Engineering",
      decription:
        "Covers the principles and applications of electricity, electronics, and electromagnetism.",
      icon: <ElectricalServicesIcon fontSize="large" color="primary" />,
    },
    {
      nameOfMajer: "Mechatronics Engineering",
      decription:
        "Combines mechanical, electrical, and computer engineering to build smart systems and automation.",
      icon: <PrecisionManufacturingIcon fontSize="large" color="primary" />,
    },
    {
      nameOfMajer: "Telecommunication Engineering",
      decription:
        "Deals with the transmission of information across channels like cables, optical fiber, or air.",
      icon: <SettingsInputAntennaIcon fontSize="large" color="primary" />,
    },
    {
      nameOfMajer: "Sustainable Energy Engineering",
      decription:
        "Focuses on developing and applying renewable and efficient energy solutions.",
      icon: <EnergySavingsLeafIcon fontSize="large" color="primary" />,
    },
    {
      nameOfMajer: "Mechanical Engineering",
      decription:
        "Applies physics and materials science to design and manufacture mechanical systems.",
      icon: <BuildIcon fontSize="large" color="primary" />,
    },
    {
      nameOfMajer: "Civil Engineering",
      decription:
        "Involves designing, constructing, and maintaining infrastructure like roads and buildings.",
      icon: <EngineeringIcon fontSize="large" color="primary" />,
    },
    {
      nameOfMajer: "Architectural Engineering",
      decription:
        "Focuses on the engineering aspects of building design and construction.",
      icon: <ArchitectureIcon fontSize="large" color="primary" />,
    },
    {
      nameOfMajer: "Automotive Engineering",
      decription:
        "Specialized in the design, development, and maintenance of vehicles.",
      icon: <DirectionsCarIcon fontSize="large" color="primary" />,
    },
    {
      nameOfMajer: "Public Safety Engineering",
      decription:
        "Focuses on systems and designs that ensure public safety in various environments.",
      icon: <SecurityIcon fontSize="large" color="primary" />,
    },
    {
      nameOfMajer: "Sound Engineering",
      decription:
        "Covers the technology and techniques of recording, mixing, and reproducing sound.",
      icon: <GraphicEqIcon fontSize="large" color="primary" />,
    },
  ];

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
      <div style={{}}>
        <CardMajer
          nameOfMajer={majer.nameOfMajer}
          decription={majer.decription}
          icon={majer.icon}
        />
      </div>
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
      <div className="flex flex-row items-center justify-center gap-5 flex-wrap">
        {listOfMajer}
      </div>
    </div>
  );
}
