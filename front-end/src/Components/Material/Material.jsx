import CardMatirial from "../Card/CardMatirial";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Material() {
  const { majorId } = useParams();
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
      <CardMatirial
        nameOfCourse={material.course_name}
        description={material.course_note}
      />
    );
  });
  return (
    <div
      className="flex flex-row flex-wrap items-center justify-center gap-5"
      style={{ margin: "20px" }}
    >
      {listOfMaterial}
    </div>
  );
}
