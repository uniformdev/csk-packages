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

export type HoverTarget = 'text' | 'background' | 'decoration';
export type HoverVariant = 'hover' | 'group-hover';

const HOVER_VAR: Record<HoverTarget, string> = {
  text: '--csk-hover-text',
  background: '--csk-hover-bg',
  decoration: '--csk-hover-decoration',
};

const HOVER_TOKEN_PREFIX: Record<HoverTarget, string> = {
  text: 'text-',
  background: 'bg-',
  decoration: 'decoration-',
};

// Static literal classes — must match the @source inline whitelist in globals.css.
const HOVER_CUSTOM_CLASS: Record<HoverTarget, Record<HoverVariant, string>> = {
  text: {
    hover: 'hover:text-[var(--csk-hover-text)]',
    'group-hover': 'group-hover:text-[var(--csk-hover-text)]',
  },
  background: {
    hover: 'hover:bg-[var(--csk-hover-bg)]',
    'group-hover': 'group-hover:bg-[var(--csk-hover-bg)]',
  },
  decoration: {
    hover: 'hover:decoration-[var(--csk-hover-decoration)]',
    'group-hover': 'group-hover:decoration-[var(--csk-hover-decoration)]',
  },
};

/**
 * Resolves a hover-state colour value into a Tailwind className + inline CSS
 * variable. For design tokens, returns `hover:text-{token}` (or `group-hover:`)
 * with an empty style. For `custom:#hex` values, returns a static arbitrary-value
 * class that reads the colour from a CSS custom property, and supplies that
 * property via inline style. The static class must be present in the app's
 * `@source inline(...)` safelist so Tailwind emits the rule at build time.
 */
export const resolveHoverColor = (
  value: string | undefined,
  target: HoverTarget,
  variant: HoverVariant = 'hover'
): ResolvedColor => {
  if (!value) return EMPTY;

  if (isCustomColor(value)) {
    const raw = value.slice(CUSTOM_PREFIX.length).trim();
    if (!raw) return EMPTY;
    return {
      className: HOVER_CUSTOM_CLASS[target][variant],
      style: { [HOVER_VAR[target]]: raw } as CSSProperties,
    };
  }

  const variantPrefix = variant === 'group-hover' ? 'group-hover:' : 'hover:';
  return { className: `${variantPrefix}${HOVER_TOKEN_PREFIX[target]}${value}`, style: {} };
};
