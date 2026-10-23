import React from 'react';

export default function LegalModal({ type, isOpen, onClose }) {
  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1400,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        className="tech-frame liquid-glass-panel"
        style={{
          width: '100%',
          maxWidth: 680,
          maxHeight: '85vh',
          backgroundColor: 'rgba(10, 10, 14, 0.92)',
          padding: 'clamp(24px, 5vw, 40px)',
          position: 'relative',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tech-frame__cross tech-frame__cross--tl" />
        <div className="tech-frame__cross tech-frame__cross--tr" />
        <div className="tech-frame__cross tech-frame__cross--bl" />
        <div className="tech-frame__cross tech-frame__cross--br" />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-primary)',
              letterSpacing: '0.12em',
            }}
          >
            ANIXEL STUDIO // LEGAL COMPLIANCE
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'var(--font-mono)',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: 20,
            letterSpacing: '0.03em',
          }}
        >
          {title}
        </h2>

        <div
          style={{
            color: 'var(--color-muted)',
            fontSize: '13px',
            lineHeight: 1.7,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            fontFamily: 'var(--font-display)',
          }}
        >
          {isPrivacy ? (
            <>
              <p>
                At Anixel Studio, we respect and safeguard the intellectual property and personal data of our prospective clients and partners.
              </p>
              <h4 style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
                1. Information Collection
              </h4>
              <p>
                We only collect information voluntarily submitted via our contact and inquiry protocols, such as your name, corporate email address, and project brief parameters.
              </p>
              <h4 style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
                2. Use of Information
              </h4>
              <p>
                All data submitted is used exclusively for strategic project evaluations, consultations, and professional communication. We never sell, lease, or monetize client data.
              </p>
              <h4 style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
                3. Data Security &amp; Retention
              </h4>
              <p>
                Transmission is secured with industry-standard cryptographic protocols. Information is retained only as long as necessary to fulfill project inquiries and ongoing contractual services.
              </p>
            </>
          ) : (
            <>
              <p>
                These Terms and Conditions govern the engagement and use of digital creative, marketing, and technical engineering services provided by Anixel Studio.
              </p>
              <h4 style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
                1. Scope of Engagement
              </h4>
              <p>
                All custom production work, deliverables, and timelines are executed pursuant to mutual Statements of Work (SOW) executed between Anixel Studio and the client.
              </p>
              <h4 style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
                2. Intellectual Property Rights
              </h4>
              <p>
                Upon final settlement of invoices, all bespoke design deliverables, original source code, and assets developed specifically for the client are assigned according to the governing SOW.
              </p>
              <h4 style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
                3. Warranties &amp; Performance
              </h4>
              <p>
                Anixel Studio delivers production-ready code and designs tested against modern standard browser environments and agreed technical requirements.
              </p>
            </>
          )}
        </div>

        <div style={{ marginTop: 28, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-pill"
            style={{ width: '100%', height: 40 }}
          >
            <span>CLOSE DOCUMENT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
