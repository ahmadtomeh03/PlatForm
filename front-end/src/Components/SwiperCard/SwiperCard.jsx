import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function SwiperCard({ CardComponent, list = [] }) {
  const [openPdfIndex, setOpenPdfIndex] = useState(null);

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView="auto"
        navigation
      >
        {list.map((summary, i) => (
          <SwiperSlide key={i} className="!w-[320px]">
            <CardComponent
              nameOfMaterial={summary.nameOfMaterial}
              nameOfDector={summary.nameOfDector}
              midOrFinal={summary.midOrFinal}
              isOpen={openPdfIndex === i}
              onToggle={() => setOpenPdfIndex(openPdfIndex === i ? null : i)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {openPdfIndex !== null && (
        <div className="mt-6 w-full px-4">
          <iframe
            src={list[openPdfIndex].src}
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
