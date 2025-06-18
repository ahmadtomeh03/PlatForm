import React, { useContext } from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Checked from "../Checked/Checked";
import { UserContext } from "../../Context/UserContext";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import MultiInputAlert from "../MultiInputAlert/MultiInputAlert";
import Swal from "sweetalert2";
import axios from "axios";
import "./Vedio.css";

export default function Vedio({
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
  const { role } = useContext(UserContext);

  const handleToEdit = async () => {
    const result = await MultiInputAlert({
      title: "تعديل بيانات الفيديو",
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
          label: "وصف الفيديو",
          placeholder: "وصف الفيديو",
          value: midOrFinal,
        },
      ],
      validate: () => null,
    });

    if (result) {
      try {
        await axios.put(
          `http://localhost:3000/admin/video-update/${id_type}`,
          {
            video_name: result.nameOfMaterial,
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
          text: "تم تحديث بيانات الفيديو.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "فشل التعديل",
          text: "حدث خطأ أثناء تعديل الفيديو.",
        });
      }
    }
  };

  const handleToDelete = () => {
    axios
      .delete(`http://localhost:3000/admin/video-delete/${id_type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        onDelete();
      })
      .catch((error) => {
        console.error("Error deleting video", error);
      });
  };

  return (
    <div className="vedio-card">
      <div className="vedio-card-details">
        {role === "superadmin" && (
          <div className="vedio-actions">
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
        <div className="vedio-header">
          <PlayCircleFilledWhiteIcon />
          <p className="vedio-title">{nameOfMaterial}</p>
        </div>
        <p className="vedio-description">{midOrFinal}</p>
        <h3 className="vedio-doctor">{nameOfDector}</h3>
      </div>
      <button className="vedio-button" onClick={onToggle}>
        {isOpen ? "Hide" : "View"}
      </button>
    </div>
  );
}
