'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShinyText } from '../ui/react-bits/ShinyText';
import { SpotlightCard } from '../ui/react-bits/SpotlightCard';
import { Magnet } from '../ui/react-bits/Magnet';
import './insights-section.css';

const INSIGHTS_DATA = [
  {
    id: 'aeo-geo-shift',
    date: '2026.02 // ARCHIVE',
    readTime: '5 MIN READ',
    category: 'AI & ANSWER ENGINES',
    title: 'The Shift to Answer Engines: How AEO & GEO Reshape Brand Discoverability',
    summary:
      'As users transition from traditional keyword search to conversational AI models, discoverability requires semantic entity optimization, authority citations, and structured data architecture.',
    takeaway: 'Semantic Entity Graph • AI Citation Readiness • Direct Fact Verification',
    spotlight: 'rgba(212, 175, 55, 0.22)',
  },
  {
    id: 'spatial-webgl-perf',
    date: '2026.01 // ARCHIVE',
    readTime: '7 MIN READ',
    category: 'SPATIAL WEB & 3D',
    title: 'Real-Time 3D and WebGL in Commercial Products: Balancing Immersion with Core Web Vitals',
    summary:
      'Architecting GPU-accelerated interactive 3D digital experiences that achieve sub-100ms interaction latency while maintaining sub-second First Contentful Paint and flawless mobile performance.',
    takeaway: 'GLSL Shader Optimization • Progressive Mesh Streams • Sub-60fps Fidelity',
    spotlight: 'rgba(243, 229, 171, 0.22)',
  },
  {
    id: 'design-tokens-funnels',
    date: '2025.12 // ARCHIVE',
    readTime: '4 MIN READ',
    category: 'DESIGN SYSTEMS & BRAND',
    title: 'Cohesive Design Tokens: Unifying UI, Conversion Funnels, and Brand Touchpoints',
    summary:
      'Why top-performing enterprises maintain automated design tokens across web storefronts, mobile applications, and performance marketing creatives to accelerate velocity and conversion.',
    takeaway: 'Multi-Surface Token Sync • Conversion Parity • 3x Faster Sprint Velocity',
    spotlight: 'rgba(212, 175, 55, 0.22)',
  },
];

export function InsightsSection({ onLearnMore, onOpenContact }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const bottomCtaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header words animation: re-triggers on both scroll down & scroll up
      const headerWords = headerRef.current?.querySelectorAll('.insights-heading-word');
      const headerFadeEls = headerRef.current?.querySelectorAll('.insights-header-anim');

      if (headerWords && headerWords.length > 0) {
        gsap.fromTo(
          headerWords,
          { opacity: 0, y: 35, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 82%',
              end: 'bottom 15%',
              // Reversible in both scroll directions:
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (headerFadeEls && headerFadeEls.length > 0) {
        gsap.fromTo(
          headerFadeEls,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 2. 3 Insight Cards Staggered 3D Elevation
      const cards = gridRef.current?.querySelectorAll('.insight-card-item');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 3. Bottom CTA Reversible Entry
      if (bottomCtaRef.current) {
        gsap.fromTo(
          bottomCtaRef.current,
          { opacity: 0, y: 35, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bottomCtaRef.current,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (onLearnMore) {
      onLearnMore();
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
    <section className="insights-section" id="insights" ref={sectionRef}>
      {/* Ambient Lighting & Patterns */}
      <div className="insights-ambient-glow" aria-hidden="true" />
      <div className="insights-ambient-glow-right" aria-hidden="true" />
      <div className="insights-grid-pattern" aria-hidden="true" />

      <div className="insights-container">
        {/* Header: Eyebrow Badge, Megante Heading & User's Exact Lead Copy */}
        <div className="insights-header" ref={headerRef}>
          <div className="insights-badge-wrap insights-header-anim">
            <div className="insights-badge">
              <span className="insights-badge-dot" aria-hidden="true" />
              <ShinyText
                text="[ 07 // STRATEGIC INSIGHTS & PERSPECTIVES ]"
                color="#D4AF37"
                shineColor="#FFFFFF"
                speed={2.6}
                className="insights-badge-text"
              />
            </div>
          </div>

          {/* Heading: Strategic Insights & Perspectives (Megante Font) */}
          <h2 className="insights-heading">
            <span className="insights-heading-word">Strategic</span>{' '}
            <span className="insights-heading-word insights-heading-highlight">
              Insights &amp; Perspectives
            </span>
          </h2>

          {/* User's Exact Copy: Discover practical guidance to help you understand digital opportunities... */}
          <p className="insights-lead-desc insights-header-anim">
            Discover practical guidance to help you understand digital opportunities and make
            informed decisions for your business.
          </p>

          <div className="insights-header-cta insights-header-anim">
            <Magnet padding={40} magnetStrength={0.3}>
              <a href="#contact" className="insights-cta-btn" onClick={handleCtaClick}>
                <span>Learn More</span>
                <span className="insights-cta-arrow" aria-hidden="true">→</span>
              </a>
            </Magnet>
          </div>
        </div>

        {/* 3 Articles Grid with React Bits SpotlightCard */}
        <div className="insights-grid" ref={gridRef}>
          {INSIGHTS_DATA.map((article, idx) => (
            <SpotlightCard
              key={article.id}
              className="insight-card-item"
              spotlightColor={article.spotlight}
              borderColor="rgba(212, 175, 55, 0.25)"
            >
              <div className="insight-card-top">
                <span className="insight-card-meta">{article.date}</span>
                <span className="insight-card-readtime">{article.readTime}</span>
              </div>

              <span className="insight-card-category">{article.category}</span>

              <h3 className="insight-card-title">{article.title}</h3>

              <p className="insight-card-summary">{article.summary}</p>

              <div className="insight-card-takeaways">
                <span className="insight-takeaway-dot" aria-hidden="true" />
                <span className="insight-takeaway-text">{article.takeaway}</span>
              </div>

              <div className="insight-card-action">
                <span>Read Full Briefing</span>
                <span className="insight-card-arrow" aria-hidden="true">→</span>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Bottom CTA Banner with React Bits Magnet */}
        <div className="insights-bottom-cta" ref={bottomCtaRef}>
          <div className="insights-badge-wrap" style={{ marginBottom: '16px' }}>
            <div className="insights-badge">
              <span className="insights-badge-dot" aria-hidden="true" />
              <ShinyText
                text="[ CONTINUOUS MARKET INTELLIGENCE ]"
                color="#D4AF37"
                shineColor="#FFFFFF"
                speed={3.0}
                className="insights-badge-text"
              />
            </div>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-megante, 'Megante', 'Cinzel', serif)",
              fontSize: 'clamp(28px, 3.4vw, 42px)',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: '0 0 14px 0',
              textAlign: 'center',
            }}
          >
            Ready to explore opportunities tailored to your enterprise?
          </h3>

          <p className="insights-cta-subhead">
            Connect with our strategy practice to unpack technology trends, conversion funnels, and your growth roadmap.
          </p>

          <Magnet padding={50} magnetStrength={0.35}>
            <a href="#contact" className="insights-cta-btn" onClick={handleCtaClick}>
              <span>Learn More</span>
              <span className="insights-cta-arrow" aria-hidden="true">→</span>
            </a>
          </Magnet>

          <span className="insights-cta-footnote">
            Bespoke Industry Teardowns • Executive Technology Briefings • Quarterly Forecasts
          </span>
        </div>
      </div>
    </section>
  );
}

export default InsightsSection;
