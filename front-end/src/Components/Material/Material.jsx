import CardMatirial from "../Card/CardMatirial";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ButtonBack from "../GoBack/ButtonBack";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import SelectAlert from "../SelectAlert/SelectAlert";
import Swal from "sweetalert2";
import { UserContext } from "../../Context/UserContext";
import ButtonBackMobile from "../ButtonMobile/ButtonBackMobile";
import ButtonAddMobile from "../ButtonMobile/ButtonAddMobile";
import SearchMobile from "../ButtonMobile/SearchMobile";
import Search from "../Search/Search";

export default function Material() {
  const navigate = useNavigate();
  const { majorId, collegeId } = useParams();
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const { role } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [majors, setMajors] = useState([]);

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
      .get(`http://localhost:3000/department-list?id=${majorId}`)
      .then((res) => {
        console.log("API Response:", res.data), setMajors(res.data.data[0]);
      })
      .catch((err) => console.error(err));
  }, [majorId]);
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const onClickButtonBack = () => {
    navigate(`/college/${collegeId}`);
  };
  return (
    <div className="p-4 relative">
      {isMobile ? (
        <>
          <div className="flex flex-row justify-evenly items-center gap-2">
            <div>
              <ButtonBackMobile onClickButton={onClickButtonBack} />
            </div>
            <div style={{ marginTop: "20px" }}>
              <SearchMobile
                placeholder="Search by Courses or Type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              {role === "superadmin" && (
                <ButtonAddMobile handleToAdd={handleToAdd} />
              )}
            </div>
          </div>
          <div
            className="flex flex-row justify-center items-center text-lg font-bold"
            style={{ margin: "10px" }}
          >
            {majors.departments_name}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row justify-between items-center">
            <div
              onClick={() => {
                navigate(`/college/${collegeId}`);
              }}
              style={{ marginLeft: "20px", marginTop: "20px" }}
            >
              <ButtonBack to={`Back To Department`} />
            </div>
            <div
              className="flex justify-center my-6"
              style={{
                marginTop: "20px",
                marginRight: "20px",
              }}
            >
              <Search
                placeholder="Search by Courses or Type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {role === "superadmin" && (
              <ButtonAdd handleToAdd={handleToAdd} type={"Courses"} />
            )}
          </div>
          <div
            className="text-2xl text-bold flex flex-row justify-center items-center font-bold"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            {majors.departments_name}
          </div>
        </>
      )}

      <div
        className="flex flex-row flex-wrap items-center justify-center gap-5"
        style={{ margin: "20px" }}
      >
        {listOfMaterial}
      </div>
    </div>
  );
}
