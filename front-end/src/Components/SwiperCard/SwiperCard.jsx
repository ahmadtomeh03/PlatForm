import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardNote from "../Note/CardNote";
import ListCardNote from "../Note/ListCardNote";
import { UserContext } from "../../Context/UserContext";
import "./SwiperCard.css";

function SwiperCard({ CardComponent, type, typeId }) {
  const [openPdfIndex, setOpenPdfIndex] = useState(null);
  const [materialDetails, setMaterialDetails] = useState([]);
  const { materialId } = useParams();
  const [selectedId, setSelectedId] = useState(null);
  const BASE_URL = "http://localhost:3000";
  const updateMaterialDetails = (id, updatedData) => {
    setMaterialDetails((prev) =>
      prev.map((el) =>
        getId(el) === id
          ? {
              ...el,
              [`${type}_name`]: updatedData.nameOfMaterial,
              doctor_name: updatedData.nameOfDector,
              description: updatedData.midOrFinal,
            }
          : el
      )
    );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${type}?course_id=${materialId}`)
      .then((response) => {
        setMaterialDetails(response.data.data);
        console.log(response.data.data);
        if (typeId) {
          const index = response.data.data.findIndex(
            (item) => item[`${type}_id`] === Number(typeId)
          );
          if (index !== -1) {
            setOpenPdfIndex(index);
            setSelectedId(response.data.data[index][`${type}_id`]);
          }
        }
      })
      .catch((error) => {
        console.error(error.response?.data || error.message);
      });
  }, [materialId, typeId]);

  const getId = (item) => {
    return item[`${type}_id`];
  };

  const getName = (item) => {
    return item[`${type}_name`] || "No name";
  };

  const getPath = (item) => {
    return item[`${type}_path`];
  };

  const handleDelete = (id) => {
    setMaterialDetails((prev) => prev.filter((item) => getId(item) !== id));
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView="auto"
        navigation
        grabCursor={true}
        centeredSlides={isMobile}
        style={{ overflow: "visible" }}
      >
        {materialDetails.map((item, i) => (
          <SwiperSlide
            key={i}
            className="!flex justify-center sm:justify-start"
            style={{ height: "300px" }}
          >
            <div className="w-[250px] sm:w-[320px] ">
              <CardComponent
                id_type={getId(item)}
                nameOfMaterial={getName(item)}
                nameOfDector={item.doctor_name}
                midOrFinal={item.description}
                isOpen={openPdfIndex === i}
                onToggle={() => {
                  const newIndex = openPdfIndex === i ? null : i;
                  setOpenPdfIndex(newIndex);
                  if (newIndex !== null) {
                    setSelectedId(getId(item));
                  } else {
                    setSelectedId(null);
                  }
                }}
                onDelete={() => handleDelete(getId(item))}
                onEdit={(updatedData) =>
                  updateMaterialDetails(getId(item), updatedData)
                }
                type={type}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {openPdfIndex !== null && (
        <div
          className="w-full px-4 flex flex-col lg:flex-row gap-4 items-center lg:items-start text-center lg:text-left lg:w-[100%]"
          style={{ marginTop: "40px" }}
        >
          <div className="flex-1 flex flex-col items-center">
            <iframe
              src={`${BASE_URL}/${getPath(materialDetails[openPdfIndex])}`}
              className="rounded border border-gray-300 w-[150%] h-[730px] sm:w-[200%] md:w-[150%] lg:w-[100%]"
              title={`PDF Preview Material ${openPdfIndex + 1}`}
              style={{ marginTop: "20px" }}
            />
            <button
              className=" bg-blue-600 text-white rounded w-full"
              style={{ marginTop: "5px" , padding:"10px 5px" }}
              onClick={() => setOpenPdfIndex(null)}
            >
              Close Preview
            </button>
          </div>

          <div className="w-[150%]  sm:w-[500px] lg:w-[500px] ">
            <ListCardNote type={type} selectedId={selectedId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SwiperCard;
