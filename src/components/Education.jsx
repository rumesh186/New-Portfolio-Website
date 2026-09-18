import React from 'react';

export default function Education() {
  const educationList = [
    {
      period: '2023 – 2027 | Pursuing',
      dateTime: '2023/2027',
      title: 'Bachelor of Information and Communication Technology (Hons)',
      institution: 'University of Sri Jayewardenepura',
      desc: 'Specializing in Multimedia Technology',
    },
    {
      period: '2018 – 2021 | Completed',
      dateTime: '2018/2021',
      title: 'GCE Advanced Level',
      institution: 'Methodist National School',
      desc: 'Technology Stream',
    },
  ];

  return (
    <section id="education" className="section education-section">
      <div className="section-inner">
        <div className="section-title-wrap">
          <span className="section-pill">Education</span>
          <h2 className="section-heading">Academic Background</h2>
        </div>

        <div className="timeline-container">
          {educationList.map((item, idx) => (
            <article key={idx} className="timeline-card glassmorphic-card">
              <time className="timeline-period" dateTime={item.dateTime}>{item.period}</time>
              <h3 className="timeline-title">{item.title}</h3>
              <span className="timeline-institution">{item.institution}</span>
              <p className="timeline-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

