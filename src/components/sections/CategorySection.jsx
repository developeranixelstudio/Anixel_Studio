import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundManager } from '../../utils/audio';
import { splitWords } from '../../utils/textSplit';
import NeonBorder from '../NeonBorder';

const CATEGORIES = [
  {
    id: 'cat-01',
    code: 'DOM // MKT',
    title: 'Digital Marketing & Growth Acquisition',
    deliverables: [
      'Multi-channel Paid Search & Social Ads',
      'Targeted Lead Funnels & Automation',
      'Audience Behavioral Remarketing',
      'Continuous Conversion Rate Optimization (CRO)',
    ],
    techStack: 'Meta Ads Manager, Google Ads 360, HubSpot, Segment',
  },
  {
    id: 'cat-02',
    code: 'DOM // DISCOVERY',
    title: 'Search, Answer & Generative AI Optimization',
    deliverables: [
      'Generative Engine Optimization (GEO)',
      'Answer Engine Optimization (AEO) for Perplexity & ChatGPT',
      'Semantic & Entity-based Technical SEO',
      'Knowledge Graph Structured Data Architecture',
    ],
    techStack: 'Schema.org, OpenGraph, JSON-LD, Screaming Frog',
  },
  {
    id: 'cat-03',
    code: 'DOM // DESIGN',
    title: 'Branding, Spatial & Experience Design',
    deliverables: [
      'Comprehensive Brand Identity Systems',
      'Design Tokens & Parametric Component Libraries',
      'Interactive UI/UX Prototyping',
      'Spatial & Dimensional Typography Direction',
    ],
    techStack: 'Figma, Blender, Cinema 4D, Custom Glyphs',
  },
  {
    id: 'cat-04',
    code: 'DOM // DEV',
    title: 'Fullstack Web, Apps & Spatial Engineering',
    deliverables: [
      'Custom React, Next.js & Vite High-Performance Frontends',
      'WebGL / Three.js Real-time 3D Interactive Environments',
      'Cross-platform iOS & Android Mobile Applications',
      'Headless & Microservices E-Commerce Architecture',
    ],
    techStack: 'React, Three.js, WebGL, Node.js, GraphQL',
  },
];

export default function CategorySection() {
  const [activeCat, setActiveCat] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headingTitleRef = useRef(null);
  const watermarkRef = useRef(null);
  const tabsRef = useRef(null);
  const panelRef = useRef(null);
  const panelContentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background watermark parallax scrub
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { y: 80, opacity: 0.02 },
          {
            y: -80,
            opacity: 0.05,
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

      // Header Tag reveal
      if (headerRef.current) {
        const tag = headerRef.current.querySelector('.category-tag');
        if (tag) {
          gsap.fromTo(
            tag,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // Heading split words reveal
      if (headingTitleRef.current) {
        const words = headingTitleRef.current.querySelectorAll('.gsap-word');
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.035,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: headingTitleRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // Tabs 3D staggered entry
      if (tabsRef.current) {
        const tabItems = tabsRef.current.children;
        gsap.fromTo(
          tabItems,
          { x: -50, opacity: 0, rotateY: -8 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            stagger: 0.12,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Panel 3D entrance
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { x: 50, opacity: 0, scale: 0.96, rotateY: 8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panelRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSelect = (idx) => {
    soundManager.playClick();
    if (panelContentRef.current) {
      gsap.to(panelContentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setActiveCat(idx);
          gsap.fromTo(panelContentRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
        },
      });
    } else {
      setActiveCat(idx);
    }
  };

  const current = CATEGORIES[activeCat];

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="site-section"
      style={{
        minHeight: '90vh',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-cinzel, serif)',
          fontSize: 'clamp(80px, 16vw, 240px)',
          fontWeight: 900,
          letterSpacing: '0.2em',
          color: 'var(--color-primary)',
          opacity: 0.03,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0,
          userSelect: 'none',
        }}
      >
        MATRIX
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{ maxWidth: '800px', margin: '0 auto 48px auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div
            className="category-tag"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-primary)',
              letterSpacing: '0.15em',
              marginBottom: '20px',
            }}
          >
            <span>[ 08 // DOMAIN MATRIX ]</span>
            <span style={{ width: 40, height: 1, backgroundColor: 'var(--color-border)' }} />
            <span style={{ color: 'var(--color-muted)' }}>INTEGRATED ARCHITECTURE</span>
          </div>

          <h2
            ref={headingTitleRef}
            className="text-headline-lg font-cinzel text-gold-gradient"
            style={{
              fontSize: 'clamp(28px, 3.8vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.18,
              textAlign: 'center',
              margin: '0 auto',
            }}
          >
            {splitWords('Categorical Architecture Designed for Cross-Functional Impact')}
          </h2>
        </div>

        {/* Matrix Grid: Left Tabs / Right Panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Category Tabs */}
          <div ref={tabsRef} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CATEGORIES.map((cat, idx) => {
              const isSelected = activeCat === idx;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => soundManager.playHover()}
                  className="alche-card"
                  style={{
                    padding: '20px 24px',
                    backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.08)' : 'rgba(10, 10, 10, 0.7)',
                    borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: isSelected ? 'var(--color-primary)' : 'var(--color-muted)',
                        letterSpacing: '0.1em',
                        marginBottom: '4px',
                      }}
                    >
                      {cat.code}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-headline)',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
                      }}
                    >
                      {cat.title}
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      color: isSelected ? '#D4AF37' : 'rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    {isSelected ? '●' : '○'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Category Deliverables Panel */}
          <div
            ref={panelRef}
            className="alche-card tech-frame"
            style={{
              padding: '36px',
              backgroundColor: 'rgba(10, 10, 10, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '340px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <NeonBorder color="#D4AF37" rounded={14} thickness={3} borderSize={45} glow={85} />
            <div className="tech-frame__cross tech-frame__cross--tl" />
            <div className="tech-frame__cross tech-frame__cross--tr" />
            <div className="tech-frame__cross tech-frame__cross--bl" />
            <div className="tech-frame__cross tech-frame__cross--br" />

            <div ref={panelContentRef}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#D4AF37',
                    letterSpacing: '0.1em',
                  }}
                >
                  SYSTEM EXECUTION // {current.code}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--color-muted)',
                  }}
                >
                  SCOPE ARCHITECTURE
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '24px',
                  lineHeight: 1.3,
                }}
              >
                {current.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {current.deliverables.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.85)',
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        lineHeight: '20px',
                      }}
                    >
                      +
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: '32px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-muted)',
              }}
            >
              <span>TECH STACK:</span>
              <span style={{ color: '#FFFFFF' }}>{current.techStack}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
