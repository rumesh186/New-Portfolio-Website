import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/rumeshlakmal186@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Server returned non-ok status');
      }
    } catch (err) {
      // Fallback to mailto link if network issue occurs
      const mailtoLink = `mailto:rumeshlakmal186@gmail.com?subject=${encodeURIComponent(
        'Portfolio Contact: ' + formData.name
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner">
        <div className="section-title-wrap">
          <span className="section-pill">Get In Touch</span>
          <h2 className="section-heading">Let's Build Something Great Together</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info-card glassmorphic-card">
            <h3>Contact Information</h3>
            <p>Feel free to reach out for project inquiries, freelance opportunities, or collaborations.</p>

            <address className="contact-details-list">
              <div className="contact-detail-item">
                <i className="fa-solid fa-envelope contact-icon" />
                <div>
                  <span className="contact-label">Email</span>
                  <a href="mailto:rumeshlakmal186@gmail.com" className="contact-value">
                    rumeshlakmal186@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <i className="fa-solid fa-location-dot contact-icon" />
                <div>
                  <span className="contact-label">Location</span>
                  <span className="contact-value">No - 35, Denagama East, Hakmana, Sri Lanka</span>
                </div>
              </div>
            </address>

            <div className="contact-social-row">
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

          <div className="contact-form-card glassmorphic-card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: '3rem', color: 'var(--accent-orange)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>Thank you!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Your message has been sent to <strong>rumeshlakmal186@gmail.com</strong>. I'll get back to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-submit"
                  style={{ marginTop: '20px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <i className={`fa-solid ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
