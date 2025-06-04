import { useNavigate, useParams } from "react-router-dom";
import AccordionUsage from "../Accordion/AccordionUsage";
import ButtonBack from "../GoBack/ButtonBack";
import Summaries from "../Summaries/Summaries";
import Tabs from "../Tabs/Tabs";
import Vedio from "../Vedio/Vedio";
import ButtonUpload from "../ButtonUpload/ButtonUpload";
import { useEffect, useState } from "react";
import CardUpload from "../CardUpload/CardUpload";

export default function DetailsMaterial() {
  const { collegeId } = useParams();
  const { majorId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
 
  return (
    <div style={{ margin: "20px" }}>
      <div className="flex flex-row justify-between items-center">
        <div
          onClick={() => {
            navigate(`/college/${collegeId}/${majorId}`);
          }}
        >
          <ButtonBack to={"Back To Course"} />
        </div>
        <div onClick={() => setShowModal(true)}>
          <ButtonUpload />
        </div>
      </div>
      <Tabs />
      {showModal && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full z-40"
            onClick={() => setShowModal(false)}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          ></div>

          <div
            className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[30%]"
            style={{ marginTop: "30px" }}
          >
            <CardUpload />
          </div>
        </>
      )}
    </div>
  );
}
