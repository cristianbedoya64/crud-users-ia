import { Box } from '@mantine/core';
import InteractiveBackground from './InteractiveBackground';

const screenEffects = {
  users: { variant: 'mesh', density: 0.8, intensity: 0.35, radius: 0.9, autoplay: false },
  roles: { variant: 'terrain', density: 0.8, intensity: 0.25, radius: 0.8, autoplay: false },
  permissions: { variant: 'spot', density: 0.8, intensity: 0.35, radius: 0.9, autoplay: false },
  audit: { variant: 'ripple', density: 0.65, intensity: 0.3, radius: 0.8, autoplay: false }
};

export function ScreenBackground({ effect, children }) {
  const options = screenEffects[effect];

  return (
    <Box className="screen-page">
      <InteractiveBackground {...options} autoplay={false} />
      <Box className="screen-page-content">{children}</Box>
    </Box>
  );
}

export { screenEffects };
export default ScreenBackground;
