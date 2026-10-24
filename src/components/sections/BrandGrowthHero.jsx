'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShinyText } from '../ui/react-bits/ShinyText';
import { SpotlightCard } from '../ui/react-bits/SpotlightCard';
import { Magnet } from '../ui/react-bits/Magnet';
import './brand-growth-hero.css';

export function BrandGrowthHero({ onExploreServices, onOpenContact }) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const cardsRef = useRef(null);
  const canvasRef = useRef(null);

  // Background Interactive Particle Nebula
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 18000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle radial glow near mouse
      const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 320);
      grad.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw and connect particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll('.bgh-word');
      const lines = copyRef.current;
      const cardEls = cardsRef.current?.children;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      if (words && words.length > 0) {
        tl.fromTo(
          words,
          { opacity: 0, y: 45, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.05,
          }
        );
      }

      if (lines) {
        tl.fromTo(
          lines,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
          '-=0.7'
        );
      }

      if (cardEls && cardEls.length > 0) {
        tl.fromTo(
          cardEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.15,
          },
          '-=0.6'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCTAClick = (e) => {
    e.preventDefault();
    if (onExploreServices) {
      onExploreServices();
      return;
    }
    const el = document.getElementById('services-grid') || document.getElementById('skiper40');
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -40 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headingText = "We Build Brands To Drive Digital Growth.";
  const headingWords = headingText.split(' ');

  return (
    <section className="bgh-section" id="brand-growth-hero" ref={containerRef}>
      {/* Background Interactive Particles */}
      <canvas ref={canvasRef} className="bgh-canvas" aria-hidden="true" />

      {/* Decorative Cybernetic Grid Lines */}
      <div className="bgh-grid-overlay" aria-hidden="true" />

      <div className="bgh-container">
        {/* Top Eyebrow Badge with React Bits ShinyText */}
        <div className="bgh-badge-wrap">
          <div className="bgh-badge">
            <span className="bgh-badge-beacon" aria-hidden="true" />
            <ShinyText
              text="[ ANIXEL STUDIO // DIGITAL CAPABILITIES ]"
              color="#D4AF37"
              shineColor="#FFFFFF"
              speed={3}
              className="bgh-badge-text"
            />
          </div>
        </div>

        {/* Hero Section Heading in Megante Font */}
        <h2 className="bgh-heading" ref={headlineRef}>
          {headingWords.map((word, i) => (
            <span key={i} className="bgh-word-wrap">
              <span className="bgh-word">{word}&nbsp;</span>
            </span>
          ))}
        </h2>

        {/* Subtext Copy in TF Mighu Font */}
        <div className="bgh-copy-wrap" ref={copyRef}>
          <p className="bgh-copy">
            Anixel Studio helps businesses strengthen their digital presence through strategic
            marketing, creative solutions and technology. From increasing online visibility to
            building meaningful brand experiences, we bring the right capabilities together to help
            your business move forward.
          </p>

          {/* Action Row with React Bits Magnet Button */}
          <div className="bgh-actions">
            <Magnet padding={50} magnetStrength={0.35}>
              <a href="#services-grid" className="bgh-cta-btn" onClick={handleCTAClick}>
                <span className="bgh-cta-frame" aria-hidden="true" />
                <span className="bgh-cta-label">Explore Our Services</span>
                <span className="bgh-cta-arrow" aria-hidden="true">→</span>
              </a>
            </Magnet>

            <button
              type="button"
              className="bgh-contact-link"
              onClick={() => {
                if (onOpenContact) onOpenContact();
              }}
            >
              [ INITIATE CONVERSATION ]
            </button>
          </div>
        </div>

        {/* The 3 Core Pillars Grounded in the Copy (Spotlight Cards) */}
        <div className="bgh-pillars-grid" id="services-grid" ref={cardsRef}>
          {/* Pillar 01: Strategic Marketing */}
          <SpotlightCard
            className="bgh-pillar-card"
            spotlightColor="rgba(212, 175, 55, 0.22)"
            borderColor="rgba(212, 175, 55, 0.3)"
          >
            <div className="bgh-card-top">
              <span className="bgh-card-index">01 //</span>
              <span className="bgh-card-tag">GROWTH &amp; REACH</span>
            </div>
            <h3 className="bgh-card-title">Strategic Marketing</h3>
            <p className="bgh-card-desc">
              From increasing online visibility to high-conversion multi-channel acquisition funnels
              and generative AI discovery optimization (GEO/AEO).
            </p>
            <div className="bgh-card-metric">
              <span className="bgh-card-metric-val">+340%</span>
              <span className="bgh-card-metric-label">Avg. Visibility Velocity</span>
            </div>
          </SpotlightCard>

          {/* Pillar 02: Creative Solutions */}
          <SpotlightCard
            className="bgh-pillar-card"
            spotlightColor="rgba(243, 229, 171, 0.22)"
            borderColor="rgba(212, 175, 55, 0.3)"
          >
            <div className="bgh-card-top">
              <span className="bgh-card-index">02 //</span>
              <span className="bgh-card-tag">BRAND IDENTITY</span>
            </div>
            <h3 className="bgh-card-title">Creative Solutions</h3>
            <p className="bgh-card-desc">
              Building meaningful brand experiences with distinctive typographic systems, luxury visual
              direction, and high-impact digital storytelling.
            </p>
            <div className="bgh-card-metric">
              <span className="bgh-card-metric-val">100%</span>
              <span className="bgh-card-metric-label">Bespoke Brand Systems</span>
            </div>
          </SpotlightCard>

          {/* Pillar 03: Technology & Engineering */}
          <SpotlightCard
            className="bgh-pillar-card"
            spotlightColor="rgba(212, 175, 55, 0.22)"
            borderColor="rgba(212, 175, 55, 0.3)"
          >
            <div className="bgh-card-top">
              <span className="bgh-card-index">03 //</span>
              <span className="bgh-card-tag">ENGINEERING &amp; 3D</span>
            </div>
            <h3 className="bgh-card-title">Technology</h3>
            <p className="bgh-card-desc">
              High-velocity digital platforms, interactive 3D WebGL architectures, and modern
              frontend performance engineering that scales globally.
            </p>
            <div className="bgh-card-metric">
              <span className="bgh-card-metric-val">60 FPS</span>
              <span className="bgh-card-metric-label">WebGL Spatial Renders</span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

export default BrandGrowthHero;
