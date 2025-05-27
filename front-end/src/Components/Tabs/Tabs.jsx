import { useState } from "react";
import "./Tabs.css";
import Vedio from "../Vedio/Vedio";
import Summaries from "../Summaries/Summaries";
import AccordionUsage from "../Accordion/AccordionUsage";
import { listOfSummary } from "./summary";
import CardExam from "../CardExam/CardExam";
import CardUpload from "../CardUpload/CardUpload";
import CardBook from "../CardBook/CardBook";
import CardSlides from "../CardSlides/CardSlides";
export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState("lectures");
  const listOfSummaries = listOfSummary.map((sumamry, index) => {
    return (
      <div key={index} style={{ width: "100%" }} className="swipcard">
        <Summaries
          midOrFinal={sumamry.midOrFinal}
          nameOfDector={sumamry.nameOfDector}
          nameOfMaterial={sumamry.nameOfMaterial}
        />
      </div>
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
          <div className="w-full flex justify-center">
            <div
              className="flex flex-row items-start gap-4"
              style={{ width: "90%" }}
            >
              <div
                // className="flex flex-row flex-wrap gap-2"
                className="swaiperCard"
                style={{ padding: "10px", flex: "2" }}
              >
                {listOfSummaries}
              </div>
              {/* <div style={{ flex: "1" }}>
                <CardUpload />
              </div> */}
            </div>
          </div>
        );
      case "exams":
        return (
          <div className="w-full flex justify-center">
            <div
              className="flex flex-row items-start gap-4"
              style={{ width: "90%" }}
            >
              <div
                className="flex flex-row flex-wrap gap-2"
                style={{ padding: "10px", flex: "2" }}
              >
                <CardExam />
              </div>
              <div style={{ flex: "1" }}>
                <CardUpload />
              </div>
            </div>
          </div>
        );
      case "book":
        return (
          <div className="w-full flex justify-center">
            <div
              className="flex flex-row items-start gap-4"
              style={{ width: "90%" }}
            >
              <div
                className="flex flex-row flex-wrap gap-2"
                style={{ padding: "10px", flex: "2" }}
              >
                <CardBook />
              </div>
              <div style={{ flex: "1" }}>
                <CardUpload />
              </div>
            </div>
          </div>
        );
      case "slides":
        return (
          <div className="w-full flex justify-center">
            <div
              className="flex flex-row items-start gap-4"
              style={{ width: "90%" }}
            >
              <div
                className="flex flex-row flex-wrap gap-2"
                style={{ padding: "10px", flex: "2" }}
              >
                <CardSlides />
              </div>
              <div style={{ flex: "1" }}>
                <CardUpload />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="radio "
      style={{
        margin: "10px",
      }}
    >
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
        <label>
          <input
            type="radio"
            name="value-radio"
            checked={selectedTab === "slides"}
            onChange={() => setSelectedTab("slides")}
          />
          <span className="name">Slides</span>
        </label>
        <span className="selection"></span>
      </div>

      <div className="tab-content">{renderContent()}</div>
    </div>
  );
}
