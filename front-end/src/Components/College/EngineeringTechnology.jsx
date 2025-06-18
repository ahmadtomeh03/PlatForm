import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import CardMajer from "../CardMajer/CardMajer";
import axios from "axios";
import ButtonBack from "../GoBack/ButtonBack";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import Swal from "sweetalert2";
import MultiInputAlert from "../MultiInputAlert/MultiInputAlert";
import { UserContext } from "../../Context/UserContext";
export default function EngineeringTechnology() {
  const { collegeId } = useParams();
  const { role } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [majors, setMajors] = useState([]); // this state to save the list of majer from API
  const handleDeleteMajorFromState = (deletedId) => {
    setMajors((prevMajors) =>
      prevMajors.filter((major) => major.departments_id !== deletedId)
    );
  };
  const handleEditMajorInState = (id, newName) => {
    setMajors((prevMajors) =>
      prevMajors.map((m) =>
        m.departments_id === id ? { ...m, departments_name: newName } : m
      )
    );
  };

  const handleToAdd = async () => {
    const result = await MultiInputAlert({
      title: "Inter New Department",
      inputs: [{ id: "name", placeholder: "Department Name" }],
      validate: () => {
        return null;
      },
    });
    if (result) {
      console.log(result.name);

      Swal.fire(
        "Success",
        `You entered:<br>${JSON.stringify(result)}`,
        "success"
      );
      axios
        .post(
          "http://localhost:3000/admin/department-create",
          { departments_name: result.name, college_id: collegeId },
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
      .get(`http://localhost:3000/department-list?college_id=${collegeId}`)
      .then((res) => {
        console.log("API Response:", res.data), setMajors(res.data.data);
      })
      .catch((err) => console.error(err));
  }, [collegeId]);
  return (
    <div className="p-4 relative">
      <div className="flex flex-row justify-between items-center">
        <div
          onClick={() => {
            navigate("/college");
          }}
          style={{ marginLeft: "20px", marginTop: "20px" }}
        >
          <ButtonBack to={"Back To College"} />
        </div>

        {role == "superadmin" && (
          <ButtonAdd handleToAdd={handleToAdd} type={"Department"} />
        )}
      </div>
      <div
        className="flex flex-row items-center justify-center gap-5 flex-wrap"
        style={{ marginTop: "10px" }}
      >
        {majors.map((major) => (
          <CardMajer
            key={major.departments_id}
            nameOfMajer={major.departments_name}
            collegeId={collegeId}
            majorId={major.departments_id}
            onDelete={handleDeleteMajorFromState}
            onEdit={handleEditMajorInState}
          />
        ))}
      </div>
    </div>
  );
}
