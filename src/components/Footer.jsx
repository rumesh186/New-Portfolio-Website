import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Visually hidden but accessible for crawlers to maintain SEO optimization */}
      <div className="sr-only">
        <div className="footer-brand">
          <strong>Rumesh Kaluarachchi</strong>
          <p className="footer-tagline">
            3D Artist · Video Editor · Full-Stack Developer · UI/UX Designer
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer Navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="footer-social">
          <a href="https://www.linkedin.com/in/rumesh-kaluarachchi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin-in" />
          </a>
          <a href="https://github.com/rumesh186" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fa-brands fa-github" />
          </a>
          <a href="https://www.behance.net/rumeshkaluarachchi" target="_blank" rel="noopener noreferrer" aria-label="Behance">
            <i className="fa-brands fa-behance" />
          </a>
          <a href="https://www.artstation.com/rumeshk_kaluarachchi" target="_blank" rel="noopener noreferrer" aria-label="ArtStation">
            <i className="fa-brands fa-artstation" />
          </a>
        </div>
      </div>

      <p className="footer-copyright">
        © {currentYear} Rumesh Kaluarachchi. All rights reserved.
      </p>
    </footer>
  );
}

