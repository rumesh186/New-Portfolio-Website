import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const TOTAL_FRAMES = 146;
const FRAME_PATH = (index) => `/frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

export default function ScrollCanvas() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const stateRef = useRef({
    currentFrame: 1.0,
    targetFrame: 1.0,
    lastRenderedProgress: -1,
    isFirstRendered: false,
    loadedCount: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    // 1. Preload all 146 frames
    const images = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        stateRef.current.loadedCount++;
        if (i === 1 && !stateRef.current.isFirstRendered) {
          stateRef.current.isFirstRendered = true;
          renderBlendedFrame(1.0);
        }
      };
      if ('decode' in img) {
        img.decode().catch(() => {});
      }
      images[i] = img;
    }
    imagesRef.current = images;

    // 2. High-DPI Resize Handler
    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== Math.round(displayWidth * dpr) || canvas.height !== Math.round(displayHeight * dpr)) {
        canvas.width = Math.round(displayWidth * dpr);
        canvas.height = Math.round(displayHeight * dpr);
      }

      stateRef.current.lastRenderedProgress = -1;
      renderBlendedFrame(stateRef.current.currentFrame);
    }

    // 3. Sub-Frame Alpha Crossfade Frame Renderer
    function renderBlendedFrame(frameFloat) {
      const clamped = Math.max(1, Math.min(TOTAL_FRAMES, frameFloat));
      const frameAIndex = Math.floor(clamped);
      const frameBIndex = Math.min(TOTAL_FRAMES, frameAIndex + 1);
      const blendFactor = clamped - frameAIndex;

      const imgs = imagesRef.current;
      const imgA = imgs[frameAIndex];
      const imgB = imgs[frameBIndex];

      let primaryImg = (imgA && imgA.complete && imgA.naturalWidth > 0) ? imgA : null;
      if (!primaryImg) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = imgs[Math.max(1, frameAIndex - offset)];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            primaryImg = prev;
            break;
          }
          const next = imgs[Math.min(TOTAL_FRAMES, frameAIndex + offset)];
          if (next && next.complete && next.naturalWidth > 0) {
            primaryImg = next;
            break;
          }
        }
      }

      if (!primaryImg) return;

      const cw = canvas.width;
      const ch = canvas.height;

      ctx.fillStyle = '#08080c';
      ctx.fillRect(0, 0, cw, ch);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

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

      // Crossfade Frame B over Frame A
      if (blendFactor > 0.005 && imgB && imgB.complete && imgB.naturalWidth > 0 && frameAIndex !== frameBIndex) {
        ctx.globalAlpha = blendFactor;
        ctx.drawImage(imgB, offsetX, offsetY, renderWidth, renderHeight);
        ctx.globalAlpha = 1.0;
      }

      stateRef.current.lastRenderedProgress = frameFloat;
    }

    // 4. Update Target Frame on Scroll
    function updateScrollTarget() {
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const maxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;

      if (maxScroll > 0) {
        const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
        stateRef.current.targetFrame = 1.0 + scrollFraction * (TOTAL_FRAMES - 1);
      }
    }

    // 5. Physics Lerp Animation Loop
    let animId;
    function animate(time) {
      if (lenisInstance) {
        lenisInstance.raf(time);
      }

      const lerpFactor = 0.085;
      const delta = stateRef.current.targetFrame - stateRef.current.currentFrame;

      if (Math.abs(delta) > 0.0005) {
        stateRef.current.currentFrame += delta * lerpFactor;
        renderBlendedFrame(stateRef.current.currentFrame);
      } else if (stateRef.current.currentFrame !== stateRef.current.targetFrame) {
        stateRef.current.currentFrame = stateRef.current.targetFrame;
        renderBlendedFrame(stateRef.current.currentFrame);
      }

      animId = requestAnimationFrame(animate);
    }

    // 6. Lenis Smooth Scroll
    let lenisInstance = null;
    try {
      lenisInstance = new Lenis({
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.8,
        infinite: false,
      });

      // Expose to window for external access (e.g., from Navbar anchor links)
      window.lenis = lenisInstance;

      lenisInstance.on('scroll', () => {
        updateScrollTarget();
      });
    } catch (err) {
      console.warn('Lenis init:', err);
    }

    // Connect Lenis to requestAnimationFrame loop
    function raf(time) {
      if (lenisInstance) lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('touchmove', updateScrollTarget, { passive: true });

    resizeCanvas();
    updateScrollTarget();
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('touchmove', updateScrollTarget);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return (
    <div id="canvas-container">
      <canvas ref={canvasRef} id="animation-canvas" />
      <div className="canvas-gradient-overlay" />
    </div>
  );
}
