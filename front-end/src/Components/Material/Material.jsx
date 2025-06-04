import CardMatirial from "../Card/CardMatirial";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonBack from "../GoBack/ButtonBack";
export default function Material() {
  const navigate = useNavigate();
  const { majorId } = useParams();
  const { collegeId } = useParams();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/list-courses-departments?department_id=${majorId}`
      )
      .then((res) => {
        console.log("API Response:", res.data), setCourses(res.data.data);
      })
      .catch((err) => console.error(err));
  }, [majorId]);
  const listOfMaterial = courses.map((material) => {
    return (
      <div
        onClick={() => {
          navigate(`/college/${collegeId}/${majorId}/${material.course_id}`);
        }}
      >
        <CardMatirial
          nameOfCourse={material.course_name}
          description={material.course_note}
          courseId={material.course_id}
        />
      </div>
    );
  });
  return (
    <>
      <div
        onClick={() => {
          navigate(`/college/${collegeId}`);
        }}
        style={{ margin: "20px" }}
      >
        <ButtonBack to={`Back To Courses`} />
      </div>
      <div
        className="flex flex-row flex-wrap items-center justify-center gap-5"
        style={{ margin: "20px" }}
      >
        {listOfMaterial}
      </div>
    </>
  );
}
