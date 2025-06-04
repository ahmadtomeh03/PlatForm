import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CardMajer from "../CardMajer/CardMajer";
import axios from "axios";
import ButtonBack from "../GoBack/ButtonBack";
export default function EngineeringTechnology() {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const [majors, setMajors] = useState([]); // this state to save the list of majer from API
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
      <div
        onClick={() => {
          navigate("/college");
        }}
        style={{ marginLeft: "20px", marginTop: "20px" }}
      >
        <ButtonBack to={"Back To College"} />
      </div>

      <div className="flex flex-row items-center justify-center gap-5 flex-wrap">
        {majors.map((major) => (
          <Link
            key={major.departments_id}
            to={`/college/${collegeId}/${major.departments_id}`}
          >
            <CardMajer
              nameOfMajer={major.departments_name}
              decription={"decription"}
              collegeId={collegeId}
              majorId={major.departments_id}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
