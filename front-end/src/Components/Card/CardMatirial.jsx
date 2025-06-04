import "./CardMatirial.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CardMatirial({ nameOfCourse, description, courseId }) {
  const navigate = useNavigate();
  const { isLogin } = React.useContext(UserContext);
  const studentId = localStorage.getItem("student_id");
  const token = localStorage.getItem("token");

  const [studentCourse, setStudentCourse] = useState({
    student_id: null,
    course_id: null,
  });
  useEffect(() => {
    if (studentId && courseId) {
      setStudentCourse({
        student_id: parseInt(studentId),
        course_id: parseInt(courseId),
      });
    }
  }, [studentId, courseId]);

  const handleClick = () => {
    navigate("details");
  };

  const handleToSubmit = () => {
    axios
      .post("http://localhost:3000/student-course-create", studentCourse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response?.data || error.message);
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
        {isLogin && (
          <div className="card__menu-buttons">
            <button className="btn-save" title="Save" onClick={handleToSubmit}>
              <BookmarkAddIcon />
            </button>
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
