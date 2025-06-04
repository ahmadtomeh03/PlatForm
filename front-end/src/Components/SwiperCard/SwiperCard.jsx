import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useParams } from "react-router-dom";
import axios from "axios";

function SwiperCard({ CardComponent, type }) {
  const [openPdfIndex, setOpenPdfIndex] = useState(null);
  const [materialDetails, setMaterialDetails] = useState([]);
  const { materialId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${type}?course_id=${materialId}`)
      .then((response) => {
        setMaterialDetails(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error.response?.data || error.message);
      });
  }, [materialId]);

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView="auto"
        navigation
      >
        {materialDetails.map((summary, i) => (
          <SwiperSlide key={i} className="!w-[320px]">
            <CardComponent
              nameOfMaterial={summary.exam_name || "No name"}
              nameOfDector={summary.doctor_name}
              midOrFinal={summary.description}
              isOpen={openPdfIndex === i}
              onToggle={() => setOpenPdfIndex(openPdfIndex === i ? null : i)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {openPdfIndex !== null && (
        <div className="mt-6 w-full px-4">
          <iframe
            src={materialDetails[openPdfIndex].exam_path}
            width="100%"
            height="500px"
            className="rounded border border-gray-300"
            title={`PDF Preview Material ${openPdfIndex + 1}`}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setOpenPdfIndex(null)}
          >
            Close Preview
          </button>
        </div>
      )}
    </div>
  );
}

export default SwiperCard;
