import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';

export default function SoundIntro({ onToggleSound, isSoundOn }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show after initial opening
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    soundManager.setMuted(false);
    if (onToggleSound) onToggleSound(true);
    setIsVisible(false);
    triggerHint('Sound activated. You can toggle audio anytime here.');
  };

  const handleDecline = () => {
    soundManager.setMuted(true);
    if (onToggleSound) onToggleSound(false);
    setIsVisible(false);
    triggerHint('Muted. Click the sound icon to enable audio whenever you want.');
  };

  const triggerHint = (msg) => {
    setShowHint(msg);
    setTimeout(() => {
      setShowHint(false);
    }, 4500);
  };

  return (
    <>
      {/* Sound Hint Tooltip pointing to top right header */}
      {showHint && (
        <div
          style={{
            position: 'fixed',
            top: 76,
            right: 48,
            zIndex: 1100,
            maxWidth: 280,
            padding: '10px 14px',
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: 6,
            boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
            animation: 'fadeInDown 0.4s ease forwards',
          }}
        >
          {/* Connecting Line pointing up */}
          <div
            style={{
              position: 'absolute',
              top: -12,
              right: 20,
              width: 1,
              height: 12,
              backgroundColor: 'var(--color-primary)',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              lineHeight: 1.5,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
            }}
          >
            {showHint}
          </p>
        </div>
      )}

      {/* Main Sound Permission Bottom Drawer */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.6s var(--ease-alche), opacity 0.6s ease',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            padding: '20px 48px',
            backgroundColor: 'rgba(5, 5, 5, 0.94)',
            backdropFilter: 'blur(16px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          {/* Top highlight bar */}
          <div
            style={{
              position: 'absolute',
              top: -1,
              left: 48,
              width: 80,
              height: 2,
              backgroundColor: 'var(--color-primary)',
            }}
          />

          {/* Left info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                color: '#BABABA',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 0,
                  height: 0,
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderBottom: '7px solid var(--color-primary)',
                }}
              />
              SOUND SYSTEM
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                color: '#FFFFFF',
                letterSpacing: '0.04em',
              }}
            >
              This website includes spatial soundscapes and responsive micro-tones.
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button
              type="button"
              onClick={handleAccept}
              className="btn-pill btn-pill--gold"
              style={{ height: 36, minWidth: 140, fontSize: '11px' }}
            >
              <span>TURN ON SOUND</span>
            </button>
            <button
              type="button"
              onClick={handleDecline}
              style={{
                background: 'none',
                border: 'none',
                color: '#BABABA',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.04em',
                textDecoration: 'underline',
                textUnderlineOffset: 4,
                cursor: 'pointer',
              }}
            >
              Continue without sound
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
