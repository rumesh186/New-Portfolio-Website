// =========================================================
// RUMESH KALUARACHCHI PORTFOLIO — APP ENGINE
// =========================================================

// Configuration
const TOTAL_FRAMES = 146;
const FRAME_PATH = (index) => `frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

// Canvas & Context Setup
const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d', { alpha: false });
const navbar = document.getElementById('navbar');

// Animation State
const images = [];
let loadedCount = 0;
let currentFrame = 1.0;
let targetFrame = 1.0;
let lastRenderedProgress = -1;
let isFirstFrameRendered = false;

// ---------------------------------------------------------
// 1. Image Preloader with Asynchronous Hardware Decode
// ---------------------------------------------------------
function preloadImages() {
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = FRAME_PATH(i);
    
    img.onload = () => {
      loadedCount++;
      if (i === 1 && !isFirstFrameRendered) {
        isFirstFrameRendered = true;
        renderBlendedFrame(1.0);
      }
    };

    if ('decode' in img) {
      img.decode().catch(() => {});
    }

    images[i] = img;
  }
}

// ---------------------------------------------------------
// 2. High-DPI Responsive Canvas Resolution
// ---------------------------------------------------------
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const displayWidth = window.innerWidth;
  const displayHeight = window.innerHeight;

  if (canvas.width !== Math.round(displayWidth * dpr) || canvas.height !== Math.round(displayHeight * dpr)) {
    canvas.width = Math.round(displayWidth * dpr);
    canvas.height = Math.round(displayHeight * dpr);
  }

  lastRenderedProgress = -1;
  renderBlendedFrame(currentFrame);
}

// ---------------------------------------------------------
// 3. Sub-Frame Alpha Crossfade Frame Blending
// ---------------------------------------------------------
function renderBlendedFrame(frameFloat) {
  const clamped = Math.max(1, Math.min(TOTAL_FRAMES, frameFloat));
  
  const frameAIndex = Math.floor(clamped);
  const frameBIndex = Math.min(TOTAL_FRAMES, frameAIndex + 1);
  const blendFactor = clamped - frameAIndex; // Fractional [0.0, 1.0)

  const imgA = images[frameAIndex];
  const imgB = images[frameBIndex];

  // Fallback to nearest loaded frame if current frame is loading
  let primaryImg = (imgA && imgA.complete && imgA.naturalWidth > 0) ? imgA : null;
  if (!primaryImg) {
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = images[Math.max(1, frameAIndex - offset)];
      if (prev && prev.complete && prev.naturalWidth > 0) {
        primaryImg = prev;
        break;
      }
      const next = images[Math.min(TOTAL_FRAMES, frameAIndex + offset)];
      if (next && next.complete && next.naturalWidth > 0) {
        primaryImg = next;
        break;
      }
    }
  }

  if (!primaryImg) return;

  const cw = canvas.width;
  const ch = canvas.height;

  // Background fill
  ctx.fillStyle = '#08080c';
  ctx.fillRect(0, 0, cw, ch);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Calculate cover dimensions
  const imgWidth = primaryImg.naturalWidth;
  const imgHeight = primaryImg.naturalHeight;
  const ratio = Math.max(cw / imgWidth, ch / imgHeight);
  const renderWidth = imgWidth * ratio;
  const renderHeight = imgHeight * ratio;
  const offsetX = (cw - renderWidth) / 2;
  const offsetY = (ch - renderHeight) / 2;

  // Draw Base Frame A
  ctx.globalAlpha = 1.0;
  ctx.drawImage(primaryImg, offsetX, offsetY, renderWidth, renderHeight);

  // Crossfade Frame B over Frame A for continuous smooth optical flow
  if (blendFactor > 0.005 && imgB && imgB.complete && imgB.naturalWidth > 0 && frameAIndex !== frameBIndex) {
    ctx.globalAlpha = blendFactor;
    ctx.drawImage(imgB, offsetX, offsetY, renderWidth, renderHeight);
    ctx.globalAlpha = 1.0;
  }

  lastRenderedProgress = frameFloat;
}

// ---------------------------------------------------------
// 4. Scroll Tracking & Target Mapping
// ---------------------------------------------------------
function updateScrollTarget() {
  const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  const maxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
  
  if (maxScroll > 0) {
    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
    targetFrame = 1.0 + scrollFraction * (TOTAL_FRAMES - 1);
  }

  // Navbar glassmorphic transition on scroll
  if (navbar) {
    if (scrollTop > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Update active navigation link based on current section
  updateActiveNav();
}

// ---------------------------------------------------------
// 5. Physics Lerp Animation Loop
// ---------------------------------------------------------
function animate(time) {
  if (window.lenisInstance) {
    window.lenisInstance.raf(time);
  }

  // Smooth lerp following
  const lerpFactor = 0.085;
  const delta = targetFrame - currentFrame;

  if (Math.abs(delta) > 0.0005) {
    currentFrame += delta * lerpFactor;
    renderBlendedFrame(currentFrame);
  } else if (currentFrame !== targetFrame) {
    currentFrame = targetFrame;
    renderBlendedFrame(currentFrame);
  }

  requestAnimationFrame(animate);
}

// ---------------------------------------------------------
// 6. Lenis Smooth Momentum Scroll Engine
// ---------------------------------------------------------
function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    try {
      window.lenisInstance = new Lenis({
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.8,
        infinite: false,
      });

      window.lenisInstance.on('scroll', () => {
        updateScrollTarget();
      });
    } catch (e) {
      console.warn('Lenis init fallback:', e);
    }
  }
}

// ---------------------------------------------------------
// 7. Typewriter Effect for Hero Headline
// ---------------------------------------------------------
const typeWords = ["3D Modeling & Rendering", "Video Production", "UI/UX Design", "Full-Stack Development"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 120;
const deletingDelay = 60;
const newWordDelay = 1800;

function typeEffect() {
  const typedTextSpan = document.getElementById("typed-text");
  if (!typedTextSpan) return;

  const currentWord = typeWords[wordIndex];

  if (!isDeleting) {
    typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, newWordDelay);
      return;
    }
  } else {
    typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typeWords.length;
      setTimeout(typeEffect, 350);
      return;
    }
  }

  setTimeout(typeEffect, isDeleting ? deletingDelay : typingDelay);
}

// ---------------------------------------------------------
// 8. Navigation ScrollSpy & Mobile Menu
// ---------------------------------------------------------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 200;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Mobile Toggle Handler
const mobileToggle = document.getElementById('mobile-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileToggle && navLinksContainer) {
  mobileToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
    });
  });
}

// ---------------------------------------------------------
// 9. Event Listeners & Bootstrapping
// ---------------------------------------------------------
window.addEventListener('scroll', updateScrollTarget, { passive: true });
window.addEventListener('resize', resizeCanvas);
window.addEventListener('touchmove', updateScrollTarget, { passive: true });

window.addEventListener('DOMContentLoaded', () => {
  preloadImages();
  resizeCanvas();
  initSmoothScroll();
  updateScrollTarget();
  typeEffect();
  requestAnimationFrame(animate);
});
