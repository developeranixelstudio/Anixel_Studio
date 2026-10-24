"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./navigate-cinematic-hero.css";

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
    const revealEls = qa("[data-reveal]");
    const prevRestoration = history.scrollRestoration;

    let lenis = null;
    let tick = null;
    let headChars = null;
    let cancelled = false;

    const ctx = gsap.context(() => {
      /* ---------- Smooth scrolling (Lenis) ---------- */
      function smoothScroll() {
        if (reduceMotion) return;
        if (window.__lenis) {
          lenis = window.__lenis;
        } else {
          lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
            smoothWheel: true,
            touchMultiplier: 1.5,
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

      /* ---------- Scroll: natural smooth parallax into next section ---------- */
      function scroll() {
        if (reduceMotion) return;
        const heroEl = q("[data-hero]");
        if (!heroEl) return;

        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroEl,
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
          },
        });

        // Every headline letter drifts up at its own speed
        headChars?.masks.forEach((c) => {
          const speed = parseFloat(c.dataset.speed ?? "0.35");
          heroTl.to(c, { y: () => -window.innerHeight * speed * 0.4, ease: "none" }, 0);
        });

        // Parallax copy elements upward and fade out smoothly
        qa("[data-parallax]").forEach((p) => {
          const speed = parseFloat(p.dataset.parallax ?? "0.35");
          heroTl.to(p, { y: () => -window.innerHeight * speed * 0.3, ease: "none" }, 0);
        });

        heroTl.to(qa("[data-top-copy], [data-bottom-copy]"), { autoAlpha: 0, ease: "power1.in", duration: 0.3 }, 0);

        // Background video subtle zoom for cinematic depth
        const videoEl = q("[data-video]");
        if (videoEl) {
          heroTl.to(videoEl, { scale: 1.15, ease: "none" }, 0);
        }
      }

      /* ---------- Intro: letters rise centre-out, then everything else fades up ---------- */
      function intro() {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        if (headChars?.inners) {
          tl.to(headChars.inners, { yPercent: 0, duration: 1.1, stagger: { each: 0.05, from: "center" } }, 0);
        }
        tl.to(revealEls, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.04 }, 0.25);
        return tl;
      }

      function finishLoading() {
        if (loader) {
          loader.style.display = "none";
          loader.style.pointerEvents = "none";
        }
      }

      /* ---------- Fast, silky smooth preloader: instant and crisp ---------- */
      function preload() {
        if (reduceMotion) {
          finishLoading();
          if (headChars?.inners) gsap.set(headChars.inners, { yPercent: 0 });
          gsap.set(revealEls, { autoAlpha: 1, y: 0 });
          scroll();
          return;
        }

        const state = { n: 0 };
        const tl = gsap.timeline({
          onComplete: () => {
            finishLoading();
            scroll();
          },
        });

        // Snappy counter from 00 to 100 in 0.3s
        tl.to(state, {
          n: 100,
          duration: 0.32,
          ease: "power2.out",
          onUpdate: () => {
            if (counter) counter.textContent = String(Math.round(state.n)).padStart(2, "0");
          },
        });

        // Fast curtain lift in 0.4s
        tl.to(loader, { yPercent: -100, duration: 0.45, ease: "power3.inOut" }, "+=0.04");
        // Headline letters rise into view
        tl.add(intro(), "-=0.3");
      }

      // Initialize without waiting indefinitely for network fonts
      const initHero = () => {
        if (cancelled) return;
        headChars = split(headlineEl);
        gsap.set(revealEls, { autoAlpha: 0, y: 30 });
        if (headChars?.inners) {
          gsap.set(headChars.inners, { yPercent: 110 });
          headChars.masks.forEach((c) => {
            c.dataset.speed = (0.2 + Math.random() * 0.4).toFixed(3);
          });
        }
        smoothScroll();
        preload();
      };

      if (document.fonts?.ready) {
        Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 150)),
        ]).then(initHero);
      } else {
        initHero();
      }
    }, el);

    return () => {
      cancelled = true;
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      if (headChars) headlineEl.textContent = headChars.text;
      if (loader) loader.style.display = "";
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
        <div className="tds-navhero__bg">
          <video
            className="tds-navhero__video"
            data-video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src={video}
          />
        </div>

        {/* Headline: ANIXEL STUDIO in Megante Font */}
        <h1 className="tds-navhero__headline" data-headline>
          {headline}
        </h1>

        {/* Garden animation / flower hill figure removed */}
        {/* Tagline removed per instructions */}
        {/* In The New bottom-right card removed per instructions */}

        <a
          className="tds-navhero__learn"
          href="#brand-growth-hero"
          data-reveal
          data-parallax="0.35"
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
          data-parallax="0.3"
          data-top-copy
        >
          [&nbsp;&nbsp;WORK WITH US&nbsp;&nbsp;]
        </a>

        {/* Copyright Bottom Left */}
        <p className="tds-navhero__copyright" data-reveal data-parallax="0.35" data-bottom-copy>
          © {new Date().getFullYear()} {brand}. All rights reserved.
        </p>
      </section>
    </div>
  );
}

export default NavigateHero;
