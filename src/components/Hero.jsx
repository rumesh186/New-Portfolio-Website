import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

export default function Hero() {
  const [entered, setEntered] = useState(false);

  const typedText = useTypewriter([
    '3D Modeling & Rendering',
    'Video Production',
    'UI/UX Design',
    'Full-Stack Development'
  ]);

  useEffect(() => {
    // Trigger entrance animation shortly after mount
    const timer = setTimeout(() => setEntered(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="section hero-section">
      <div className="hero-container">
        <div className={`hero-left-content ${entered ? 'hero-entered' : ''}`}>
          <span className="hero-greeting hero-anim hero-anim--1">Hi There,</span>
          <h1 className="hero-name hero-anim hero-anim--2">
            I'm Rumesh <span className="name-highlight">Kaluarachchi</span>
          </h1>

          <div className="hero-typing-box hero-anim hero-anim--3">
            <span className="typing-prefix">I Am Into </span>
            <span className="typed-text">{typedText}</span>
            <span className="typing-cursor">|</span>
          </div>

          {/* SEO: Hidden heading for crawlers — typewriter text is JS-rendered and invisible to bots */}
          <h2 className="sr-only">
            Specializing in 3D Modeling &amp; Rendering, Video Editing &amp; Production, UI/UX Design, and Full-Stack Development
          </h2>
          <div className="hero-cta-box hero-anim hero-anim--4">
            <a href="#about" className="btn-about">
              <span>About Me</span>
              <i className="fa-solid fa-circle-arrow-down" />
            </a>
          </div>

          {/* Social Media Icons Row */}
          <div className="hero-social-links hero-anim hero-anim--5">
            <a href="https://www.linkedin.com/in/rumesh-kaluarachchi/" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in" />
            </a>
            <a href="https://github.com/rumesh186" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub">
              <i className="fa-brands fa-github" />
            </a>
            <a href="https://www.behance.net/rumeshkaluarachchi" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Behance">
              <i className="fa-brands fa-behance" />
            </a>
            <a href="https://www.artstation.com/rumeshk_kaluarachchi" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="ArtStation">
              <i className="fa-brands fa-artstation" />
            </a>
            <a href="https://wa.me/94765540471" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp" />
            </a>
            <a href="https://www.facebook.com/rumesh.lakmal.94064" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a href="https://www.instagram.com/rumesh_kaluarachchi" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
              <i className="fa-brands fa-instagram" />
            </a>
          </div>
        </div>

        {/* Right side spacer for canvas video frame animation */}
        <div className="hero-right-visual-anchor" />
      </div>
    </section>
  );
}
