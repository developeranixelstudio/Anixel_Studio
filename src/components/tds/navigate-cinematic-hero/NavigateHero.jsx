"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./navigate-cinematic-hero.css";

const ThreeHeroScene = React.lazy(() => import("../../three/ThreeHeroScene"));

// Turns a line of text into one mask per letter (.tds-navhero__char) wrapping the glyph
// (.tds-navhero__char-in). The glyph rises inside its mask for the intro, while the mask itself is
// free to travel for the scroll parallax. Inline-block spans lose the font's kerning, so every
// letter pair is measured and the difference handed back as an em margin.
function split(el) {
  const text = (el.textContent ?? "").trim();
  const cs = getComputedStyle(el);
  const probe = document.createElement("span");
  probe.style.cssText = `position:absolute;visibility:hidden;white-space:pre;font:${cs.font};letter-spacing:${cs.letterSpacing}`;
  document.body.appendChild(probe);
  const w = (s) => {
    probe.textContent = s;
    return probe.getBoundingClientRect().width;
  };
  const size = parseFloat(cs.fontSize) || 16;
  el.textContent = "";
  const masks = [];
  const inners = [];
  [...text].forEach((ch, i) => {
    const mask = document.createElement("span");
    mask.className = "tds-navhero__char";
    const inner = document.createElement("span");
    inner.className = "tds-navhero__char-in";

    if (ch === " ") {
      // Preserve clean non-breaking space for space characters between words
      inner.textContent = "\u00A0";
      mask.style.width = "0.28em";
    } else {
      inner.textContent = ch;
    }

    mask.appendChild(inner);
    if (i > 0 && ch !== " " && text[i - 1] !== " ") {
      const kern = w(text[i - 1] + ch) - w(text[i - 1]) - w(ch);
      if (Math.abs(kern) > 0.01) mask.style.marginLeft = `${(kern / size).toFixed(4)}em`;
    }
    el.appendChild(mask);
    masks.push(mask);
    inners.push(inner);
  });
  probe.remove();
  return { text, masks, inners };
}

export function NavigateHero({
  video = "/bg.mp4",
  headline = "ANIXEL STUDIO",
  handle = "@ANIXELSTUDIO.OFFICIAL",
  brand = "ANIXEL STUDIO",
  onOpenContact,
}) {
  const root = useRef(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const el = host;
    gsap.registerPlugin(ScrollTrigger);

    const q = (sel) => el.querySelector(sel);
    const qa = (sel) => gsap.utils.toArray(sel, el);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loader = q("[data-loader]");
    const counter = q("[data-count]");
    const headlineEl = q("[data-headline]");
    const outroTitle = q("[data-outro-title]");
    const revealEls = qa("[data-reveal]");
    const prevRestoration = history.scrollRestoration;
    const prevOverflow = document.body.style.overflow;

    let lenis = null;
    let tick = null;
    let headChars = null;
    let outroChars = null;
    let cancelled = false;

    // Always start at top so preloader and pinned stage line up
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      /* ---------- Smooth scrolling (Lenis) ---------- */
      function smoothScroll() {
        if (reduceMotion) return;
        if (window.__lenis) {
          lenis = window.__lenis;
        } else {
          lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
            smoothWheel: true,
            touchMultiplier: 1.6,
          });
          window.__lenis = lenis;
          lenis.on("scroll", ScrollTrigger.update);
          tick = (time) => lenis?.raf(time * 1000);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
        }

        // Smooth scroll for in-page anchors
        qa('a[href^="#"]').forEach((a) => {
          const id = a.getAttribute("href") ?? "";
          if (id.length < 2) return;
          a.addEventListener("click", (e) => {
            const target = el.querySelector(id) || document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            lenis?.scrollTo(target, { offset: 0 });
          });
        });
      }

      /* ---------- Scroll: hero pins, video scales, copy lifts, outro slides over ---------- */
      function scroll() {
        if (reduceMotion) return;
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: q("[data-hero]"),
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
        });

        // Every headline letter drifts up at its own speed (random 18% to 80% screen height)
        headChars?.masks.forEach((c) => {
          const speed = parseFloat(c.dataset.speed ?? "0.5");
          heroTl.to(c, { y: () => -window.innerHeight * speed, ease: "none", duration: 1 }, 0);
        });

        // Parallax elements upward at their own speeds
        qa("[data-parallax]").forEach((p) => {
          const speed = parseFloat(p.dataset.parallax ?? "0.5");
          heroTl.to(p, { y: () => -window.innerHeight * speed, ease: "none", duration: 1 }, 0);
        });

        // Top copy fades first (over first quarter); bottom row later (10% to 60%)
        heroTl.to(qa("[data-top-copy]"), { autoAlpha: 0, ease: "power1.in", duration: 0.25 }, 0);
        heroTl.to(qa("[data-bottom-copy]"), { autoAlpha: 0, ease: "power1.in", duration: 0.5 }, 0.1);

        // Solid black slab rides up just ahead of the second screen
        heroTl.to(q("[data-fade]"), { y: () => -window.innerHeight, ease: "none", duration: 1 }, 0);

        // Background video eases back to 1.14x for cinematic depth
        heroTl.to(q("[data-video]"), { scale: 1.14, ease: "none", duration: 1 }, 0);

        // Handle on the second screen rises letter by letter from middle at 55% scroll
        if (outroChars) {
          gsap.to(outroChars.inners, {
            yPercent: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: { each: 0.03, from: "center" },
            scrollTrigger: {
              trigger: q("[data-outro]"),
              start: "top 55%",
              once: true,
            },
          });
        }
      }

      /* ---------- Intro: letters rise centre-out, then everything else fades up ---------- */
      function intro() {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.to(headChars.inners, { yPercent: 0, duration: 1.4, stagger: { each: 0.09, from: "center" } }, 0);
        tl.to(revealEls, { autoAlpha: 1, y: 0, duration: 1.6, ease: "power3.out", stagger: 0.07 }, 0.45);
        return tl;
      }

      function finishLoading() {
        if (loader) loader.style.display = "none";
        document.body.style.overflow = prevOverflow;
      }

      /* ---------- Preloader: 00 → 100, then curtain lifts ---------- */
      function preload() {
        if (reduceMotion) {
          finishLoading();
          gsap.set([headChars.inners, outroChars.inners], { yPercent: 0 });
          gsap.set(revealEls, { autoAlpha: 1, y: 0 });
          return;
        }

        lenis?.stop();
        document.body.style.overflow = "hidden";
        const state = { n: 0 };
        const tl = gsap.timeline({
          onComplete: () => {
            finishLoading();
            lenis?.start();
            // Scroll timeline is built only now, so start values are from settled hero
            scroll();
          },
        });

        // Counter counts from 00 to 100 over 2.2s (power2.inOut)
        tl.to(state, {
          n: 100,
          duration: 2.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter) counter.textContent = String(Math.round(state.n)).padStart(2, "0");
          },
        });

        // 0.25s after reaching 100, curtain slides up and off screen (1.1s, power4.inOut)
        tl.to(loader, { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, "+=0.25");
        // Starting 0.55s before curtain has finished lifting, headline letters rise
        tl.add(intro(), "-=0.55");
      }

      // Fonts first so letter widths & kerning can be measured accurately
      document.fonts.ready.then(() => {
        if (cancelled) return;
        headChars = split(headlineEl);
        outroChars = split(outroTitle);
        gsap.set(revealEls, { autoAlpha: 0, y: 40 });
        gsap.set([headChars.inners, outroChars.inners], { yPercent: 110 });

        // Each headline letter gets its own parallax speed fixed once (0.18 to 0.80)
        headChars.masks.forEach((c) => {
          c.dataset.speed = (0.18 + Math.random() * 0.62).toFixed(3);
        });

        smoothScroll();
        preload();
      });
    }, el);

    return () => {
      cancelled = true;
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      if (headChars) headlineEl.textContent = headChars.text;
      if (outroChars) outroTitle.textContent = outroChars.text;
      if (loader) loader.style.display = "";
      document.body.style.overflow = prevOverflow;
      history.scrollRestoration = prevRestoration;
    };
  }, []);

  return (
    <div className="tds-navhero" ref={root}>
      {/* Preloader Curtain */}
      <div className="tds-navhero__loader" data-loader aria-hidden="true">
        <div className="tds-navhero__count" data-count>
          00
        </div>
      </div>

      {/* Navigation (fixed, shared by both sections) */}
      <header className="tds-navhero__nav" data-reveal>
        <div className="tds-navhero__nav-left">
          {/* Logo: Anixel Studio Official Logo (transparent background) instead of RR */}
          <a className="tds-navhero__logo" href="#hero" aria-label={brand}>
            <img
              src="/anixel-logo-white.png"
              alt="Anixel Studio"
              className="tds-navhero__logo-img"
            />
          </a>
          <nav className="tds-navhero__links">
            <a href="#services">SERVICES</a>
            <a href="#about">ABOUT</a>
            <a href="#contact">CONTACT</a>
          </nav>
        </div>

        <a
          className="tds-navhero__cta"
          href="#contact"
          onClick={(e) => {
            if (onOpenContact) {
              e.preventDefault();
              onOpenContact();
            }
          }}
        >
          <svg className="tds-navhero__cta-frame" width="172" height="44" viewBox="0 0 172 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M172 14H171V44H173V14H172ZM172 44V43H14V45H172V44ZM14 44L14.7071 43.2929L0.707107 29.2929L0 30L-0.707107 30.7071L13.2929 44.7071L14 44ZM0 30H1V0H-1V30H0ZM0 0V1H158V-1H0V0ZM158 0L157.293 0.707107L171.293 14.7071L172 14L172.707 13.2929L158.707 -0.707107L158 0Z" fill="#FAF8D2" />
          </svg>
          <span className="tds-navhero__cta-label">Reach out to us</span>
        </a>
      </header>

      {/* ============ HERO SECTION ============ */}
      <section className="tds-navhero__hero" id="hero" data-hero>
        <div className="tds-navhero__bg" data-bg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(212,175,55,0.07) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(212,175,55,0.04) 0%, transparent 60%), #030303",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.03,
              backgroundImage:
                "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          {video && (
            <video
              className="tds-navhero__video"
              data-video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              src={video}
              style={{ opacity: 0.3 }}
            />
          )}
          <React.Suspense fallback={null}>
            <ThreeHeroScene />
          </React.Suspense>
          <div
            className="geo-3d-float"
            aria-hidden="true"
            style={{ top: "15%", right: "8%", animationDelay: "0s", animationDuration: "16s" }}
          >
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: 0.09 }}
            >
              <polygon
                points="80,6 154,43 154,117 80,154 6,117 6,43"
                stroke="#D4AF37"
                strokeWidth="1"
                fill="none"
              />
              <polygon
                points="80,26 134,53 134,107 80,134 26,107 26,53"
                stroke="#D4AF37"
                strokeWidth="0.5"
                fill="none"
              />
              <line x1="80" y1="6" x2="80" y2="154" stroke="#D4AF37" strokeWidth="0.3" />
              <line x1="6" y1="43" x2="154" y2="117" stroke="#D4AF37" strokeWidth="0.3" />
              <line x1="154" y1="43" x2="6" y2="117" stroke="#D4AF37" strokeWidth="0.3" />
              <circle cx="80" cy="80" r="28" stroke="#D4AF37" strokeWidth="0.4" fill="none" />
            </svg>
          </div>
          <div
            className="geo-3d-float geo-3d-float-slow"
            aria-hidden="true"
            style={{ bottom: "20%", left: "5%", animationDelay: "-7s" }}
          >
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: 0.07 }}
            >
              <polygon
                points="50,4 96,28 96,72 50,96 4,72 4,28"
                stroke="#D4AF37"
                strokeWidth="1"
                fill="none"
              />
              <line x1="50" y1="4" x2="50" y2="96" stroke="#D4AF37" strokeWidth="0.4" />
              <line x1="4" y1="28" x2="96" y2="72" stroke="#D4AF37" strokeWidth="0.4" />
              <line x1="96" y1="28" x2="4" y2="72" stroke="#D4AF37" strokeWidth="0.4" />
            </svg>
          </div>
        </div>

        {/* Headline: ANIXEL STUDIO in Megante Font */}
        <h1 className="tds-navhero__headline" data-headline>
          {headline}
        </h1>

        {/* Garden animation / flower hill figure removed */}
        {/* Tagline removed per instructions */}
        {/* In The New bottom-right card removed per instructions */}

        {/* Bottom fade into the next section */}
        <div className="tds-navhero__fade" data-fade aria-hidden="true" />

        <a
          className="tds-navhero__learn"
          href="#tds-navhero-outro"
          data-reveal
          data-parallax="0.55"
          data-bottom-copy
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5.4003 17.599L17.5979 5.40142M17.5979 16.9214V5.40142H6.07794"
              stroke="#FAF8D2"
              strokeWidth="1.77258"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>LEARN MORE</span>
        </a>

        {/* Work CTA Top Right */}
        <a
          className="tds-navhero__work"
          href="#contact"
          onClick={(e) => {
            if (onOpenContact) {
              e.preventDefault();
              onOpenContact();
            }
          }}
          data-reveal
          data-parallax="0.45"
          data-top-copy
        >
          [&nbsp;&nbsp;WORK WITH US&nbsp;&nbsp;]
        </a>

        {/* Copyright Bottom Left */}
        <p className="tds-navhero__copyright" data-reveal data-parallax="0.55" data-bottom-copy>
          © 2026 {brand}. All rights reserved.
        </p>
      </section>

      {/* ============ HANDLE (SECOND SCREEN) ============ */}
      <section className="tds-navhero__outro" id="tds-navhero-outro" data-outro>
        <h2 className="tds-navhero__outro-title" data-outro-title>
          {handle}
        </h2>
      </section>
    </div>
  );
}

export default NavigateHero;
