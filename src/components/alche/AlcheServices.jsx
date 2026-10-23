import React, { useRef, useState, useEffect } from 'react';
import { soundManager } from '../../utils/audio';
import TechBox from '../TechBox';

const SERVICES = [
  {
    num: '01',
    title: 'Digital Marketing & Lead Generation',
    desc: 'Reach the right audience with digital marketing, social media, paid campaigns, and lead generation.',
    descEn: 'Strategic paid acquisition funnels, behavioral audience targeting, and high-converting performance marketing.',
    tags: ['Paid Media', 'Targeting', 'Conversion Funnels', 'Performance Marketing'],
    metric: '+310% QUALIFIED PIPELINE',
  },
  {
    num: '02',
    title: 'SEO, AEO & GEO',
    desc: 'Boost your visibility across search engines, answer engines, and AI discovery.',
    descEn: 'Generative search optimization, algorithmic authority indexing, and technical semantic architecture.',
    tags: ['Answer Engine Opt.', 'Generative Search', 'Algorithmic Rank', 'Technical SEO'],
    metric: 'TOP 1% AI DISCOVERY',
  },
  {
    num: '03',
    title: 'Branding & Creative Design',
    desc: 'Create a cohesive brand experience through logo design, UI/UX, and social media creatives.',
    descEn: 'Parametric design tokens, cohesive design systems, dark-mode interfaces, and brand guidelines.',
    tags: ['Visual Identity', 'Design Systems', 'Interface Architecture', 'Brand Book'],
    metric: 'AWARD-WINNING DESIGN',
  },
  {
    num: '04',
    title: 'Website & App Development',
    desc: 'Build engaging digital experiences with business websites, e-commerce platforms, and mobile apps.',
    descEn: 'High-performance WebGL architectures, lightning-fast edge deployment, and bespoke fullstack engineering.',
    tags: ['Fullstack Web', 'High-Performance Apps', 'E-Commerce', 'Spatial UI'],
    metric: 'SUB-100MS LATENCY',
  },
  {
    num: '05',
    title: 'Creative Content Production',
    desc: 'Bring ideas to life with video, animation, product photography, visual content, and content writing.',
    descEn: 'Cinematic 3D animation, interactive render sequences, high-fidelity copy, and visual storytelling.',
    tags: ['3D Motion', 'Cinematic Video', 'Visual Storytelling', 'Copywriting'],
    metric: '4K CINEMATIC FIDELITY',
  },
  {
    num: '06',
    title: 'Business Technology Solutions',
    // Exact preserved unfinished text as instructed:
    desc: 'Support your business with tailored CRM, ERP, POS, cloud, email, domain,',
    descEn: 'Integrated enterprise business workflows, cloud infrastructure, domain management, and tailored digital tooling.',
    tags: ['Enterprise CRM', 'Cloud Systems', 'Custom Workflows', 'Integrations'],
    metric: '99.99% ENTERPRISE UPTIME',
  },
];

export default function AlcheServices({ onOpenContact }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;

      if (scrollableHeight > 0) {
        const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 0.999);
        const nextIndex = Math.floor(progress * SERVICES.length);
        if (nextIndex !== activeIndex) {
          setActiveIndex(nextIndex);
          soundManager.playBlip(560 + nextIndex * 90);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const curr = SERVICES[activeIndex];

  return (
    <div
      ref={containerRef}
      id="services"
      style={{ position: 'relative', minHeight: '380vh' }}
    >
      {/* Sticky Fullscreen Pinned Layer */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0 clamp(24px, 7vw, 100px)',
          pointerEvents: 'auto',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '820px', width: '100%' }}>
          {/* Animated TechBox with drawing borders and crosshairs */}
          <TechBox
            key={curr.num}
            tag={`CAPABILITY // 0${activeIndex + 1} OF 0${SERVICES.length}`}
            coordinates={{
              tl: `SVC // 0${activeIndex + 1}`,
              tr: curr.metric,
              br: 'SYS.READY',
              bl: 'LAT.28.61',
            }}
            style={{
              padding: 'clamp(24px, 4vw, 44px)',
              background: 'rgba(5, 5, 5, 0.75)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(38px, 5vw, 64px)',
                fontWeight: 800,
                color: 'rgba(212, 175, 55, 0.25)',
                lineHeight: 1,
                marginBottom: '12px',
              }}
            >
              {curr.num}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3.4vw, 44px)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '16px',
              }}
            >
              {curr.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(14px, 1.3vw, 17px)',
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.6,
                marginBottom: '14px',
              }}
            >
              {curr.desc}
            </p>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.45)',
                lineHeight: 1.5,
                marginBottom: '24px',
              }}
            >
              {curr.descEn}
            </p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '28px' }}>
              {curr.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    color: 'rgba(255, 255, 255, 0.85)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenContact();
              }}
              className="btn-pill btn-pill--gold slot-btn"
              style={{ height: 44, padding: '0 24px' }}
            >
              <span className="slot-btn__wrapper">
                <span className="slot-btn__text">INQUIRE SERVICE →</span>
                <span className="slot-btn__text slot-btn__text--hover">INITIALIZE BRIEF →</span>
              </span>
            </button>
          </TechBox>
        </div>
      </div>
    </div>
  );
}
