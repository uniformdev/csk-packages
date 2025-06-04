/**
 * Sanitizes SVG by removing potentially dangerous or unwanted content.
 */
export const sanitizeSvg = (svg: string): string =>
  svg
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');

/**
 * Replaces color attributes (fill, stroke, color) with `currentColor`
 * except for 'none' and 'transparent'.
 */
export const applyCurrentColor = (svg: string): string =>
  svg
    .replace(/fill=(['"])(?!none|transparent)[^'"]*\1/gi, 'fill="currentColor"')
    .replace(/stroke=(['"])(?!none|transparent)[^'"]*\1/gi, 'stroke="currentColor"')
    .replace(/color=(['"])[^'"]*\1/gi, 'color="currentColor"');

/**
 * Extracts attributes from the <svg> tag as key-value pairs.
 */
export const getSvgAttributes = (svg: string): Record<string, string> => {
  const match = svg.match(/<svg\s+([^>]*)>/i);
  if (!match || !match[1]) return {};

  const attrString = match[1];
  const attributes: Record<string, string> = {};

  const attrRegex = /(\w[\w-]*)=["']([^"']*)["']/g;
  let result: RegExpExecArray | null;

  while ((result = attrRegex.exec(attrString))) {
    const [, key, value] = result;
    if (key && value) {
      attributes[key] = value;
    }
  }

  return attributes;
};

/**
 * Extracts inner content from an SVG string (everything inside <svg>...</svg>).
 */
export const getSvgInnerContent = (svg: string): string => {
  const match = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  return match?.[1] ?? '';
};

/**
 * Fetches raw SVG content from a remote URL.
 */
export const fetchSvg = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'image/svg+xml, text/plain, */*',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch SVG: ${response.status} ${response.statusText}`);
    }

    const content = await response.text();
    if (!content.trim().includes('<svg')) {
      throw new Error('Response is not valid SVG');
    }

    return content;
  } catch (err) {
    console.error('Error fetching SVG:', err);
    throw err;
  }
};
