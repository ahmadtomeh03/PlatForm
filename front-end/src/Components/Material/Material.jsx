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
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCourses = courses.filter((material) =>
    `${material.course_name} ${material.dc_type}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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

  const listOfMaterial = filteredCourses.map((material) => {
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
          onDeleteSuccess={handleDeleteCourse}
          onEdit={handleEditCourseInState}
        />
      </div>
    );
  });

  return (
    <div className="p-4 relative">
      <div className="flex flex-row justify-between items-center">
        <div
          onClick={() => {
            navigate(`/college/${collegeId}`);
          }}
          style={{ marginLeft: "20px", marginTop: "20px" }}
        >
          <ButtonBack to={`Back To Department`} />
        </div>
        <div className="flex justify-center my-6">
          <input
            type="text"
            className="w-[300px] px-4 py-2 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
            placeholder="Search by material name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {role === "superadmin" && (
          <ButtonAdd handleToAdd={handleToAdd} type={"Courses"} />
        )}
      </div>
      <div
        className="flex flex-row flex-wrap items-center justify-center gap-5"
        style={{ margin: "20px" }}
      >
        {listOfMaterial}
      </div>
    </div>
  );
}
