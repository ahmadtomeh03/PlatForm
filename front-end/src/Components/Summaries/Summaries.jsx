import axios from "axios";
import "./Summaries.css";
import React from "react";
import { UserContext } from "../../Context/UserContext";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import Swal from "sweetalert2";
import MultiInputAlert from "../MultiInputAlert/MultiInputAlert";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
export default function Summaries({
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
          label: "وصف عن الملف ",
          placeholder: "description",
          value: midOrFinal,
        },
      ],
      validate: () => null,
    });

    if (result) {
      try {
        await axios.put(
          `http://localhost:3000/admin/summary-update/${id_type}`,
          {
            summary_name: result.nameOfMaterial,
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
          text: "تم تحديث بيانات بنجاح.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "فشل التعديل",
          text: "حدث خطأ أثناء تعديل البيانات",
        });
      }
    }
  };

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
