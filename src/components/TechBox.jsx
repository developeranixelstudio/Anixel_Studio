import React, { useEffect, useRef, useState } from 'react';
import { soundManager } from '../utils/audio';

/**
 * TechBox - Inspired by Alche.studio's signature .Stellla__frame
 * Dynamically draws 4 perimeter lines on scroll entry, snaps corner crosshairs (+),
 * displays corner technical coordinates, and smoothly reveals internal children.
 */
export default function TechBox({
  children,
  className = '',
  style = {},
  tag = 'ANIXEL // SYS.BOX',
  coordinates = { tl: 'TL // 01', tr: 'TR // LAT.40', br: 'BR // 2026', bl: 'BL // GRID.SYS' },
  delay = 0,
  hoverable = true,
  onClick,
}) {
  const boxRef = useRef(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsDrawn(true);
            soundManager.playBlip(780);
          }, delay);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -10px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={boxRef}
      className={`animated-box-frame ${isDrawn ? 'is-drawn' : ''} ${className}`}
      style={{
        ...style,
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      {/* 4 Animated Drawing Lines */}
      <span className="box-draw-line box-draw-line--top" aria-hidden="true" />
      <span className="box-draw-line box-draw-line--right" aria-hidden="true" />
      <span className="box-draw-line box-draw-line--bottom" aria-hidden="true" />
      <span className="box-draw-line box-draw-line--left" aria-hidden="true" />

      {/* 4 Corner Crosshairs */}
      <div className="box-crosshair box-crosshair--tl" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none">
          <line x1="10" y1="2" x2="10" y2="18" strokeWidth="1.5" />
          <line x1="2" y1="10" x2="18" y2="10" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2" fill="var(--color-primary)" />
        </svg>
      </div>
      <div className="box-crosshair box-crosshair--tr" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none">
          <line x1="10" y1="2" x2="10" y2="18" strokeWidth="1.5" />
          <line x1="2" y1="10" x2="18" y2="10" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2" fill="var(--color-primary)" />
        </svg>
      </div>
      <div className="box-crosshair box-crosshair--br" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none">
          <line x1="10" y1="2" x2="10" y2="18" strokeWidth="1.5" />
          <line x1="2" y1="10" x2="18" y2="10" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2" fill="var(--color-primary)" />
        </svg>
      </div>
      <div className="box-crosshair box-crosshair--bl" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none">
          <line x1="10" y1="2" x2="10" y2="18" strokeWidth="1.5" />
          <line x1="2" y1="10" x2="18" y2="10" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2" fill="var(--color-primary)" />
        </svg>
      </div>

      {/* Corner Technical Labels */}
      {coordinates && (
        <>
          <span className="box-corner-label box-corner-label--tl">{coordinates.tl}</span>
          <span className="box-corner-label box-corner-label--tr">{coordinates.tr}</span>
          <span className="box-corner-label box-corner-label--bl">{coordinates.bl}</span>
          <span className="box-corner-label box-corner-label--br">{coordinates.br}</span>
        </>
      )}

      {/* Top Status Header Bar inside the frame */}
      {tag && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-muted)',
            letterSpacing: '0.14em',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: isDrawn ? 'var(--color-primary)' : '#444',
                boxShadow: isDrawn ? '0 0 8px var(--color-primary)' : 'none',
                transition: 'all 0.4s ease',
              }}
            />
            <span style={{ color: isDrawn ? 'var(--color-primary)' : 'inherit' }}>{tag}</span>
          </div>
          <div style={{ opacity: 0.6 }}>[ ACTIVE // BUFFER: 100% ]</div>
        </div>
      )}

      {/* Internal Staggered Content */}
      <div className="box-inner-reveal">{children}</div>
    </div>
  );
}
