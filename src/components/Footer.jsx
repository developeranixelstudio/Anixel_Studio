'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Magnet } from './ui/react-bits/Magnet';
import './footer.css';

export function Footer({ onOpenContact, onOpenLegal }) {
  const footerRef = useRef(null);
  const auraRef = useRef(null);
  const monumentalRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Subtle parallax scale on the central emerald/cyan ambient aura
      if (auraRef.current) {
        gsap.fromTo(
          auraRef.current,
          { scale: 0.85, opacity: 0.4 },
          {
            scale: 1.2,
            opacity: 0.85,
            ease: 'none',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1.5,
            },
          }
        );
      }

      // 2. Grid & CTA fade up when reaching footer
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 3. Giant Monumental Typography subtle reveal
      if (monumentalRef.current) {
        gsap.fromTo(
          monumentalRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 0.96,
            y: 0,
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 75%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'hero') {
      if (window.__lenis) window.__lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (onOpenContact) {
      onOpenContact();
      return;
    }
    const el = document.getElementById('final-cta') || document.getElementById('contact');
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0 });
    } else {
      window.location.href = 'mailto:contact@anixelstudio.com?subject=Project%20Inquiry%20-%20Anixel%20Studio';
    }
  };

  const handleLegalClick = (e, type) => {
    e.preventDefault();
    if (onOpenLegal) {
      onOpenLegal(type);
    }
  };

  return (
    <footer className="anixel-footer" id="footer" ref={footerRef}>
      {/* Central Ethereal Emerald/Cyan Aura matching the reference image */}
      <div className="footer-ambient-aura" ref={auraRef} aria-hidden="true" />

      <div className="footer-container" ref={gridRef}>
        {/* =========================================================================
            TOP CTA BANNER: Have a Project in Mind? Let's Talk.
            ========================================================================= */}
        <div className="footer-top-cta">
          <div className="footer-top-cta-text-wrap">
            <span className="footer-top-cta-label">[ INITIATE COLLABORATION ]</span>
            <h3 className="footer-top-cta-heading">
              Have a Project in Mind? Let's Talk.
            </h3>
          </div>

          <Magnet padding={35} magnetStrength={0.3}>
            <button
              type="button"
              className="footer-top-cta-btn"
              onClick={handleContactClick}
            >
              <span>Let's Talk</span>
              <span className="footer-top-cta-btn-arrow" aria-hidden="true">→</span>
            </button>
          </Magnet>
        </div>

        {/* =========================================================================
            FOUR-COLUMN GRID (Matching the reference design exactly)
            ========================================================================= */}
        <div className="footer-grid">
          {/* Column 1: Brand Info */}
          <div className="footer-col-brand">
            <div className="footer-brand-header">
              <div className="footer-brand-logo-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </div>
              <span className="footer-brand-title">Anixel Studio</span>
            </div>

            <div className="footer-brand-desc-wrapper">
              <p className="footer-brand-desc">
                Building premium digital identities that convert. We take your business online to
                maximize your growth and revenue.
              </p>
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">EXPLORE</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>Home</a>
              </li>
              <li className="footer-nav-item">
                <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')}>Projects</a>
              </li>
              <li className="footer-nav-item">
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
              </li>
              <li className="footer-nav-item">
                <a href="#approach" onClick={(e) => handleNavClick(e, 'approach')}>Approach</a>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">COMPANY</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <a href="#insights" onClick={(e) => handleNavClick(e, 'insights')}>Blog</a>
              </li>
              <li className="footer-nav-item">
                <a href="#introduction" onClick={(e) => handleNavClick(e, 'introduction')}>About</a>
              </li>
              <li className="footer-nav-item">
                <a href="mailto:careers@anixelstudio.com" onClick={handleContactClick}>Careers</a>
              </li>
            </ul>
          </div>

          {/* Column 4: GET IN TOUCH */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">GET IN TOUCH</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item highlight">
                <a href="mailto:contact@anixelstudio.com">contact@anixelstudio.com</a>
              </li>
              <li className="footer-nav-item">
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </li>
              <li className="footer-nav-item">
                <span className="footer-location-text">Mumbai, India • Global Remote</span>
              </li>
            </ul>
          </div>
        </div>

        {/* =========================================================================
            DIVIDER LINE & BOTTOM ROW
            ========================================================================= */}
        <div className="footer-divider" />

        <div className="footer-bottom-row">
          {/* Left: Copyright */}
          <div className="footer-copyright">
            © {new Date().getFullYear()} Anixel Studio. All rights reserved.
          </div>

          {/* Center: Privacy Policy | Terms & Conditions */}
          <div className="footer-legal-links">
            <button
              type="button"
              className="footer-legal-btn"
              onClick={(e) => handleLegalClick(e, 'privacy')}
            >
              Privacy Policy
            </button>
            <span className="footer-legal-separator">|</span>
            <button
              type="button"
              className="footer-legal-btn"
              onClick={(e) => handleLegalClick(e, 'terms')}
            >
              Terms & Conditions
            </button>
          </div>

          {/* Right: Social Media Icons matching the reference image */}
          <div className="footer-social-icons">
            {/* Layers / Figma / ProductHunt Icon */}
            <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Figma">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Custom Network / Code Icon */}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.761-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Globe / Web */}
            <a href="https://anixelstudio.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Website">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          GIANT MONUMENTAL WATERMARK TYPOGRAPHY (Matching "Ascenth" in reference)
          ========================================================================= */}
      <div className="footer-monumental-wrap" ref={monumentalRef} aria-hidden="true">
        <h2 className="footer-monumental-text">Anixel</h2>
      </div>
    </footer>
  );
}

export default Footer;
