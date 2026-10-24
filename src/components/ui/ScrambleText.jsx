import React, { useState, useRef, useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>?';

export function ScrambleText({ text, className = '', trigger = 'hover', duration = 0.8, style }) {
  const [displayed, setDisplayed] = useState(trigger === 'mount' ? '' : text);
  const rafRef = useRef(0);
  const containerRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const startScramble = () => {
    const startTime = performance.now();
    const frame = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const revealIndex = Math.floor(progress * text.length);

      const next = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < revealIndex) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplayed(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setDisplayed(text);
      }
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(frame);
  };

  useEffect(() => {
    if (trigger === 'mount') {
      const timer = setTimeout(startScramble, 100);
      return () => clearTimeout(timer);
    }
    if (trigger === 'inview') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            startScramble();
          } else if (!entry.isIntersecting) {
            hasTriggeredRef.current = false;
            setDisplayed(text);
          }
        },
        { threshold: 0.5 }
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, text]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: 'inline-block', ...style }}
      onMouseEnter={trigger === 'hover' ? startScramble : undefined}
    >
      {displayed}
    </span>
  );
}

export default ScrambleText;
