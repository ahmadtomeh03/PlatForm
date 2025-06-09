import React from "react";
import "./Help.css";
import MyProfile from "../MyProfile/MyProfile";
const Help = () => {
  return (
    <div className="help-page">
      <div id="root" className="contact-container">
        <h1>CONTACT US</h1>
        <p className="subtitle">
          If you have any questions, please feel free to get in touch with us
          via phone, text, email, the form below, or even on social media!
        </p>

        <div className="contact-main">
          <div className="contact-form">
            <h2>GET IN TOUCH</h2>
            <form>
              <input type="text" placeholder="Enter your name*" required />
              <input
                type="text"
                placeholder="Enter your phone number*"
                required
              />
              <input type="email" placeholder="Enter your email*" required />
              <textarea placeholder="Your message" required></textarea>
              <button type="submit">SEND MESSAGE</button>
            </form>
          </div>

          <div className="contact-info">
            <div className="info-box">
              <h3>CONTACT INFORMATION</h3>
              <p>
                <strong>PHONE:</strong> +970 9 000000
              </p>
              <p>
                <strong>EMAIL:</strong> info@ptuk.edu.ps
              </p>
              <p>
                <strong>ADDRESS:</strong> Tulkarem, Palestine
              </p>
            </div>

            <div className="info-box">
              <h3>ACTIVE HOURS</h3>
              <p>
                <strong>Monday - Friday:</strong> 8:00 am - 4:00 pm
              </p>
              <p>
                <strong>Saturday & Sunday:</strong> Closed
              </p>
            </div>
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
