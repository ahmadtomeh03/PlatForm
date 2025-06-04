import React from "react";
import "./About.css";
import EduPlat from "../../assets/EduPlat.png";
import {
  MdScience,
  MdBusiness,
  MdEngineering,
  MdSchool,
  MdAgriculture,
  MdSports,
  MdComputer,
} from "react-icons/md";

const blogs = [
  { title: "Bussiness", img: <MdBusiness size={50} /> },
  { title: "Sports", img: <MdSports size={50} /> },
  { title: "Computer", img: <MdComputer size={50} /> },
  { title: "Engineering", img: <MdEngineering size={50} /> },
];

const relatedBlogs = [
  {
    title:
      "Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution",
    author: "Lina",
    img: "blog1.jpg",
    views: "251,232",
  },
  {
    title:
      "Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution",
    author: "Lina",
    img: "blog2.jpg",
    views: "251,232",
  },
];

export default function BlogPage() {
  return (
    <div class="home-page">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h1>Why EduPlat?</h1>
            <p>
              EduPlat is an ideal choice because it offers a comprehensive
              collection of educational materials all in one place, making
              learning accessible, organized, and efficient for students and
              educators alike.{" "}
            </p>
            <button
              onClick={() =>
                (window.location.href = "http://localhost:5173/home")
              }
            >
              Start Learning Now
            </button>
          </div>
          <img src={EduPlat} alt="Hero" className="rounded-lg shadow-lg" />
        </div>

        {/* Blog List */}
        <div className="reading-list">
          <h2>Faculties list</h2>
          <div className="blog-grid reading">
            {blogs.map((blog, idx) => (
              <div key={idx} className="blog-item">
                {blog.img}
                <p>{blog.title}</p>
              </div>
            ))}
          </div>
          <button
            className="see-all-link"
            onClick={() =>
              (window.location.href = "http://localhost:5173/college")
            }
          >
            See All
          </button>
        </div>

        {/* Related Blogs
      <div className="related-blogs">
        <div className="flex justify-between items-center">
          <h2>Related Blog</h2>
          <a href="#" style={{ color: '#14b8a6', fontSize: '0.875rem' }}>See all</a>
        </div>
        <div className="blog-grid related">
          {relatedBlogs.map((blog, idx) => (
            <div key={idx} className="card">
              <img src={blog.img} alt={blog.title} />
              <h3>{blog.title}</h3>
              <div>{blog.author}</div>
              <p>
                Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
              </p>
              <div className="card-footer">
                <a href="#">Read more</a>
                <span>{blog.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      </div>
    </div>
  );
}
