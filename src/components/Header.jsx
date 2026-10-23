import React, { useState } from 'react';
import { scrambleText } from '../utils/scramble';

export default function Header({ onOpenContact, activeSection }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', target: 'hero' },
    { label: 'SERVICES', target: 'services' },
    { label: 'OUR PORTFOLIO', target: 'portfolio' },
    { label: 'INSIGHTS', target: 'insights' },
    { label: "LET'S CONNECT", target: 'contact' },
  ];

  const handleNavClick = (target) => {
    setIsMobileMenuOpen(false);
    const elem = document.getElementById(target);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavHover = (e, label) => {
    scrambleText(e.currentTarget, label, 0.35);
  };

  return (
    <>
      <header
        className="liquid-glass-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 990,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px clamp(20px, 4vw, 56px)',
          background: 'rgba(8, 8, 12, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Left: Brand Logo */}
        <div
          onClick={() => handleNavClick('hero')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            userSelect: 'none',
          }}
        >
          {/* Geometric Emblem with Gold Inlay */}
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="#0A0A0A" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" />
            <path d="M20 7L32 31H26L20 18L14 31H8L20 7Z" fill="#FFFFFF" />
            <polygon points="20,18 24,26 16,26" fill="#D4AF37" />
          </svg>

          <span
            style={{
              fontFamily: 'var(--font-alcazar)',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
            }}
          >
            ANIXEL STUDIO
          </span>
        </div>

        {/* Center / Right: Desktop Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 28,
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <button
                key={item.target}
                type="button"
                onClick={() => handleNavClick(item.target)}
                onMouseEnter={(e) => handleNavHover(e, item.label)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#D4AF37' : 'rgba(255, 255, 255, 0.85)',
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '12px',
                  letterSpacing: '0.14em',
                  cursor: 'pointer',
                  padding: '6px 8px',
                  position: 'relative',
                  transition: 'color 0.25s ease',
                  fontWeight: 600,
                }}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 14,
                      height: 2,
                      borderRadius: '2px',
                      backgroundColor: '#D4AF37',
                      boxShadow: '0 0 10px #D4AF37',
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* SlotButton Contact CTA */}
          <button
            type="button"
            onClick={onOpenContact}
            className="btn-pill btn-pill--gold slot-btn desktop-contact-btn"
            style={{ minWidth: 150, height: 40, borderRadius: 'var(--radius-full)' }}
          >
            <span className="slot-btn__wrapper">
              <span className="slot-btn__text">LET'S CONNECT →</span>
              <span className="slot-btn__text slot-btn__text--hover">START PROJECT →</span>
            </span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              width: 32,
              height: 32,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span
              style={{
                width: 22,
                height: 1.5,
                backgroundColor: '#FFFFFF',
                transition: 'transform 0.3s ease',
                transform: isMobileMenuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                width: 22,
                height: 1.5,
                backgroundColor: '#FFFFFF',
                transition: 'opacity 0.2s ease',
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: 22,
                height: 1.5,
                backgroundColor: '#FFFFFF',
                transition: 'transform 0.3s ease',
                transform: isMobileMenuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 980,
            backgroundColor: 'rgba(5, 5, 8, 0.96)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px 30px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
            {navItems.map((item, idx) => (
              <div
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '20px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  color: activeSection === item.target ? '#D4AF37' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>
                  0{idx + 1}
                </span>
                {item.label}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenContact();
            }}
            className="btn-pill btn-pill--gold"
            style={{ width: '100%', height: 46 }}
          >
            <span>START A PROJECT →</span>
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 899px) {
          .mobile-hamburger {
            display: flex !important;
          }
          .desktop-contact-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
