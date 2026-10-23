import React from 'react';
import { soundManager } from '../../utils/audio';

export default function AlcheKV({ onScrollToWorks, onOpenContact }) {
  return (
    <div className="KV__container" data-kv-container>
      {/* Centered Minimal KV Overlay */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '960px',
          padding: '0 24px',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-primary)',
            letterSpacing: '0.22em',
            marginBottom: '26px',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            padding: '5px 16px',
            borderRadius: 'var(--radius-full)',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#D4AF37', boxShadow: '0 0 10px #D4AF37' }} />
          <span>ANIXEL STUDIO // CREATIVE TECH &amp; DIGITAL</span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(38px, 6.2vw, 82px)',
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: '-0.035em',
            background: 'linear-gradient(180deg, #FFFFFF 25%, rgba(255, 255, 255, 0.75) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '26px',
            textTransform: 'uppercase',
          }}
        >
          We Build Brands To Drive Digital Growth.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.4vw, 19px)',
            color: 'rgba(255, 255, 255, 0.72)',
            lineHeight: 1.65,
            maxWidth: '680px',
            margin: '0 auto 38px',
            letterSpacing: '-0.01em',
          }}
        >
          Anixel Studio helps businesses strengthen their digital presence through strategic marketing, creative solutions and technology.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              soundManager.playClick();
              onScrollToWorks();
            }}
            className="btn-pill btn-pill--gold slot-btn"
            style={{ minWidth: 190, height: 48 }}
          >
            <span className="slot-btn__wrapper">
              <span className="slot-btn__text">EXPLORE WORKS ↓</span>
              <span className="slot-btn__text slot-btn__text--hover">DISCOVER REEL ↓</span>
            </span>
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenContact();
            }}
            className="btn-pill slot-btn"
            style={{ minWidth: 190, height: 48 }}
          >
            <span className="slot-btn__wrapper">
              <span className="slot-btn__text">LET'S CONNECT →</span>
              <span className="slot-btn__text slot-btn__text--hover">INITIALIZE BRIEF →</span>
            </span>
          </button>
        </div>
      </div>

      {/* Floating Scroll to Explore Prompt (Alche-style) */}
      <div
        className="KV__scrollText"
        onClick={onScrollToWorks}
      >
        <span>scroll to explore →</span>
      </div>

      {/* Technical Telemetry Ticker bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          right: 32,
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--color-muted)',
          letterSpacing: '0.14em',
          display: 'none',
          lineHeight: 1.7,
          textAlign: 'right',
        }}
        className="kv-tech-ticker"
      >
        <div>SYS // ANIXEL_SPATIAL_V5</div>
        <div style={{ color: 'var(--color-primary)' }}>● KINETIC HORIZON REALTIME GL</div>
        <div>COORD: 28.6139° N, 77.2090° E</div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .kv-tech-ticker { display: block !important; }
        }
      `}</style>
    </div>
  );
}
