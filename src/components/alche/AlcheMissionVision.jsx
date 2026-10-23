import React, { useRef, useEffect, useState } from 'react';
import { soundManager } from '../../utils/audio';

export default function AlcheMissionVision({ onConnect }) {
  const containerRef = useRef(null);
  const [sectionType, setSectionType] = useState('about'); // 'about' or 'vision'

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;

      if (scrollableHeight > 0) {
        const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
        if (progress > 0.45 && sectionType !== 'vision') {
          setSectionType('vision');
          soundManager.playBlip(720);
        } else if (progress <= 0.45 && sectionType !== 'about') {
          setSectionType('about');
          soundManager.playBlip(580);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionType]);

  return (
    <div
      ref={containerRef}
      id="about"
      style={{ position: 'relative', minHeight: '240vh' }}
    >
      {/* Sticky Fullscreen Pinned Layer */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 clamp(24px, 6vw, 80px)',
          pointerEvents: 'auto',
          zIndex: 10,
        }}
      >
        <div className="MissionVision__inner" style={{ position: 'relative', width: '100%', maxWidth: '960px' }}>
          {/* Giant Outline Stroke Title in Background (Exact Alche style) */}
          <div className="MissionVision__ttl" style={{ position: 'absolute', top: '-60px', left: '-20px', zIndex: 0, pointerEvents: 'none' }}>
            <svg width="420" height="110" viewBox="0 0 420 110" fill="none">
              <text x="0" y="90">
                {sectionType === 'about' ? 'ABOUT' : 'VISION'}
              </text>
            </svg>
          </div>

          {/* Section Indicator */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-primary)',
              letterSpacing: '0.18em',
              marginBottom: '28px',
            }}
          >
            <span>[ 03 // {sectionType.toUpperCase()} ]</span>
            <span style={{ width: 40, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            <span style={{ color: 'var(--color-muted)' }}>CORE PHILOSOPHY</span>
          </div>

          {/* Dynamic Content Switching based on scroll progress */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {sectionType === 'about' ? (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div className="MissionVision__text">
                  <span>Your Vision. </span>
                  <span className="MissionVision__marker">Our Strategy.</span>
                  <br />
                  <span>Shared Growth.</span>
                </div>

                <div className="MissionVision__text_en">
                  Every business has a story to tell and goals to achieve. We help bring those goals to life through thoughtful strategy, creative execution and digital solutions built around your business needs.
                </div>

                <div style={{ marginTop: '36px' }}>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onConnect();
                    }}
                    className="btn-pill btn-pill--gold slot-btn"
                    style={{ minWidth: 170, height: 44 }}
                  >
                    <span className="slot-btn__wrapper">
                      <span className="slot-btn__text">Let's Connect →</span>
                      <span className="slot-btn__text slot-btn__text--hover">Start Conversation →</span>
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div className="MissionVision__text" style={{ textAlign: 'right' }}>
                  <span>At Anixel Studio,</span>
                  <br />
                  <span className="MissionVision__marker">marketing, design &amp; code</span>
                  <br />
                  <span>work together.</span>
                </div>

                <div
                  className="MissionVision__text_en"
                  style={{ marginLeft: 'auto', textAlign: 'right' }}
                >
                  Whether you're starting out, expanding your reach or strengthening an established business, we help you identify the right solutions for your next stage of growth.
                </div>

                <div style={{ marginTop: '36px', textAlign: 'right' }}>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onConnect();
                    }}
                    className="btn-pill slot-btn"
                    style={{ minWidth: 170, height: 44 }}
                  >
                    <span className="slot-btn__wrapper">
                      <span className="slot-btn__text">Our Philosophy →</span>
                      <span className="slot-btn__text slot-btn__text--hover">Partner With Us →</span>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
