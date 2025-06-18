import axios from "axios";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import "./CardExam.css";
import React from "react";
import { UserContext } from "../../Context/UserContext";
import Swal from "sweetalert2";
import MultiInputAlert from "../MultiInputAlert/MultiInputAlert";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
export default function CardExam({
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
    const result = await MultiInputAlert({
      title: "تعديل بيانات الامتحان",
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
          label: "نوع الامتحان (منتصف / نهائي)",
          placeholder: "منتصف أو نهائي",
          value: midOrFinal,
        },
      ],
      validate: () => null,
    });

    if (result) {
      try {
        await axios.put(
          `http://localhost:3000/admin/exam-update/${id_type}`,
          {
            exam_name: result.nameOfMaterial,
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
          text: "تم تحديث بيانات الامتحان.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "فشل التعديل",
          text: "حدث خطأ أثناء تعديل الامتحان",
        });
      }
    }
  };

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
