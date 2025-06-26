import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import { UserContext } from "../../Context/UserContext";
import MultiInputAlert from "../MultiInputAlert/MultiInputAlert";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";

const Department = () => {
  const [colleges, setColleges] = useState([]);
  const { role } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/List-colleges")
      .then((response) => {
        setColleges(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleToEdit = async (faculty) => {
    const result = await MultiInputAlert({
      title: "تعديل بيانات الكلية",
      inputs: [
        { id: "name", placeholder: "اسم الكلية", value: faculty.college_name },
      ],
      validate: () => null,
    });
    if (result) {
      try {
        await axios.put(
          `http://localhost:3000/admin/update-college/${faculty.college_id}`,
          { college_name: result.name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "تم التعديل بنجاح",
          text: "تم تحديث بيانات الكلية.",
          timer: 2000,
          showConfirmButton: false,
        });
        setColleges((prev) =>
          prev.map((item) =>
            item.college_id === faculty.college_id
              ? { ...item, college_name: result.name }
              : item
          )
        );
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "فشل التعديل",
          text: "حدث خطأ أثناء تعديل الكلية",
        });
      }
    }
  };

  const handleToDelete = (college_id) => {
    Swal.fire({
      title: "هل أنت متأكد من حذف الكلية؟",
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
          .delete(`http://localhost:3000/admin/college-delete/${college_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setColleges((prevColleges) =>
              prevColleges.filter(
                (college) => college.college_id !== college_id
              )
            );
            Swal.fire({
              icon: "success",
              title: "تم حذف الكلية بنجاح",
              timer: 1000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "حدث خطأ أثناء الحذف",
              text: error.response?.data?.message || "حاول مرة أخرى لاحقًا",
            });
          });
      }
    });
  };

  const handleToAdd = async () => {
    const result = await MultiInputAlert({
      title: "أدخل اسم الكلية الجديدة",
      inputs: [{ id: "name", placeholder: "اسم الكلية" }],
      validate: () => null,
    });
    if (result) {
      axios
        .post(
          "http://localhost:3000/admin/college-create",
          { college_name: result.name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setColleges((prev) => [...prev, response.data.data]);
          Swal.fire({
            icon: "success",
            title: "تمت الإضافة بنجاح",
            timer: 1500,
            showConfirmButton: false,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "حدث خطأ أثناء الإضافة",
            text: error.response?.data?.message || "حاول مرة أخرى لاحقًا",
          });
        });
    } else {
      Swal.fire("تم الإلغاء", "تم إغلاق النافذة", "info");
    }
  };

  return (
    <div style={{ margin: "5px" }}>
      {role === "superadmin" && (
        <ButtonAdd handleToAdd={handleToAdd} type={"College"} />
      )}
      <div
        className="flex flex-row flex-wrap justify-evenly items-center"
        style={{ marginTop: "8px" }}
      >
        {colleges.map((faculty, index) =>
          isMobile ? (
            <Link
              key={faculty.college_id}
              to={`/college/${faculty.college_id}`}
            >
              <div
                className="rounded-xl text-white p-6 shadow-lg cursor-pointer bg-[#3D90D7] flex flex-col justify-evenly items-center"
                style={{
                  width: "90vw",
                  maxWidth: "400px",
                  height: "30vh",
                  maxHeight: "200px",
                  margin: "8px",
                }}
              >
                {role === "superadmin" && (
                  <div className="w-full flex justify-between gap-2 mb-2">
                    <IconButton
                      aria-label="edit"
                      size="large"
                      onClick={(e) => {
                        e.preventDefault();
                        handleToEdit(faculty);
                      }}
                    >
                      <EditNoteIcon fontSize="inherit" />
                    </IconButton>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.confirm("هل أنت متأكد من حذف الكلية؟")) {
                          handleToDelete(faculty.college_id);
                        }
                      }}
                      style={{ margin: "10px" }}
                    >
                      <ButtonDelete />
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-center mb-4">
                  {faculty.college_name}
                </h3>
                <div>
                  <img
                    src={`http://localhost:3000${faculty.image}`}
                    alt={faculty.college_name}
                    className="w-20 h-20"
                  />
                </div>
              </div>
            </Link>
          ) : (
            <Link
              key={faculty.college_id}
              to={`/college/${faculty.college_id}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120,
                }}
                className="rounded-xl text-white p-6 shadow-lg cursor-pointer bg-[#3D90D7] flex flex-col justify-evenly items-center"
                style={{
                  width: "90vw",
                  maxWidth: "400px",
                  height: "30vh",
                  maxHeight: "200px",
                  margin: "8px",
                }}
              >
                {role === "superadmin" && (
                  <div className="w-full flex justify-between gap-2 mb-2">
                    <IconButton
                      aria-label="edit"
                      size="large"
                      onClick={(e) => {
                        e.preventDefault();
                        handleToEdit(faculty);
                      }}
                    >
                      <EditNoteIcon fontSize="inherit" />
                    </IconButton>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.confirm("هل أنت متأكد من حذف الكلية؟")) {
                          handleToDelete(faculty.college_id);
                        }
                      }}
                      style={{ margin: "10px" }}
                    >
                      <ButtonDelete />
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-center mb-4">
                  {faculty.college_name}
                </h3>
                <div>
                  <img
                    src={`http://localhost:3000${faculty.image}`}
                    alt={faculty.college_name}
                    className="w-20 h-20"
                  />
                </div>
              </motion.div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Department;
