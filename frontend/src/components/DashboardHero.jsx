import { lazy, Suspense, useEffect, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';
import useWebGLSupport from '../hooks/useWebGLSupport';
import dashboardFeatures from '../config/dashboardFeatures';

const DashboardHero3D = lazy(() => import('./DashboardHero3D'));

function HeroFallback() {
  return <div className="dashboard-hero-fallback" aria-hidden="true"><span>U</span></div>;
}

export default function DashboardHero() {
  const reducedMotion = useReducedMotion();
  const webGLSupported = useWebGLSupport();
  const [visible, setVisible] = useState(
    typeof document === 'undefined' || document.visibilityState === 'visible'
  );

  useEffect(() => {
    const handleVisibilityChange = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const canRender3D = dashboardFeatures.enableHero3D && webGLSupported && !reducedMotion;

  return (
    <div className="dashboard-hero" aria-label="Centro de operaciones UARP-AI">
      <div className="dashboard-hero-copy">
        <span className="dashboard-hero-eyebrow">SECURITY OPERATIONS CENTER</span>
        <span className="dashboard-hero-caption">Supervisión inteligente de identidad y acceso</span>
      </div>
      {canRender3D ? (
        <Suspense fallback={<HeroFallback />}>
          <DashboardHero3D paused={!visible} />
        </Suspense>
      ) : <HeroFallback />}
    </div>
  );
}
