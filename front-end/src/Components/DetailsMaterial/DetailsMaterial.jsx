import { useNavigate, useParams } from "react-router-dom";
import AccordionUsage from "../Accordion/AccordionUsage";
import ButtonBack from "../GoBack/ButtonBack";
import Summaries from "../Summaries/Summaries";
import Tabs from "../Tabs/Tabs";
import Vedio from "../Vedio/Vedio";

export default function DetailsMaterial() {
  const { collegeId } = useParams();
  const { majorId } = useParams();
  const navigate = useNavigate();
  return (
    <div style={{ margin: "20px" }}>
      <div
        onClick={() => {
          navigate(`/college/${collegeId}/${majorId}`);
        }}
      >
        <ButtonBack to={"Back To Course"} />
      </div>

      <Tabs />
    </div>
  );
}
