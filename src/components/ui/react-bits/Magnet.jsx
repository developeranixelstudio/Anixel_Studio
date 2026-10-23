'use client';
import React, { useRef, useState, useEffect } from 'react';

export const Magnet = ({
  children,
  padding = 60,
  disabled = false,
  magnetStrength = 0.35,
  activeTransition = 'transform 0.15s ease-out',
  inactiveTransition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
  className = '',
  style = {}
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const magnetRef = useRef(null);

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e) => {
      if (!magnetRef.current) return;
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsHovered(true);
        const offsetX = (e.clientX - centerX) * magnetStrength;
        const offsetY = (e.clientY - centerY) * magnetStrength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, disabled, magnetStrength]);

  const transformStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isHovered ? activeTransition : inactiveTransition,
    willChange: 'transform',
    display: 'inline-block',
    ...style
  };

  return (
    <div ref={magnetRef} className={className} style={transformStyle}>
      {children}
    </div>
  );
};
export default Magnet;
