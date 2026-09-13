import React, { useState, useEffect } from 'react';

export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement);
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        {/* RK Monogram Vector Logo (Transparent Background) */}
        <a 
          href="#home" 
          className="brand-logo" 
          aria-label="Rumesh Kaluarachchi Home"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <svg className="rk-logo-svg" viewBox="0 0 280 240" fill="none">
            {/* R Character */}
            <path
              d="M 14 28 L 100 28 L 122 38 C 142 50 154 68 154 90 C 154 112 142 128 126 138 L 182 208 L 142 208 L 92 138 L 68 126 C 86 122 102 114 112 102 C 120 92 124 82 124 72 C 124 60 116 56 100 56 L 14 56 Z"
              fill="currentColor"
            />
            {/* K Character */}
            <path
              d="M 268 28 L 228 28 L 168 98 L 168 124 L 228 208 L 268 208 L 198 111 Z"
              fill="currentColor"
            />
          </svg>
        </a>

        {/* Desktop Nav Links */}
        <nav className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`} />
        </button>
      </div>
    </header>
  );
}
