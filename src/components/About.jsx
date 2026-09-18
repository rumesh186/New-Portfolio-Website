import React from 'react';

export default function About() {
  const resumeUrl = 'https://drive.google.com/file/d/16rVwozrTtBHONzxtDlPKa2Qbc0DX2emI/view?pli=1';

  return (
    <section id="about" className="section about-section">
      <div className="section-inner">
        <div className="section-title-wrap">
          <span className="section-pill">About Me</span>
          <h2 className="section-heading">Crafting Digital Solutions with Precision</h2>
        </div>

        {/* Unified single card box containing text and photo */}
        <article className="about-single-card glassmorphic-card">
          <div className="about-content-col">
            <h3>Who I Am</h3>
            <p>
              I'm Rumesh Kaluarachchi, a creative Multimedia Technology enthusiast passionate about creating digital experiences.
            </p>
            <p>
              I do 3D modeling and video editing, bringing creative ideas to life through visual content.
            </p>
            <p>
              I also do UI/UX design and full-stack development, creating modern and user-friendly digital solutions.
            </p>

            <div className="about-cta-box">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-download-cv"
              >
                <span>Download Resume</span>
                <i className="fa-solid fa-download" />
              </a>
            </div>
          </div>

          <div className="about-image-col">
            <img
              src="/assets/rumesh-photo.jpg"
              alt="Rumesh Kaluarachchi — Multimedia Technology professional, 3D artist and full-stack developer from Sri Lanka"
              className="about-profile-img"
              loading="eager"
              width="400"
              height="400"
            />
          </div>
        </article>
      </div>
    </section>
  );
}

