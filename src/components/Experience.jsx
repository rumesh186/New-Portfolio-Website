import React from 'react';

export default function Experience() {
  const experiences = [
    {
      period: '2023 — Present',
      dateTime: '2023',
      title: '3D Modeling & Rendering',
      institution: 'Freelance',
      desc: 'Creating 3D models, realistic renderings, and visual assets for creative projects and clients.',
    },
    {
      period: '2022 — Present',
      dateTime: '2022',
      title: 'Video Editing & Production',
      institution: 'Freelance',
      desc: 'Producing video content, motion graphics, color grading, and post-production for digital media.',
    },
    {
      period: '2023 — Present',
      dateTime: '2023',
      title: 'Full-Stack Development',
      institution: 'Freelance',
      desc: 'Building full-stack web applications, custom UI components, and API integrations.',
    },
    {
      period: '2023 — Present',
      dateTime: '2023',
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
            <article key={idx} className="timeline-card glassmorphic-card">
              <time className="timeline-period" dateTime={exp.dateTime}>{exp.period}</time>
              <h3 className="timeline-title">{exp.title}</h3>
              <span className="timeline-institution">{exp.institution}</span>
              <p className="timeline-desc">{exp.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

