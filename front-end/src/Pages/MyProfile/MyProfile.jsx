import { useContext, useEffect, useState } from "react";
import "./MyProfile.css";
import CardMatirial from "../../Components/Card/CardMatirial";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import CardExam from "../../Components/CardExam/CardExam";
import Summaries from "../../Components/Summaries/Summaries";
import CardSlides from "../../Components/CardSlides/CardSlides";
import CardBook from "../../Components/CardBook/CardBook";
import CardAssigment from "../../Components/CardAssigment/CardAssigment";
import Vedio from "../../Components/Vedio/Vedio";
import { useNavigate } from "react-router-dom";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", { timeZone: "Asia/Gaza" });

// get every file details fav (edit)
const renderFavComponent = (
  favorite_id,
  type,
  data,
  index,
  onRemoveFavorite,
  onOpenDetails
) => {
  const commonProps = {
    id_type: data?.[`${type}_id`] || "",
    nameOfMaterial: data?.doctor_name || "",
    nameOfDector: data?.doctor_name || "",
    midOrFinal: data?.description || "",
    showAction: false,
    onDeleteProfile: () => {
      onRemoveFavorite(favorite_id);
    },
    onClick: () => {
      const materialId = data?.course_id;
      const typeId = data?.[`${type}_id`];
      onOpenDetails(materialId, type, typeId);
    },
  };

  const componentsMap = {
    exam: CardSlides,
    summary: CardSlides,
    book: CardSlides,
    slide: CardSlides,
    assignment: CardSlides,
    video: CardSlides,
  };
  const Component = componentsMap[type];
  return Component ? <Component key={index} {...commonProps} type={type}/> : null;
};

const ProfilePage = () => {
  const { role } = useContext(UserContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [studentInfo, setStudentInfo] = useState({});
  const [adminInfo, setAdminInfo] = useState({});
  const [studentCourses, setStudentCourses] = useState([]);
  const [studentFav, setStudentFav] = useState([]);
  const [studentUploads, setStudentUploads] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  const token = localStorage.getItem("token");

  const localDateStd = formatDate(studentInfo.date_of_register);
  const localDateAdm = formatDate(adminInfo.date_of_register);

  const listOfStudentCourses = studentCourses.map((course) => (
    <div
      key={course.course_id}
      onClick={() => {
        navigate(`/material/${course.course_id}`, {
          state: { from: "profile" },
        });
      }}
    >
      <CardMatirial
        nameOfCourse={course.course_name}
        description={course.course_note}
        courseId={course.course_id}
        dc_id={course.dc_id}
        initialSaveIdFromProps={course.SC_id}
        showAction={false}
        onRemoveFavorite={(sc_id) => {
          setStudentCourses((prev) => prev.filter((c) => c.SC_id !== sc_id));
        }}
      />
    </div>
  ));

  // edit
  const listOfFav = studentFav.map((item, index) =>
    renderFavComponent(
      item.favorite_id,
      item.content_type,
      item.content_data,
      index,
      (favId) => {
        setStudentFav((prev) => prev.filter((f) => f.favorite_id !== favId));
      },
      (materialId, type, typeId) => {
        navigate(`/material/${materialId}/${type}/${typeId}`);
      }
    )
  );

  // get all courses
  useEffect(() => {
    axios
      .get("http://localhost:3000/courses-filters")
      .then((res) => {
        setAllCourses(res.data.data);
      })
      .catch(() => {});
  }, []);
  // get requset file
  useEffect(() => {
    axios
      .get("http://localhost:3000/student/my-upload", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data.data);
        setStudentUploads(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch profile data:", error);
      });
  }, []);

  //get student-courses
  useEffect(() => {
    axios
      .get("http://localhost:3000/student-course-list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setStudentCourses(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch profile data:", error);
      });
  }, []);

  //get favorites
  useEffect(() => {
    axios
      .get("http://localhost:3000/favorite-list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setStudentFav(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch favorites:", error);
      });
  }, []);

  //get profile info
  useEffect(() => {
    const url =
      role === "student"
        ? "http://localhost:3000/profile"
        : "http://localhost:3000/admin-profile";

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (role === "student") {
          setStudentInfo(response.data.data);
        } else {
          setAdminInfo(response.data.data[0]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch profile data:", error);
      });
  }, [role]);

  // handle edit
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (role === "student") {
      setStudentInfo((prev) => ({ ...prev, [name]: value }));
    } else {
      setAdminInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveClick = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (role === "student") {
      const updatedStudentData = {
        student_name: studentInfo.student_name,
        student_email: studentInfo.student_email,
        student_username: studentInfo.student_username,
      };

      axios
        .put(
          "http://localhost:3000/student/update-profile",
          updatedStudentData,
          {
            headers,
          }
        )
        .then(() => {
          setEditMode(false);
          return axios.get("http://localhost:3000/profile", { headers });
        })
        .then((res) => {
          setStudentInfo(res.data.data);
        })
        .catch((err) => {
          console.error(
            "Student update failed:",
            err.response?.data || err.message
          );
        });
    } else {
      const updatedAdminData = {
        admin_name: adminInfo.admin_name,
        admin_email: adminInfo.admin_email,
        admin_username: adminInfo.admin_username,
      };

      axios
        .put("http://localhost:3000/admin/update-profile", updatedAdminData, {
          headers,
        })
        .then(() => {
          setEditMode(false);
          return axios.get("http://localhost:3000/admin-profile", { headers });
        })
        .then((res) => {
          setAdminInfo(res.data.data[0]);
        })
        .catch((err) => {
          console.error(
            "Admin update failed:",
            err.response?.data || err.message
          );
        });
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  return (
    <div>
      <div className="profile-container">
        <div className="left-panel">
          <img
            src="https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
            alt="Profile"
            className="profile-image"
          />
          <h2 style={{ marginLeft: "25px" }}>
            {role === "student"
              ? studentInfo.student_username
              : adminInfo.admin_username}
          </h2>

          <div className="profile-section">
            <div className="about-header">
              <h3 className="profile-heading">About</h3>
              <button className="edit-button" onClick={handleEditClick}>
                Edit
              </button>
            </div>

            {role === "student" ? (
              <>
                <p>
                  <span className="profile-label">Email:</span>{" "}
                  {studentInfo.student_email}
                </p>
                <p>
                  <span className="profile-label">Full Name:</span>{" "}
                  {studentInfo.student_name}
                </p>
                <p>
                  <span className="profile-label">Date Joined:</span>{" "}
                  {localDateStd}
                </p>
              </>
            ) : (
              <>
                <p>
                  <span className="profile-label">Email:</span>{" "}
                  {adminInfo.admin_email}
                </p>
                <p>
                  <span className="profile-label">Full Name:</span>{" "}
                  {adminInfo.admin_name}
                </p>
                <p>
                  <span className="profile-label">Date Registered:</span>{" "}
                  {localDateAdm}
                </p>
                <p>
                  <span className="profile-label">Department ID:</span>{" "}
                  {adminInfo.department_id}
                </p>
                <p>
                  <span className="profile-label">Role:</span> {adminInfo.role}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="right-panel">
          <div className="profile-section">
            <h3 className="profile-heading">{role} Schedule</h3>
            <div className="card-container">{listOfStudentCourses}</div>
          </div>

          <div className="profile-section">
            <h3 className="profile-heading">Favorite Files</h3>
            <div className="card-container">{listOfFav}</div>
          </div>
          {role === "student" && (
            <div className="profile-section">
              <h3 className="profile-heading">Uploaded Files</h3>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>State</th>
                    <th>Date/Time</th>
                    <th>File Name</th>
                    <th>Course Name</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {studentUploads.map((upload, index) => {
                    const matchedCourse = allCourses.find(
                      (course) => course.course_id === upload.course_id
                    );

                    return (
                      <tr key={index}>
                        <td>{upload.uploaded_type}</td>
                        <td>{upload.uploaded_state}</td>
                        <td>
                          {new Date(upload.uploaded_datetime).toLocaleString(
                            "en-US",
                            {
                              timeZone: "Asia/Gaza",
                            }
                          )}
                        </td>
                        <td>{upload.upload_name}</td>
                        <td>
                          {matchedCourse?.course_name || upload.course_id}
                        </td>
                        <td>
                          <button
                            className="dashboard-icon-button view"
                            onClick={() => {
                              const fullUrl = `http://localhost:3000/${upload.upload_url}`;
                              window.open(fullUrl, "_blank");
                            }}
                          >
                            👁️
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {editMode && (
          <>
            <div className="overlay" />
            <div className="edit-modal">
              <h3>Edit Profile Info</h3>
              <label>
                Email:
                <input
                  type="text"
                  name={role === "student" ? "student_email" : "admin_email"}
                  value={
                    role === "student"
                      ? studentInfo.student_email
                      : adminInfo.admin_email
                  }
                  onChange={handleChange}
                />
              </label>
              <label>
                Full Name:
                <input
                  type="text"
                  name={role === "student" ? "student_name" : "admin_name"}
                  value={
                    role === "student"
                      ? studentInfo.student_name
                      : adminInfo.admin_name
                  }
                  onChange={handleChange}
                />
              </label>
              <label>
                Username:
                <input
                  type="text"
                  name={
                    role === "student" ? "student_username" : "admin_username"
                  }
                  value={
                    role === "student"
                      ? studentInfo.student_username
                      : adminInfo.admin_username
                  }
                  onChange={handleChange}
                />
              </label>
              <div className="edit-modal-buttons">
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
