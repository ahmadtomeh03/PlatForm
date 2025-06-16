import axios from "axios";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import "./CardExam.css";
import React from "react";
import { UserContext } from "../../Context/UserContext";
export default function CardExam({
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
      .delete(`http://localhost:3000/admin/exam-delete/${id_type}`, {
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
    <div>
      <div className="exam-card">
        <div className="exam-card-details">
          {role == "superadmin" && (
              <ButtonDelete handleToDelete={handleToDelete}/>
          )}
          <p className="exam-text-title text-lg ">{nameOfMaterial}</p>
          <p className="exam-text-body">{midOrFinal}</p>
          <h3>{nameOfDector}</h3>
        </div>
        <button className="exam-card-button" onClick={onToggle}>
          {isOpen ? "Hide" : "View"}
        </button>
      </div>
    </div>
  );
}
