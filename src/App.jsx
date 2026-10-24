import React, { useState } from 'react';
import { NavigateCinematicHeroDemo } from './components/tds/navigate-cinematic-hero/Demo';
import { BrandGrowthHero } from './components/sections/BrandGrowthHero';
import { IntroductionSection } from './components/sections/IntroductionSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { ApproachSection } from './components/sections/ApproachSection';
import { InsightsSection } from './components/sections/InsightsSection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { Footer } from './components/Footer';
import LegalModal from './components/LegalModal';
import ContactModal from './components/ContactModal';
import CustomCursor from './components/CustomCursor';
import './styles/cinema-3d.css';

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: 'privacy' });

  const handleOpenLegal = (type = 'privacy') => {
    setLegalModal({ isOpen: true, type });
  };

  const handleCloseLegal = () => {
    setLegalModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleOpenContact = () => {
    const el = document.getElementById('final-cta') || document.getElementById('contact');
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services') || document.getElementById('introduction') || document.getElementById('contact');
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExplorePortfolio = () => {
    const el = document.getElementById('portfolio') || document.getElementById('contact');
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        fontFamily: "var(--font-subheadings, 'TF Mighu', 'Clash Grotesk', sans-serif)",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Interactive 3D Gold Custom Cursor */}
      <CustomCursor />

      {/* Cinematic 3D Lighting & Texture Overlays */}
      <div className="cinema-grain" aria-hidden="true" />
      <div className="cinema-vignette" aria-hidden="true" />
      <div className="ambient-glow-bg" aria-hidden="true" />

      {/* =========================================================================
          PAGE 1: NAVIGATE CINEMATIC HERO (ANIXEL STUDIO)
          - Full-screen preloader with 00 to 100 serif counter
          - Curtain lifts away (1.1s power4.inOut)
          - Letters of "ANIXEL STUDIO" rise from center outwards (1.4s power4.out)
          - Fixed navigation, logo, work links fade up
          - Scroll-pinned hero with individual letter drift speeds & outro handle
          - Real-time 3D Three.js gold core scene with orbiting rings & floating geometries
          ========================================================================= */}
      <NavigateCinematicHeroDemo onOpenContact={handleOpenContact} />

      {/* Global 3D Kinetic Ticker */}
      <div className="global-ticker" aria-hidden="true">
        <div className="global-ticker-track">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="global-ticker-item">
              ANIXEL STUDIO <span className="global-ticker-dot">◆</span> DIGITAL AGENCY{' '}
              <span className="global-ticker-dot">◆</span> BRAND STRATEGY{' '}
              <span className="global-ticker-dot">◆</span> CREATIVE SOLUTIONS{' '}
              <span className="global-ticker-dot">◆</span> 3D &amp; MOTION{' '}
              <span className="global-ticker-dot">◆</span> NEXT-GEN EXPERIENCES{' '}
              <span className="global-ticker-dot">◆</span>{' '}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content following the Cinematic Outro Handle */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* =========================================================================
            PAGE 2: BRAND & SERVICES HERO SECTION
            - Heading: "We Build Brands To Drive Digital Growth." (Megante font)
            - Copy: "Anixel Studio helps businesses strengthen their digital presence..." (TF Mighu font)
            - CTA: "Explore Our Services" (React Bits Magnet)
            - GSAP ScrollTrigger text reveal, Lenis smooth scroll, React Bits SpotlightCards & ShinyText
            ========================================================================= */}
        <BrandGrowthHero
          onExploreServices={handleExploreServices}
          onOpenContact={handleOpenContact}
        />

        {/* =========================================================================
            PAGE 3: INTRODUCTION SECTION
            - Heading: "Your Vision. Our Strategy. Shared Growth." (Megante font)
            - 3 Story SpotlightCards with user's exact paragraphs (TF Mighu font)
            - CTA: "Let's Connect" (React Bits Magnet)
            - GSAP ScrollTrigger stagger entry & Lenis smooth scroll
            ========================================================================= */}
        <IntroductionSection
          onConnect={handleOpenContact}
          onOpenContact={handleOpenContact}
        />

        {/* =========================================================================
            PAGE 4: SERVICES SECTION
            - Heading: "Everything You Need to Grow in the Digital World" (Megante font)
            - 6 SpotlightCards for the 6 Core Services (TF Mighu font)
            - CTA: "Know More" (React Bits Magnet)
            - Reversible bidirectional GSAP ScrollTrigger text & card animations
            ========================================================================= */}
        <ServicesSection
          onKnowMore={handleExplorePortfolio}
          onOpenContact={handleOpenContact}
        />

        {/* =========================================================================
            PAGE 5: PORTFOLIO SECTION
            - Heading: "Work That Brings Ideas to Life" (Megante font)
            - Lead copy: "Every project begins with an objective..." (TF Mighu font)
            - (Projects Animation): 3D TiltedCards with specular glare, category filters,
              and reversible bidirectional GSAP ScrollTrigger text & parallax animations
            - CTA: "Explore Our Portfolio" (React Bits Magnet)
            ========================================================================= */}
        <PortfolioSection
          onExplorePortfolio={handleOpenContact}
          onOpenContact={handleOpenContact}
        />

        {/* =========================================================================
            PAGE 6: OUR APPROACH
            - Heading: "From Ideas to Action" (Megante font)
            - 4 Process Steps: Understand, Strategize, Execute, Improve (TF Mighu font)
            - Reversible bidirectional GSAP ScrollTrigger timeline & SpotlightCards
            ========================================================================= */}
        <ApproachSection
          onOpenContact={handleOpenContact}
        />

        {/* =========================================================================
            PAGE 7: INSIGHTS SECTION
            - Heading: "Strategic Insights & Perspectives" (Megante font)
            - Lead copy: "Discover practical guidance to help you understand digital..." (TF Mighu font)
            - 3 Article SpotlightCards with takeaways (TF Mighu font)
            - CTA: "Learn More" (React Bits Magnet)
            - Reversible bidirectional GSAP ScrollTrigger text & card animations
            ========================================================================= */}
        <InsightsSection
          onLearnMore={handleOpenContact}
          onOpenContact={handleOpenContact}
        />
        {/* =========================================================================
            PAGE 8: FINAL CALL TO ACTION
            - Heading: "Let's Build What's Next for Your Business." (Megante font)
            - Copy: "Whether you want to strengthen your brand, improve digital visibility,
              reach new audiences or develop a new digital solution, Anixel Studio is ready to
              discuss your goals." (TF Mighu font)
            - CTA Button 1: "Let's Connect" (React Bits Magnet)
            - CTA Button 2: "Explore Our Portfolio" (React Bits Magnet)
            - Bidirectional GSAP ScrollTrigger animations & Lenis integration
            ========================================================================= */}
        <FinalCTASection
          onConnect={handleOpenContact}
          onExplorePortfolio={handleExplorePortfolio}
        />
      </main>

      {/* =========================================================================
          FOOTER SECTION
          - Modern Agency Design matching reference style
          - Central ambient emerald/cyan/gold glow
          - CTA: "Have a Project in Mind? Let's Talk."
          - 4 columns: Brand info, Explore, Company, Get In Touch
          - Divider, Copyright, Privacy Policy | Terms & Conditions, Social Icons
          - Monumental watermark typography "Anixel" bleeding off bottom
          ========================================================================= */}
      <Footer
        onOpenContact={() => setContactOpen(true)}
        onOpenLegal={handleOpenLegal}
      />

      {/* Legal Modal (Privacy Policy & Terms) */}
      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={handleCloseLegal}
      />

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
