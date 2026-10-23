// Round Carousel — Originkit
// Adapted for Anixel Studio with 3D cylindrical ring and custom partner card integration

import React, { useEffect, useRef, useState } from "react";

// Our 8 verified partners from Anixel Studio
export const DEFAULT_PARTNERS = [
  { id: "01", code: "HORIZON", category: "ENTERPRISE RETAIL" },
  { id: "02", code: "VERTEX", category: "AI & CLOUD" },
  { id: "03", code: "NOVA LABS", category: "VENTURE & TECH" },
  { id: "04", code: "APEX", category: "FINANCIAL SYSTEMS" },
  { id: "05", code: "KINETIX", category: "DIGITAL MEDIA" },
  { id: "06", code: "LUMINA", category: "CREATIVE COMMERCE" },
  { id: "07", code: "AETHER", category: "SPATIAL DIGITAL" },
  { id: "08", code: "SYNAPSE", category: "GLOBAL BRANDING" },
];

export function RoundCarouselBase({
  images,
  items: itemsProp,
  imageWidth = 340,
  imageHeight = 200,
  spacing = 3,
  speed = 4.5,
  direction = "right",
  drag = true,
  sensitivity = 2.5,
  tilt = -6,
  perspective = 2600,
  cornerRadius = 18,
  innerDim = 3.5,
  background = "transparent",
  style = {},
}) {
  const items = itemsProp || images || DEFAULT_PARTNERS;
  const count = items.length;

  const ringRef = useRef(null);
  const rafRef = useRef(0);
  const rotYRef = useRef(0);
  const velRef = useRef(0);
  const lastRef = useRef(0);
  const dragRef = useRef({ active: false, x: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const angle = 360 / count;
  const factor = 1 + spacing * 0.15;
  const radius = (imageWidth * factor) / (2 * Math.tan(Math.PI / count));
  const radiusPx = cornerRadius;
  const degPerSec = speed * 6 * (direction === "left" ? -1 : 1);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const apply = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rotYRef.current}deg)`;
    };
    apply();

    const draw = (now) => {
      const dt = lastRef.current ? (now - lastRef.current) / 1000 : 0;
      lastRef.current = now;
      const f = Math.min(dt, 0.1);
      const d = dragRef.current;

      if (!d.active) {
        if (Math.abs(velRef.current) > 0.01) {
          rotYRef.current += velRef.current * f;
          velRef.current *= 0.94;
        } else {
          // Slow down slightly on hover for easy inspection
          const currentSpeed = isHovered ? degPerSec * 0.35 : degPerSec;
          rotYRef.current += currentSpeed * f;
        }
      }
      apply();
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius, degPerSec, count, isHovered]);

  const onPointerDown = (e) => {
    if (!drag) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    dragRef.current = { active: true, x: e.clientX };
    velRef.current = 0;
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    d.x = e.clientX;
    const k = 0.3 * sensitivity;
    rotYRef.current += dx * k;
    velRef.current = dx * k * 60;
  };

  const onPointerUp = (e) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    dragRef.current.active = false;
  };

  const faceBase = {
    position: "absolute",
    inset: 0,
    borderRadius: radiusPx,
    overflow: "hidden",
    backfaceVisibility: "hidden",
  };

  return (
    <div
      style={{
        ...style,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background,
        perspective: `${perspective}px`,
        cursor: drag ? "grab" : "default",
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt}deg)`,
        }}
      >
        <div
          ref={ringRef}
          style={{
            position: "relative",
            width: imageWidth,
            height: imageHeight,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const isCustomCard = item && (item.code || item.category || item.id);
            const src = item?.src;

            return (
              <div
                key={item.id || i}
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front Face */}
                <div
                  style={{
                    ...faceBase,
                    backgroundColor: "rgba(10, 10, 12, 0.88)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(212, 175, 55, 0.45)",
                    boxShadow:
                      "0 14px 40px rgba(0, 0, 0, 0.85), inset 0 0 20px rgba(212, 175, 55, 0.05), 0 0 18px rgba(212, 175, 55, 0.15)",
                    padding: "20px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundImage: src ? `url(${src})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {isCustomCard ? (
                    <>
                      {/* Top Metadata */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "11px",
                          color: "rgba(212, 175, 55, 0.85)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        <span>REF // {item.id}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              backgroundColor: "#D4AF37",
                              boxShadow: "0 0 8px #D4AF37",
                              display: "inline-block",
                            }}
                          />
                          <span style={{ color: "rgba(255, 255, 255, 0.55)" }}>STATUS: ACTIVE</span>
                        </div>
                      </div>

                      {/* Brand Logo & Name */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          marginTop: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: 8,
                            border: "1px solid rgba(212, 175, 55, 0.75)",
                            backgroundColor: "rgba(212, 175, 55, 0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#F3E5AB",
                            boxShadow: "0 0 10px rgba(212, 175, 55, 0.2)",
                          }}
                        >
                          {item.code ? item.code[0] : "A"}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-cinzel, serif)",
                            fontSize: "22px",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            color: "#FFFFFF",
                            textShadow: "0 0 15px rgba(212, 175, 55, 0.4)",
                          }}
                        >
                          {item.code}
                        </div>
                      </div>

                      {/* Category */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                          paddingTop: "10px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "10px",
                            color: "rgba(212, 175, 55, 0.75)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.category}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "9px",
                            color: "rgba(255, 255, 255, 0.3)",
                            letterSpacing: "0.06em",
                          }}
                        >
                          VERIFIED // 2026
                        </span>
                      </div>
                    </>
                  ) : null}
                </div>

                {/* Back Face (inside the cylinder, dimmed) */}
                <div
                  style={{
                    ...faceBase,
                    transform: "rotateY(180deg)",
                    backgroundColor: "rgba(10, 10, 12, 0.94)",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    filter: `brightness(${innerDim / 10})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-cinzel, serif)",
                      fontSize: "14px",
                      letterSpacing: "0.2em",
                      color: "rgba(212, 175, 55, 0.45)",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    ANIXEL STUDIO
                    <div
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "9px",
                        color: "rgba(255, 255, 255, 0.25)",
                        marginTop: 6,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.code || "SECURE DEPLOYMENT"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function RoundCarousel(props) {
  return <RoundCarouselBase {...props} />;
}

RoundCarousel.displayName = "Round Carousel";
