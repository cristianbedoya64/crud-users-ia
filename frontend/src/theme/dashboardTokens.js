export const dashboardTokens = {
  dark: {
    colors: {
      night: '#07111f',
      surface: '#0d1b2e',
      surfaceRaised: '#132943',
      surfaceInteractive: '#193553',
      electric: '#70a7ff',
      cyan: '#52d6c3',
      violet: '#b0a4ff',
      success: '#5bdd91',
      warning: '#ffd166',
      danger: '#ff718a',
      text: '#f3f7fd',
      textSecondary: '#c2d0e2',
      muted: '#9eb1c8',
      grid: 'rgba(161, 190, 224, 0.1)',
      border: 'rgba(161, 190, 224, 0.22)',
      borderStrong: 'rgba(112, 167, 255, 0.55)',
      overlay: 'rgba(7, 17, 31, 0.72)'
    }
  },
  light: {
    colors: {
      night: '#f8fafc',
      surface: '#ffffff',
      surfaceRaised: '#f1f5f9',
      surfaceInteractive: '#e2e8f0',
      electric: '#2563eb',
      cyan: '#0891b2',
      violet: '#7c3aed',
      success: '#16a34a',
      warning: '#ca8a04',
      danger: '#dc2626',
      text: '#0f172a',
      textSecondary: '#475569',
      muted: '#94a3b8',
      grid: 'rgba(0, 0, 0, 0.05)',
      border: 'rgba(0, 0, 0, 0.1)',
      borderStrong: 'rgba(37, 99, 235, 0.4)',
      overlay: 'rgba(255, 255, 255, 0.8)'
    }
  },
  radii: {
    sm: '10px',
    md: '16px',
    lg: '22px'
  },
  shadows: {
    card: '0 18px 48px rgba(0, 0, 0, 0.24)',
    glow: '0 0 28px rgba(112, 167, 255, 0.2)',
    glowStrong: '0 0 34px rgba(112, 167, 255, 0.26)'
  },
  typography: {
    body: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace'
  },
  motion: {
    fast: '140ms',
    normal: '240ms',
    slow: '900ms',
    ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    ambient: '18s'
  }
};

// Legacy support for components that expect the old flat structure.
// Chart colors are resolved from the active CSS theme separately; dark remains the build-time fallback.
export const colors = dashboardTokens.dark.colors;
export const radii = dashboardTokens.radii;
export const shadows = dashboardTokens.shadows;
export const typography = dashboardTokens.typography;
export const motion = dashboardTokens.motion;

export default {
  colors: dashboardTokens.dark.colors,
  radii: dashboardTokens.radii,
  shadows: dashboardTokens.shadows,
  typography: dashboardTokens.typography,
  motion: dashboardTokens.motion,
  palettes: dashboardTokens
};
