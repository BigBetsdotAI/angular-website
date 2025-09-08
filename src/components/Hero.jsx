import React from 'react';
import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero parallax-bg">
      <div className="hero-content">
        <h1>At BigBets.AI – We Make Sure You Are Seen!</h1>
        <p>
          Social media helps you building your personal brand and we help in
          curating content and making sure to grow your brand.
        </p>
        <div className="hero-buttons">
          <button className="hero-btn primary">Get started free</button>
          <button 
            className="hero-btn secondary"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
      <div className="hero-collage">
        <video
          src={require('../assets/videos/BigBets.mp4')}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          preload="auto"
          // Add pointer-events none to allow scroll behind video if needed
          style={{ pointerEvents: 'auto' }} 
        />
      </div>
    </section>
  );
}

export default Hero;
