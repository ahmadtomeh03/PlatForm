import CardMatirial from "../Card/CardMatirial";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ButtonBack from "../GoBack/ButtonBack";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import SelectAlert from "../SelectAlert/SelectAlert";
import Swal from "sweetalert2";
import { UserContext } from "../../Context/UserContext";

export default function Material() {
  const navigate = useNavigate();
  const { majorId, collegeId } = useParams();
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const { role } = useContext(UserContext);
  const [studentCourses, setStudentCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/student-course-list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStudentCourses(res.data.data);
      })
      .catch(() => {});
  }, [token]);

  const handleDeleteCourse = (dc_id) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.dc_id !== dc_id)
    );
  };

  const handleEditCourseInState = (id, newName, newNote, newType) => {
    setCourses((courses) =>
      courses.map((course) =>
        course.course_id === id
          ? {
              ...course,
              course_name: newName,
              course_note: newNote,
              dc_type: newType || course.dc_type,
            }
          : course
      )
    );
  };

  const handleToAdd = async () => {
    const result = await SelectAlert({
      material: allCourses,
      placeholder: "Select a Material",
      validate: () => null,
    });

    if (result) {
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
        .then(() => {})
        .catch(() => {});
    } else {
      Swal.fire("Cancelled", "You closed the alert", "info");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses-filters")
      .then((res) => {
        setAllCourses(res.data.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/list-courses-departments?department_id=${majorId}`
      )
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch(() => {});
  }, [majorId]);

  const handleBookmarkToggle = (courseId, bookmarked, studentCourseId) => {
    setStudentCourses((prev) => {
      if (bookmarked) {
        const exists = prev.find((sc) => sc.course_id === courseId);
        if (exists) return prev;
        return [...prev, { course_id: courseId, SC_id: studentCourseId }];
      } else {
        return prev.filter((sc) => sc.course_id !== courseId);
      }
    });
  };

  const listOfMaterial = courses.map((material) => {
    const savedMaterial = studentCourses.find(
      (sc) => sc.course_id === material.course_id
    );

    return (
      <div
        key={material.dc_id}
        onClick={() => {
          navigate(`/college/${collegeId}/${majorId}/${material.course_id}`);
        }}
      >
        <CardMatirial
          nameOfCourse={material.course_name}
          description={material.course_note}
          courseId={material.course_id}
          dc_id={material.dc_id}
          dc_type={material.dc_type}
          studentCourseId={savedMaterial ? savedMaterial.SC_id : null}
          onDeleteSuccess={handleDeleteCourse}
          onEdit={handleEditCourseInState}
          onBookmarkToggle={handleBookmarkToggle}
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
      {role === "superadmin" && (
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
