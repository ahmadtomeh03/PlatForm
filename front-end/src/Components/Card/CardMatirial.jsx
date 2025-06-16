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
  studentCourseId,
  onBookmarkToggle,
}) {
  const navigate = useNavigate();
  const { isLogin, role } = useContext(UserContext);
  const studentId = localStorage.getItem("student_id");
  const token = localStorage.getItem("token");

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [studentCourse, setStudentCourse] = useState({
    student_id: null,
    course_id: null,
  });
  const [studentCourseIdState, setStudentCourseIdState] = useState(
    studentCourseId || null
  );

  useEffect(() => {
    if (studentId && courseId) {
      setStudentCourse({
        student_id: parseInt(studentId),
        course_id: parseInt(courseId),
      });

      const savedCourses =
        JSON.parse(localStorage.getItem("bookmarkedCourses")) || [];
      setIsBookmarked(savedCourses.includes(courseId));
      setStudentCourseIdState(studentCourseId);
    }
  }, [studentId, courseId, studentCourseId]);

  const handleClick = () => {
    navigate("details");
  };

  const handleToToggleBookmark = async (e) => {
    e.stopPropagation();

    if (!isBookmarked) {
      try {
        const res = await axios.post(
          "http://localhost:3000/student-course-create",
          studentCourse,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIsBookmarked(true);

        const returnedId = res?.data?.data?.SC_id || res?.data?.SC_id;
        if (returnedId) setStudentCourseIdState(returnedId);

        const savedCourses =
          JSON.parse(localStorage.getItem("bookmarkedCourses")) || [];
        if (!savedCourses.includes(courseId)) {
          savedCourses.push(courseId);
          localStorage.setItem(
            "bookmarkedCourses",
            JSON.stringify(savedCourses)
          );
        }

        if (onBookmarkToggle) {
          onBookmarkToggle(courseId, true, returnedId);
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    } else {
      if (!studentCourseIdState) {
        console.warn("studentCourseId غير موجود، لا يمكن الحذف.");
        return;
      }

      try {
        await axios.delete(
          `http://localhost:3000/student-course-delete/${studentCourseIdState}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIsBookmarked(false);
        setStudentCourseIdState(null);

        const savedCourses =
          JSON.parse(localStorage.getItem("bookmarkedCourses")) || [];
        const updatedCourses = savedCourses.filter((id) => id !== courseId);
        localStorage.setItem(
          "bookmarkedCourses",
          JSON.stringify(updatedCourses)
        );

        if (onBookmarkToggle) {
          onBookmarkToggle(courseId, false, studentCourseIdState);
        }
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

        {role === "superadmin" && (
          <div onClick={handleToDelete}>
            <ButtonDelete />
          </div>
        )}

        {isLogin && (
          <div className="card__menu-buttons">
            <button
              className="btn-save"
              title={isBookmarked ? "إلغاء الحفظ" : "حفظ المادة"}
              onClick={handleToToggleBookmark}
              style={{
                backgroundColor: isBookmarked ? "#4caf50" : "var(--menu-bg)",
              }}
            >
              <BookmarkAddIcon
                style={{ color: isBookmarked ? "white" : "var(--bg-color)" }}
              />
            </button>
          </div>
        )}

        {role === "superadmin" && (
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
      <div className="card__subtitle">{description}</div>
      <div className="card__indicator">
        <span className="card__indicator-percentage">45%</span>
      </div>
      <div className="card__progress">
        <progress
          max="100"
          value="45"
          aria-label="Progress of works completed"
        ></progress>
      </div>
    </div>
  );
}
