import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Splits text into word masks for GSAP text reveals.
 * If passed a string (e.g. inside JSX): returns an array of React span elements.
 * If passed a DOM element: wraps inner text and returns array of .gsap-word DOM nodes.
 */
export function splitWords(input) {
  if (!input) return [];

  if (typeof input === 'string') {
    const words = input.trim().split(/\s+/);
    return words.map((word, idx) =>
      React.createElement(
        'span',
        {
          key: idx,
          className: 'gsap-word-mask',
          style: {
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            marginRight: '0.28em',
          },
        },
        React.createElement(
          'span',
          {
            className: 'gsap-word',
            style: {
              display: 'inline-block',
              willChange: 'transform, opacity',
            },
          },
          word
        )
      )
    );
  }

  if (input && typeof input.querySelectorAll === 'function') {
    const existingWords = input.querySelectorAll('.gsap-word');
    if (existingWords.length > 0) {
      return Array.from(existingWords);
    }

    const rawText = input.innerText || input.textContent || '';
    const words = rawText.trim().split(/\s+/);

    input.innerHTML = words
      .map(
        (word) =>
          `<span class="gsap-word-mask" style="display:inline-block;overflow:hidden;vertical-align:top;margin-right:0.28em;"><span class="gsap-word" style="display:inline-block;will-change:transform,opacity;">${word}</span></span>`
      )
      .join('');

    return Array.from(input.querySelectorAll('.gsap-word'));
  }

  return [];
}

/**
 * Animate an element's text with an award-winning upward masked word reveal.
 */
export function animateTextReveal(target, options = {}) {
  gsap.registerPlugin(ScrollTrigger);

  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return null;

  const words = splitWords(el);
  if (!words.length) return null;

  const {
    trigger = el,
    start = 'top 88%',
    duration = 1.1,
    stagger = 0.032,
    delay = 0,
    ease = 'power4.out',
    toggleActions = 'play none none reverse',
  } = options;

  return gsap.fromTo(
    words,
    { yPercent: 115, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: {
        trigger,
        start,
        toggleActions,
      },
    }
  );
}
