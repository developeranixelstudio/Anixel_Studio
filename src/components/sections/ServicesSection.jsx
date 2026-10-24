'use client';
import React, { useEffect, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShinyText } from '../ui/react-bits/ShinyText';
import { SpotlightCard } from '../ui/react-bits/SpotlightCard';
import { Magnet } from '../ui/react-bits/Magnet';
import { BlurText } from '../ui/react-bits/BlurText';
import { CardsRotateSlider } from '../ui/cards-rotate-slider';
import './services-section.css';

const ThreeSectionOrb = lazy(() => import('../three/ThreeSectionOrb'));

const CAPABILITIES_SLIDES = [
  {
    num: '01 //',
    eyebrow: 'GROWTH & MEDIA',
    text: 'Digital Marketing & Lead Generation',
    description: 'Paid campaigns, social strategy, conversion funnels, and performance systems engineered for measurable growth.',
    tags: ['Paid Media', 'Targeting', 'Conversion Funnels', 'Performance'],
    src: '/capabilities/capability-1.webp',
  },
  {
    num: '02 //',
    eyebrow: 'SEARCH & DISCOVERY',
    text: 'SEO, AEO & GEO',
    description: 'Search architecture that builds visibility across traditional search, answer engines, and AI discovery.',
    tags: ['Answer Engine Opt.', 'Generative Search', 'Algorithmic Rank', 'Technical SEO'],
    src: '/capabilities/capability-2.webp',
  },
  {
    num: '03 //',
    eyebrow: 'BRAND ARCHITECTURE',
    text: 'Branding & Creative Design',
    description: 'Distinctive identities, design systems, and digital interfaces built to make brands recognizable and coherent.',
    tags: ['Visual Identity', 'Design Systems', 'Interface Architecture', 'Brand Book'],
    src: '/capabilities/capability-3.webp',
  },
  {
    num: '04 //',
    eyebrow: 'DIGITAL ENGINEERING',
    text: 'Website & App Development',
    description: 'High-performance websites, commerce platforms, and applications with thoughtful interactions and scalable foundations.',
    tags: ['Fullstack Web', 'High-Performance Apps', 'E-Commerce', 'Spatial UI'],
    src: '/capabilities/capability-4.webp',
  },
  {
    num: '05 //',
    eyebrow: 'STUDIO & CINEMA',
    text: 'Creative Content Production',
    description: 'Cinematic video, animation, product photography, and visual storytelling that turns ideas into culture.',
    tags: ['3D Motion', 'Cinematic Video', 'Visual Storytelling', 'Copywriting'],
    src: '/capabilities/capability-5.webp',
  },
  {
    num: '06 //',
    eyebrow: 'ENTERPRISE TECH',
    text: 'Business Technology Solutions',
    description: 'Tailored CRM, ERP, cloud, and workflow systems that connect operations and help teams move faster.',
    tags: ['Enterprise CRM', 'Cloud Systems', 'Custom Workflows', 'Integrations'],
    src: '/capabilities/capability-6.webp',
  },
];


const SERVICES_DATA = [
  {
    num: '01 //',
    category: 'GROWTH & MEDIA',
    title: 'Digital Marketing & Lead Generation',
    desc: 'Reach the right audience with digital marketing, social media, paid campaigns, and lead generation.',
    tags: ['Paid Media', 'Targeting', 'Conversion Funnels', 'Performance Marketing'],
    spotlight: 'rgba(212, 175, 55, 0.22)',
  },
  {
    num: '02 //',
    category: 'SEARCH & DISCOVERY',
    title: 'SEO, AEO & GEO',
    desc: 'Boost your visibility across search engines, answer engines, and AI discovery.',
    tags: ['Answer Engine Opt.', 'Generative Search', 'Algorithmic Rank', 'Technical SEO'],
    spotlight: 'rgba(243, 229, 171, 0.22)',
  },
  {
    num: '03 //',
    category: 'BRAND ARCHITECTURE',
    title: 'Branding & Creative Design',
    desc: 'Create a cohesive brand experience through logo design, UI/UX, and social media creatives.',
    tags: ['Visual Identity', 'Design Systems', 'Interface Architecture', 'Brand Book'],
    spotlight: 'rgba(212, 175, 55, 0.22)',
  },
  {
    num: '04 //',
    category: 'DIGITAL ENGINEERING',
    title: 'Website & App Development',
    desc: 'Build engaging digital experiences with business websites, e-commerce platforms, and mobile apps.',
    tags: ['Fullstack Web', 'High-Performance Apps', 'E-Commerce', 'Spatial UI'],
    spotlight: 'rgba(243, 229, 171, 0.22)',
  },
  {
    num: '05 //',
    category: 'STUDIO & CINEMA',
    title: 'Creative Content Production',
    desc: 'Bring ideas to life with video, animation, product photography, visual content, and content writing.',
    tags: ['3D Motion', 'Cinematic Video', 'Visual Storytelling', 'Copywriting'],
    spotlight: 'rgba(212, 175, 55, 0.22)',
  },
  {
    num: '06 //',
    category: 'ENTERPRISE TECH',
    title: 'Business Technology Solutions',
    desc: 'Support your business with tailored CRM, ERP, POS, cloud, email, domain,',
    tags: ['Enterprise CRM', 'Cloud Systems', 'Custom Workflows', 'Integrations'],
    spotlight: 'rgba(243, 229, 171, 0.22)',
  },
];

export function ServicesSection({ onKnowMore, onOpenContact }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const ctaBannerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header words animation: re-triggers on both scroll down & scroll up
      const headerWords = headerRef.current?.querySelectorAll('.services-heading-word');
      const headerFadeEls = headerRef.current?.querySelectorAll('.services-header-anim');

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
              // "play reverse play reverse" ensures animations play when scrolling down AND reverse when scrolling up!
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

      // 2. 6 Service Cards: Stagger reveal with 3D elevation on scroll down & reverse on scroll up
      const cards = gridRef.current?.querySelectorAll('.service-card-item');
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
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 3. Bottom CTA Banner: Reversible smooth entry
      if (ctaBannerRef.current) {
        gsap.fromTo(
          ctaBannerRef.current,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaBannerRef.current,
              start: 'top 88%',
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
    if (onKnowMore) {
      onKnowMore();
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
    <section className="services-section" id="services" ref={sectionRef}>
      {/* Ambient Radial Backdrops */}
      <div className="services-ambient-glow" aria-hidden="true" />
      <div className="services-ambient-glow-secondary" aria-hidden="true" />
      <div className="services-grid-pattern" aria-hidden="true" />

      {/* 3D Floating Orbs */}
      <Suspense fallback={null}>
        <ThreeSectionOrb size={180} shape="octahedron" speed={0.6} style={{ top: '6%', right: '3%' }} />
        <ThreeSectionOrb size={120} shape="icosahedron" speed={1.3} style={{ bottom: '8%', left: '1%' }} />
      </Suspense>

      <div className="services-container">
        {/* Header Area with React Bits ShinyText & Bidirectional Text Reveal */}
        <div className="services-header" ref={headerRef}>
          <div className="services-badge-wrap services-header-anim">
            <div className="services-badge">
              <span className="services-badge-dot" aria-hidden="true" />
              <ShinyText
                text="[ 04 // COMPREHENSIVE CAPABILITIES ]"
                color="#D4AF37"
                shineColor="#FFFFFF"
                speed={2.6}
                className="services-badge-text"
              />
            </div>
          </div>

          {/* Heading: Everything You Need to Grow in the Digital World (Megante font) */}
          <h2 className="services-heading">
            <span className="services-heading-word">Everything</span>{' '}
            <span className="services-heading-word">You</span>{' '}
            <span className="services-heading-word">Need</span>{' '}
            <span className="services-heading-word">to</span>{' '}
            <span className="services-heading-word">Grow</span>{' '}
            <span className="services-heading-word services-heading-highlight">
              in the Digital World
            </span>
          </h2>

          <p className="services-subheading services-header-anim">
            From high-velocity marketing campaigns to enterprise digital engineering, we deliver
            integrated capabilities designed to accelerate sustainable market leadership.
          </p>

          <div className="services-header-cta services-header-anim">
            <Magnet padding={40} magnetStrength={0.3}>
              <a href="#contact" className="services-cta-btn" onClick={handleCtaClick}>
                <span>Know More</span>
                <span className="services-cta-arrow" aria-hidden="true">→</span>
              </a>
            </Magnet>
          </div>
        </div>
      </div>

      {/* 3D Horizontal Rotating Card Capabilities Slider (Full-Width Viewport Sticky Pinning) */}
      <div className="w-full relative my-8" style={{ overflowX: 'clip' }}>
        <CardsRotateSlider
          images={CAPABILITIES_SLIDES}
          rotationAmount={1.1}
          verticalDrift={1.1}
          perspective={1100}
          scrollSmoothing={1}
          textColor="#F9F6EA"
          bgClassName="bg-transparent"
        />
      </div>

      <div className="services-container">
        {/* 6 Services Spotlight Cards Grid */}
        <div className="services-grid" ref={gridRef}>
          {SERVICES_DATA.map((srv, idx) => (
            <SpotlightCard
              key={idx}
              className="service-card-item"
              spotlightColor={srv.spotlight}
              borderColor="rgba(212, 175, 55, 0.25)"
            >
              <div className="service-card-top">
                <span className="service-card-num">{srv.num}</span>
                <span className="service-card-category">{srv.category}</span>
              </div>

              <h3 className="service-card-title">{srv.title}</h3>

              <p className="service-card-desc">{srv.desc}</p>

              <div className="service-card-tags">
                {srv.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="service-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="service-card-action">
                <span>Explore Capability</span>
                <span className="service-card-arrow" aria-hidden="true">→</span>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Bottom Comprehensive CTA with Magnet */}
        <div className="services-bottom-cta" ref={ctaBannerRef}>
          <div className="services-badge-wrap" style={{ marginBottom: '16px' }}>
            <div className="services-badge">
              <span className="services-badge-dot" aria-hidden="true" />
              <ShinyText
                text="[ TAILORED ARCHITECTURE ]"
                color="#D4AF37"
                shineColor="#FFFFFF"
                speed={3.0}
                className="services-badge-text"
              />
            </div>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-megante, 'Megante', 'Cinzel', serif)",
              fontSize: 'clamp(26px, 3.2vw, 40px)',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: '0 0 12px 0',
            }}
          >
            Ready to deploy your next stage of growth?
          </h3>

          <p className="services-cta-subhead">
            Schedule a strategic capabilities consultation with our founders and lead technology architects.
          </p>

          <Magnet padding={50} magnetStrength={0.35}>
            <a href="#contact" className="services-cta-btn" onClick={handleCtaClick}>
              <span>Know More</span>
              <span className="services-cta-arrow" aria-hidden="true">→</span>
            </a>
          </Magnet>

          <span className="services-cta-footnote">
            Zero commitment • Tailored growth roadmap • Direct architecture review
          </span>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
