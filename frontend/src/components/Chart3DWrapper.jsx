import { Suspense, useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';
import useWebGLSupport from '../hooks/useWebGLSupport';

function ChartSkeleton() {
  return <div className="dashboard-chart-skeleton" aria-label="Cargando visualización..." />;
}

export default function Chart3DWrapper({
  lazy3D,
  fallback,
  children,
  enabled = true,
  onDispose
}) {
  const reducedMotion = useReducedMotion();
  const webGLSupported = useWebGLSupport();
  const [documentVisible, setDocumentVisible] = useState(
    typeof document === 'undefined' || document.visibilityState === 'visible'
  );
  const containerRef = useRef(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setDocumentVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      onDispose?.(containerRef.current);
    };
  }, [onDispose]);

  const canRender3D = enabled && !reducedMotion && webGLSupported && documentVisible && lazy3D;

  return (
    <div ref={containerRef} className="dashboard-chart-3d-wrapper">
      {canRender3D ? (
        <Suspense fallback={<ChartSkeleton />}>
          {lazy3D}
        </Suspense>
      ) : fallback || children}
    </div>
  );
}
