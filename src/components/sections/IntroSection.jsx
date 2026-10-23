import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundManager } from '../../utils/audio';
import { splitWords } from '../../utils/textSplit';
import TechBox from '../TechBox';

export default function IntroSection({ onConnect }) {
  const sectionRef = useRef(null);
  const visionBgRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Background Outline Typography Parallax Scrub
      if (visionBgRef.current) {
        gsap.fromTo(
          visionBgRef.current,
          { y: -50, opacity: 0.12 },
          {
            y: 120,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Tag reveal
      if (tagRef.current) {
        gsap.fromTo(
          tagRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tagRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Masked Word-by-Word Heading Text Animation
      if (headingRef.current) {
        const words = splitWords(headingRef.current);
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.15,
              stagger: 0.04,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 4. Staggered 3D Perspective Tech Boxes Reveal
      if (cardsContainerRef.current) {
        const boxes = cardsContainerRef.current.children;
        gsap.fromTo(
          boxes,
          { y: 70, opacity: 0, scale: 0.94, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.1,
            stagger: 0.16,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="site-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: 'clamp(80px, 14vh, 160px)',
        paddingBottom: 'clamp(80px, 14vh, 160px)',
      }}
    >
      {/* Background Architectural Giant Outline Typography */}
      <div
        ref={visionBgRef}
        style={{
          position: 'absolute',
          top: '12%',
          right: '3%',
          fontFamily: 'var(--font-alcazar)',
          fontSize: 'clamp(90px, 18vw, 240px)',
          fontWeight: 900,
          letterSpacing: '0.08em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.06)',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 0.9,
          zIndex: 0,
        }}
      >
        VISION
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
        {/* Section Identifier (Centered) */}
        <div
          ref={tagRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-primary)',
            letterSpacing: '0.15em',
            marginBottom: '28px',
          }}
        >
          <span>[ 01 // OVERVIEW & DRAWN FRAMES ]</span>
          <span style={{ width: 40, height: 1, backgroundColor: 'var(--color-border)' }} />
          <span style={{ color: 'var(--color-muted)' }}>CORE PHILOSOPHY</span>
        </div>

        {/* Section Heading with Animated Marker Sweep (Centered) */}
        <h2
          ref={headingRef}
          className="text-headline-lg font-cinzel"
          style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            marginBottom: '44px',
            lineHeight: 1.18,
            letterSpacing: '0.03em',
            maxWidth: '960px',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Your Vision.{' '}
          <span className="marker-highlight is-visible" style={{ color: '#FFFFFF' }}>
            Our Strategy.
          </span>{' '}
          Shared Growth.
        </h2>

        {/* Three editorial paragraph blocks inside Animated Tech Boxes */}
        <div
          ref={cardsContainerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {/* Paragraph 1 */}
          <TechBox
            delay={100}
            tag="PHILOSOPHY // 01. PURPOSE"
            coordinates={{
              tl: 'TL // PURPOSE',
              tr: 'TR // 01',
              br: 'BR // STRAT',
              bl: 'BL // CORE',
            }}
          >
            <p
              className="text-body-md"
              style={{
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.7,
                fontSize: '15px',
              }}
            >
              Every business has a story to tell and goals to achieve. We help bring those goals to life through thoughtful strategy, creative execution and digital solutions built around your business needs.
            </p>
          </TechBox>

          {/* Paragraph 2 */}
          <TechBox
            delay={250}
            tag="PHILOSOPHY // 02. SYNERGY"
            coordinates={{
              tl: 'TL // SYNERGY',
              tr: 'TR // 02',
              br: 'BR // DESIGN',
              bl: 'BL // CODE',
            }}
          >
            <p
              className="text-body-md"
              style={{
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.7,
                fontSize: '15px',
              }}
            >
              At Anixel Studio, marketing, design and technology work together to help you build your brand, reach relevant audiences and create better digital experiences.
            </p>
          </TechBox>

          {/* Paragraph 3 */}
          <TechBox
            delay={400}
            tag="PHILOSOPHY // 03. EVOLUTION"
            coordinates={{
              tl: 'TL // EVOLVE',
              tr: 'TR // 03',
              br: 'BR // SCALE',
              bl: 'BL // FUTURE',
            }}
          >
            <p
              className="text-body-md"
              style={{
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.7,
                fontSize: '15px',
              }}
            >
              Whether you're starting out, expanding your reach or strengthening an established business, we help you identify the right solutions for your next stage of growth.
            </p>
          </TechBox>
        </div>

        {/* CTA Button (Centered) */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '8px' }}>
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onConnect();
            }}
            className="btn-pill btn-pill--gold slot-btn"
            style={{ minWidth: 190, height: 48 }}
          >
            <span className="slot-btn__wrapper">
              <span className="slot-btn__text">Let's Connect →</span>
              <span className="slot-btn__text slot-btn__text--hover">Start Conversation →</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
