import { CSSProperties, FC } from 'react';
import { resolveColor } from '@/utils/colorPalette';
import { cn, resolveViewPort } from '@/utils/styling';
import { TextProps } from './';

export const Text: FC<TextProps> = ({
  className,
  size,
  color,
  weight,
  font,
  transform = '',
  decoration = '',
  letterSpacing,
  alignment,
  children,
  lineCountRestrictions,
}) => {
  const text = resolveColor(color, 'text');

  const baseStyles = cn(
    text.className,
    {
      [`font-${font}`]: !!font,
      [resolveViewPort(size, 'text-{value}')]: size,
      [`font-${weight}`]: !!weight,
      [`text-${alignment}`]: !!alignment,
      [transform]: !!transform,
      [decoration]: !!decoration,
      [`tracking-${letterSpacing}`]: !!letterSpacing,
      [resolveViewPort(lineCountRestrictions, 'line-clamp-{value}')]: lineCountRestrictions,
    },
    className
  );

  const baseStyle: CSSProperties | undefined = Object.keys(text.style).length ? text.style : undefined;

  if (typeof children === 'string') {
    return (
      <span className={baseStyles} style={baseStyle}>
        {children}
      </span>
    );
  }

  const childrenProps = (children.props || {}) as Record<string, unknown>;
  const childStyle = (childrenProps?.style as CSSProperties | undefined) || undefined;
  const mergedStyle: CSSProperties | undefined = baseStyle || childStyle ? { ...baseStyle, ...childStyle } : undefined;

  // UniformText (when Canvas contextual editing is on) overwrites any `style`
  // prop passed to it with a hardcoded value, which drops the inline color from
  // resolveColor for `custom:` values. We wrap the cloned child in an outer
  // <span> that owns the merged style so the resolved inline style always
  // reaches the DOM (and inherits down to UniformText's span via `color`).
  // <span> is used (not <div>) to preserve inline layout in flex/inline text
  // contexts. The inner element still receives style/className so the
  // non-contextual path and Tailwind token classes keep working.
  //TODO: remove this once UniformText is updated to support inline styles.
  return (
    <span style={mergedStyle}>
      <children.type {...childrenProps} className={cn(baseStyles, childrenProps?.className as string | undefined)} />
    </span>
  );
};
