// Sound feature has been completely removed as requested.
// This inert stub ensures zero audio initialization, zero Web Audio API context creation,
// and zero sound prompts while maintaining safe no-op compatibility across components.

class SilentAudioStub {
  init() {}
  setMuted() {}
  toggleMute() { return true; }
  playHover() {}
  playClick() {}
  playWhoosh() {}
  playBlip() {}
  onLevel() {}
}

export const soundManager = new SilentAudioStub();
