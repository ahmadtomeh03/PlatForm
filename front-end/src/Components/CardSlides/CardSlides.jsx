import axios from "axios";
import "./CardSlides.css";
import React, { useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import Swal from "sweetalert2";
import MultiInputAlert from "../MultiInputAlert/MultiInputAlert";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Favourites from "../Favourites/Favourites";

export default function CardSlides({
  nameOfMaterial,
  nameOfDector,
  midOrFinal,
  isOpen,
  onToggle, // to View file
  onClick, // to navigate the file from profile
  id_type,
  onDelete,
  onEdit,
  onDeleteProfile,
  showAction = true,
  type,
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
          (fav) => fav.content_id === id_type && fav.content_type === type
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
          `http://localhost:3000/admin/${type}-update/${id_type}`,
          {
            [`${type}_name`]: result.nameOfMaterial,
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

  const handleToFavourites = async () => {
    try {
      if (!favoriteId) {
        const res = await axios.post(
          "http://localhost:3000/favorite-create",
          {
            content_id: id_type,
            content_type: type,
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
        if (onDeleteProfile) onDeleteProfile();

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

  const handleToDelete = () => {
    Swal.fire({
      title: "هل أنت متأكد من حذف الملف",
      text: "لا يمكنك التراجع عن هذه العملية!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذفها",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/admin/${type}-delete/${id_type}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(" deleted successfully", response.data);
            onDelete();
            Swal.fire({
              icon: "success",
              title: "تم حذف الملف بنجاح",
              timer: 1000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            console.error("Error deleting ", error);
            Swal.fire({
              icon: "error",
              title: "حدث خطأ أثناء الحذف",
              text: error.response?.data?.message || "حاول مرة أخرى لاحقًا",
            });
          });
      }
    });
  };

  return (
    <div className="card-bg-slide">
      <div className="card-header-slide">
        <h1 className="slide-label">{type}</h1>

        <div className="action-group">
          {role === "superadmin" && showAction === true && (
            <>
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
            </>
          )}

          {["superadmin", "student", "admin"].includes(role) && (
            <Favourites
              isFavourite={!!favoriteId}
              onToggleFavourite={handleToFavourites}
            />
          )}
        </div>
      </div>

      <div className="card-content-slide">
        <div className="content-row">
          <span className="doctor-label-slide">Name of file:</span>
          <h1 className="material-name-slide">{nameOfMaterial}</h1>
        </div>

        <div className="content-row">
          <span className="doctor-label-slide">Description:</span>
          <p className="exam-type-slide">{midOrFinal}</p>
        </div>

        <div className="doctor-info-slide">
          <span className="doctor-label-slide">Doctor Name:</span>
          <h3 className="doctor-name-slide">{nameOfDector}</h3>
        </div>

        <button
          className="btn-slide"
          onClick={(e) => {
            e.preventDefault();
            if (onClick) onClick();
            else if (onToggle) onToggle();
          }}
        >
          {isOpen ? "Hide" : "View"}
        </button>
      </div>
    </div>
  );
}
