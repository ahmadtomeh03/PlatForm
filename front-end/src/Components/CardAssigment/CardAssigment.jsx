import axios from "axios";
import "./CardAssigment.css";
import React from "react";
import { UserContext } from "../../Context/UserContext";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import Swal from "sweetalert2";
import MultiInputAlert from "../MultiInputAlert/MultiInputAlert";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
export default function CardAssigment({
  nameOfMaterial,
  nameOfDector,
  midOrFinal,
  isOpen,
  onToggle,
  id_type,
  onDelete,
  onEdit,
}) {
  const token = localStorage.getItem("token");
  const { role } = React.useContext(UserContext);
  const handleToEdit = async () => {
    console.log(id_type);
    const result = await MultiInputAlert({
      title: "تعديل بيانات الواجب",
      inputs: [
        {
          id: "nameOfMaterial",
          label: "اسم المادة",
          placeholder: "اسم المادة",
          value: nameOfMaterial,
        },
        {
          id: "nameOfDector",
          label: "اسم الدكتور",
          placeholder: "اسم الدكتور",
          value: nameOfDector,
        },
        {
          id: "midOrFinal",
          label: "وصف عن الملف ",
          placeholder: "description",
          value: midOrFinal,
        },
      ],
      validate: () => null,
    });

    if (result) {
      console.log(result);
      try {
        await axios.put(
          `http://localhost:3000/admin/assignment-update/${id_type}`,
          {
            assignment_name: result.nameOfMaterial,
            doctor_name: result.nameOfDector,
            description: result.midOrFinal,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onEdit({
          nameOfMaterial: result.nameOfMaterial,
          nameOfDector: result.nameOfDector,
          midOrFinal: result.midOrFinal,
        });

        Swal.fire({
          icon: "success",
          title: "تم التعديل بنجاح",
          text: "تم تحديث بيانات الواجب.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "فشل التعديل",
          text: "حدث خطأ أثناء تعديل الواجب",
        });
      }
    }
  };

  const handleToDelete = () => {
    axios
      .delete(`http://localhost:3000/admin/assignment-delete/${id_type}`, {
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
        {role === "superadmin" && (
          <div className="flex justify-between gap-2 mt-1 mb-2">
            <IconButton
              aria-label="edit"
              size="large"
              onClick={(e) => {
                e.preventDefault();
                handleToEdit();
              }}
            >
              <EditNoteIcon fontSize="inherit" />
            </IconButton>
            <ButtonDelete handleToDelete={handleToDelete} />
          </div>
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
