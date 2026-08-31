import React, { useState, useEffect } from 'react';

export default function Work() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const projects = [
    {
      title: 'Coca-Cola Can 3D Design',
      badge: '3D Modeling',
      image: '/assets/cocacola-3d.png',
      alt: 'Coca-Cola Can 3D Design in Blender',
      desc: 'This realistic 3D Coca-Cola can was modeled and rendered in Blender, focusing on detailed texturing, reflections, and lighting to achieve a photorealistic look.',
      tags: ['Blender', '3D Modeling', 'Texturing', 'Lighting'],
      link: 'https://www.artstation.com/artwork/Xa1bry',
    },
    {
      title: 'NWSDB Mobile App UI/UX Design',
      badge: 'UI/UX Design',
      image: '/assets/nwsdb-app.png',
      alt: 'NWSDB Mobile App UI/UX Design',
      desc: 'UI/UX design for NWSDB app with intuitive interfaces for bill management and service requests.',
      tags: ['Figma', 'UI/UX Design', 'Mobile App', 'Prototyping'],
      link: 'https://www.behance.net/gallery/225779315/UIUX-Design',
    },
    {
      title: 'Tesla Cybertruck - Animated 3D Model in Blender',
      badge: '3D Modeling',
      image: '/assets/render-image.png',
      alt: 'Tesla Cybertruck - Animated 3D Model in Blender',
      desc: 'A high-detail, fully rigged, and animated 3D model of the Tesla Cybertruck, created and rendered in Blender.',
      tags: ['Blender', '3D Modeling', 'Rigging', 'Animation'],
      link: 'https://www.artstation.com/artwork/Ba3NQk',
    },
    {
      title: 'Bus Tracking System Mobile App',
      badge: 'UI/UX Design',
      image: '/assets/bus-tracking-app.png',
      alt: 'Bus Tracking System Mobile App UI/UX Design',
      desc: 'UI/UX design for a bus tracking app with real-time updates, route planning, and live arrivals.',
      tags: ['Figma', 'UI/UX Design', 'Mobile App', 'SLTB'],
      link: 'https://www.behance.net/gallery/225784195/UIUX-Design',
    },
    {
      title: 'Shopora.lk Website UI/UX Design',
      badge: 'UI/UX Design',
      image: '/assets/project5.png',
      alt: 'Shopora.lk Website UI/UX Design',
      desc: 'UI/UX design for Shopora.lk e-commerce platform with clean product browsing, flash sales, and modern web layouts.',
      tags: ['Figma', 'UI/UX Design', 'E-Commerce', 'Web App'],
      link: 'https://www.behance.net/gallery/228836697/ShoporaUIUX-Design',
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - visibleCount);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section id="work" className="section work-section">
      <div className="section-inner">
        <div className="section-title-wrap">
          <span className="section-pill">Featured Work</span>
          <h2 className="section-heading">Selected Projects & Creations</h2>
        </div>

        <div className="projects-carousel-wrapper">
          <button
            className="carousel-arrow left-arrow"
            onClick={prevSlide}
            aria-label="Previous Projects"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>

          <div className="projects-carousel-track-container">
            <div
              className="projects-carousel-track"
              style={{
                transform: `translateX(calc(-${currentIndex} * (100% + 24px) / ${visibleCount}))`,
                '--visible-cards': visibleCount,
              }}
            >
              {projects.map((proj, idx) => (
                <div key={idx} className="project-card glassmorphic-card">
                  <div className="project-img-container">
                    {proj.link ? (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer">
                        <img src={proj.image} alt={proj.alt} loading="lazy" />
                      </a>
                    ) : (
                      <img src={proj.image} alt={proj.alt} loading="lazy" />
                    )}
                    <div className="project-overlay-badge">{proj.badge}</div>
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-desc">{proj.desc}</p>
                    <div className="project-tags">
                      {proj.tags.map((tag, tIdx) => (
                        <span key={tIdx}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="carousel-arrow right-arrow"
            onClick={nextSlide}
            aria-label="Next Projects"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
