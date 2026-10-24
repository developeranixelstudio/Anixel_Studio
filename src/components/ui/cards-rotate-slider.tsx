// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// True when the user has asked the OS to minimise animation. Safe to call
// during render - returns false on the server.
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

// Reduced motion: a much larger perspective distance flattens the 3D card
// rotation (less depth distortion) instead of removing it outright.
const REDUCED_PERSPECTIVE = "4800px";

const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1025;

const MOBILE_STEP = 2;
const TABLET_STEP = 6;
const DESKTOP_STEP = 10;

const MOBILE_ROTATE_IN = -60;
const TABLET_ROTATE_IN = -80;
const DESKTOP_ROTATE_IN = -100;

const MOBILE_ROTATE_OUT = 50;
const TABLET_ROTATE_OUT = 65;
const DESKTOP_ROTATE_OUT = 80;

const ROTATE_X_NEGATIVE = 5;
const ROTATE_X_POSITIVE = -5;

// Reduced motion: cut the card rotation down a lot (not just the perspective
// flattening above) - "reduce a lot", so a stronger cut than the 25% factor
// used elsewhere.
const ROTATION_REDUCTION_FACTOR = 0.15;

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CardsRotateSliderImage {
  src?: string;
  text?: string;
  eyebrow?: string;
  description?: string;
  category?: string;
  tags?: string[];
  num?: string;
}

const DEFAULT_IMAGES: CardsRotateSliderImage[] = [
  { src: "https://cdn.21st.dev/assets/mirror/54/54954611e11f8afe47c25bff036f8887022cb5b8389e45568564d88aebdba1fc.jpg", text: "Initialize Motion Layer" },
  { src: "https://cdn.21st.dev/assets/mirror/e9/e9e44c95f07aa428be0904d841dd9ce4ee2f0a6621d13883751ef98252522b00.jpg", text: "Inject Depth Matrix" },
  { src: "https://cdn.21st.dev/assets/mirror/1e/1ec8e016065447841ac87da12d70153f41b8642f91cdc85f8f10b89442275d96.jpg", text: "Sync Scroll Engine" },
  { src: "https://cdn.21st.dev/assets/mirror/51/51466e6ce688f80db22ca04e7f2e4e9e918fcc40c94119dfeba606b7aa8e1dde.jpg", text: "Calibrate Perspective" },
  { src: "https://cdn.21st.dev/assets/mirror/ff/ff5a0eafbbe32250367b699e5513dfd2debd0c2fd945d2f1206a63b512e7e1cf.jpg", text: "Activate 3D Pipeline" },
  { src: "https://cdn.21st.dev/assets/mirror/dc/dcadf7b1c44e483bd4cfd379244ec0a1f763cf335dda3961637665e5cc1f8f5d.jpg", text: "Bind Interaction Core" },
  { src: "https://cdn.21st.dev/assets/mirror/5b/5b133dad10568c8eea843378e31ae00b709a562b39b3abf76a51bd110a34d06e.jpg", text: "Compute Visual Flow" },
  { src: "https://cdn.21st.dev/assets/mirror/e6/e6b3784ed3382860a884f9cecefc69a269208c4cf9356ea5f247b168d354b9a0.jpg", text: "Render Adaptive Frames" },
  { src: "https://cdn.21st.dev/assets/mirror/e5/e54fdfe96b432b6d5f354bd9cbb53f500b972f281a738e8d8793530e959f5398.jpg", text: "Stabilize Motion Curve" },
  { src: "https://cdn.21st.dev/assets/mirror/46/46dc055ec5e450f74ab7b122088f62b221d2f46e0563dc27c5b0ed5aed3f6244.jpg", text: "Optimize Transition Graph" },
  { src: "https://cdn.21st.dev/assets/mirror/4d/4da5b674972a5aa6d70f32e0dfd3c24d30f9a823c6ce2bdf722e20501a1d7d21.jpg", text: "Deploy Experience Layer" },
  { src: "https://cdn.21st.dev/assets/mirror/c7/c7f8904ca18006620b8f2897d14dd29298b8fa1ecede291d21bf3a54ec0e6a0d.jpg", text: "Finalize Hyperiux State" },
];

export interface CardsRotateSliderProps {
  /** Cards shown in the horizontal track. Defaults to a 12-image sample set. */
  images?: CardsRotateSliderImage[];
  /** Multiplier on the built-in per-breakpoint rotateY entrance/exit strength as cards scroll by. */
  rotationAmount?: number;
  /** Multiplier on the built-in per-breakpoint vertical offset each card travels while scrolling past. */
  verticalDrift?: number;
  /** GSAP ScrollTrigger scrub value on the main horizontal track — higher lags/smooths more, lower tracks scroll 1:1. */
  scrollSmoothing?: number;
  /** 3D perspective distance, in pixels, applied to the sticky track — lower values look deeper/more distorted. */
  perspective?: number;
  /** Shows the text caption overlay on each card. */
  showCaptions?: boolean;
  /** Color of the card caption text. */
  textColor?: string;
  /** Background styling class for integration */
  bgClassName?: string;
}

/**
 * A horizontally scroll-pinned track of cards that rotate in from one side,
 * settle flat, then rotate out the other — driven by GSAP ScrollTrigger with
 * a nested per-card timeline. Falls back to a flattened, mostly de-rotated
 * pass under `prefers-reduced-motion`.
 */
export function CardsRotateSlider({
  images = DEFAULT_IMAGES,
  rotationAmount = 1,
  verticalDrift = 1,
  scrollSmoothing = 1,
  perspective = 1200,
  showCaptions = true,
  textColor = "#ffffff",
  bgClassName = "bg-transparent",
}: CardsRotateSliderProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;

    if (!outer || !track) return;

    const onResize = () => {
      const travel = track.scrollWidth - window.innerWidth;
      outer.style.height = `${travel + window.innerHeight}px`;
    };

    onResize();

    const resizeObserver = new ResizeObserver(onResize);

    resizeObserver.observe(track);
    window.addEventListener("resize", onResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [images]);

  useIsomorphicLayoutEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;

    if (!outer || !track) return;

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const isTablet = window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT;

    const context = gsap.context(() => {
      const horizontalTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          // Reduced motion: scrub:true tracks scroll position
          // directly (no smoothing lag) instead of the ~1s
          // catch-up delay - the "lerp" here is that scrub value.
          scrub: reducedMotion ? true : scrollSmoothing,
          invalidateOnRefresh: true,
        },
      });

      cardsRef.current.forEach((card, index) => {
        const wrapper = wrappersRef.current[index];

        if (!card || !wrapper) return;

        const total = images.length;
        const mid = Math.floor(total / 2);

        const step = (isMobile ? MOBILE_STEP : isTablet ? TABLET_STEP : DESKTOP_STEP) * verticalDrift;

        let offset: number;

        if (index < mid) {
          offset = -((mid - index) * step);
        } else {
          offset = (index - mid + 1) * step;
        }

        const rotationScale = reducedMotion ? ROTATION_REDUCTION_FACTOR : 1;

        const rotateXValue = (offset < 0 ? ROTATE_X_NEGATIVE : ROTATE_X_POSITIVE) * rotationScale;

        const rotateInValue =
          (isMobile ? MOBILE_ROTATE_IN : isTablet ? TABLET_ROTATE_IN : DESKTOP_ROTATE_IN) * rotationScale * rotationAmount;

        const rotateOutValue =
          (isMobile ? MOBILE_ROTATE_OUT : isTablet ? TABLET_ROTATE_OUT : DESKTOP_ROTATE_OUT) * rotationScale * rotationAmount;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            containerAnimation: horizontalTween,
            start: "left 100%",
            end: "right 0%",
            scrub: true,
          },
        });

        tl.fromTo(
          card,
          {
            rotateY: rotateInValue,
            rotateX: rotateXValue,
            opacity: 0.8,
            y: `${offset}vh`,
          },
          {
            rotateY: 0,
            rotateX: 0,
            opacity: 1,
            y: 0,
            ease: "none",
          },
        ).to(card, {
          rotateY: rotateOutValue,
          opacity: 0.9,
          y: `${-offset}vh`,
          ease: "none",
        });
      });

      ScrollTrigger.refresh();
    });

    return () => context.revert();
  }, [images, rotationAmount, verticalDrift, scrollSmoothing]);

  // overflowX set inline, not via a Tailwind class: "clip" (not "hidden") is
  // required so this doesn't hijack the sticky track's containing block
  // below, and an inline style guarantees the rule applies even in a host
  // whose Tailwind build doesn't ship the `overflow-x-clip` utility.
  return (
    <div ref={outerRef} className={`relative w-full ${bgClassName}`} style={{ overflowX: "clip" }}>
      <div
        className="sticky top-0 flex h-screen w-full items-center overflow-hidden"
        style={{ perspective: reducedMotion ? REDUCED_PERSPECTIVE : `${perspective}px` }}
      >
        <div
          ref={trackRef}
          className="flex h-full items-center will-change-transform gap-[5vw] max-[1025px]:gap-[8vw] max-md:gap-[12vw] pl-[31vw] pr-[31vw] max-[1025px]:pl-[22vw] max-[1025px]:pr-[22vw] max-md:pl-[12vw] max-md:pr-[12.5vw]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              ref={(element) => {
                wrappersRef.current[index] = element;
              }}
              className="relative flex h-[48vh] w-[38vw] shrink-0 items-center justify-center max-[1025px]:h-[44vh] max-[1025px]:w-[55vw] max-md:h-[50vh] max-md:w-[82vw] max-[1025px]:[&>div]:h-[44vh] max-[1025px]:[&>div]:w-[50vw] max-md:[&>div]:h-[50vh] max-md:[&>div]:w-[82vw]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <RotationCard
                ref={(element) => {
                  cardsRef.current[index] = element;
                }}
                src={img.src}
                text={img.text}
                eyebrow={img.eyebrow}
                description={img.description}
                category={img.category}
                tags={img.tags}
                num={img.num}
                index={index}
                total={images.length}
                showCaptions={showCaptions}
                textColor={textColor}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsRotateSlider;

interface RotationCardProps {
  src?: string;
  index: number;
  total: number;
  text?: string;
  eyebrow?: string;
  description?: string;
  category?: string;
  tags?: string[];
  num?: string;
  showCaptions: boolean;
  textColor: string;
}

export const RotationCard = forwardRef<HTMLDivElement, RotationCardProps>(
  ({ src, index, total, text, eyebrow, description, category, tags, num, showCaptions, textColor }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute h-[48vh] w-[38vw] origin-right overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-[#080808] shadow-[0_30px_90px_rgba(0,0,0,0.85)] max-[1025px]:h-[44vh] max-[1025px]:w-[52vw] max-md:h-[50vh] max-md:w-[82vw]"
        style={{
          transformStyle: "preserve-3d",
          zIndex: total - index,
        }}
      >
        <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          <img src={src} alt={text || "slide"} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
          {/* Subtle dark gold luxury gradient overlay for clean contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
          <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
        </div>

        {showCaptions && (
          <div
            className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8 flex flex-col justify-end text-left"
            style={{
              color: textColor,
            }}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                {eyebrow || category || `CAPABILITY ${String(index + 1).padStart(2, '0')}`}
              </span>
              <span className="font-mono text-xs text-white/50 tracking-wider">
                {num || `${String(index + 1).padStart(2, '0')} //`}
              </span>
            </div>

            <h3
              className="text-[clamp(1.25rem,2vw,2.1rem)] font-bold leading-tight tracking-tight mb-2"
              style={{
                textShadow: "0 2px 14px rgba(0,0,0,0.8)",
              }}
            >
              {text}
            </h3>

            {description && (
              <p className="text-xs md:text-sm text-white/70 leading-relaxed line-clamp-2 md:line-clamp-3 mb-3">
                {description}
              </p>
            )}

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 text-[10px] md:text-[11px] rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#F3E5AB] font-medium backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

RotationCard.displayName = "RotationCard";
