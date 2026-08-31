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

const SECTION_IDS = ['home', 'about', 'skills', 'education', 'work', 'experience', 'contact'];

export default function App() {
  const activeSection = useScrollSpy(SECTION_IDS, 250);

  return (
    <>
      {/* Background Canvas Frame Animation Layer */}
      <ScrollCanvas />

      {/* Navigation Bar with Vector RK Logo & Active ScrollSpy Indicator */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Work />
        <Experience />
        <Contact />
        <Footer />
      </main>

      {/* Global Floating Action Buttons */}
      <WhatsAppButton />
      <Chatbot />
    </>
  );
}
