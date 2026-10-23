'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShinyText } from '../ui/react-bits/ShinyText';
import { SpotlightCard } from '../ui/react-bits/SpotlightCard';
import { Magnet } from '../ui/react-bits/Magnet';
import './introduction-section.css';

export function IntroductionSection({ onConnect, onOpenContact }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const leftColRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headingLines = headingRef.current?.querySelectorAll('.intro-heading-line');
      const leftElements = leftColRef.current?.querySelectorAll('.intro-anim-left');
      const cards = cardsRef.current?.querySelectorAll('.intro-story-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
        },
      });

      if (headingLines && headingLines.length > 0) {
        tl.fromTo(
          headingLines,
          { opacity: 0, y: 35, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.0,
            ease: 'power3.out',
            stagger: 0.12,
          }
        );
      }

      if (leftElements && leftElements.length > 0) {
        tl.fromTo(
          leftElements,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 },
          '-=0.6'
        );
      }

      if (cards && cards.length > 0) {
        tl.fromTo(
          cards,
          { opacity: 0, x: 40, y: 15 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.15,
          },
          '-=0.7'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleConnectClick = (e) => {
    e.preventDefault();
    if (onConnect) {
      onConnect();
      return;
    }
    if (onOpenContact) {
      onOpenContact();
      return;
    }
    const el = document.getElementById('contact');
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="intro-section" id="introduction" ref={sectionRef}>
      {/* Subtle ambient lighting backdrop */}
      <div className="intro-ambient-glow" aria-hidden="true" />
      <div className="intro-grid-pattern" aria-hidden="true" />

      <div className="intro-container">
        {/* Left Column: Heading, Badge, Manifesto & Magnetic CTA */}
        <div className="intro-left" ref={leftColRef}>
          {/* Eyebrow Badge with React Bits ShinyText */}
          <div className="intro-badge-wrap intro-anim-left">
            <div className="intro-badge">
              <span className="intro-badge-dot" aria-hidden="true" />
              <ShinyText
                text="[ 03 // INTRODUCTION & PHILOSOPHY ]"
                color="#D4AF37"
                shineColor="#FFFFFF"
                speed={2.8}
                className="intro-badge-text"
              />
            </div>
          </div>

          {/* Heading: Your Vision. Our Strategy. Shared Growth. (Megante font) */}
          <h2 className="intro-heading" ref={headingRef}>
            <span className="intro-heading-line">Your Vision.</span>
            <span className="intro-heading-line">Our Strategy.</span>
            <span className="intro-heading-line intro-heading-highlight">Shared Growth.</span>
          </h2>

          <p className="intro-lead-note intro-anim-left">
            A collaborative digital engineering &amp; brand practice where ambitious visions transform
            into durable market authority.
          </p>

          {/* Magnetic CTA Button with React Bits Magnet */}
          <div className="intro-cta-wrap intro-anim-left">
            <Magnet padding={50} magnetStrength={0.35}>
              <a href="#contact" className="intro-cta-btn" onClick={handleConnectClick}>
                <span className="intro-cta-label">Let's Connect</span>
                <span className="intro-cta-arrow" aria-hidden="true">→</span>
              </a>
            </Magnet>

            <span className="intro-cta-subtext">Direct dialogue with founders &amp; lead architects</span>
          </div>

          {/* Key Proof Metrics */}
          <div className="intro-metrics-row intro-anim-left">
            <div className="intro-metric-item">
              <span className="intro-metric-val">3-in-1</span>
              <span className="intro-metric-label">Marketing • Design • Tech</span>
            </div>
            <div className="intro-metric-sep" />
            <div className="intro-metric-item">
              <span className="intro-metric-val">100%</span>
              <span className="intro-metric-label">Custom Engineered</span>
            </div>
            <div className="intro-metric-sep" />
            <div className="intro-metric-item">
              <span className="intro-metric-val">Global</span>
              <span className="intro-metric-label">Partnership Reach</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Story Cards corresponding to the user's 3 paragraphs */}
        <div className="intro-right" ref={cardsRef}>
          {/* Card 1: Vision & Story */}
          <SpotlightCard
            className="intro-story-card"
            spotlightColor="rgba(212, 175, 55, 0.22)"
            borderColor="rgba(212, 175, 55, 0.3)"
          >
            <div className="intro-card-header">
              <span className="intro-card-num">01 //</span>
              <span className="intro-card-tag">GOALS &amp; STORYTELLING</span>
            </div>
            <p className="intro-card-copy">
              Every business has a story to tell and goals to achieve. We help bring those goals to
              life through thoughtful strategy, creative execution and digital solutions built around
              your business needs.
            </p>
          </SpotlightCard>

          {/* Card 2: Marketing, Design & Technology Synergy */}
          <SpotlightCard
            className="intro-story-card"
            spotlightColor="rgba(243, 229, 171, 0.22)"
            borderColor="rgba(212, 175, 55, 0.3)"
          >
            <div className="intro-card-header">
              <span className="intro-card-num">02 //</span>
              <span className="intro-card-tag">INTEGRATED DISCIPLINES</span>
            </div>
            <p className="intro-card-copy">
              At Anixel Studio, marketing, design and technology work together to help you build your
              brand, reach relevant audiences and create better digital experiences.
            </p>
          </SpotlightCard>

          {/* Card 3: Growth Across Every Stage */}
          <SpotlightCard
            className="intro-story-card"
            spotlightColor="rgba(212, 175, 55, 0.22)"
            borderColor="rgba(212, 175, 55, 0.3)"
          >
            <div className="intro-card-header">
              <span className="intro-card-num">03 //</span>
              <span className="intro-card-tag">ADAPTIVE ROADMAP</span>
            </div>
            <p className="intro-card-copy">
              Whether you're starting out, expanding your reach or strengthening an established
              business, we help you identify the right solutions for your next stage of growth.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

export default IntroductionSection;
