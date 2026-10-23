'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShinyText } from '../ui/react-bits/ShinyText';
import { SpotlightCard } from '../ui/react-bits/SpotlightCard';
import { Magnet } from '../ui/react-bits/Magnet';
import './approach-section.css';

const APPROACH_STEPS = [
  {
    num: '01',
    title: 'Understand',
    desc: 'We learn about your business, goals, audience and challenges.',
    phase: 'PHASE 01 // DISCOVERY',
    deliverables: [
      'Business Objectives Audit',
      'Audience Persona Mapping',
      'Technology & Stack Review',
      'Competitive Landscape Analysis',
    ],
    spotlight: 'rgba(212, 175, 55, 0.22)',
  },
  {
    num: '02',
    title: 'Strategize',
    desc: 'We identify priorities and define an approach suited to your requirements.',
    phase: 'PHASE 02 // ROADMAP',
    deliverables: [
      'Strategic Priority Roadmap',
      'Solution Architecture Blueprint',
      'Resource & Timeline Scoping',
      'Measurable KPI Framework',
    ],
    spotlight: 'rgba(243, 229, 171, 0.22)',
  },
  {
    num: '03',
    title: 'Execute',
    desc: 'We bring the plan to life through the agreed marketing, creative or technology solutions.',
    phase: 'PHASE 03 // DELIVERY',
    deliverables: [
      'Precision Agile Sprints',
      'High-Fidelity Design & Code',
      'Multi-Channel Launch Execution',
      'Rigorous Quality Assurance',
    ],
    spotlight: 'rgba(212, 175, 55, 0.22)',
  },
  {
    num: '04',
    title: 'Improve',
    desc: 'Where applicable, we review performance, gather feedback and identify opportunities to optimize.',
    phase: 'PHASE 04 // EVOLUTION',
    deliverables: [
      'Realtime Analytics Tracking',
      'Conversion Rate Optimization',
      'User Feedback Synthesis',
      'Continuous Scaling Iterations',
    ],
    spotlight: 'rgba(243, 229, 171, 0.22)',
  },
];

export function ApproachSection({ onOpenContact }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stepsGridRef = useRef(null);
  const progressBarRef = useRef(null);
  const bottomCtaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header bidirectional words animation
      const headerWords = headerRef.current?.querySelectorAll('.approach-heading-word');
      const headerFadeEls = headerRef.current?.querySelectorAll('.approach-header-anim');

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
            stagger: 0.06,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 82%',
              end: 'bottom 15%',
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

      // 2. Timeline Progress Bar Fill on Scroll
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { width: '0%' },
          {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: stepsGridRef.current,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          }
        );
      }

      // 3. 4 Step Cards Stagger Reveal with reversible playback
      const cards = stepsGridRef.current?.querySelectorAll('.approach-step-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 55, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: stepsGridRef.current,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 4. Bottom CTA Reversible Entry
      if (bottomCtaRef.current) {
        gsap.fromTo(
          bottomCtaRef.current,
          { opacity: 0, y: 35, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
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
    <section className="approach-section" id="approach" ref={sectionRef}>
      {/* Ambient Lighting & Pattern */}
      <div className="approach-ambient-glow" aria-hidden="true" />
      <div className="approach-grid-pattern" aria-hidden="true" />

      <div className="approach-container">
        {/* Header: Our Approach / From Ideas to Action */}
        <div className="approach-header" ref={headerRef}>
          <div className="approach-badge-wrap approach-header-anim">
            <div className="approach-badge">
              <span className="approach-badge-dot" aria-hidden="true" />
              <ShinyText
                text="[ 06 // OUR APPROACH & METHODOLOGY ]"
                color="#D4AF37"
                shineColor="#FFFFFF"
                speed={2.6}
                className="approach-badge-text"
              />
            </div>
          </div>

          {/* Heading: From Ideas to Action (Megante Font) */}
          <h2 className="approach-heading">
            <span className="approach-heading-word">From</span>{' '}
            <span className="approach-heading-word">Ideas</span>{' '}
            <span className="approach-heading-word approach-heading-highlight">
              to Action
            </span>
          </h2>

          <p className="approach-subheading approach-header-anim">
            A collaborative, disciplined framework designed to transform ambitious vision into
            tangible market presence and measurable performance.
          </p>
        </div>

        {/* 4 Process Steps with Timeline Track */}
        <div className="approach-steps-wrap">
          <div className="approach-timeline-track" aria-hidden="true">
            <div className="approach-timeline-progress" ref={progressBarRef} />
          </div>

          <div className="approach-steps-grid" ref={stepsGridRef}>
            {APPROACH_STEPS.map((step, idx) => (
              <SpotlightCard
                key={idx}
                className="approach-step-card"
                spotlightColor={step.spotlight}
                borderColor="rgba(212, 175, 55, 0.25)"
              >
                <div className="approach-step-top">
                  <div className="approach-step-icon-wrap">{step.num}</div>
                  <span className="approach-step-phase-tag">{step.phase}</span>
                </div>

                <h3 className="approach-step-title">{step.title}</h3>

                <p className="approach-step-desc">{step.desc}</p>

                <div className="approach-step-tags">
                  {step.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="approach-tag-item">
                      <span className="approach-tag-bullet" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner with Magnet */}
        <div className="approach-bottom-cta" ref={bottomCtaRef}>
          <div className="approach-badge-wrap" style={{ marginBottom: '16px' }}>
            <div className="approach-badge">
              <span className="approach-badge-dot" aria-hidden="true" />
              <ShinyText
                text="[ INITIATE COLLABORATION ]"
                color="#D4AF37"
                shineColor="#FFFFFF"
                speed={3.0}
                className="approach-badge-text"
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
            Ready to bring your ideas to life?
          </h3>

          <p className="approach-cta-subhead">
            Step 01 starts with a conversation. Let's explore your goals, audience, and possibilities.
          </p>

          <Magnet padding={50} magnetStrength={0.35}>
            <a href="#contact" className="approach-cta-btn" onClick={handleCtaClick}>
              <span>Start Discovery Phase</span>
              <span className="approach-cta-arrow" aria-hidden="true">→</span>
            </a>
          </Magnet>

          <span className="approach-cta-footnote">
            Zero initial commitment • Comprehensive technical &amp; brand discovery
          </span>
        </div>
      </div>
    </section>
  );
}

export default ApproachSection;
