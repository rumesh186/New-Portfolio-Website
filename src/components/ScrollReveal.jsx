import React, { useEffect, useRef, useState, Children, cloneElement } from 'react';

/**
 * ScrollReveal — Premium scroll-triggered reveal animations.
 *
 * Props:
 *  - variant: 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'scale' | 'blur-in'
 *  - threshold: IntersectionObserver threshold (0–1)
 *  - delay: base delay in ms before the animation starts
 *  - stagger: delay increment between child items (ms), useful for grids/lists
 *  - duration: animation duration in ms (default 900)
 *  - once: if true (default), only animates once; if false, re-animates on each viewport entry
 */
export default function ScrollReveal({
  children,
  variant = 'fade-up',
  threshold = 0.12,
  delay = 0,
  stagger = 0,
  duration = 900,
  once = true,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const node = domRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);

    return () => observer.unobserve(node);
  }, [threshold, once]);

  // Build the className from variant
  const className = [
    'sr',
    `sr--${variant}`,
    isVisible ? 'sr--visible' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * ScrollRevealItem — Wrap individual children in a stagger group.
 * Each child gets an incremental delay based on its index.
 */
export function ScrollRevealGroup({
  children,
  variant = 'fade-up',
  threshold = 0.1,
  baseDelay = 0,
  stagger = 80,
  duration = 800,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const node = domRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [threshold]);

  return (
    <div ref={domRef} className="sr-group">
      {Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        const itemDelay = baseDelay + index * stagger;
        const itemClass = [
          'sr',
          `sr--${variant}`,
          isVisible ? 'sr--visible' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div
            className={itemClass}
            style={{
              transitionDelay: `${itemDelay}ms`,
              transitionDuration: `${duration}ms`,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
