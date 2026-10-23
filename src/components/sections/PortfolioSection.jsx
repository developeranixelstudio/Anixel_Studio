'use client';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShinyText } from '../ui/react-bits/ShinyText';
import { SpotlightCard } from '../ui/react-bits/SpotlightCard';
import { Magnet } from '../ui/react-bits/Magnet';
import { TiltedCard } from '../ui/react-bits/TiltedCard';
import { BlurText } from '../ui/react-bits/BlurText';
import './portfolio-section.css';

const CATEGORIES = [
  'ALL WORK',
  'SPATIAL & 3D',
  'E-COMMERCE & WEB',
  'BRAND & IDENTITY',
  'AI & GROWTH',
];

const PROJECTS_DATA = [
  {
    id: 'aura-spatial',
    num: '01 // ARCHIVE',
    client: 'AURA SPATIAL CORP',
    categoryFilter: 'SPATIAL & 3D',
    badge: 'SPATIAL WEB & 3D',
    title: 'Aura Spatial Metaverse & WebXR Platform',
    desc: 'An interactive 3D digital brand universe developed with custom WebGL shaders, responsive spatial soundscapes, and synchronized multi-user interactions.',
    metric: '2.4M+ ACTIVE EXPLORATIONS • SUB-60FPS SHADERS',
    tags: ['Custom WebGL', 'Spatial Audio', 'Multiplayer Sync', 'Three.js'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    accent: '#D4AF37',
  },
  {
    id: 'kinetix-commerce',
    num: '02 // ARCHIVE',
    client: 'KINETIX LABS EUROPE',
    categoryFilter: 'E-COMMERCE & WEB',
    badge: 'HEADLESS COMMERCE',
    title: 'Kinetix Global Luxury Technical Apparel Ecosystem',
    desc: 'Complete digital transformation for a high-performance luxury technical apparel brand, featuring headless Shopify architecture, lightning catalog navigation, and fluid motion transitions.',
    metric: '+142% CONVERSION VELOCITY • 99.8% CORE WEB VITALS',
    tags: ['Headless Shopify', 'Motion Micro-Interactions', 'Design System', 'Edge CDN'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    accent: '#00E5FF',
  },
  {
    id: 'aether-robotics',
    num: '03 // ARCHIVE',
    client: 'AETHER ROBOTICS',
    categoryFilter: 'BRAND & IDENTITY',
    badge: 'BRAND ARCHITECTURE',
    title: 'Aether Autonomous Brand Identity & Motion System',
    desc: 'A comprehensive brand identity system including parametric generative typography, unified design tokens, dark-mode design system, and cinematic video launch campaign.',
    metric: 'RED DOT DESIGN AWARD • GLOBAL PRODUCT LAUNCH',
    tags: ['Parametric Grid', 'Visual Design Guidelines', '3D Motion Graphics', 'Audio Signature'],
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    accent: '#FF0055',
  },
  {
    id: 'nexus-cloud',
    num: '04 // ARCHIVE',
    client: 'NEXUS CLOUD SYSTEMS',
    categoryFilter: 'AI & GROWTH',
    badge: 'AI & SEARCH ENGINE',
    title: 'Nexus Enterprise Algorithmic Growth Engine',
    desc: 'Full-funnel digital marketing campaign utilizing algorithmic answer engine optimization (AEO), targeted paid media, and behavioral lead nurturing.',
    metric: '+310% QUALIFIED PIPELINE • TOP 1% AI DISCOVERY',
    tags: ['Answer Engine Opt. (AEO)', 'Automated Funnels', 'High-Converting UI', 'Attribution AI'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    accent: '#7928CA',
  },
];

export function PortfolioSection({ onExplorePortfolio, onOpenContact }) {
  const [activeCategory, setActiveCategory] = useState('ALL WORK');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const bottomCtaRef = useRef(null);

  const filteredProjects =
    activeCategory === 'ALL WORK'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.categoryFilter === activeCategory);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header bidirectional words animation
      const headerWords = headerRef.current?.querySelectorAll('.portfolio-heading-word');
      const headerFadeEls = headerRef.current?.querySelectorAll('.portfolio-header-anim');

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

      // 2. Project Cards: Individual ScrollTrigger per card with reversible entrance & parallax
      const cards = listRef.current?.querySelectorAll('.portfolio-project-card');
      if (cards && cards.length > 0) {
        cards.forEach((card, index) => {
          const media = card.querySelector('.portfolio-project-media');
          const info = card.querySelector('.portfolio-project-info');

          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 82%',
                end: 'bottom 15%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );

          if (media) {
            gsap.fromTo(
              media,
              { scale: 0.94, opacity: 0.7 },
              {
                scale: 1,
                opacity: 1,
                duration: 1.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 82%',
                  end: 'bottom 15%',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          }

          if (info) {
            const infoItems = info.children;
            gsap.fromTo(
              infoItems,
              { opacity: 0, x: index % 2 === 0 ? 30 : -30 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                  end: 'bottom 15%',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          }
        });
      }

      // 3. Bottom CTA Banner
      if (bottomCtaRef.current) {
        gsap.fromTo(
          bottomCtaRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
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
  }, [activeCategory]);

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (onExplorePortfolio) {
      onExplorePortfolio();
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
    <section className="portfolio-section" id="portfolio" ref={sectionRef}>
      {/* Ambient Lighting & Pattern */}
      <div className="portfolio-ambient-glow" aria-hidden="true" />
      <div className="portfolio-ambient-glow-right" aria-hidden="true" />
      <div className="portfolio-grid-pattern" aria-hidden="true" />

      <div className="portfolio-container">
        {/* Header with Eyebrow Badge, Megante Heading & TF Mighu Description */}
        <div className="portfolio-header" ref={headerRef}>
          <div className="portfolio-badge-wrap portfolio-header-anim">
            <div className="portfolio-badge">
              <span className="portfolio-badge-dot" aria-hidden="true" />
              <ShinyText
                text="[ 05 // CURATED PORTFOLIO ]"
                color="#D4AF37"
                shineColor="#FFFFFF"
                speed={2.6}
                className="portfolio-badge-text"
              />
            </div>
          </div>

          {/* Heading: Work That Brings Ideas to Life (Megante Font) */}
          <h2 className="portfolio-heading">
            <span className="portfolio-heading-word">Work</span>{' '}
            <span className="portfolio-heading-word">That</span>{' '}
            <span className="portfolio-heading-word portfolio-heading-highlight">
              Brings Ideas to Life
            </span>
          </h2>

          {/* Lead Copy: Every project begins with an objective... (TF Mighu Font) */}
          <p className="portfolio-lead-desc portfolio-header-anim">
            Every project begins with an objective. Our focus is on understanding that objective
            and developing a solution suited to the brand, its audience and its needs.
          </p>

          <div className="portfolio-header-cta portfolio-header-anim">
            <Magnet padding={40} magnetStrength={0.3}>
              <a href="#contact" className="portfolio-cta-btn" onClick={handleCtaClick}>
                <span>Explore Our Portfolio</span>
                <span className="portfolio-cta-arrow" aria-hidden="true">→</span>
              </a>
            </Magnet>
          </div>
        </div>

        {/* Interactive Category Filter Bar */}
        <div className="portfolio-filter-bar">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              className={`portfolio-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Animation: 3D TiltedCards + Bidirectional GSAP Parallax */}
        <div className="portfolio-projects-list" ref={listRef}>
          {filteredProjects.map((project, idx) => {
            const isReverse = idx % 2 === 1;

            return (
              <article
                key={project.id}
                className={`portfolio-project-card ${isReverse ? 'reverse' : ''}`}
              >
                {/* 3D Tilted Media Card with Specular Glare (React Bits TiltedCard) */}
                <div className="portfolio-project-media">
                  <TiltedCard
                    containerHeight="420px"
                    containerWidth="100%"
                    rotateAmplitude={10}
                    scaleOnHover={1.03}
                  >
                    <div className="portfolio-project-image-wrap">
                      <span className="portfolio-project-badge">{project.badge}</span>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="portfolio-project-img"
                        loading="lazy"
                      />
                    </div>
                  </TiltedCard>
                </div>

                {/* Editorial Info Side */}
                <div className="portfolio-project-info">
                  <div className="portfolio-project-meta-row">
                    <span className="portfolio-project-num">{project.num}</span>
                    <span className="portfolio-project-client">// {project.client}</span>
                  </div>

                  <h3 className="portfolio-project-title">{project.title}</h3>

                  <p className="portfolio-project-desc">{project.desc}</p>

                  <div className="portfolio-project-metric-box">
                    <span className="portfolio-metric-dot" aria-hidden="true" />
                    <span className="portfolio-metric-text">{project.metric}</span>
                  </div>

                  <div className="portfolio-project-tags">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="portfolio-project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Magnet padding={35} magnetStrength={0.25}>
                    <a
                      href="#contact"
                      className="portfolio-case-study-btn"
                      onClick={handleCtaClick}
                    >
                      <span>Explore Case Study</span>
                      <span className="portfolio-case-arrow" aria-hidden="true">→</span>
                    </a>
                  </Magnet>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Banner with React Bits Magnet */}
        <div className="portfolio-bottom-cta" ref={bottomCtaRef}>
          <div className="portfolio-badge-wrap" style={{ marginBottom: '16px' }}>
            <div className="portfolio-badge">
              <span className="portfolio-badge-dot" aria-hidden="true" />
              <ShinyText
                text="[ ARCHIVE & CASE STUDIES ]"
                color="#D4AF37"
                shineColor="#FFFFFF"
                speed={3.0}
                className="portfolio-badge-text"
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
            Have a project in mind that needs to stand out?
          </h3>

          <p className="portfolio-cta-subhead">
            Let's dissect your market challenge and architect an award-winning digital experience.
          </p>

          <Magnet padding={50} magnetStrength={0.35}>
            <a href="#contact" className="portfolio-cta-btn" onClick={handleCtaClick}>
              <span>Explore Our Portfolio</span>
              <span className="portfolio-cta-arrow" aria-hidden="true">→</span>
            </a>
          </Magnet>

          <span className="portfolio-cta-footnote">
            Bespoke Creative Architecture • Production Proofs • Engineering Retainers
          </span>
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
