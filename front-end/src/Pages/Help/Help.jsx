import React from "react";
import "./Help.css";
import { useState } from "react";
import axios from "axios";
import MyProfile from "../MyProfile/MyProfile";
import Swal from "sweetalert2";
const Help = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post(
        "http://localhost:3000/contact",
        formData
      );

      if (response.data.success) {
        setStatus("Message sent successfully ✅");
        setFormData({ name: "", phone: "", email: "", message: "" });

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your message has been sent successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        setStatus("Failed to send ❌");

        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to send your message. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus("Server error ❌");

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="help-page">
      <div id="root" className="contact-container">
        <h1>CONTACT US</h1>
        <p className="subtitle">
          If you have any questions, please feel free to get in touch with us
          via phone, text, email, the form below.
        </p>

        <div className="contact-main">
          <div className="contact-form">
            <h2>GET IN TOUCH</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter your name*"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number*"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email*"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit">SEND MESSAGE</button>
              <p style={{ marginTop: "10px", color: "green" }}>{status}</p>
            </form>
          </div>

          <div className="contact-info">
            <div className="info-box">
              <h3>CONTACT INFORMATION</h3>
              <p>
                <strong>PHONE:</strong> +970 9 000000
              </p>
              <p>
                <strong>EMAIL:</strong> ptukgate@gmail.com
              </p>
              <p>
                <strong>ADDRESS:</strong> Tulkarem, Palestine
              </p>
            </div>

            {/* <div className="info-box">
              <h3>ACTIVE HOURS</h3>
              <p>
                <strong>Monday - Friday:</strong> 8:00 am - 4:00 pm
              </p>
              <p>
                <strong>Saturday & Sunday:</strong> Closed
              </p>
            </div> */}
          </div>
        </div>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.1229170927797!2d35.027551!3d32.313674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151cbd7371e1d86d%3A0xb176b13f2ea820c7!2sPalestine%20Technical%20University%20-%20Kadoorie!5e0!3m2!1sar!2s!4v1716679500000!5m2!1sar!2s"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="PTUK Kadoorie Map"
          />
        </div>
      </div>
      {/* <MyProfile></MyProfile> */}
    </div>
  );
};

export default Help;
