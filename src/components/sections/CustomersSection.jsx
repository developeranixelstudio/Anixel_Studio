import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RoundCarousel from '../RoundCarousel';

const CLIENT_PARTNERS = [
  { id: '01', code: 'HORIZON', category: 'ENTERPRISE RETAIL' },
  { id: '02', code: 'VERTEX', category: 'AI & CLOUD' },
  { id: '03', code: 'NOVA LABS', category: 'VENTURE & TECH' },
  { id: '04', code: 'APEX', category: 'FINANCIAL SYSTEMS' },
  { id: '05', code: 'KINETIX', category: 'DIGITAL MEDIA' },
  { id: '06', code: 'LUMINA', category: 'CREATIVE COMMERCE' },
  { id: '07', code: 'AETHER', category: 'SPATIAL DIGITAL' },
  { id: '08', code: 'SYNAPSE', category: 'GLOBAL BRANDING' },
];

export default function CustomersSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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

      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { y: 50, scale: 0.94, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (hintRef.current) {
        gsap.fromTo(
          hintRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: hintRef.current,
              start: 'top 92%',
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
      id="customers"
      className="site-section"
      style={{
        paddingTop: '60px',
        paddingBottom: '80px',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
        {/* Section Header (Centered) matching the uploaded image */}
        <div
          ref={headerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: '32px',
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
              [ 03 // PARTNERSHIPS ]
            </span>
            <span style={{ width: 30, height: 1, backgroundColor: 'var(--color-border)' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-muted)',
              }}
            >
              TRUSTED COLLABORATORS
            </span>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.45)',
              letterSpacing: '0.08em',
            }}
          >
            VERIFIED INDUSTRY DEPLOYMENTS
          </span>
        </div>

        {/* 3D Round Carousel Container */}
        <div
          ref={carouselRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '420px',
            overflow: 'hidden',
          }}
        >
          <RoundCarousel
            items={CLIENT_PARTNERS}
            imageWidth={340}
            imageHeight={195}
            spacing={3}
            speed={5}
            direction="right"
            drag={true}
            sensitivity={2.5}
            tilt={-6}
            perspective={2600}
            cornerRadius={18}
            innerDim={3.5}
            background="transparent"
          />
        </div>

        {/* Interaction Hint */}
        <div
          ref={hintRef}
          style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'rgba(212, 175, 55, 0.55)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <span>✦ Drag or Hover to Explore</span>
          <span>•</span>
          <span>3D Cylindrical Ring</span>
          <span>•</span>
          <span>8 Verified Deployments</span>
        </div>
      </div>
    </section>
  );
}


