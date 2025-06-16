import axios from "axios";
import "./CardBook.css";
import React from "react";
import { UserContext } from "../../Context/UserContext";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
export default function CardBook({
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
      .delete(`http://localhost:3000/admin/book-delete/${id_type}`, {
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
    <div className="card-book">
      {role == "superadmin" && <ButtonDelete handleToDelete={handleToDelete} />}
      <p class="heading-book">{nameOfMaterial}</p>
      <p class="para-book">{midOrFinal} </p>
      <h3>{nameOfDector}</h3>
      <div class="overlay-book"></div>
      <button class="card-btn-book" onClick={onToggle}>
        {isOpen ? "Hide" : "View"}
      </button>
    </div>
  );
}
