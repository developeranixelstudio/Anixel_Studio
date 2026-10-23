import React, { useRef, useEffect, useState } from 'react';
import { soundManager } from '../../utils/audio';

export default function AlcheStelllaFrame({ onOpenContact }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;

      if (scrollableHeight > 0) {
        const p = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
        setProgress(p);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute animated box properties
  const lineWidthPercent = Math.min(progress * 1.5, 1) * 100;
  const crosshairScale = Math.min(Math.max((progress - 0.08) * 2.5, 0), 1);
  const framePadding = Math.max(90 - progress * 50, 36);

  return (
    <div
      ref={containerRef}
      id="stellla"
      style={{ position: 'relative', minHeight: '220vh' }}
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
          pointerEvents: 'auto',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <div className="Stellla__inner" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* THE SIGNATURE ALCHE DRAWING RECTANGLE & CROSSHAIRS */}
          <div className="Stellla__frame_container" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div
              className="Stellla__frame"
              style={{
                position: 'relative',
                width: `calc(100% - ${framePadding * 2}px)`,
                height: `calc(100% - ${framePadding * 2}px)`,
                transition: 'width 0.15s ease-out, height 0.15s ease-out',
              }}
            >
              {/* 4 Corner Crosshairs */}
              <div className="Stellla__cross" style={{ position: 'absolute', inset: -10, pointerEvents: 'none' }}>
                <div
                  className="Stellla__cross_item"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: `scale(${crosshairScale})`,
                    transition: 'transform 0.2s ease',
                  }}
                />
                <div
                  className="Stellla__cross_item"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    transform: `scale(${crosshairScale})`,
                    transition: 'transform 0.2s ease',
                  }}
                />
                <div
                  className="Stellla__cross_item"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    transform: `scale(${crosshairScale})`,
                    transition: 'transform 0.2s ease',
                  }}
                />
                <div
                  className="Stellla__cross_item"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    transform: `scale(${crosshairScale})`,
                    transition: 'transform 0.2s ease',
                  }}
                />
              </div>

              {/* 4 Border Lines Dynamically Drawing based on Scroll Progress */}
              <div className="Stellla__rect" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <div className="Stellla__rect_inner" style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {/* Top Line */}
                  <div
                    className="Stellla__rect_line"
                    data-line="top"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: 1,
                      width: '100%',
                      background: 'rgba(212, 175, 55, 0.75)',
                      transformOrigin: 'left',
                      transform: `scaleX(${lineWidthPercent / 100})`,
                      boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                    }}
                  />
                  {/* Right Line */}
                  <div
                    className="Stellla__rect_line"
                    data-line="right"
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 1,
                      height: '100%',
                      background: 'rgba(212, 175, 55, 0.75)',
                      transformOrigin: 'top',
                      transform: `scaleY(${lineWidthPercent / 100})`,
                      boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                    }}
                  />
                  {/* Bottom Line */}
                  <div
                    className="Stellla__rect_line"
                    data-line="bottom"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      height: 1,
                      width: '100%',
                      background: 'rgba(212, 175, 55, 0.75)',
                      transformOrigin: 'right',
                      transform: `scaleX(${lineWidthPercent / 100})`,
                      boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                    }}
                  />
                  {/* Left Line */}
                  <div
                    className="Stellla__rect_line"
                    data-line="left"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: 1,
                      height: '100%',
                      background: 'rgba(212, 175, 55, 0.75)',
                      transformOrigin: 'bottom',
                      transform: `scaleY(${lineWidthPercent / 100})`,
                      boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Internal Content Inside the Drawn Box */}
          <div
            className="Stellla__contentWrap"
            style={{
              position: 'relative',
              zIndex: 5,
              maxWidth: '860px',
              padding: '0 clamp(24px, 5vw, 60px)',
              pointerEvents: 'auto',
            }}
          >
            <div
              className="Stellla__content"
              style={{
                opacity: Math.min(Math.max((progress - 0.2) * 2.2, 0), 1),
                transform: `translateY(${Math.max((1 - progress) * 25, 0)}px)`,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              <div className="Stellla__main">
                {/* Header Tag */}
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
                  <span>[ 05 // PROPRIETARY ENGINE ]</span>
                  <span style={{ width: 40, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                  <span style={{ color: 'var(--color-muted)' }}>ANIXEL_CORE // SPATIAL PLATFORM</span>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(32px, 4.6vw, 62px)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    marginBottom: '20px',
                  }}
                >
                  Next-Generation Spatial Architecture.
                </h2>

                <p
                  className="Stellla__main_text"
                  style={{
                    fontSize: 'clamp(14px, 1.3vw, 17px)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    maxWidth: '680px',
                    marginBottom: '16px',
                    lineHeight: 1.7,
                  }}
                >
                  As an immersive web &amp; branding foundation, we engineer tailored spatial environments for live events, digital product debuts, interactive commerce, and brand ecosystems.
                </p>

                <p
                  className="Stellla__en"
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-muted)',
                    lineHeight: 1.5,
                    marginBottom: '32px',
                  }}
                >
                  Multi-platform WebGL/WebXR delivery with real-time audio synthesis, dynamic 3D asset streaming, and sub-100ms conversion latency.
                </p>

                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onOpenContact();
                    }}
                    className="btn-pill btn-pill--gold slot-btn"
                    style={{ height: 46, padding: '0 28px' }}
                  >
                    <span className="slot-btn__wrapper">
                      <span className="slot-btn__text">COMMISSION ENGINE →</span>
                      <span className="slot-btn__text slot-btn__text--hover">INITIALIZE ACCESS →</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
