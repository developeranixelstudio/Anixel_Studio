import React from "react";
import { NavigateHero } from "./NavigateHero";

export function NavigateCinematicHeroDemo({ onOpenContact }) {
  return (
    <NavigateHero
      video="/bg.mp4"
      headline="ANIXEL STUDIO"
      handle="@ANIXELSTUDIO.OFFICIAL"
      brand="ANIXEL STUDIO"
      onOpenContact={onOpenContact}
    />
  );
}

export default NavigateCinematicHeroDemo;
