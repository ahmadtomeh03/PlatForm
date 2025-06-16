import axios from "axios";
import "./Summaries.css";
import React from "react";
import { UserContext } from "../../Context/UserContext";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
export default function Summaries({
  nameOfMaterial,
  nameOfDector,
  midOrFinal,
  isOpen,
  onToggle,
  id_type,
  onDelete,
}) {
  const token = localStorage.getItem("token");
  const { role } = React.useContext(UserContext);

  const handleToDelete = () => {
    axios
      .delete(`http://localhost:3000/admin/summary-delete/${id_type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Exam deleted successfully", response.data);
        onDelete();
      })
      .catch((error) => {
        console.error("Error deleting exam", error);
      });
  };
  return (
    <div className="flex flex-col w-full h-full">
      <div className="card-sum">
        {role == "superadmin" && (
          <ButtonDelete handleToDelete={handleToDelete} />
        )}
        <div className="text">
          <span>{nameOfMaterial}</span>
          <p className="subtitle">{midOrFinal} Summaries</p>
          <h1
            className="text-[10px]"
            style={{ fontWeight: "normal", marginBottom: "5px" }}
          >
            {nameOfDector}
          </h1>
        </div>
        <div className="icons">
          <button className="btn" onClick={onToggle}>
            {isOpen ? "Hide" : "View"}
          </button>
        </div>
      </div>
    </div>
  );
}
