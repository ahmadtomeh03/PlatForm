import axios from "axios";
import "./CardSlides.css";
import React from "react";
import { UserContext } from "../../Context/UserContext";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

export default function CardSlides({
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
      .delete(`http://localhost:3000/admin/slide-delete/${id_type}`, {
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
    <div className="card-slide">
      <div className="card-bg-slide">
        {role == "superadmin" && (
          <ButtonDelete handleToDelete={handleToDelete} />
        )}
        <div className="card-content-slide">
          <h1 className="material-name-slide">{nameOfMaterial}</h1>
          <p className="exam-type-slide">{midOrFinal}</p>
          <div className="doctor-info-slide">
            <span className="doctor-label-slide">By:</span>
            <h3 className="doctor-name-slide">{nameOfDector}</h3>
          </div>
          <button className="btn-slide" onClick={onToggle}>
            {isOpen ? "Hide" : "View"}
          </button>
        </div>
      </div>
      <div className="blob-slide"></div>
    </div>
  );
}
