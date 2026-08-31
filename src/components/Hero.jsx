import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

export default function Hero() {
  const typedText = useTypewriter([
    '3D Modeling & Rendering',
    'Video Production',
    'UI/UX Design',
    'Full-Stack Development'
  ]);

  return (
    <section id="home" className="section hero-section">
      <div className="hero-container">
        <div className="hero-left-content">
          <span className="hero-greeting">Hi There,</span>
          <h1 className="hero-name">
            I'm Rumesh <span className="name-highlight">Kaluarachchi</span>
          </h1>

          <div className="hero-typing-box">
            <span className="typing-prefix">I Am Into </span>
            <span className="typed-text">{typedText}</span>
            <span className="typing-cursor">|</span>
          </div>

          <div className="hero-cta-box">
            <a href="#about" className="btn-about">
              <span>About Me</span>
              <i className="fa-solid fa-circle-arrow-down" />
            </a>
          </div>

          {/* Social Media Icons Row */}
          <div className="hero-social-links">
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
