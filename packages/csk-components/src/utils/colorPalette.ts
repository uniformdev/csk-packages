import { CSSProperties } from 'react';

export type ColorTarget = 'background' | 'text' | 'border' | 'fill';

export type ResolvedColor = {
  className: string;
  style: CSSProperties;
};

const CUSTOM_PREFIX = 'custom:';

const STYLE_KEY: Record<ColorTarget, keyof CSSProperties> = {
  background: 'backgroundColor',
  text: 'color',
  border: 'borderColor',
  fill: 'fill',
};

const CLASS_PREFIX: Record<ColorTarget, string> = {
  background: 'bg-',
  text: 'text-',
  border: 'border-',
  fill: 'fill-',
};

const EMPTY: ResolvedColor = { className: '', style: {} };

export const isCustomColor = (value?: string): value is string =>
  typeof value === 'string' && value.startsWith(CUSTOM_PREFIX);

/**
 * Resolves a `dex-color-palette-parameter` value into either a Tailwind
 * className (for design tokens) or an inline `style` object (for custom
 * `custom:#hex` / `custom:rgb(...)` / `custom:rgba(...)` / `custom:hsl(...)` values).
 *
 * Always returns both fields so callers can spread without nullish checks.
 */
export const resolveColor = (value: string | undefined, target: ColorTarget): ResolvedColor => {
  if (!value) return EMPTY;

  if (isCustomColor(value)) {
    const raw = value.slice(CUSTOM_PREFIX.length).trim();

    if (!raw) return EMPTY;

    return { className: '', style: { [STYLE_KEY[target]]: raw } };
  }

  return { className: `${CLASS_PREFIX[target]}${value}`, style: {} };
};
