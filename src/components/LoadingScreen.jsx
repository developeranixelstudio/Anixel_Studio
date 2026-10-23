import React, { useEffect } from 'react';
import TilesLoader from './TilesLoader';

export default function LoadingScreen({ onComplete }) {
  // Safety fallback: ensure loading screen resolves even if browser tab was backgrounded or delayed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <TilesLoader
      minTime={1.8}
      background="#09090C"
      accent="#D4AF37"
      onComplete={onComplete}
    />
  );
}
