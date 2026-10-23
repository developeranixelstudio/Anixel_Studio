'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShinyText } from '../ui/react-bits/ShinyText';
import { SpotlightCard } from '../ui/react-bits/SpotlightCard';
import { Magnet } from '../ui/react-bits/Magnet';
import './final-cta-section.css';

export function FinalCTASection({ onConnect, onExplorePortfolio }) {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const cardRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const buttonsRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Ambient radial aura parallax scale on scroll
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { scale: 0.8, opacity: 0.4 },
          {
            scale: 1.25,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

      // 2. Central Vessel 3D Elevation
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 70, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 15%',
              // Reversible in both scroll directions:
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 3. Heading words animation (stagger in & reverse out)
      const headingWords = headingRef.current?.querySelectorAll('.final-cta-word');
      if (headingWords && headingWords.length > 0) {
        gsap.fromTo(
          headingWords,
          { opacity: 0, y: 35, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 4. Body Copy and Buttons Reversible Fade
      const fadeElements = [bodyRef.current, buttonsRef.current, metaRef.current].filter(Boolean);
      if (fadeElements.length > 0) {
        gsap.fromTo(
          fadeElements,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
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
    const el = document.getElementById('contact');
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePortfolioClick = (e) => {
    e.preventDefault();
    if (onExplorePortfolio) {
      onExplorePortfolio();
      return;
    }
    const el = document.getElementById('portfolio');
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="final-cta-section" id="final-cta" ref={sectionRef}>
      {/* Target anchor for smooth scroll links to #contact */}
      <div id="contact" style={{ position: 'absolute', top: '-40px' }} aria-hidden="true" />

      {/* Ambient Lighting & Pattern */}
      <div className="final-cta-ambient-glow" ref={glowRef} aria-hidden="true" />
      <div className="final-cta-grid-pattern" aria-hidden="true" />

      <div className="final-cta-container">
        {/* Grand Spotlight Card Vessel */}
        <SpotlightCard
          className="final-cta-card"
          spotlightColor="rgba(212, 175, 55, 0.25)"
          borderColor="rgba(212, 175, 55, 0.35)"
        >
          <div ref={cardRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Eyebrow Badge with React Bits ShinyText */}
            <div className="final-cta-badge-wrap">
              <div className="final-cta-badge">
                <span className="final-cta-badge-dot" aria-hidden="true" />
                <ShinyText
                  text="[ 08 // FINAL CALL TO ACTION ]"
                  color="#D4AF37"
                  shineColor="#FFFFFF"
                  speed={2.6}
                  className="final-cta-badge-text"
                />
              </div>
            </div>

            {/* Heading: Let's Build What's Next for Your Business. (Megante Font) */}
            <h2 className="final-cta-heading" ref={headingRef}>
              <span className="final-cta-word">Let's</span>{' '}
              <span className="final-cta-word">Build</span>{' '}
              <span className="final-cta-word final-cta-highlight">What's</span>{' '}
              <span className="final-cta-word final-cta-highlight">Next</span>{' '}
              <span className="final-cta-word final-cta-highlight">for</span>{' '}
              <span className="final-cta-word final-cta-highlight">Your</span>{' '}
              <span className="final-cta-word final-cta-highlight">Business.</span>
            </h2>

            {/* User's Exact Body Copy: Whether you want to strengthen your brand... (TF Mighu Font) */}
            <p className="final-cta-body" ref={bodyRef}>
              Whether you want to strengthen your brand, improve digital visibility, reach new
              audiences or develop a new digital solution, Anixel Studio is ready to discuss your
              goals.
            </p>

            {/* Dual CTA Buttons with React Bits Magnet */}
            <div className="final-cta-buttons-row" ref={buttonsRef}>
              {/* CTA Button 1: Let's Connect */}
              <Magnet padding={45} magnetStrength={0.35}>
                <a
                  href="#contact"
                  className="final-cta-btn-primary"
                  onClick={handleConnectClick}
                >
                  <span>Let's Connect</span>
                  <span className="final-cta-arrow" aria-hidden="true">→</span>
                </a>
              </Magnet>

              {/* CTA Button 2: Explore Our Portfolio */}
              <Magnet padding={45} magnetStrength={0.35}>
                <a
                  href="#portfolio"
                  className="final-cta-btn-secondary"
                  onClick={handlePortfolioClick}
                >
                  <span>Explore Our Portfolio</span>
                  <span className="final-cta-arrow" aria-hidden="true">→</span>
                </a>
              </Magnet>
            </div>

            {/* Direct Studio Meta Information */}
            <div className="final-cta-meta-row" ref={metaRef}>
              <div className="final-cta-meta-item">
                <span className="final-cta-meta-dot" aria-hidden="true" />
                <span>Global Client Inquiries: Active</span>
              </div>

              <div className="final-cta-meta-item">
                <span>Direct Dialogue:</span>
                <a href="mailto:contact@anixelstudio.com" className="final-cta-email-link">
                  contact@anixelstudio.com
                </a>
              </div>

              <div className="final-cta-meta-item">
                <span>Strategy Reply: &lt; 24h SLA</span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}

export default FinalCTASection;
