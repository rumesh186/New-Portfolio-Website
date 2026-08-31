import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds, offset = 200) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveId(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
