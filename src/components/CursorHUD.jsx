import React, { useEffect, useRef, useState } from 'react';

export default function CursorHUD() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      // Check hover
      const target = e.target;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('slot-btn') ||
          target.classList.contains('btn-pill') ||
          target.style.cursor === 'pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.22;
      currentY += (mouseY - currentY) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, isHovering]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-crosshair-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'transform 0.05s ease-out',
      }}
    >
      <svg viewBox="0 0 32 32" fill="none" style={{ width: 28, height: 28 }}>
        <circle cx="16" cy="16" r="3" fill="#D4AF37" />
        <line x1="16" y1="2" x2="16" y2="10" stroke="#D4AF37" strokeWidth="1.2" />
        <line x1="16" y1="22" x2="16" y2="30" stroke="#D4AF37" strokeWidth="1.2" />
        <line x1="2" y1="16" x2="10" y2="16" stroke="#D4AF37" strokeWidth="1.2" />
        <line x1="22" y1="16" x2="30" y2="16" stroke="#D4AF37" strokeWidth="1.2" />
      </svg>
      <div className="cursor-coords">
        [{coords.x}, {coords.y}]
      </div>
    </div>
  );
}
