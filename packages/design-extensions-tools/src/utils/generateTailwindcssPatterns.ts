const toBracePattern = (items: string | string[]): string => {
  if (typeof items === 'string') return items;
  if (items.length === 0) return '';
  if (items.length === 1) return items[0]!;
  return `{${items.join(',')}}`;
};

/**
 * Generates a Tailwind CSS @source inline(...) string using brace expansion.
 *
 * Example output:
 *
 * ```css
 * @source inline("{lg:,md:,}{mt,mb,p}-{container,button}");
 * ```
 *
 * @param {Object} params - The configuration object.
 * @param {string | string[]} params.variants -
 *   A list of variant prefixes for the first brace expansion group.
 *   Can be a string (single value) or an array of strings.
 *   Example: `"lg:"` or `["lg:", "md:", ""]`.
 *
 * @param {string | string[]} params.prefixes -
 *   A list of class prefixes for the second group.
 *   Example: `"mt"` or `["mt", "mb", "p"]`.
 *
 * @param {string | string[]} params.keys -
 *   A list of keys or suffixes for the third group.
 *   Example: `"container"` or `["container", "button", "badge"]`.
 *
 * @returns {string} A string like `@source inline("{...}{...}-{...}");`
 *
 * @example
 * generateTailwindcssSource({
 *   variants: ["lg:", "md:", ""],
 *   prefixes: ["mt", "mb", "p"],
 *   keys: ["container", "button"]
 * });
 * // => '@source inline("{lg:,md:,}{mt,mb,p}-{container,button}");'
 */
export const generateTailwindcssSource = ({
  variants,
  prefixes,
  keys,
}: {
  variants: string | string[];
  prefixes: string | string[];
  keys: string | string[];
}) => {
  return `@source inline("${toBracePattern(variants)}${toBracePattern(prefixes)}-${toBracePattern(keys)}");`;
};
