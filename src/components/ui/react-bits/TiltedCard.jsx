'use client';
import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import './TiltedCard.css';

export function TiltedCard({
  children,
  imageSrc,
  altText = 'Portfolio project showcase',
  captionText = '',
  containerHeight = '100%',
  containerWidth = '100%',
  imageHeight = '100%',
  imageWidth = '100%',
  scaleOnHover = 1.04,
  rotateAmplitude = 12,
  showMobileWarning = false,
  showTooltip = false,
  displayOverlayContent = false,
  overlayContent = null,
  className = '',
  style,
}) {
  const ref = useRef(null);

  const rotateX = useSpring(0, { stiffness: 260, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 24 });
  const scale = useSpring(1, { stiffness: 260, damping: 24 });
  const glareOpacity = useSpring(0, { stiffness: 260, damping: 24 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    glareOpacity.set(0.18);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    glareOpacity.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`tilted-card-figure ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="tilted-card-inner"
        style={{
          width: '100%',
          height: '100%',
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
      >
        {children ? (
          children
        ) : (
          <>
            {imageSrc && (
              <img
                src={imageSrc}
                alt={altText}
                className="tilted-card-img"
                style={{
                  width: imageWidth,
                  height: imageHeight,
                }}
              />
            )}
            {displayOverlayContent && overlayContent && (
              <div className="tilted-card-overlay">{overlayContent}</div>
            )}
          </>
        )}

        {/* Specular glare overlay */}
        <motion.div
          className="tilted-card-glare"
          style={{
            opacity: glareOpacity,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.6) 0%, rgba(212,175,55,0.2) 40%, transparent 80%)`,
          }}
        />
      </motion.div>
    </figure>
  );
}

export default TiltedCard;
