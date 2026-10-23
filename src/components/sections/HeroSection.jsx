import React from 'react';
import { soundManager } from '../../utils/audio';

export default function HeroSection({ onExploreServices }) {
  const handleScrollExplore = () => {
    soundManager.playClick();
    const el = document.getElementById('intro');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="site-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '16vh',
        paddingBottom: '12vh',
        textAlign: 'center',
      }}
    >
      {/* Technical Header Metadata Coordinates */}
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 'clamp(24px, 5vh, 48px)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-muted)',
          letterSpacing: '0.1em',
          borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
          paddingBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              display: 'inline-block',
              boxShadow: '0 0 10px #D4AF37',
            }}
          />
          <span>LOC: GLOBAL // HYBRID</span>
        </div>
        <div>SYS // ANIXEL_ENGINE_V3</div>
        <div>COORD: 28.6139° N, 77.2090° E</div>
      </div>

      {/* Main Hero Content Frame (Centered) */}
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Subtle Category Tag */}
        <div
          className="tech-chip"
          style={{ marginBottom: '24px', margin: '0 auto 24px auto' }}
        >
          <span style={{ color: 'var(--color-primary)' }}>●</span>
          <span>STRATEGIC CREATIVE TECHNOLOGY</span>
        </div>

        {/* Hero Heading (Exact supplied text, Centered) */}
        <h1
          className="text-headline-display font-alcazar"
          style={{
            marginBottom: '28px',
            fontSize: 'clamp(36px, 5.5vw, 68px)',
            lineHeight: 1.15,
            letterSpacing: '0.04em',
            maxWidth: '920px',
            textTransform: 'none',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          We Build Brands To Drive Digital Growth.
        </h1>

        {/* Hero Description (Exact supplied text, Centered) */}
        <p
          className="text-body-lg"
          style={{
            color: 'var(--color-muted)',
            maxWidth: '720px',
            marginBottom: '40px',
            fontSize: 'clamp(15px, 1.3vw, 18px)',
            lineHeight: 1.7,
            letterSpacing: '0.03em',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Anixel Studio helps businesses strengthen their digital presence through strategic marketing, creative solutions and technology. From increasing online visibility to building meaningful brand experiences, we bring the right capabilities together to help your business move forward.
        </p>

        {/* CTA Buttons (Centered) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap', margin: '0 auto' }}>
          <button
            type="button"
            onClick={onExploreServices}
            className="btn-pill btn-pill--gold slot-btn"
            style={{ minWidth: 200, height: 48 }}
          >
            <span className="slot-btn__wrapper">
              <span className="slot-btn__text">Explore Our Services</span>
              <span className="slot-btn__text slot-btn__text--hover">Discover Capabilities ↓</span>
            </span>
          </button>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ color: 'var(--color-primary)' }}>/</span>
            <span>END-TO-END DIGITAL INTEGRATION</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll to Explore Indicator */}
      <div
        onClick={handleScrollExplore}
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: 'rgba(255, 255, 255, 0.6)',
          transition: 'color 0.3s ease',
          userSelect: 'none',
        }}
        onMouseEnter={(e) => {
          soundManager.playHover();
          e.currentTarget.style.color = '#D4AF37';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
        }}
      >
        <span>scroll to explore</span>
        <span style={{ color: 'var(--color-primary)' }}>→</span>
      </div>
    </section>
  );
}
