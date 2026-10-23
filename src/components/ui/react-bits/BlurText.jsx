'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export function BlurText({
  text = '',
  delay = 100,
  className = '',
  animateBy = 'words', // 'words' | 'letters'
  direction = 'top', // 'top' | 'bottom'
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = [0.25, 0.1, 0.25, 1],
  onAnimationComplete,
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: threshold });

  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0, -25px, 0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0, 25px, 0)' };

  const defaultTo = {
    filter: 'blur(0px)',
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  };

  const from = animationFrom || defaultFrom;
  const to = animationTo || defaultTo;

  return (
    <span ref={ref} className={`blur-text-wrap ${className}`} style={{ display: 'inline-block' }}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={from}
          animate={isInView ? to : from}
          transition={{
            duration: 0.5,
            delay: (i * delay) / 1000,
            ease: easing,
          }}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
          style={{
            display: 'inline-block',
            willChange: 'transform, filter, opacity',
          }}
        >
          {el}
          {animateBy === 'words' && i < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </span>
  );
}

export default BlurText;
