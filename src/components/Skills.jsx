import React from 'react';

export default function Skills() {
  const skillCategories = [
    {
      title: '3D Modeling & Rendering',
      icon: 'fa-cube',
      skills: [
        { name: 'Blender', icon: 'fa-solid fa-cubes' },
        { name: 'Maya / 3ds Max', icon: 'fa-solid fa-shapes' },
        { name: 'Texturing & Shading', icon: 'fa-solid fa-paint-roller' },
        { name: 'Lighting & Rendering', icon: 'fa-solid fa-lightbulb' },
        { name: '3D Asset Creation', icon: 'fa-solid fa-box-open' },
        { name: 'Character / Prop Modeling', icon: 'fa-solid fa-draw-polygon' },
      ],
    },
    {
      title: 'Video Editing & Production',
      icon: 'fa-film',
      skills: [
        { name: 'Adobe Premiere Pro', icon: 'fa-solid fa-video' },
        { name: 'Adobe After Effects', icon: 'fa-solid fa-wand-magic-sparkles' },
        { name: 'Motion Graphics', icon: 'fa-solid fa-clapperboard' },
        { name: 'Color Grading', icon: 'fa-solid fa-sliders' },
        { name: 'Visual Effects (VFX)', icon: 'fa-solid fa-fire-flame-curved' },
        { name: 'Audio & Post Production', icon: 'fa-solid fa-headphones' },
      ],
    },
    {
      title: 'UI/UX Design',
      icon: 'fa-palette',
      skills: [
        { name: 'Figma', icon: 'fa-brands fa-figma' },
        { name: 'Adobe XD', icon: 'fa-solid fa-pen-nib' },
        { name: 'Wireframing & Prototyping', icon: 'fa-solid fa-layer-group' },
        { name: 'User Experience (UX)', icon: 'fa-solid fa-user-check' },
        { name: 'User Interface (UI)', icon: 'fa-solid fa-display' },
        { name: 'Responsive Web Design', icon: 'fa-solid fa-mobile-screen' },
      ],
    },
    {
      title: 'Full-Stack Development',
      icon: 'fa-code',
      skills: [
        { name: 'HTML5 / CSS3', icon: 'fa-brands fa-html5' },
        { name: 'JavaScript (ES6+)', icon: 'fa-brands fa-js' },
        { name: 'React.js', icon: 'fa-brands fa-react' },
        { name: 'Node.js & Express', icon: 'fa-brands fa-node-js' },
        { name: 'MongoDB / MySQL', icon: 'fa-solid fa-database' },
        { name: 'RESTful APIs & Git', icon: 'fa-brands fa-git-alt' },
      ],
    },
  ];

  return (
    <section id="skills" className="section skills-section">
      <div className="section-inner">
        <div className="section-title-wrap">
          <span className="section-pill">Technical Skills</span>
          <h2 className="section-heading">Core Competencies & Toolset</h2>
        </div>

        <div className="skills-categories-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="skill-category-card glassmorphic-card">
              <div className="skill-card-header">
                <i className={`fa-solid ${cat.icon} skill-header-icon`} />
                <h3>{cat.title}</h3>
              </div>
              <ul className="skill-tags">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="skill-badge">
                    <i className={skill.icon} /> {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
