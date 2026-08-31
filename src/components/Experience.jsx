import React from 'react';

export default function Experience() {
  const experiences = [
    {
      period: '2023 — Present',
      title: '3D Modeling & Rendering',
      institution: 'Freelance',
      desc: 'Creating 3D models, realistic renderings, and visual assets for creative projects and clients.',
    },
    {
      period: '2022 — Present',
      title: 'Video Editing & Production',
      institution: 'Freelance',
      desc: 'Producing video content, motion graphics, color grading, and post-production for digital media.',
    },
    {
      period: '2023 — Present',
      title: 'Full-Stack Development',
      institution: 'Freelance',
      desc: 'Building full-stack web applications, custom UI components, and API integrations.',
    },
    {
      period: '2023 — Present',
      title: 'UI/UX Design',
      institution: 'Freelance',
      desc: 'Designing user interfaces, interactive wireframes, and modern user experiences.',
    },
  ];

  return (
    <section id="experience" className="section experience-section">
      <div className="section-inner">
        <div className="section-title-wrap">
          <span className="section-pill">Career Journey</span>
          <h2 className="section-heading">Professional Experience</h2>
        </div>

        <div className="timeline-container">
          {experiences.map((exp, idx) => (
            <div key={idx} className="timeline-card glassmorphic-card">
              <div className="timeline-period">{exp.period}</div>
              <h3 className="timeline-title">{exp.title}</h3>
              <span className="timeline-institution">{exp.institution}</span>
              <p className="timeline-desc">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
