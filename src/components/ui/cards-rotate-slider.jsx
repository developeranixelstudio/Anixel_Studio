import React, { useEffect, useLayoutEffect, useRef, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

const BREAKPOINT_MOBILE = 640;
const BREAKPOINT_TABLET = 1025;

const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const RotationCard = forwardRef(
  ({ image, index, total, showCaptions, textColor }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute h-[45vh] w-[38vw] origin-right overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-[#090806] opacity-100 shadow-[0_28px_90px_rgba(0,0,0,0.65)] max-[1025px]:h-[40vh] max-[1025px]:w-[50vw] max-md:h-[35vh] max-md:w-[75vw]"
        style={{ transformStyle: 'preserve-3d', zIndex: total - index }}
      >
        <img
          src={image.src}
          alt={image.text || ''}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.12)_0%,rgba(3,3,3,0.35)_42%,rgba(3,3,3,0.96)_100%)]" />
        <div className="absolute inset-0 border border-white/5" />

        {showCaptions && image.text && (
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] tracking-[0.16em] text-[#D4AF37] uppercase">
                {image.eyebrow}
              </span>
              <span className="font-mono text-[10px] tracking-[0.12em] text-white/45">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
            <h3
              className="font-display text-[clamp(1.45rem,2.5vw,2.65rem)] leading-[1.05] font-semibold tracking-[-0.02em]"
              style={{ color: textColor, textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
            >
              {image.text}
            </h3>
            {image.description && (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 max-md:hidden">
                {image.description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

RotationCard.displayName = 'RotationCard';

export function CardsRotateSlider({
  images,
  rotationAmount = 1,
  verticalDrift = 1,
  scrollSmoothing = 1,
  perspective = 1200,
  showCaptions = true,
  textColor = '#ffffff',
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const wrapperRefs = useRef([]);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const updateHeight = () => {
      const scrollDistance = Math.max(0, track.scrollWidth - window.innerWidth);
      container.style.height = `${scrollDistance + window.innerHeight}px`;
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(track);
    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [images]);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const isMobile = window.innerWidth < BREAKPOINT_MOBILE;
    const isTablet = window.innerWidth >= BREAKPOINT_MOBILE && window.innerWidth < BREAKPOINT_TABLET;

    const ctx = gsap.context(() => {
      const getScrollDist = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const updateCardTransforms = (progress) => {
        const currentX = -getScrollDist() * progress;
        const screenCenter = window.innerWidth / 2;
        const middleIndex = Math.floor(images.length / 2);

        const driftBase = isMobile ? 2 : isTablet ? 6 : 10;
        const drift = driftBase * verticalDrift;

        const maxRotation = Math.abs(isMobile ? -60 : isTablet ? -80 : -100) * (reducedMotion ? 0.15 : 1) * rotationAmount;

        cardRefs.current.forEach((card, index) => {
          const wrapper = wrapperRefs.current[index];
          if (!card || !wrapper) return;

          const cardCenter = wrapper.offsetLeft + wrapper.offsetWidth / 2 + currentX;
          const normalized = clamp((cardCenter - screenCenter) / (window.innerWidth * 0.62), -1.35, 1.35);

          const side = index < middleIndex ? -1 : 1;
          const absNorm = Math.abs(normalized);

          const rotateY = -normalized * maxRotation;
          const rotateX = normalized * (side < 0 ? 5 : -5) * (reducedMotion ? 0.15 : 1);
          const yDrift = side * absNorm * drift;
          const opacity = clamp(1 - Math.max(0, absNorm - 0.72) * 0.45, 0.55, 1);

          gsap.set(card, {
            rotateY,
            rotateX,
            y: `${yDrift}vh`,
            opacity,
          });
        });
      };

      gsap.set(cardRefs.current, { rotateX: 0, rotateY: 0, y: 0, opacity: 1 });
      updateCardTransforms(0);

      const tween = gsap.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollDist()}`,
          scrub: reducedMotion ? true : scrollSmoothing,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateCardTransforms(self.progress),
        },
      });

      tween.scrollTrigger?.update();
      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, [images, perspective, reducedMotion, rotationAmount, scrollSmoothing, verticalDrift]);

  return (
    <div
      ref={containerRef}
      className="relative min-w-0 bg-[#030303]"
      style={{ overflowX: 'clip' }}
    >
      <div
        className="sticky top-0 flex h-screen items-center overflow-hidden"
        style={{ perspective: reducedMotion ? '4800px' : `${perspective}px` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.10),transparent_58%)]" />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#D4AF37]/70 uppercase">
            Scroll to explore
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/35 uppercase">
            {String(images.length).padStart(2, '0')} integrated capabilities
          </span>
        </div>

        <div
          ref={trackRef}
          className="flex h-full items-center gap-[5vw] pr-[31vw] pl-[31vw] will-change-transform max-[1025px]:gap-[8vw] max-[1025px]:pr-[22vw] max-[1025px]:pl-[22vw] max-md:gap-[12vw] max-md:pr-[12.5vw] max-md:pl-[12vw]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {images.map((img, idx) => (
            <div
              key={`${img.text}-${idx}`}
              ref={(el) => {
                wrapperRefs.current[idx] = el;
              }}
              className="relative flex h-[45vh] w-[38vw] shrink-0 items-center justify-center max-[1025px]:h-[40vh] max-[1025px]:w-[55vw] max-md:h-[35vh] max-md:w-[75vw]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <RotationCard
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                image={img}
                index={idx}
                total={images.length}
                showCaptions={showCaptions}
                textColor={textColor}
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[12vw] bg-gradient-to-r from-[#030303] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[12vw] bg-gradient-to-l from-[#030303] to-transparent" />
      </div>
    </div>
  );
}

export default CardsRotateSlider;
