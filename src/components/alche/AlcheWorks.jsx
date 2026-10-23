import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from '../../utils/audio';

const PROJECTS = [
  {
    id: 'aura-metaverse',
    num: '01',
    date: '2026 01.17',
    impression: 'Over 2.4M Active Explorations',
    title: 'Aura Spatial Metaverse Experience',
    titleJa: 'オーラ・空間メタバース体験',
    categories: ['In-Game-Concert', 'metaverse', 'interactive 3d'],
    desc: 'An interactive 3D digital brand universe developed with custom WebGL shaders, responsive spatial soundscapes, and synchronized multi-user interactions.',
  },
  {
    id: 'kinetix-commerce',
    num: '02',
    date: '2025 05.16',
    impression: '142% Increase in Digital Conversion',
    title: 'Kinetix Global Commerce Platform',
    titleJa: 'キネティクス・次世代コマース',
    categories: ['stellla', 'e-commerce', 'brand system'],
    desc: 'Complete digital transformation for a luxury technical apparel brand, featuring lightning-fast catalog navigation, headless Shopify architecture, and fluid transitions.',
  },
  {
    id: 'aether-identity',
    num: '03',
    date: '2025 02.20',
    impression: 'Award-Winning Technical Visuals',
    title: 'Aether Autonomous Brand Identity',
    titleJa: 'エーテル・ブランドアイデンティティ',
    categories: ['brand strategy', 'ui/ux design', '3d motion'],
    desc: 'A comprehensive brand identity including parametric generative typography, unified design tokens, dark-mode design system, and cinematic video campaign.',
  },
  {
    id: 'nexus-engine',
    num: '04',
    date: '2024 10.18',
    impression: 'Top 3 Industry ROI Growth',
    title: 'Nexus Enterprise Lead Engine',
    titleJa: 'ネクサス・リードジェネレーション',
    categories: ['digital marketing', 'seo / aeo', 'growth engine'],
    desc: 'Full-funnel digital marketing campaign utilizing algorithmic answer engine optimization (AEO), targeted paid media, and behavioral lead nurturing.',
  },
];

export default function AlcheWorks({ onOpenContact, onSelectProject }) {
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
        const nextIndex = Math.floor(progress * PROJECTS.length);
        if (nextIndex !== activeIndex) {
          setActiveIndex(nextIndex);
          soundManager.playBlip(620 + nextIndex * 110);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const curr = PROJECTS[activeIndex];

  return (
    <div
      ref={containerRef}
      id="works"
      style={{ position: 'relative', minHeight: '320vh' }}
    >
      {/* Sticky Fullscreen Pinned Layer */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 clamp(24px, 7vw, 100px)',
          pointerEvents: 'auto',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '850px', width: '100%' }}>
          {/* Section Indicator Label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-primary)',
              letterSpacing: '0.18em',
              marginBottom: '20px',
            }}
          >
            <span>[ 02 // SELECTED WORKS ]</span>
            <span style={{ width: 40, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            <span>0{activeIndex + 1} / 0{PROJECTS.length}</span>
          </div>

          <div key={curr.id} className="Works__item" style={{ animation: 'fadeIn 0.35s ease' }}>
            <div className="Works__item_info">
              <time className="Works__item_date">{curr.date}</time>
              <div className="Works__item_impression">
                <div className="Works__item_impression_title">{curr.impression}</div>
              </div>
            </div>

            <h3 className="Works__item_title">
              <a
                href="#works"
                onClick={(e) => {
                  e.preventDefault();
                  soundManager.playClick();
                  if (onSelectProject) onSelectProject(curr);
                }}
                className="Works__item_title_link"
              >
                {curr.title}
              </a>
            </h3>

            <p className="Works__item_title_ja">{curr.titleJa}</p>

            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.6,
                maxWidth: '600px',
                marginBottom: '20px',
              }}
            >
              {curr.desc}
            </p>

            <ul className="Works__item_categoryList">
              {curr.categories.map((cat) => (
                <li key={cat} className="Works__item_categoryList_item">
                  #{cat}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  soundManager.playClick();
                  if (onSelectProject) onSelectProject(curr);
                }}
                className="btn-pill btn-pill--gold slot-btn"
                style={{ height: 44, padding: '0 24px' }}
              >
                <span className="slot-btn__wrapper">
                  <span className="slot-btn__text">VIEW CASE STUDY →</span>
                  <span className="slot-btn__text slot-btn__text--hover">EXPLORE WORK →</span>
                </span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenContact();
                }}
                className="btn-pill slot-btn"
                style={{ height: 44, padding: '0 24px' }}
              >
                <span className="slot-btn__wrapper">
                  <span className="slot-btn__text">INQUIRE SIMILAR →</span>
                  <span className="slot-btn__text slot-btn__text--hover">START BRIEF →</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating More Works link (Alche-style) */}
        <div
          className="Works__more"
          style={{
            position: 'absolute',
            bottom: 32,
            right: clampRight(32),
            zIndex: 15,
          }}
        >
          <a
            href="#works"
            onClick={(e) => {
              e.preventDefault();
              soundManager.playClick();
              onOpenContact();
            }}
            className="Works__more_link"
            style={{ color: '#FFFFFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span>All Case Studies ({PROJECTS.length})</span>
            <span style={{ color: 'var(--color-primary)' }}>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function clampRight(val) {
  return typeof window !== 'undefined' && window.innerWidth < 768 ? '20px' : `${val}px`;
}
