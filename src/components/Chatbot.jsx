import React, { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  '👋 Tell me about Rumesh',
  '🛠️ What are his skills?',
  '🎓 Education & Degree',
  '💼 Work Experience',
  '🎨 View Projects',
  '📞 How to contact him?',
  '📄 Download Resume',
];

const BOT_KNOWLEDGE = {
  about: `I'm **Rumesh Kaluarachchi**, a creative Multimedia Technology enthusiast studying at the **University of Sri Jayewardenepura**.\n\nI specialize in **3D Modeling & Rendering**, **Video Editing & Production**, **UI/UX Design**, and **Full-Stack Development**.`,

  skills: `Here are Rumesh's core skills organized by category:\n\n` +
    `• 🎨 **3D Modeling & Rendering**: Blender, Maya, Texturing, Lighting, Photorealistic 3D\n` +
    `• 🎬 **Video Editing & Production**: Premiere Pro, After Effects, Motion Graphics, Sound Design\n` +
    `• 📱 **UI/UX Design**: Figma, Wireframing, Mobile App Design, User Research\n` +
    `• 💻 **Full-Stack Development**: React.js, JavaScript (ES6+), HTML5/CSS3, Node.js, Git`,

  education: `🎓 **Education Background**:\n\n` +
    `1. **Bachelor of Information and Communication Technology (Hons)**\n` +
    `   • University of Sri Jayewardenepura\n` +
    `   • Specializing in Multimedia Technology\n` +
    `   • *2023 — 2027 | Pursuing*\n\n` +
    `2. **GCE Advanced Level**\n` +
    `   • Methodist National School\n` +
    `   • Technology Stream\n` +
    `   • *2018 — 2021 | Completed*`,

  experience: `💼 **Work & Freelance Experience**:\n\n` +
    `• **3D Modeling & Rendering** (Freelance, 2023 — Present)\n` +
    `• **Video Editing & Production** (Freelance, 2022 — Present)\n` +
    `• **Full-Stack Development** (Freelance, 2023 — Present)\n` +
    `• **UI/UX Design** (Freelance, 2023 — Present)`,

  projects: `🎨 **Featured Projects**:\n\n` +
            `1. **Coca-Cola Can 3D Design** (Blender 3D Modeling)\n` +
            `   • [View on ArtStation](https://www.artstation.com/artwork/Xa1bry)\n\n` +
            `2. **NWSDB Mobile App UI/UX Design** (Bill & Service App)\n` +
            `   • [View on Behance](https://www.behance.net/gallery/225779315/UIUX-Design)\n\n` +
            `3. **Tesla Cybertruck - Animated 3D Model in Blender** (Blender 3D Modeling)\n` +
            `   • [View on ArtStation](https://www.artstation.com/artwork/Ba3NQk)\n\n` +
            `4. **Bus Tracking System Mobile App** (Real-time SLTB App)\n` +
            `   • [View on Behance](https://www.behance.net/gallery/225784195/UIUX-Design)\n\n` +
            `5. **Shopora.lk Website UI/UX Design** (E-Commerce Web App)\n` +
            `   • [View on Behance](https://www.behance.net/gallery/228836697/ShoporaUIUX-Design)`,

  modeling: `🎨 **3D Modeling & Rendering**:\n\n` +
            `Rumesh models photorealistic 3D assets, product designs, and studio renders in Blender & Maya.\n\n` +
            `👉 Check out his featured [Tesla Cybertruck 3D Model](https://www.artstation.com/artwork/Ba3NQk) and [Coca-Cola Can 3D Design](https://www.artstation.com/artwork/Xa1bry) on ArtStation or visit his [ArtStation Profile](https://www.artstation.com/rumeshk_kaluarachchi)!`,

  video: `🎬 **Video Editing & Production**:\n\n` +
    `Rumesh has been freelancing in video editing and production since 2022, creating visual content, motion graphics, and audio visualizers using Premiere Pro & After Effects.`,

  uiux: `📱 **UI/UX Design**:\n\n` +
    `Rumesh designs modern, user-friendly mobile and web interfaces using Figma.\n\n` +
    `Featured Work:\n` +
    `• [Shopora.lk E-Commerce Website UI/UX](https://www.behance.net/gallery/228836697/ShoporaUIUX-Design)\n` +
    `• [NWSDB Mobile App UI/UX](https://www.behance.net/gallery/225779315/UIUX-Design)\n` +
    `• [SLTB Bus Tracking App UI/UX](https://www.behance.net/gallery/225784195/UIUX-Design)\n\n` +
    `👉 Visit his [Behance Profile](https://www.behance.net/rumeshkaluarachchi) to see more!`,

  fullstack: `💻 **Full-Stack Development**:\n\n` +
    `Rumesh builds clean, responsive web applications using React.js, JavaScript, Node.js, and modern CSS3.\n\n` +
    `👉 Visit his [GitHub Profile](https://github.com/rumesh186) to explore his repositories!`,

  contact: `📬 **Contact Information**:\n\n` +
    `• 📧 **Email**: [rumeshlakmal186@gmail.com](mailto:rumeshlakmal186@gmail.com)\n` +
    `• 📱 **Phone / WhatsApp**: [+94 76 554 0471](https://wa.me/94765540471)\n` +
    `• 📍 **Location**: No - 35, Denagama East, Hakmana, Sri Lanka\n\n` +
    `🔗 **Social Profiles**:\n` +
    `• [LinkedIn](https://www.linkedin.com/in/rumesh-kaluarachchi/)\n` +
    `• [GitHub](https://github.com/rumesh186)\n` +
    `• [Behance](https://www.behance.net/rumeshkaluarachchi)\n` +
    `• [ArtStation](https://www.artstation.com/rumeshk_kaluarachchi)`,

  location: `📍 **Location**:\n\n` +
    `Rumesh is based at **No - 35, Denagama East, Hakmana, Sri Lanka**.\n\n` +
    `He is available for freelance projects worldwide!`,

  hire: `🚀 **Interested in working together?**\n\n` +
    `Rumesh is available for freelance projects in **3D Modeling**, **Video Production**, **UI/UX Design**, and **Full-Stack Web Development**.\n\n` +
    `👉 Send him an email at [rumeshlakmal186@gmail.com](mailto:rumeshlakmal186@gmail.com) or chat on [WhatsApp](https://wa.me/94765540471)!`,

  resume: `📄 You can view and download Rumesh's official resume here:\n\n` +
    `👉 [Download Resume (Google Drive)](https://drive.google.com/file/d/16rVwozrTtBHONzxtDlPKa2Qbc0DX2emI/view?pli=1)`,

  greeting: `Hello! 👋 I'm Rumesh's AI Assistant. How can I help you today? Ask me about his background, skills, education, projects, or contact details!`,

  thanks: `You're very welcome! 😊 Feel free to ask if you have any more questions about Rumesh or his work!`,

  fallback: `I'm happy to help! You can ask me about Rumesh's **skills**, **projects**, **education**, **experience**, **resume**, or **contact info**. Or select one of the quick topics below!`,
};

function getBotResponse(userMsg) {
  const msg = userMsg.toLowerCase().trim();

  if (/hi|hello|hey|greetings|who are you|good morning|good evening/.test(msg)) {
    return BOT_KNOWLEDGE.greeting;
  }
  if (/thank|thanks|great|awesome|cool|perfect|good/.test(msg)) {
    return BOT_KNOWLEDGE.thanks;
  }
  if (/about|who is rumesh|bio|tell me|profile|summary/.test(msg)) {
    return BOT_KNOWLEDGE.about;
  }
  if (/hire|freelance|available|work with|opportunity|project/.test(msg)) {
    return BOT_KNOWLEDGE.hire;
  }
  if (/3d|blender|maya|render|modeling|coca|coke/.test(msg)) {
    return BOT_KNOWLEDGE.modeling;
  }
  if (/video|edit|editing|production|premiere|after effects|motion/.test(msg)) {
    return BOT_KNOWLEDGE.video;
  }
  if (/ui|ux|figma|app|mobile|nwsdb|bus|sltb|prototype|wireframe/.test(msg)) {
    return BOT_KNOWLEDGE.uiux;
  }
  if (/full stack|fullstack|web|react|node|javascript|html|css|dev|code|coding/.test(msg)) {
    return BOT_KNOWLEDGE.fullstack;
  }
  if (/skill|technology|stack|tech/.test(msg)) {
    return BOT_KNOWLEDGE.skills;
  }
  if (/education|degree|university|school|study|studying|jaye|usj|al|advanced level/.test(msg)) {
    return BOT_KNOWLEDGE.education;
  }
  if (/experience|work|job|history|career/.test(msg)) {
    return BOT_KNOWLEDGE.experience;
  }
  if (/project|portfolio|creation/.test(msg)) {
    return BOT_KNOWLEDGE.projects;
  }
  if (/location|address|hakmana|denagama|sri lanka|where/.test(msg)) {
    return BOT_KNOWLEDGE.location;
  }
  if (/contact|email|mail|phone|whatsapp|number|social|linkedin|github|behance|artstation/.test(msg)) {
    return BOT_KNOWLEDGE.contact;
  }
  if (/resume|cv|download|document|pdf/.test(msg)) {
    return BOT_KNOWLEDGE.resume;
  }

  return BOT_KNOWLEDGE.fallback;
}

// Helper to render Markdown links and bold formatting safely
function renderFormattedText(text) {
  const parts = text.split('\n');
  return parts.map((line, lIdx) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const lineElements = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        lineElements.push(line.substring(lastIndex, match.index));
      }
      lineElements.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="chatbot-link"
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < line.length) {
      lineElements.push(line.substring(lastIndex));
    }

    const formattedLine = lineElements.map((el, i) => {
      if (typeof el === 'string') {
        const boldParts = el.split(/\*\*([^*]+)\*\*/g);
        return boldParts.map((bPart, bIdx) =>
          bIdx % 2 === 1 ? <strong key={bIdx}>{bPart}</strong> : bPart
        );
      }
      return el;
    });

    return (
      <React.Fragment key={lIdx}>
        {formattedLine}
        {lIdx < parts.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! 👋 I'm Rumesh's AI Assistant. Ask me anything about his skills, projects, education, or experience!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text, time: userTime };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botAnswer = getBotResponse(text);
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { sender: 'bot', text: botAnswer, time: botTime }]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chatbot Action Button (Bottom Right) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-float-btn ${isOpen ? 'active' : ''}`}
        aria-label="Toggle AI Assistant Chat"
      >
        <div className="chatbot-icon-wrap">
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-robot'}`} />
        </div>
        <span className="chatbot-tooltip">Ask AI Assistant</span>
      </button>

      {/* Chat Window Popup */}
      {isOpen && (
        <div
          className="chatbot-window glassmorphic-card"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <i className="fa-solid fa-robot" />
              </div>
              <div>
                <h4 className="chatbot-title">Rumesh AI Assistant</h4>
                <span className="chatbot-status">
                  <span className="online-dot" /> Online • Ready to help
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="chatbot-close-btn"
              aria-label="Close Chat"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          {/* Messages Area */}
          <div
            className="chatbot-messages"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-msg-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="bot-msg-avatar">
                    <i className="fa-solid fa-robot" />
                  </div>
                )}
                <div className={`chatbot-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                  <div className="msg-content">{renderFormattedText(msg.text)}</div>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg-row bot-row">
                <div className="bot-msg-avatar">
                  <i className="fa-solid fa-robot" />
                </div>
                <div className="chatbot-bubble bot-bubble typing-bubble">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="chatbot-suggestions">
            {SUGGESTIONS.map((chip, idx) => (
              <button
                key={idx}
                className="suggestion-chip"
                onClick={() => handleSend(chip.replace(/^[^\s]+\s/, ''))}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about Rumesh's skills, projects..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="chatbot-send-btn"
              aria-label="Send Message"
            >
              <i className="fa-solid fa-paper-plane" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
