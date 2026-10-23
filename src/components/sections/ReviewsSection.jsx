import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundManager } from '../../utils/audio';
import TechBox from '../TechBox';

const REVIEWS = [
  {
    id: 'rev-01',
    ref: 'REV // 01',
    rating: 5,
    role: 'CHIEF TECHNOLOGY OFFICER',
    org: 'ENTERPRISE RETAIL GROUP',
    quote:
      'The technical rigor and creative depth Anixel Studio brought to our digital presence transformed our brand visibility. They navigated complex 3D interactive requirements and web architecture with remarkable precision.',
    metrics: '+140% Digital Engagement // 99.9% Uptime',
  },
  {
    id: 'rev-02',
    ref: 'REV // 02',
    rating: 5,
    role: 'MANAGING DIRECTOR',
    org: 'VENTURE & TECH ACCELERATOR',
    quote:
      'From our initial discovery workshop to execution across marketing, UI/UX, and cloud infrastructure, Anixel Studio operated as a true strategic partner. Their disciplined delivery set a new standard for our ecosystem.',
    metrics: 'Seamless Multi-platform Rollout',
  },
  {
    id: 'rev-03',
    ref: 'REV // 03',
    rating: 5,
    role: 'HEAD OF BRAND & INNOVATION',
    org: 'GLOBAL MEDIA LABS',
    quote:
      'Finding a studio that understands cutting-edge spatial creative solutions and real-world commercial conversion is rare. Anixel Studio delivered both with zero compromises on performance or aesthetics.',
    metrics: '3.8X ROI on Paid Digital Acquisition',
  },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const quoteRef = useRef(null);

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

      // 3. 3D Perspective Card reveal
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 70, opacity: 0, scale: 0.94, rotateX: 7 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const prevReview = () => {
    soundManager.playClick();
    if (quoteRef.current) {
      gsap.to(quoteRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
          gsap.fromTo(quoteRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
        },
      });
    } else {
      setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
    }
  };

  const nextReview = () => {
    soundManager.playClick();
    if (quoteRef.current) {
      gsap.to(quoteRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
          gsap.fromTo(quoteRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
        },
      });
    } else {
      setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
    }
  };

  const current = REVIEWS[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="site-section"
      style={{
        minHeight: '80vh',
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
        ref={watermarkRef}
        style={{
          position: 'absolute',
          top: '10%',
          right: '3%',
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
        REVIEWS
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginBottom: '40px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-primary)',
                letterSpacing: '0.15em',
              }}
            >
              [ 07 // TESTIMONIALS &amp; VERIFIED METRICS ]
            </span>
            <span style={{ width: 40, height: 1, backgroundColor: 'var(--color-border)' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-muted)',
              }}
            >
              CLIENT VERIFICATIONS
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-primary)' }}>
              0{currentIndex + 1} / 0{REVIEWS.length}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={prevReview}
                className="btn-pill"
                style={{ minWidth: 38, width: 38, height: 38, padding: 0 }}
                aria-label="Previous review"
              >
                ←
              </button>
              <button
                onClick={nextReview}
                className="btn-pill btn-pill--gold"
                style={{ minWidth: 38, width: 38, height: 38, padding: 0 }}
                aria-label="Next review"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Master Drawn Review Box Frame */}
        <div ref={cardRef}>
          <TechBox
            tag={`VERIFICATION // 0${currentIndex + 1} :: ${current.org}`}
            coordinates={{
              tl: `TL // 0${currentIndex + 1}`,
              tr: 'TR // 5.0★',
              br: 'BR // VERIFIED',
              bl: 'BL // ENTERPRISE',
            }}
            style={{
              background: 'rgba(12, 12, 12, 0.88)',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: '24px' }}>
              {Array.from({ length: current.rating }).map((_, i) => (
                <span key={i} style={{ color: 'var(--color-primary)', fontSize: '16px' }}>
                  ★
                </span>
              ))}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-muted)',
                  marginLeft: 10,
                }}
              >
                [ 5.0 / 5.0 BENCHMARK ]
              </span>
            </div>

            <blockquote
              ref={quoteRef}
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(20px, 2.6vw, 32px)',
                lineHeight: 1.4,
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '32px',
                fontStyle: 'normal',
                letterSpacing: '0.02em',
                textAlign: 'center',
                maxWidth: '900px',
                margin: '0 auto 32px auto',
              }}
            >
              "{current.quote}"
            </blockquote>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 16,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '20px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  letterSpacing: '0.08em',
                  marginBottom: 4,
                }}
              >
                {current.role}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                {current.org}
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.5)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              {current.metrics}
            </div>
          </div>
        </TechBox>
        </div>
      </div>
    </section>
  );
}
