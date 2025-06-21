import "./CardMatirial.css";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function CardMatirial({
  nameOfCourse,
  description,
  courseId,
  dc_id,
  onDeleteSuccess,
  onEdit,
  dc_type,
  initialSaveIdFromProps,
  onRemoveFavorite,
  showAction = true,
}) {
  const navigate = useNavigate();
  const { isLogin, role } = useContext(UserContext);
  const studentId = localStorage.getItem("student_id");
  const token = localStorage.getItem("token");
  const [saveId, setSaveId] = useState(initialSaveIdFromProps || null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/student-course-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        const match = response.data.data.find((fav) => fav.course_id === dc_id);
        console.log(match);
        if (match) {
          setSaveId(match.SC_id);
        }
      })
      .catch((err) => {
        console.error("Error fetching favorites:", err);
      });
  }, [dc_id, token]);
  const handleClick = () => {
    navigate("details");
  };

  const handleToToggleBookmark = async (e) => {
    e.stopPropagation();
    if (!saveId) {
      try {
        const res = await axios.post(
          "http://localhost:3000/student-course-create",
          {
            course_id: courseId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSaveId(res.data.data);
        Swal.fire({
          icon: "success",
          title: "تمت الإضافة للمفضلة",
          timer: 1000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    } else {
      try {
        await axios.delete(
          `http://localhost:3000/student-course-delete/${saveId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire({
          icon: "success",
          title: "تم الحذف من المفضلة",
          timer: 1000,
          showConfirmButton: false,
        });
        if (onRemoveFavorite) {
          onRemoveFavorite(saveId);
        }
        setSaveId(null);

        // استدعاء callback لإزالة المادة من قائمة المفضلة في الصفحة الأب
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }
  };

  const handleToEdit = () => {
    const requirementOptions = [
      "University Requirement (Mandatory)",
      "University Requirement (Optional)",
      "College Requirement (Mandatory)",
      "Major Requirement (Mandatory)",
      "Major Requirement (Optional)",
      "Remedial Requirement (Mandatory)",
    ]
      .map(
        (type) =>
          `<option value="${type}" ${
            dc_type === type ? "selected" : ""
          }>${type}</option>`
      )
      .join("");

    Swal.fire({
      title: "تعديل نوع المتطلب",
      html: `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <label>اسم المادة:</label>
          <input id="swal-course-name" class="swal2-input" value="${nameOfCourse}" readonly>

          <label>نوع المتطلب الحالي:</label>
          <input id="swal-current-type" class="swal2-input" value="${dc_type}" readonly>

          <label for="swal-requirement">اختر نوع المتطلب الجديد:</label>
          <select id="swal-requirement" class="swal2-select">
            <option value="">اختر النوع</option>
            ${requirementOptions}
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "تحديث",
      preConfirm: () => {
        const newType = document.getElementById("swal-requirement").value;
        if (!newType) {
          Swal.showValidationMessage("يرجى اختيار نوع المتطلب الجديد");
          return;
        }
        return { newType };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `http://localhost:3000/admin/updateDc/${dc_id}`,
            { dc_type: result.value.newType },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "تم التعديل",
              text: "تم تعديل نوع المتطلب بنجاح",
              timer: 2000,
              showConfirmButton: false,
            });
            if (onEdit) {
              onEdit(courseId, nameOfCourse, description, result.value.newType);
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "خطأ",
              text: "حدث خطأ أثناء التعديل",
            });
          });
      }
    });
  };

  const handleToDelete = (e) => {
    e.stopPropagation();
    Swal.fire({
      title: "هل أنت متأكد من حذف المادة؟",
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
          .delete(`http://localhost:3000/admin/deleteDC/${dc_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            if (onDeleteSuccess) {
              onDeleteSuccess(dc_id);
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "خطأ",
              text: "حدث خطأ أثناء الحذف",
            });
          });
      }
    });
  };

  return (
    <div
      className="card flex flex-col justify-around"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card__wrapper">
        <div className="card___wrapper-acounts">
          <div className="card__acounts">{nameOfCourse.charAt(0)}</div>
        </div>

        {role === "superadmin" && showAction === true && (
          <div onClick={handleToDelete}>
            <ButtonDelete />
          </div>
        )}

        {isLogin && (
          <div className="card__menu-buttons">
            <button
              className="btn-save"
              title={saveId ? "إلغاء الحفظ" : "حفظ المادة"}
              onClick={handleToToggleBookmark}
              style={{
                backgroundColor: saveId ? "#4caf50" : "var(--menu-bg)",
              }}
            >
              <BookmarkAddIcon style={{ color: "white" }} />
            </button>
          </div>
        )}

        {role === "superadmin" && showAction === true && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleToEdit();
            }}
          >
            <IconButton aria-label="edit" size="large">
              <EditNoteIcon fontSize="inherit" />
            </IconButton>
          </div>
        )}
      </div>

      <div className="card__title">{nameOfCourse}</div>
      <div className="card__subtitle">
        <span style={{ fontWeight: "bold" }}>Description : </span>
        <span>{description}</span>
      </div>

      <div className="card__subtitle">{dc_type}</div>
    </div>
  );
}
