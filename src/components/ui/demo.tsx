"use client";

import React, { useEffect } from "react";
import CardsRotateSlider from "./cards-rotate-slider";

export default function CardsRotateSliderDemo() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const previousRestoration = "scrollRestoration" in window.history ? window.history.scrollRestoration : undefined;
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => {
      if (previousRestoration && "scrollRestoration" in window.history) {
        window.history.scrollRestoration = previousRestoration;
      }
    };
  }, []);

  return (
    <main className="w-full min-w-0 bg-background text-foreground">
      <CardsRotateSlider rotationAmount={1.1} verticalDrift={1.2} perspective={1000} textColor="#f5f5f5" />

      <section className="flex h-screen items-center justify-center px-6 text-center text-sm text-muted-foreground">
        Drop in your own `images` array — captions are optional per card.
      </section>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
        <p className="rounded-full border border-white/10 bg-black/40 px-4 py-1.5 text-xs text-white/70 backdrop-blur-sm">
          Scroll to pan the track — each card rotates in, settles, then tilts back out
        </p>
      </div>
    </main>
  );
}
