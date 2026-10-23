// Text scramble animation utility matching Alche.studio's ScrambleText plugin behavior
const GLYPHS = 'ANIXEL0123456789_#*/';

export function scrambleText(element, finalString, duration = 0.45) {
  if (!element) return;
  const original = finalString || element.dataset.originalText || element.innerText;
  element.dataset.originalText = original;

  const totalFrames = Math.round((duration * 1000) / 30);
  let frame = 0;

  if (element._scrambleTimer) {
    clearInterval(element._scrambleTimer);
  }

  element._scrambleTimer = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const revealedLength = Math.floor(progress * original.length);

    let output = '';
    for (let i = 0; i < original.length; i++) {
      if (original[i] === ' ') {
        output += ' ';
      } else if (i < revealedLength) {
        output += original[i];
      } else {
        output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
    }

    element.innerText = output;

    if (frame >= totalFrames) {
      clearInterval(element._scrambleTimer);
      element.innerText = original;
      element._scrambleTimer = null;
    }
  }, 30);
}
