import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
const Department = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/List-colleges")
      .then((response) => {
        setColleges(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div
        className="flex flex-row flex-wrap justify-evenly items-center"
        style={{ marginTop: "8px" }}
      >
        {colleges.map((faculty, index) => (
          <Link key={faculty.college_id} to={`/college/${faculty.college_id}`}>
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
              className="rounded-xl text-white p-6 shadow-lg cursor-pointer bg-[#3D90D7] w-[400px] h-[200px] flex flex-col justify-center items-center"
              style={{ margin: "8px" }}
            >
              <h3 className="text-xl font-semibold text-center">
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
        ))}
      </div>
    </div>
  );
};

export default Department;
