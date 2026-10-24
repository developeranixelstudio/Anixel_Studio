import React, { useState, useRef, useEffect } from 'react';

export function CountUp({ end, duration = 1.8, prefix = '', suffix = '', className = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

          const frame = (now) => {
            const elapsed = (now - start) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const current = easeOutCubic(progress);
            setVal(Math.round(current * end));

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(frame);
            }
          };

          rafRef.current = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting) {
          triggered.current = false;
          cancelAnimationFrame(rafRef.current);
          setVal(0);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={`count-up-num ${className}`}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export default CountUp;
