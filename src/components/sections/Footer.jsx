import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrambleText } from '../../utils/scramble';
import { soundManager } from '../../utils/audio';

export default function Footer({ onOpenContact, onOpenPolicy, onOpenTerms }) {
  const footerRef = useRef(null);
  const ctaRowRef = useRef(null);
  const colsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (ctaRowRef.current) {
        gsap.fromTo(
          ctaRowRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRowRef.current,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (colsRef.current) {
        const cols = colsRef.current.children;
        gsap.fromTo(
          cols,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: colsRef.current,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHover = (e, text) => {
    soundManager.playHover();
    scrambleText(e.currentTarget, text, 0.35);
  };

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#000000',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '64px',
        paddingBottom: '32px',
        paddingLeft: 'clamp(20px, 6vw, 80px)',
        paddingRight: 'clamp(20px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top Call to Action Row */}
        <div
          ref={ctaRowRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            gap: 24,
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#D4AF37',
                letterSpacing: '0.12em',
                marginBottom: '8px',
                textAlign: 'center',
              }}
            >
              // READY FOR ACCELERATION
            </div>
            {/* CTA (Exact supplied text) */}
            <h3
              className="text-gold-gradient"
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(24px, 3.5vw, 42px)',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.03em',
                textAlign: 'center',
                margin: '0 auto',
              }}
            >
              Have a Project in Mind? Let's Talk.
            </h3>
          </div>

          <button
            type="button"
            onClick={onOpenContact}
            className="btn-pill btn-pill--gold slot-btn"
            style={{ minWidth: 170, height: 44 }}
          >
            <span className="slot-btn__wrapper">
              <span className="slot-btn__text">Contact Us</span>
              <span className="slot-btn__text slot-btn__text--hover">Send Inquiry →</span>
            </span>
          </button>
        </div>

        {/* Middle Navigation & Information Columns */}
        <div
          ref={colsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            paddingTop: '48px',
            paddingBottom: '56px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Col 1: Identity */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-alcazar)',
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              ANIXEL STUDIO
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
                maxWidth: '260px',
              }}
            >
              Strategic marketing, creative design, and technical engineering for digital growth.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#D4AF37',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              NAVIGATION
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { name: 'Home', target: 'hero' },
                { name: 'Services', target: 'services' },
                { name: 'Our Portfolio', target: 'portfolio' },
                { name: 'Our Approach', target: 'approach' },
                { name: 'Insights', target: 'insights' },
              ].map((link) => (
                <a
                  key={link.target}
                  href={`#${link.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    soundManager.playClick();
                    document.getElementById(link.target)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onMouseEnter={(e) => handleHover(e, link.name)}
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Inquiries */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#D4AF37',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              INQUIRIES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                inquiries@anixelstudio.com
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-muted)',
                }}
              >
                OPERATING // MON — FRI
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-muted)',
                }}
              >
                DELHI // GLOBAL REMOTE
              </div>
            </div>
          </div>

          {/* Col 4: Back To Top */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#D4AF37',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              SPATIAL MATRIX
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="btn-pill slot-btn"
              style={{ minWidth: 154, height: 40 }}
            >
              <span className="slot-btn__wrapper">
                <span className="slot-btn__text">Return to Top ↑</span>
                <span className="slot-btn__text slot-btn__text--hover">Scroll Up ↑</span>
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div
          style={{
            paddingTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-muted)',
          }}
        >
          {/* Copyright (Exact supplied text) */}
          <div>© Anixel Studio. All rights reserved.</div>

          {/* Links (Exact supplied text: Privacy Policy | Terms & Conditions) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button
              type="button"
              onClick={onOpenPolicy}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-muted)';
              }}
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              type="button"
              onClick={onOpenTerms}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-muted)';
              }}
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
