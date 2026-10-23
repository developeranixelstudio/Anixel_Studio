import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Digital Marketing & Lead Generation',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name or business identity.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid corporate or personal email required.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please specify your project scope or objectives.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitted(true);
    soundManager.playWhoosh();
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      service: 'Digital Marketing & Lead Generation',
      message: '',
    });
    onClose();
  };

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
          maxWidth: 580,
          backgroundColor: 'rgba(10, 10, 14, 0.88)',
          padding: 'clamp(24px, 5vw, 44px)',
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tech-frame__cross tech-frame__cross--tl" />
        <div className="tech-frame__cross tech-frame__cross--tr" />
        <div className="tech-frame__cross tech-frame__cross--bl" />
        <div className="tech-frame__cross tech-frame__cross--br" />

        {/* Modal Top Bar */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-primary)',
                letterSpacing: '0.12em',
              }}
            >
              ANIXEL INITIATION // PROTOCOL
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'var(--font-mono)',
              fontSize: '18px',
              cursor: 'pointer',
              padding: 4,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '1px solid var(--color-primary)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '20px',
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '24px',
                color: '#FFFFFF',
                marginBottom: 12,
                letterSpacing: '0.03em',
              }}
            >
              Transmission Confirmed
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              Thank you, {formData.name}. Our technical strategy lead has received your briefing and will contact you at {formData.email} within 24 hours.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="btn-pill btn-pill--gold"
              style={{ minWidth: 154 }}
            >
              <span>RETURN TO SITE →</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: 8,
                }}
              >
                NAME / COMPANY NAME *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Chen // Vertex Systems"
                style={{
                  width: '100%',
                  height: 44,
                  backgroundColor: '#050505',
                  border: `1px solid ${errors.name ? 'var(--color-error)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  padding: '0 14px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = errors.name
                    ? 'var(--color-error)'
                    : 'var(--color-border)')
                }
              />
              {errors.name && (
                <div style={{ color: 'var(--color-error)', fontSize: '10px', marginTop: 4 }}>
                  {errors.name}
                </div>
              )}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: 8,
                }}
              >
                DIRECT EMAIL *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                style={{
                  width: '100%',
                  height: 44,
                  backgroundColor: '#050505',
                  border: `1px solid ${errors.email ? 'var(--color-error)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  padding: '0 14px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = errors.email
                    ? 'var(--color-error)'
                    : 'var(--color-border)')
                }
              />
              {errors.email && (
                <div style={{ color: 'var(--color-error)', fontSize: '10px', marginTop: 4 }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: 8,
                }}
              >
                PRIMARY CAPABILITY OF INTEREST
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                style={{
                  width: '100%',
                  height: 44,
                  backgroundColor: '#050505',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  padding: '0 14px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              >
                <option value="Digital Marketing & Lead Generation">
                  Service 01 — Digital Marketing &amp; Lead Generation
                </option>
                <option value="SEO, AEO & GEO">Service 02 — SEO, AEO &amp; GEO</option>
                <option value="Branding & Creative Design">
                  Service 03 — Branding &amp; Creative Design
                </option>
                <option value="Website & App Development">
                  Service 04 — Website &amp; App Development
                </option>
                <option value="Creative Content Production">
                  Service 05 — Creative Content Production
                </option>
                <option value="Business Technology Solutions">
                  Service 06 — Business Technology Solutions
                </option>
              </select>
            </div>

            <div style={{ marginBottom: 28 }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: 8,
                }}
              >
                PROJECT GOALS &amp; OBJECTIVES *
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your goals, current challenges, and ideal timeline..."
                style={{
                  width: '100%',
                  backgroundColor: '#050505',
                  border: `1px solid ${errors.message ? 'var(--color-error)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  padding: '12px 14px',
                  outline: 'none',
                  resize: 'none',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = errors.message
                    ? 'var(--color-error)'
                    : 'var(--color-border)')
                }
              />
              {errors.message && (
                <div style={{ color: 'var(--color-error)', fontSize: '10px', marginTop: 4 }}>
                  {errors.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn-pill btn-pill--gold slot-btn"
              style={{ width: '100%', height: 46 }}
            >
              <span className="slot-btn__wrapper">
                <span className="slot-btn__text">SUBMIT INQUIRY →</span>
                <span className="slot-btn__text slot-btn__text--hover">TRANSMIT BRIEFING →</span>
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
