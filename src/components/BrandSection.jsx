import React, { useState } from "react";
import "../styles/BrandSection.css";
import TypeWriter from "./TypeWriter";
import brand1 from "../assets/images/brand1.png"; // e.g., rizzle logo
import brand2 from "../assets/images/brand2.png"; // séry
import brand3 from "../assets/images/brand3.png"; // iba
import brand4 from "../assets/images/brand4.png"; // purple
import brand5 from "../assets/images/brand5.png"; // marico
import brand6 from "../assets/images/brand6.png"; // reckitt
import team2 from "../assets/images/team2.png";   // right-side team image

function BrandSection() {
  const [firstParagraphComplete, setFirstParagraphComplete] = useState(false);

  return (
    <section className="brands-feature-section">
      <h2 className="brands-title">Our Trusted Brands</h2>
      <div className="brands-row">
        <img src={brand1} alt="rizzle" />
        <img src={brand2} alt="SERY" />
        <img src={brand3} alt="iba" />
        <img src={brand4} alt="purple" />
        <img src={brand5} alt="marico" />
        <img src={brand6} alt="reckitt" />
      </div>
      <div className="feature-row">
        <div className="feature-text">
          <span className="feature-label">OUR PROMISE</span>
          <h3>
            Tool <b>built for creators.</b>
          </h3>
          <p>
            <TypeWriter 
              text="We have tools to support your content journey from regular post to high quality podcast. We understand the need is different for all creators"
              speed={40}
              delay={800}
              className="typewriter-text"
              onComplete={() => setFirstParagraphComplete(true)}
            />
          </p>
          <p>
            {firstParagraphComplete && (
              <TypeWriter 
                text="BigBets uses AI based tools for market research, content generation and publish."
                speed={40}
                delay={500}
                className="typewriter-text"
              />
            )}
          </p>
          <button className="feature-btn">Talk to us!</button>
        </div>
        <div className="feature-image">
          <img src={team2} alt="team working" />
        </div>
      </div>
    </section>
  );
}

export default BrandSection;
