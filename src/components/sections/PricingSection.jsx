import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundManager } from '../../utils/audio';
import { splitWords } from '../../utils/textSplit';
import TechBox from '../TechBox';

const PRICING_TIERS = [
  {
    tier: 'TIER 01',
    name: 'Foundation Sprint',
    scope: 'Ideal for emerging brands and high-priority single product initiatives.',
    rate: 'CUSTOM SCOPED',
    turnaround: '2 - 4 WEEKS SPRINT',
    deliverables: [
      'Brand & visual identity core',
      'Targeted web or landing experience',
      'Essential SEO & schema setup',
      'Core conversion tracking & analytics',
      'Dedicated lead strategist',
    ],
    highlight: false,
  },
  {
    tier: 'TIER 02',
    name: 'Growth Architecture',
    scope: 'Designed for scaling companies expanding market presence and digital performance.',
    rate: 'CUSTOM SCOPED',
    turnaround: '6 - 10 WEEKS PROGRAM',
    deliverables: [
      'Comprehensive digital ecosystem overhaul',
      'Interactive WebGL & 3D elements',
      'Full-funnel paid media & lead generation',
      'Advanced AEO & generative search strategy',
      'Custom CRM / backend integrations',
      'Bi-weekly performance sprint reviews',
    ],
    highlight: true,
  },
  {
    tier: 'TIER 03',
    name: 'Enterprise Transformation',
    scope: 'Full-scale partnership for established enterprises seeking bespoke digital innovation.',
    rate: 'CUSTOM SCOPED',
    turnaround: 'ONGOING QUARTERLY ALLIANCE',
    deliverables: [
      'Bespoke multi-platform web & mobile apps',
      'Custom 3D / WebXR spatial experiences',
      'Enterprise cloud, ERP & POS workflow architecture',
      'Continuous creative content production suite',
      'Executive strategic steering & SLA guarantee',
    ],
    highlight: false,
  },
];

export default function PricingSection({ onOpenContact }) {
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const headerRef = useRef(null);
  const headingTextRef = useRef(null);
  const tiersContainerRef = useRef(null);

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

      // 2. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (headingTextRef.current) {
        const words = splitWords(headingTextRef.current);
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.15,
              stagger: 0.035,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: headingTextRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 3. Staggered 3D tier cards
      if (tiersContainerRef.current) {
        const tiers = tiersContainerRef.current.children;
        gsap.fromTo(
          tiers,
          { y: 70, opacity: 0, scale: 0.94, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            stagger: 0.16,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tiersContainerRef.current,
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
      ref={sectionRef}
      id="pricing"
      className="site-section"
      style={{
        minHeight: '90vh',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(80px, 14vh, 160px)',
        paddingBottom: 'clamp(80px, 14vh, 160px)',
      }}
    >
      {/* Background Watermark Typography */}
      <div
        ref={watermarkRef}
        style={{
          position: 'absolute',
          top: '10%',
          left: '2%',
          fontFamily: 'var(--font-alcazar)',
          fontSize: 'clamp(70px, 14vw, 190px)',
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
        MODELS
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{ maxWidth: '900px', margin: '0 auto 56px auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
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
              marginBottom: '20px',
            }}
          >
            <span>[ 10 // INVESTMENT &amp; SCOPING FRAMES ]</span>
            <span style={{ width: 40, height: 1, backgroundColor: 'var(--color-border)' }} />
            <span style={{ color: 'var(--color-muted)' }}>TRANSPARENT ENGAGEMENT MODELS</span>
          </div>

          <h2
            ref={headingTextRef}
            className="text-headline-lg font-cinzel text-gold-gradient"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.18,
              margin: '0 auto 16px auto',
              letterSpacing: '0.03em',
              textAlign: 'center',
            }}
          >
            Engagement Models Tailored to Strategic Scale
          </h2>

          <p
            className="text-body-md"
            style={{
              color: 'var(--color-muted)',
              fontSize: '15px',
              lineHeight: 1.6,
              maxWidth: '720px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            Every engagement begins with clear alignment on business metrics, timeline milestones, and deliverables. We operate on predictable, scoped sprint structures.
          </p>
        </div>

        {/* 3 Pricing Tier TechBoxes with Drawing Borders */}
        <div
          ref={tiersContainerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {PRICING_TIERS.map((tier, idx) => (
            <TechBox
              key={tier.tier}
              delay={idx * 140}
              tag={`MODEL // ${tier.tier}`}
              coordinates={{
                tl: `TL // ${tier.tier}`,
                tr: tier.highlight ? 'TR // POPULAR' : 'TR // DIRECT',
                br: 'BR // SCOPED',
                bl: 'BL // 2026',
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: tier.highlight ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.08)',
                background: tier.highlight ? 'rgba(212, 175, 55, 0.08)' : 'rgba(10, 10, 10, 0.8)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: tier.highlight ? 'var(--color-primary)' : 'var(--color-muted)',
                    marginBottom: '16px',
                  }}
                >
                  <span>{tier.tier}</span>
                  <span
                    style={{
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      border: `1px solid ${tier.highlight ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                      fontSize: '9px',
                      color: tier.highlight ? 'var(--color-primary)' : 'var(--color-muted)',
                    }}
                  >
                    {tier.turnaround}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '12px',
                    letterSpacing: '0.03em',
                  }}
                >
                  {tier.name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.6,
                    marginBottom: '24px',
                    minHeight: '44px',
                  }}
                >
                  {tier.scope}
                </p>

                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '20px',
                    marginBottom: '28px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--color-primary)',
                      letterSpacing: '0.12em',
                      marginBottom: '12px',
                    }}
                  >
                    INCLUDED DELIVERABLES:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tier.deliverables.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.85)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenContact();
                  }}
                  className={`btn-pill ${tier.highlight ? 'btn-pill--gold' : ''} slot-btn`}
                  style={{ width: '100%', height: 44 }}
                >
                  <span className="slot-btn__wrapper">
                    <span className="slot-btn__text">SELECT ENGAGEMENT →</span>
                    <span className="slot-btn__text slot-btn__text--hover">CUSTOM SCOPE BRIEF →</span>
                  </span>
                </button>
              </div>
            </TechBox>
          ))}
        </div>
      </div>
    </section>
  );
}
