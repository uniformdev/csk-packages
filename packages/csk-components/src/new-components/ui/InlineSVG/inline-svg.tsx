import { FC, SVGProps } from 'react';
import { cn } from '@/utils/styling';
import { InlineSVGProps } from '.';
import { fetchSvg, sanitizeSvg, applyCurrentColor, getSvgAttributes, getSvgInnerContent } from './utils';

export const InlineSVG: FC<InlineSVGProps> = async ({
  src,
  className = '',
  width,
  height,
  fill,
  sanitize = true,
  useCurrentColor = true,
  fallback,
  alt,
}) => {
  if (!src) return fallback ?? null;

  const transformSvg = (svg: string): string => {
    const transformers: Array<(input: string) => string> = [];

    if (sanitize) transformers.push(sanitizeSvg);
    if (useCurrentColor) transformers.push(applyCurrentColor);

    return transformers.reduce((result, fn) => fn(result), svg);
  };

  try {
    const raw = await fetchSvg(src);
    const cleaned = transformSvg(raw);
    const attrs = getSvgAttributes(cleaned);
    const content = getSvgInnerContent(cleaned);

    const svgProps: SVGProps<SVGSVGElement> = {
      ...attrs,
      role: 'img',
      'aria-label': alt,
      width: fill ? '100%' : width,
      height: fill ? '100%' : height,
      className: cn(attrs.className, className, {
        'absolute inset-0': fill,
      }),
    };

    return (
      <div className="relative size-full">
        <svg {...svgProps} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  } catch {
    return (
      fallback ?? (
        <div className={cn(className)} style={{ width, height }}>
          <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-500">Failed to load SVG</div>
        </div>
      )
    );
  }
};
