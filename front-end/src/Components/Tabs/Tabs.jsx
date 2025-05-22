import { useState } from "react";
import "./Tabs.css";
import Vedio from "../Vedio/Vedio";
import Summaries from "../Summaries/Summaries";
import AccordionUsage from "../Accordion/AccordionUsage";
import { listOfSummary } from "./summary";

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState("lectures");
  const listOfSummaries = listOfSummary.map((sumamry) => {
    return (
      <Summaries
        midOrFinal={sumamry.midOrFinal}
        nameOfDector={sumamry.nameOfDector}
        nameOfMaterial={sumamry.nameOfMaterial}
      />
    );
  });
  const renderContent = () => {
    switch (selectedTab) {
      case "lectures":
        return (
          <div>
            <AccordionUsage numberOfWeek={1} />
            <AccordionUsage numberOfWeek={2} />
            <AccordionUsage numberOfWeek={3} />
            <AccordionUsage numberOfWeek={4} />
            <AccordionUsage numberOfWeek={5} />
            <AccordionUsage numberOfWeek={6} />
          </div>
        );
      case "summaries":
        return (
          <div className="flex flex-row items-center justify-center flex-wrap gap-5">
            {listOfSummaries}
          </div>
        );
      case "exams":
        return <></>;
      case "book":
        return <></>;
      default:
        return null;
    }
  };

  return (
    <div className="radio" style={{ margin: "10px" }}>
      <div className="radio-input">
        <label>
          <input
            type="radio"
            name="value-radio"
            checked={selectedTab === "lectures"}
            onChange={() => setSelectedTab("lectures")}
          />
          <span className="name">Lectures</span>
        </label>
        <label>
          <input
            type="radio"
            name="value-radio"
            checked={selectedTab === "summaries"}
            onChange={() => setSelectedTab("summaries")}
          />
          <span className="name">Summaries</span>
        </label>
        <label>
          <input
            type="radio"
            name="value-radio"
            checked={selectedTab === "exams"}
            onChange={() => setSelectedTab("exams")}
          />
          <span className="name">Exams</span>
        </label>
        <label>
          <input
            type="radio"
            name="value-radio"
            checked={selectedTab === "book"}
            onChange={() => setSelectedTab("book")}
          />
          <span className="name">Book</span>
        </label>
        <span className="selection"></span>
      </div>

      <div className="tab-content " style={{ margin: "20px" }}>
        {renderContent()}
      </div>
    </div>
  );
}
