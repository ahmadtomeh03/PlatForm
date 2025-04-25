import React from "react";
import "./About.css";
import EduPlat from "../../assets/EduPlat.png";
import Navbar from "../../Components/Navbar/Navbar";

const About = () => {
  return (
    <div className="main-container">
      <div className="about-container">
        {/* Left: Image */}
        <div className="about-image">
          <img src={EduPlat} alt="Team at work" />
        </div>

        {/* Right: Text */}
        <div className="about-text">
          <h2>About Edu Platform</h2>
          <p>
            Welcome to the PTUK Education Platform — your gateway to smarter,
            more flexible learning at Palestine Technical University - Kadoorie.
            Our platform is designed to support students by offering a rich
            collection of video lectures, comprehensive course summaries, and
            interactive quizzes tailored to the university’s curriculum. Whether
            you're reviewing class material, preparing for exams, or seeking to
            deepen your understanding, our tools help you stay engaged and
            achieve academic success. We’re committed to making learning
            accessible, organized, and effective — anytime, anywhere.
          </p>

          <p>
            Our mission is to enhance the educational experience at PTUK by
            integrating technology with academic excellence. The platform is
            continually updated in collaboration with faculty members to ensure
            content accuracy and alignment with current course objectives.
            Students can track their progress, revisit key concepts through
            summaries, and test their knowledge with practice quizzes — all in
            one place. With a user-friendly interface and multilingual support,
            the PTUK Education Platform is built to empower every student to
            learn at their own pace and thrive in their academic journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
