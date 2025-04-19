import React from 'react';
import './About.css';
import logo from '../images/';

const About = () => {
  return (
    <div className="about-container">
      {/* Left: Image */}
      <div className="about-image">
        <img src={logo} alt="Team at work" />
      </div>

      {/* Right: Text */}
      <div className="about-text">
        <h2>About Milk Bar</h2>
        <p>
          Milk Bar is a sweet (and occasionally savory) shop that's been turning familiar treats upside down and on their heads, shaking up the dessert scene since 2008. Bon Appétit magazine called us “one of the most exciting bakeries in the country.” But you can literally just call us Milk Bar. We’re not big on feeding the hype beast. But we’re super into feeding our flavorful treats to those who crave the unexpected.
        </p>
        <p>
          Founded by James Beard award–winning pastry chef Christina Tosi, Milk Bar first opened its doors in NYC’s East Village, and soon developed a loyal fanbase.
        </p>
        <p>
          Recently profiled on Netflix’s docu-series Chef’s Table, Tosi is known for combining her formal culinary training and her informal obsession with home baking, grocery store staples and classic American sweets, with menu items like the Compost Cookie®, layer cakes with unfrosted sides, Cereal Milk™ Soft Serve, Milk Bar Pie and more.
        </p>
        <p>
          At Milk Bar, we believe in the transformative power of a really freakin’ good cookie or an outstanding piece of cake. And we consider NO occasion at all to be a perfectly valid occasion to celebrate yourself or someone else. We hope you’ll agree.
        </p>
      </div>
    </div>
  );
};

export default About;
