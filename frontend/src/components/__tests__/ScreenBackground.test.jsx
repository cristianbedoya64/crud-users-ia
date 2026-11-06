import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { describe, expect, it } from 'vitest';
import ScreenBackground, { screenEffects } from '../ScreenBackground';

describe('ScreenBackground', () => {
  it.each([
    ['users', 'mesh'],
    ['roles', 'terrain'],
    ['permissions', 'spot'],
    ['audit', 'ripple']
  ])('configures %s with the %s effect', (screen, variant) => {
    expect(screenEffects[screen].variant).toBe(variant);
    expect(screenEffects[screen].autoplay).toBe(false);
  });

  it('keeps the decorative canvas behind its content', () => {
    const { container, getByText } = render(
      <MantineProvider>
        <ScreenBackground effect="permissions">
          <span>Contenido de pantalla</span>
        </ScreenBackground>
      </MantineProvider>
    );

    expect(container.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true');
    expect(getByText('Contenido de pantalla')).toBeInTheDocument();
    expect(container.querySelector('.screen-page-content')).not.toBeNull();
  });
});
