import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { describe, expect, it } from 'vitest';
import InteractiveBackground, { variants } from '../InteractiveBackground';

describe('InteractiveBackground', () => {
  it('renders a decorative canvas and remains safe without a 2D context', () => {
    const { container } = render(
      <MantineProvider>
        <InteractiveBackground variant="hex" autoplay={false} />
      </MantineProvider>
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).not.toBeNull();
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes the kit variants, including hex glow', () => {
    expect(variants).toHaveLength(13);
    expect(variants).toContain('hex');
  });
});
