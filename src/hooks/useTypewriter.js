import { useState, useEffect } from 'react';

export function useTypewriter(words, typingSpeed = 120, deletingSpeed = 60, pauseTime = 1800) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}
