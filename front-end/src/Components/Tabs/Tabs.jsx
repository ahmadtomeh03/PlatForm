import { useState } from "react";
import "./Tabs.css";
import Summaries from "../Summaries/Summaries";
import CardExam from "../CardExam/CardExam";
import CardBook from "../CardBook/CardBook";
import CardSlides from "../CardSlides/CardSlides";
import SwiperCard from "../SwiperCard/SwiperCard";
import Progress from "../Progress";
import Vedio from "../Vedio/Vedio";
import CardAssigment from "../CardAssigment/CardAssigment";

export default function Tabs({ type = "video", typeId }) {
  const [selectedTab, setSelectedTab] = useState(type);
  const renderContent = () => {
    // every swiper contain type of card and list of detalis of this card
    switch (selectedTab) {
      case "video":
        return (
          <SwiperCard
            key={selectedTab}
            CardComponent={Vedio}
            type={"video"}
            typeId={typeId}
          />
        );
      case "summary":
        return (
          <SwiperCard
            key={selectedTab}
            CardComponent={Summaries}
            type={"summary"}
            typeId={typeId}
          />
        );
      case "exam":
        return (
          <SwiperCard
            key={selectedTab}
            CardComponent={CardExam}
            type={"exam"}
            typeId={typeId}
          />
        );
      case "book":
        return (
          <SwiperCard
            key={selectedTab}
            CardComponent={CardBook}
            type={"book"}
            typeId={typeId}
          />
        );
      case "slide":
        return (
          <SwiperCard
            key={selectedTab}
            CardComponent={CardSlides}
            type={"slide"}
            typeId={typeId}
          />
        );
      case "assignment":
        return (
          <SwiperCard
            key={selectedTab}
            CardComponent={CardAssigment}
            type={"assignment"}
            typeId={typeId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="radio"
      style={{
        margin: "10px",
      }}
    >
      <div className="radio-input">
        <label>
          <input
            type="radio"
            name="value-radio"
            checked={selectedTab === "video"}
            onChange={() => setSelectedTab("video")}
          />
          <span className="name">Lectures</span>
        </label>
        <label>
          <input
            type="radio"
            name="value-radio"
            checked={selectedTab === "summary"}
            onChange={() => setSelectedTab("summary")}
          />
          <span className="name">Summaries</span>
        </label>
        <label>
          <input
            type="radio"
            name="value-radio"
            checked={selectedTab === "exam"}
            onChange={() => setSelectedTab("exam")}
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
            checked={selectedTab === "slide"}
            onChange={() => setSelectedTab("slide")}
          />
          <span className="name">Slides</span>
        </label>
        <label>
          <input
            type="radio"
            name="value-radio"
            checked={selectedTab === "assignment"}
            onChange={() => setSelectedTab("assignment")}
          />
          <span className="name">Assignment</span>
        </label>
        <span className="selection"></span>
      </div>

      <div className="tab-content">{renderContent()}</div>
    </div>
  );
}
