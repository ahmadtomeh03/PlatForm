import CardMatirial from "../Card/CardMatirial";
import { Await, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ButtonBack from "../GoBack/ButtonBack";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import SelectAlert from "../SelectAlert/SelectAlert";
import Swal from "sweetalert2";
import { UserContext } from "../../Context/UserContext";
export default function Material() {
  const navigate = useNavigate();
  const { majorId } = useParams();
  const { collegeId } = useParams();
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllcourses] = useState([]);
  const { role } = useContext(UserContext);

  const handleDeleteCourse = (dc_id) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.dc_id !== dc_id)
    );
  };
  const token = localStorage.getItem("token");
  const handleToAdd = async () => {
    const result = await SelectAlert({
      material: allCourses,
      placeholder: "Select a Material",
      validate: () => {
        return null;
      },
    });
    if (result) {
      console.log(result);
      Swal.fire("Success Add Material");
      axios
        .post(
          "http://localhost:3000/admin/link-course",
          {
            course_id: result.courseId,
            departments_id: majorId,
            dc_type: result.requirementType,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire("Cancelled", "You closed the alert", "info");
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses-filters`)
      .then((res) => {
        console.log("API Response:", res.data), setAllcourses(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);
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
          dc_id={material.dc_id}
          onDeleteSuccess={handleDeleteCourse}
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
      {role == "superadmin" && (
        <ButtonAdd handleToAdd={handleToAdd} type={"College"} />
      )}
      <div
        className="flex flex-row flex-wrap items-center justify-center gap-5"
        style={{ margin: "20px" }}
      >
        {listOfMaterial}
      </div>
    </>
  );
}
