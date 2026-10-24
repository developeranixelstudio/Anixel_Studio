import React, { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let mouseX = -200, mouseY = -200;
    let ringX = -200, ringY = -200;
    let rafId;
    let isHover = false;
    let isCard = false;

    const lerp = (start, end, factor) => start + (end - start) * factor;
    const setPos = (el, x, y) => {
      if (el) el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };

    const render = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      setPos(dotRef.current, mouseX, mouseY);
      setPos(ringRef.current, ringX, ringY);
      rafId = requestAnimationFrame(render);
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (hidden) setHidden(false);
    };
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(render);

    const onHoverEnter = () => {
      isHover = true;
      ringRef.current?.classList.add('cursor-ring--hover');
    };
    const onHoverLeave = () => {
      isHover = false;
      if (!isCard) ringRef.current?.classList.remove('cursor-ring--hover');
    };
    const onCardEnter = (e) => {
      isCard = true;
      ringRef.current?.classList.add('cursor-ring--card');
      if (labelRef.current) {
        labelRef.current.textContent = e.currentTarget.dataset.cursorLabel || 'VIEW';
      }
    };
    const onCardLeave = () => {
      isCard = false;
      if (!isHover) ringRef.current?.classList.remove('cursor-ring--hover');
      ringRef.current?.classList.remove('cursor-ring--card');
    };
    const onMouseDown = () => ringRef.current?.classList.add('cursor-ring--press');
    const onMouseUp = () => ringRef.current?.classList.remove('cursor-ring--press');

    const bindInteractive = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach((el) => {
        el.addEventListener('mouseenter', onHoverEnter);
        el.addEventListener('mouseleave', onHoverLeave);
      });
      document.querySelectorAll('[data-cursor-label], .portfolio-project-card, .insight-card-item, .bgh-pillar-card, .service-card').forEach((el) => {
        el.addEventListener('mouseenter', onCardEnter);
        el.addEventListener('mouseleave', onCardLeave);
      });
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    bindInteractive();
    const timer = setTimeout(bindInteractive, 800);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div className={`cursor-root ${hidden ? 'cursor-root--hidden' : ''}`} aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-ring-label"></span>
      </div>
      <div ref={dotRef} className="cursor-dot"></div>
    </div>
  );
}

export default CustomCursor;
