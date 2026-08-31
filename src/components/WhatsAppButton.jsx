import React from 'react';

export default function WhatsAppButton() {
  const phoneNumber = '94765540471';
  const message = encodeURIComponent('Hi Rumesh, I visited your portfolio and would like to connect!');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp (0765540471)"
    >
      <div className="whatsapp-icon-wrap">
        <i className="fa-brands fa-whatsapp" />
      </div>
      <span className="whatsapp-tooltip">Chat with me</span>
    </a>
  );
}
