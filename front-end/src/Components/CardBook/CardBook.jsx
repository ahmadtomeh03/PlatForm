import axios from "axios";
import "./CardBook.css";
import React, { useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import Swal from "sweetalert2";
import MultiInputAlert from "../MultiInputAlert/MultiInputAlert";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Favourites from "../Favourites/Favourites";

export default function CardBook({
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
  const [favoriteId, setFavoriteId] = useState(null);
  // note : sure the if should add id of student
  useEffect(() => {
    axios
      .get("http://localhost:3000/favorite-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        const match = response.data.data.find(
          (fav) => fav.content_id === id_type && fav.content_type === "book"
        );
        console.log(match.favorite_id);
        if (match) {
          setFavoriteId(match.favorite_id);
        }
      })
      .catch((err) => {
        console.error("Error fetching favorites:", err);
      });
  }, [id_type, token]);

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
          label: "وصف الملف ",
          placeholder: "description",
          value: midOrFinal,
        },
      ],
      validate: () => null,
    });

    if (result) {
      try {
        await axios.put(
          `http://localhost:3000/admin/book-update/${id_type}`,
          {
            book_name: result.nameOfMaterial,
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
  const handleToFavourites = async () => {
    try {
      if (!favoriteId) {
        const res = await axios.post(
          "http://localhost:3000/favorite-create",
          {
            content_id: id_type,
            content_type: "book",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavoriteId(res.data.data[0]);
        console.log(res.data.data[0]);
        Swal.fire({
          icon: "success",
          title: "تمت الإضافة للمفضلة",
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        console.log(favoriteId);
        await axios.delete(
          `http://localhost:3000/favorite-delete/${favoriteId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavoriteId(null);
        Swal.fire({
          icon: "success",
          title: "تم الحذف من المفضلة",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "خطأ في المفضلة",
        text: error.response?.data?.message || "حدث خطأ ما",
      });
    }
  };

  return (
    <div className="card-book">
      <div className="exam-card-details">
        <div className="flex justify-between items-center w-full gap-4">
          {role === "superadmin" && (
            <>
              <div className="flex-1 flex justify-start">
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
              </div>

              <div className="flex-1 flex justify-center">
                <ButtonDelete handleToDelete={handleToDelete} />
              </div>
            </>
          )}
          {["superadmin", "student", "admin"].includes(role) && (
            <div className="flex-1 flex justify-end">
              <Favourites
                isFavourite={!!favoriteId}
                onToggleFavourite={handleToFavourites}
              />
            </div>
          )}
        </div>

        <p className="card-title">📄 {nameOfMaterial}</p>
        <p className="card-description">📝 {midOrFinal} Summary</p>
        {/* <p className="card-doctor">👨‍🏫 {nameOfDector}</p> */}
      </div>
      <button class="card-btn-book" onClick={onToggle}>
        {isOpen ? "Hide" : "View"}
      </button>
    </div>
  );
}
