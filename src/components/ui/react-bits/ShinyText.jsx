'use client';
import { useEffect, useRef } from 'react';
import './ShinyText.css';

const EASINGS = {
  linear: t => t,
  smooth: t => 0.5 - Math.cos(Math.PI * t) / 2,
  snappy: t => (t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) / 2)
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

let paint = null;
const parseColor = value => {
  if (typeof document === 'undefined') return null;
  if (!paint) paint = document.createElement('canvas').getContext('2d');
  if (!paint) return null;
  paint.fillStyle = '#000000';
  paint.fillStyle = value;
  const resolved = String(paint.fillStyle);
  if (resolved.startsWith('#')) {
    return [1, 3, 5].map(i => parseInt(resolved.slice(i, i + 2), 16)).concat(1);
  }
  const parts = resolved.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return null;
  return [Number(parts[0]), Number(parts[1]), Number(parts[2]), parts.length > 3 ? Number(parts[3]) : 1];
};

const blend = (from, to, amount) => {
  const channel = (a, b) =>
    Math.round(Math.pow(Math.pow(a / 255, 2.2) * (1 - amount) + Math.pow(b / 255, 2.2) * amount, 1 / 2.2) * 255);
  const alpha = from[3] * (1 - amount) + to[3] * amount;
  if (alpha <= 0) return 'rgba(0, 0, 0, 0)';
  const weigh = (a, b) => (a * from[3] * (1 - amount) + b * to[3] * amount) / alpha;
  const r = from[3] === to[3] ? channel(from[0], to[0]) : Math.round(weigh(from[0], to[0]));
  const g = from[3] === to[3] ? channel(from[1], to[1]) : Math.round(weigh(from[1], to[1]));
  const b = from[3] === to[3] ? channel(from[2], to[2]) : Math.round(weigh(from[2], to[2]));
  return `rgba(${r}, ${g}, ${b}, ${Math.round(alpha * 1000) / 1000})`;
};

export const ShinyText = ({
  text,
  children,
  color = '#b5b5b5',
  shineColor = '#ffffff',
  speed = 2.5,
  delay = 0,
  angle = 120,
  shineWidth = 40,
  softness = 0.8,
  glow = 0,
  className = '',
  style
}) => {
  const root = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const baseRgba = parseColor(color) || [180, 180, 180, 1];
    const shineRgba = parseColor(shineColor) || [255, 255, 255, 1];

    let rafId;
    let start = null;

    const tick = now => {
      if (!start) start = now;
      const progress = ((now - start) / (speed * 1000)) % 1;
      const pos = progress * 100;

      const grad = `linear-gradient(${angle}deg, ${color} ${Math.max(0, pos - shineWidth)}%, ${shineColor} ${pos}%, ${color} ${Math.min(100, pos + shineWidth)}%)`;
      if (el) el.style.backgroundImage = grad;
      if (glowRef.current) glowRef.current.style.backgroundImage = grad;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [color, shineColor, speed, angle, shineWidth]);

  return (
    <span className={`shiny-text ${className}`} ref={root} style={style}>
      {text || children}
      {glow > 0 && <span className="shiny-text__glow" ref={glowRef} aria-hidden="true">{text || children}</span>}
    </span>
  );
};
export default ShinyText;
