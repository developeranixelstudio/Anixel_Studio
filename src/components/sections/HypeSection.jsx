import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundManager } from '../../utils/audio';
import { splitWords } from '../../utils/textSplit';
import TechBox from '../TechBox';

export default function HypeSection({ onOpenContact }) {
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const headlineRef = useRef(null);
  const metricsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Watermark scrub
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { y: -60, opacity: 0.1 },
          {
            y: 120,
            opacity: 0.35,
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

      // 2. Headline masked split text reveal
      if (headlineRef.current) {
        const words = splitWords(headlineRef.current);
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
                trigger: headlineRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 3. Staggered 3D metrics reveal
      if (metricsRef.current) {
        const boxes = metricsRef.current.children;
        gsap.fromTo(
          boxes,
          { y: 65, opacity: 0, scale: 0.94, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.1,
            stagger: 0.16,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: metricsRef.current,
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
      id="hype"
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
        overflow: 'hidden',
      }}
    >
      {/* Background Graphic Energy Matrix */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Background Architectural Giant Outline Typography */}
      <div
        ref={watermarkRef}
        style={{
          position: 'absolute',
          top: '12%',
          left: '4%',
          fontFamily: 'var(--font-alcazar)',
          fontSize: 'clamp(70px, 15vw, 200px)',
          fontWeight: 900,
          letterSpacing: '0.08em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 0.9,
          zIndex: 0,
        }}
      >
        MOMENTUM
      </div>

      {/* Technical HUD Grid Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.15)',
          letterSpacing: '0.2em',
          pointerEvents: 'none',
          lineHeight: 1.8,
          textAlign: 'right',
        }}
      >
        <div>CORE // SPATIAL_DYNAMICS_V4</div>
        <div>VECTOR // MATRIX_HYPER_FLOW</div>
        <div>ENERGY_INDEX: 99.4% OPTIMAL</div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Section Identifier */}
        <div
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
          <span>[ 05 // MOMENTUM &amp; DRAWN FRAMES ]</span>
          <span style={{ width: 40, height: 1, backgroundColor: 'var(--color-border)' }} />
          <span style={{ color: 'var(--color-muted)' }}>AMBITION &amp; VELOCITY</span>
        </div>

        {/* Large Cinematic Statement */}
        <h2
          ref={headlineRef}
          className="text-headline-display font-alcazar"
          style={{
            fontSize: 'clamp(36px, 6vw, 76px)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            marginBottom: '32px',
            maxWidth: '980px',
            margin: '0 auto 32px auto',
            textAlign: 'center',
          }}
        >
          Pioneering Digital Momentum for High-Ambition Brands.
        </h2>

        <p
          className="text-body-lg"
          style={{
            color: 'var(--color-muted)',
            maxWidth: '680px',
            margin: '0 auto 48px auto',
            textAlign: 'center',
            lineHeight: 1.7,
            fontSize: 'clamp(15px, 1.3vw, 18px)',
          }}
        >
          We partner with forward-thinking leaders who refuse the ordinary. By converging cinematic design, technical precision, and strategic clarity, Anixel Studio crafts transformative digital presence that turns attention into enduring market advantage.
        </p>

        {/* Technical Metric Cards in Animated Tech Boxes */}
        <div
          ref={metricsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <TechBox
            delay={100}
            tag="METRIC // 01. VELOCITY"
            coordinates={{
              tl: 'TL // VELOCITY',
              tr: 'TR // 3.8X',
              br: 'BR // ENGAGE',
              bl: 'BL // OPTIMAL',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(36px, 4vw, 48px)',
                fontWeight: 700,
                color: '#D4AF37',
                marginBottom: 8,
                lineHeight: 1,
                letterSpacing: '0.04em',
              }}
            >
              3.8X
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5 }}>
              Average Acceleration in Brand Engagement
            </div>
          </TechBox>

          <TechBox
            delay={250}
            tag="METRIC // 02. RETENTION"
            coordinates={{
              tl: 'TL // RETENTION',
              tr: 'TR // 94.6%',
              br: 'BR // TRUST',
              bl: 'BL // PARTNER',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(36px, 4vw, 48px)',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: 8,
                lineHeight: 1,
                letterSpacing: '0.04em',
              }}
            >
              94.6%
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5 }}>
              Client Partnership Continuity Rate
            </div>
          </TechBox>

          <TechBox
            delay={400}
            tag="METRIC // 03. ARCHITECTURE"
            coordinates={{
              tl: 'TL // BESPOKE',
              tr: 'TR // 100%',
              br: 'BR // CODE',
              bl: 'BL // 3D_GL',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(36px, 4vw, 48px)',
                fontWeight: 700,
                color: '#D4AF37',
                marginBottom: 8,
                lineHeight: 1,
                letterSpacing: '0.04em',
              }}
            >
              100%
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5 }}>
              Bespoke, Original Creative Engineering
            </div>
          </TechBox>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onOpenContact();
          }}
          className="btn-pill btn-pill--gold slot-btn"
          style={{ minWidth: 200, height: 46 }}
        >
          <span className="slot-btn__wrapper">
            <span className="slot-btn__text">Ignite Your Next Level →</span>
            <span className="slot-btn__text slot-btn__text--hover">Collaborate With Us →</span>
          </span>
        </button>
      </div>
    </section>
  );
}
