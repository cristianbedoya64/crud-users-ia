import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

export default function AnimatedCounter({ value, duration = 700 }) {
  const reducedMotion = useReducedMotion();
  const numericValue = Number.isFinite(Number(value)) ? Number(value) : null;
  const [displayValue, setDisplayValue] = useState(numericValue ?? 0);
  const previousValue = useRef(numericValue ?? 0);

  useEffect(() => {
    if (numericValue === null) return undefined;
    if (reducedMotion) {
      previousValue.current = numericValue;
      setDisplayValue(numericValue);
      return undefined;
    }

    const startValue = previousValue.current;
    const difference = numericValue - startValue;
    const startTime = performance.now();
    let frameId;

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - ((1 - progress) ** 3);
      setDisplayValue(Math.round(startValue + difference * easedProgress));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    previousValue.current = numericValue;
    return () => cancelAnimationFrame(frameId);
  }, [duration, numericValue, reducedMotion]);

  return <>{numericValue === null ? 'N/D' : displayValue.toLocaleString('es-CO')}</>;
}
