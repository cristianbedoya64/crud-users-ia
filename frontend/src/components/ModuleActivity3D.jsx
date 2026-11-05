import { useEffect, useState } from 'react';
import GlassCard from './GlassCard';
import dashboardTokens from '../theme/dashboardTokens';

export default function ModuleActivity3D({ data = [], paused = false }) {
  const [animated, setAnimated] = useState(false);
  const maxValue = Math.max(...data.map(item => Number(item.access) || 0), 1);

  useEffect(() => {
    if (paused) return undefined;
    const frameId = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(frameId);
  }, [paused]);

  return (
    <GlassCard mb="xl" className={`dashboard-3d-module-card${animated ? ' is-animated' : ''}`}>
      <h4 className="dashboard-chart-title">Actividad por Módulo · 3D</h4>
      {data.length === 0 ? (
        <p className="dashboard-chart-empty">No hay actividad registrada por módulo.</p>
      ) : (
        <div className="dashboard-3d-bars" role="img" aria-label="Actividad auditada por módulo">
          {data.map(item => {
            const value = Number(item.access) || 0;
            const height = Math.max((value / maxValue) * 100, 4);
            return (
              <div className="dashboard-3d-bar-group" key={item.module}>
                <div className="dashboard-3d-bar-scene">
                  <div
                    className="dashboard-3d-bar"
                    style={{
                      '--bar-height': `${height}%`,
                      '--bar-color': dashboardTokens.colors.electric
                    }}
                    title={`${item.module}: ${value} acciones`}
                  >
                    <span>{value}</span>
                  </div>
                </div>
                <span className="dashboard-3d-bar-label">{item.module}</span>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
