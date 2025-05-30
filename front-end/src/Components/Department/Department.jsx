import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Department = () => {
  const [college, setCollege] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/List-colleges")
      .then((response) => {
        setCollege(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div
        className="flex flex-row flex-wrap justify-evenly items-center "
        style={{ marginTop: "8px" }}
      >
        {college.map((faculty, index) => (
          <Link to={`/college/${faculty.college_name}`}>
            <motion.div
              key={faculty.college_id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 120,
              }}
              className={`rounded-xl text-white p-6 shadow-lg cursor-pointer bg-[#3D90D7] w-[400px] h-[200px] flex flex-col justify-center items-center`}
              style={{ margin: "8px" }}
            >
              <h3 className="text-xl font-semibold text-center">
                {faculty.college_name}
              </h3>
              <div>
                <img src={faculty.image} alt={faculty.college_name} />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Department;
