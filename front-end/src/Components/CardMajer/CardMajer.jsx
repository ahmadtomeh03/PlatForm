import { useNavigate } from "react-router-dom";
import "./CardMajer.css";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import axios from "axios";
import React from "react";
import { UserContext } from "../../Context/UserContext";
import MultiInputAlert from "../MultiInputAlert/MultiInputAlert";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function CardMajer({
  nameOfMajer,
  collegeId,
  majorId,
  onDelete,
  onEdit,
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleToEdit = async () => {
    const result = await MultiInputAlert({
      title: "تعديل بيانات التخصص",
      inputs: [{ id: "name", placeholder: "اسم التخصص", value: nameOfMajer }],
      validate: () => null,
    });
    if (result) {
      try {
        await axios.put(
          `http://localhost:3000/admin/department-update/${majorId}`,
          { departments_name: result.name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onEdit(majorId, result.name);
        Swal.fire({
          icon: "success",
          title: "تم التعديل بنجاح",
          text: "تم تحديث بيانات الكلية.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "فشل التعديل",
          text: "حدث خطأ أثناء تعديل الكلية",
        });
      }
    }
  };
  const handleToDelete = () => {
    Swal.fire({
      title: "هل أنت متأكد من حذف القسم؟",
      text: "لا يمكنك التراجع عن هذه العملية!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذفه",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/admin/department-delete/${majorId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("College deleted successfully", response.data);
            onDelete(majorId);
            Swal.fire({
              icon: "success",
              title: "تم حذف القسم بنجاح",
              timer: 1000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            console.error("Error deleting college", error);
            Swal.fire({
              icon: "error",
              title: "حدث خطأ أثناء الحذف",
              text: error.response?.data?.message || "حاول مرة أخرى لاحقًا",
            });
          });
      }
    });
  };

  const handleToCourse = () => {
    navigate(`/college/${collegeId}/${majorId}`);
  };
  const { role } = React.useContext(UserContext);

  return (
    <div className="new-card w-full h-full flex flex-col justify-between">
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

      <div className="flex justify-center items-center flex-1 flex-col">
        <h2 className="new-card-title text-center">{nameOfMajer}</h2>
        {role === "superadmin" && (
          <h2 className="text-left">Department ID : {majorId}</h2>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="explore-btn group"
          onClick={handleToCourse}
        >
          Show Material
          <svg
            className="explore-icon group-hover:rotate-90"
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
              className="fill-[var(--color3)] group-hover:fill-[var(--color3)]"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
