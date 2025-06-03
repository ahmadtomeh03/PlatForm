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
import SwiperCard from "../SwiperCard/SwiperCard";
import { listOfExam } from "./exam";

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState("lectures");
  const renderContent = () => {
    // every swiper contain type of card and list of detalis of this card
    switch (selectedTab) {
      case "lectures":
        return (
          <SwiperCard
            key={selectedTab}
            CardComponent={Summaries}
            list={listOfSummary}
          />
        );
      case "summaries":
        return (
          <SwiperCard
            key={selectedTab}
            CardComponent={Summaries}
            list={listOfSummary}
          />
        );
      case "exams":
        return (
          <SwiperCard
            key={selectedTab}
            CardComponent={CardExam}
            list={listOfExam}
          />
        );
      case "book":
        return (
          <SwiperCard
            key={selectedTab}
            CardComponent={CardBook}
            list={listOfExam}
          />
        );
      case "slides":
        return (
          <SwiperCard
            key={selectedTab}
            CardComponent={CardSlides}
            list={listOfExam}
          />
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
