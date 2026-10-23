'use client';
import { useEffect, useRef } from 'react';
import './SpotlightCard.css';

export const SpotlightCard = ({
  children,
  className = '',
  style,
  spotlightColor = 'rgba(212, 175, 55, 0.18)',
  borderColor = 'rgba(212, 175, 55, 0.25)',
  spotlightSize = 320,
}) => {
  const cardRef = useRef(null);
  const lightRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const light = lightRef.current;
    if (!card || !light) return;

    const handlePointerMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      light.style.background = `radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 75%)`;
      light.style.opacity = '1';
    };

    const handlePointerLeave = () => {
      light.style.opacity = '0';
    };

    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [spotlightColor, spotlightSize]);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      style={{
        '--spotlight-card-border': borderColor,
        ...style
      }}
    >
      <div ref={lightRef} className="spotlight-card__light" aria-hidden="true" />
      <div className="spotlight-card__border" aria-hidden="true" />
      <div className="spotlight-card__content">{children}</div>
    </div>
  );
};
export default SpotlightCard;
