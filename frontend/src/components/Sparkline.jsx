export default function Sparkline({ values = [], color = 'var(--dashboard-electric)' }) {
  const points = values
    .map(Number)
    .filter(Number.isFinite);

  if (points.length < 2) {
    return <span className="dashboard-sparkline dashboard-sparkline--empty" aria-hidden="true" />;
  }

  const min = Math.min(...points);
  const range = Math.max(...points) - min || 1;
  const coordinates = points.map((point, index) => {
    const x = (index / (points.length - 1)) * 100;
    const y = 28 - ((point - min) / range) * 24;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="dashboard-sparkline" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={coordinates} fill="none" stroke={color} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
