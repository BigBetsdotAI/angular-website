import React from 'react';
import '../styles/ImageSection.css';

// Example image imports
import podcastImg from '../assets/images/podcast.png';
import contentImg from '../assets/images/content.png';
import digitalImg from '../assets/images/digital.png';
import leadImg from '../assets/images/lead.png';
import blogsImg from '../assets/images/blogs.png';
import socialImg from '../assets/images/social.png';

const services = [
  {
    img: podcastImg,
    title: "Professional Podcast Studio"
  },
  {
    img: contentImg,
    title: "Content Creation"
  },
  {
    img: digitalImg,
    title: "Digital Marketing"
  },
  {
    img: leadImg,
    title: "Lead Generation and Lead Conversion"
  },
  {
    img: blogsImg,
    title: "Blogs for your brands"
  },
  {
    img: socialImg,
    title: "Social Growth"
  }
];

function ImageSection() {
  return (
    <section className="image-section">
      <div className="section-header">
        <p className="section-label">SERVICES WE OFFER</p>
        <h2>
          An Award Winning Platform and Services, Loved by<br />
          Customers
        </h2>

      </div>
      <div className="services-grid">
        {services.map((service, idx) => (
          <div className="service-card" key={idx}>
            <img src={service.img} alt={service.title} />
            <p className="service-title">{service.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ImageSection;
