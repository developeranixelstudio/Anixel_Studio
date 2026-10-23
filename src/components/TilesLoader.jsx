import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { soundManager } from '../utils/audio';

const RenderTarget = {
  current: () => 'preview',
  hasRestrictions: () => false,
  canvas: 'canvas',
  export: 'export',
  preview: 'preview',
  thumbnail: 'thumbnail',
};

const ED_HOLD_S = 1.8;
const ED_FADE_S = 0.45;
const ED_SERIF = '"Cinzel", "Instrument Serif", "Times New Roman", Times, serif';
const ED_SANS = '"Plus Jakarta Sans", "Inter", "Helvetica Neue", Arial, sans-serif';

function edRand(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function edLoadCurve(seed, loadS) {
  const r = edRand(seed);
  const k = Math.min(1, loadS / 4.4);
  const chunks = [];
  let total = 0;
  for (let i = 0; i < 7; i++) {
    const size = 0.4 + r() * 1.2;
    chunks.push({ size, start: r() * 0.78 * loadS, len: (0.25 + r() * 0.9) * k });
    total += size;
  }
  chunks.push({ size: total * 0.12, start: loadS - 0.45 * k, len: 0.45 * k });
  total *= 1.12;
  return (t) => {
    if (t >= loadS) return 1;
    let p = 0;
    for (const c of chunks) {
      const x = Math.min(1, Math.max(0, (t - c.start) / Math.max(1e-3, c.len)));
      p += c.size * x * x * (3 - 2 * x);
    }
    return Math.min(0.999, p / total);
  };
}

function edRealLoad() {
  if (typeof document === 'undefined') return 1;
  if (document.readyState === 'complete') return 1;
  const imgs = document.images;
  let done = 0;
  for (let i = 0; i < imgs.length; i++) if (imgs[i].complete) done++;
  const frac = imgs.length ? done / imgs.length : 1;
  const fonts = document.fonts && document.fonts.status === 'loaded' ? 1 : 0.8;
  return Math.min(1.0, 0.3 + 0.5 * frac + 0.2 * fonts);
}

const edClamp = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const edSeg = (x, a, b) => edClamp((x - a) / Math.max(1e-6, b - a));
const edOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const edInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

function edFont(font, fallbackFamily) {
  const f = font || {};
  return {
    fontFamily: f.fontFamily || fallbackFamily,
    fontWeight: f.fontWeight ?? 700,
    fontStyle: f.fontStyle || 'normal',
    letterSpacing: f.letterSpacing ?? '-0.02em',
    lineHeight: f.lineHeight ?? 1,
  };
}

function edRootStyle(style) {
  return {
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 99999,
    overflow: 'hidden',
    containerType: 'size',
    isolation: 'isolate',
    backgroundColor: '#000000',
    ...style,
  };
}

const useEdLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function useEditorialLoader(rootRef, sceneRef, optsRef) {
  useEdLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onCanvas = RenderTarget.current() === RenderTarget.canvas;
    const reduced =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = root.offsetWidth || window.innerWidth;
    let h = root.offsetHeight || window.innerHeight;
    let t = 0;
    let progress = 0;
    let revealAt = -1;
    let finished = false;
    let loadS = 1;
    let curve = edLoadCurve(7, 1);

    const draw = (dt) => {
      const revealS = reduced ? 0.4 : sceneRef.current.revealS;
      const reveal = revealAt < 0 ? 0 : edClamp((t - revealAt) / revealS);
      const phase = revealAt < 0 ? 'loading' : reveal < 1 ? 'reveal' : 'page';
      try {
        sceneRef.current.frame({ t, dt, progress, reveal, phase, w, h });
      } catch (e) {
        console.error(e);
      }
    };

    const restart = () => {
      loadS = reduced ? 0.6 : Math.max(0.5, optsRef.current.minTime);
      curve = edLoadCurve(7, loadS);
      t = 0;
      progress = 0;
      revealAt = -1;
      const s = sceneRef.current;
      if (s && s.reset) s.reset();
    };

    restart();
    draw(0);

    const ro = new ResizeObserver(() => {
      w = root.offsetWidth || window.innerWidth;
      h = root.offsetHeight || window.innerHeight;
      if (!finished) draw(0);
    });
    ro.observe(root);

    let raf = 0;
    let last = -1;
    const tick = (now) => {
      const dt = last < 0 ? 0 : Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      const revealS = reduced ? 0.4 : sceneRef.current.revealS;

      if (revealAt < 0) {
        const target = onCanvas ? curve(t) : (t >= loadS ? 1 : Math.min(curve(t), edRealLoad()));
        progress = target >= 1 ? 1 : Math.min(target, progress + dt * 1.8);
        if ((progress >= 1 && t >= loadS * 0.9) || t >= loadS + 0.3) {
          progress = 1;
          revealAt = t;
          soundManager.playWhoosh();
        }
      }

      draw(dt);

      if (revealAt >= 0 && t - revealAt >= revealS) {
        if (onCanvas) {
          if (t - revealAt >= revealS + ED_HOLD_S) {
            restart();
            draw(0);
          }
        } else {
          finished = true;
          root.style.transition = `opacity ${ED_FADE_S}s cubic-bezier(0.16, 1, 0.3, 1)`;
          root.style.opacity = '0';
          root.style.pointerEvents = 'none';
          window.setTimeout(() => {
            root.style.visibility = 'hidden';
            if (optsRef.current.onComplete) {
              optsRef.current.onComplete();
            }
          }, ED_FADE_S * 1000);
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);
}

const REVEAL_S = 1.6;
const SHORT_SIDE = 7;
const INK_WINDOW = 0.04;

export function OriginkitBaseTiles({
  minTime = 2.2, // Fast, silky smooth 2.2 second load curve
  font,
  background = '#0E0E10', // Deep obsidian black base
  accent = '#D4AF37',     // Royal gold tile accent
  onComplete,
  style,
}) {
  const [grid, setGrid] = useState({ cols: 11, rows: 7 });
  const { cols, rows } = grid;
  const count = cols * rows;

  const rootRef = useRef(null);
  const tileRefs = useRef([]);
  const paperRefs = useRef([]);
  const countRef = useRef(null);
  const numRef = useRef(null);
  tileRefs.current.length = paperRefs.current.length = count;

  const order = useRef([]);
  if (order.current.length !== count) {
    const r = edRand(count * 7919 + 13);
    order.current = Array.from({ length: count }, () => r() * (1 - INK_WINDOW));
  }

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fit = () => {
      const w = root.offsetWidth || window.innerWidth;
      const h = root.offsetHeight || window.innerHeight;
      if (!w || !h) return;
      const cell = Math.min(w, h) / SHORT_SIDE;
      const next = {
        cols: Math.max(1, Math.round(w / cell)),
        rows: Math.max(1, Math.round(h / cell)),
      };
      setGrid((g) => (g.cols === next.cols && g.rows === next.rows ? g : next));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  const optsRef = useRef({ minTime });
  optsRef.current = { minTime, onComplete };

  const sceneRef = useRef({ revealS: REVEAL_S, frame() {} });
  sceneRef.current = {
    revealS: REVEAL_S,
    frame({ t, progress, reveal }) {
      const u = order.current;
      for (let i = 0; i < count; i++) {
        const paper = paperRefs.current[i];
        if (paper) {
          paper.style.opacity = String(1 - edSeg(progress, u[i], u[i] + INK_WINDOW));
        }
        const tile = tileRefs.current[i];
        if (!tile) continue;
        const c = i % cols;
        const r = Math.floor(i / cols);
        const d = 0.5 * (cols > 1 ? c / (cols - 1) : 0) + 0.5 * (rows > 1 ? (rows - 1 - r) / (rows - 1) : 0);
        const e = edInOutCubic(edSeg(reveal, d * 0.55, d * 0.55 + 0.45));
        tile.style.transform = `scale(${1 - e})`;
      }
      const num = numRef.current;
      const digits = String(Math.round(progress * 100));
      if (num && num.textContent !== digits) {
        num.textContent = digits;
      }
      const label = countRef.current;
      if (label) {
        label.style.opacity = String(edOutCubic(edSeg(t, 0.1, 0.8)) * (1 - edSeg(reveal, 0, 0.15)));
      }
    },
  };

  useEditorialLoader(rootRef, sceneRef, optsRef);

  return (
    <div id="originkit-tiles-loader" ref={rootRef} style={edRootStyle(style)}>
      {/* Dynamic Grid Tiles */}
      {Array.from({ length: count }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        return (
          <div
            key={`${cols}x${rows}-${i}`}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            style={{
              position: 'absolute',
              left: `${(c * 100) / cols}%`,
              top: `${(r * 100) / rows}%`,
              width: `calc(${100 / cols}% + 1px)`,
              height: `calc(${100 / rows}% + 1px)`,
              background: accent,
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          >
            <div
              ref={(el) => {
                paperRefs.current[i] = el;
              }}
              style={{
                position: 'absolute',
                inset: 0,
                background,
                willChange: 'opacity',
              }}
            />
          </div>
        );
      })}

      {/* Center Studio Identifier Badge */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: '#D4AF37',
          letterSpacing: '0.18em',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: '#D4AF37',
            boxShadow: '0 0 10px #D4AF37',
          }}
        />
        <span>ANIXEL STUDIO // INITIALIZING SPATIAL CANVAS</span>
      </div>

      {/* Central Large Monogram Counter */}
      <div
        ref={countRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'difference',
          color: '#FFFFFF',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          ...edFont(font, ED_SERIF),
          fontSize: 'min(30cqh, 40cqw)',
          fontVariantNumeric: 'tabular-nums',
          opacity: 0,
          textShadow: '0 0 40px rgba(212, 175, 55, 0.4)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
          <span ref={numRef}>0</span>
          <span
            style={{
              fontSize: '0.35em',
              fontStyle: 'italic',
              marginTop: '0.85em',
              marginLeft: '0.08em',
              color: '#D4AF37',
            }}
          >
            %
          </span>
        </span>
      </div>

      {/* Bottom Technical Telemetry */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'rgba(255, 255, 255, 0.45)',
          letterSpacing: '0.14em',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div>CORE // WEBGL_SHADERS_READY</div>
        <div>BUFFER // 100%</div>
      </div>
    </div>
  );
}

const __originkitPresetProps = {
  font: {
    fontFamily: 'Cinzel',
    variant: 'Regular',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '1em',
    letterSpacing: '-0.04em',
    textAlign: 'left',
  },
  background: '#09090C',
  accent: '#D4AF37',
  minTime: 2.2,
};

export default function TilesLoader(props) {
  return <OriginkitBaseTiles {...__originkitPresetProps} {...props} />;
}
