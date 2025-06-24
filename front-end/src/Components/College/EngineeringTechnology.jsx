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

  const [searchTerm, setSearchTerm] = useState("");

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
  const filteredMajors = majors.filter((major) =>
    major.departments_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="flex justify-center my-6">
          <input
            type="text"
            className="w-[300px] px-4 py-2 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
            placeholder="Search by department name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {role == "superadmin" && (
          <ButtonAdd handleToAdd={handleToAdd} type={"Department"} />
        )}
      </div>
      <div
        className="flex flex-row items-center justify-center gap-5 flex-wrap"
        style={{ marginTop: "10px" }}
      >
        {filteredMajors.map((major) => (
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
