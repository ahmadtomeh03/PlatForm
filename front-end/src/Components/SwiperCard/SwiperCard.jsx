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

        // فتح الملف المختار مباشرة إذا كان موجود
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

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView="auto"
        navigation
        style={{ height: "350px" }}
      >
        {materialDetails.map((item, i) => (
          <SwiperSlide
            key={i}
            className="!w-[320px]"
            style={{ height: "350px" }}
          >
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {openPdfIndex !== null && (
        <div className="mt-6 w-full px-4 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <iframe
              src={`${BASE_URL}/${getPath(materialDetails[openPdfIndex])}`}
              width="100%"
              height="730px"
              className="rounded border border-gray-300"
              title={`PDF Preview Material ${openPdfIndex + 1}`}
              style={{ marginTop: "20px" }}
            />
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setOpenPdfIndex(null)}
            >
              Close Preview
            </button>
          </div>

          <div className="w-full lg:w-[500px]">
            <ListCardNote type={type} selectedId={selectedId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SwiperCard;
