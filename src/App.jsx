import React from 'react';
import ScrollCanvas from './components/ScrollCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Work from './components/Work';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';
import { useScrollSpy } from './hooks/useScrollSpy';
import ScrollReveal from './components/ScrollReveal';

const SECTION_IDS = ['home', 'about', 'skills', 'education', 'work', 'experience', 'contact'];

export default function App() {
  const activeSection = useScrollSpy(SECTION_IDS, 250);

  return (
    <>
      {/* Skip to content — Accessibility & SEO */}
      <a href="#main-content" className="skip-to-content">Skip to main content</a>

      {/* Background Canvas Frame Animation Layer */}
      <ScrollCanvas />

      {/* Navigation Bar with Vector RK Logo & Active ScrollSpy Indicator */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main id="main-content" role="main">
        <Hero />

        <ScrollReveal variant="fade-up" delay={0}>
          <About />
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={50}>
          <Skills />
        </ScrollReveal>

        <ScrollReveal variant="slide-left" delay={0}>
          <Education />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={50}>
          <Work />
        </ScrollReveal>

        <ScrollReveal variant="slide-right" delay={0}>
          <Experience />
        </ScrollReveal>

        <ScrollReveal variant="blur-in" delay={50}>
          <Contact />
        </ScrollReveal>

        <Footer />
      </main>

      {/* Global Floating Action Buttons */}
      <WhatsAppButton />
      <Chatbot />
    </>
  );
}
