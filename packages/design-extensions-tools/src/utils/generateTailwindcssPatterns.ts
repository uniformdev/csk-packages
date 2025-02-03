import {
  DEFAULT_BORDER_VARIANTS,
  DEFAULT_COLOR_PREFIXES,
  DEFAULT_COLOR_VARIANTS,
  DEFAULT_DIMENSION_PREFIXES,
  DEFAULT_DIMENSION_TABLE_PREFIXES,
  DEFAULT_DIMENSION_TABLE_VARIANTS,
  DEFAULT_DIMENSION_VARIANTS,
  DEFAULT_FONT_VARIANTS,
} from '../constants';
type AdditionalOptions = { prefixes?: string[]; variants?: string[] };

export const generateTailwindcssColorKeysPattern = (colorKeys: string[], additionalOpt?: AdditionalOptions) => {
  const prefixes = [...new Set([...DEFAULT_COLOR_PREFIXES, ...(additionalOpt?.prefixes || [])])];
  const variants = [...new Set([...DEFAULT_COLOR_VARIANTS, ...(additionalOpt?.variants || [])])];
  return {
    pattern: new RegExp(colorKeys.length ? `(${prefixes.join('|')})-(${colorKeys.join('|')})` : ''),
    ...(variants.length ? { variants } : undefined),
  };
};

export const generateTailwindcssDimensionKeysPattern = (dimensionKeys: string[], additionalOpt?: AdditionalOptions) => {
  const prefixes = [...new Set([...DEFAULT_DIMENSION_PREFIXES, ...(additionalOpt?.prefixes || [])])];
  const variants = [...new Set([...DEFAULT_DIMENSION_VARIANTS, ...(additionalOpt?.variants || [])])];
  return [
    {
      pattern: new RegExp(dimensionKeys.length ? `(${prefixes.join('|')})-(${dimensionKeys.join('|')})` : ''),
      ...(variants.length ? { variants } : undefined),
    },
    {
      pattern: new RegExp(
        dimensionKeys.length ? `(${DEFAULT_DIMENSION_TABLE_PREFIXES.join('|')})-(${dimensionKeys.join('|')})` : ''
      ),
      variants: DEFAULT_DIMENSION_TABLE_VARIANTS,
    },
  ];
};

export const generateTailwindcssFontKeysPattern = (
  fonts: string[],
  additionalOpt?: Pick<AdditionalOptions, 'variants'>
) => {
  const variants = [...new Set([...DEFAULT_FONT_VARIANTS, ...(additionalOpt?.variants || [])])];
  return {
    pattern: new RegExp(fonts.length ? `font-(${fonts.join('|')})` : ''),
    ...(variants.length ? { variants } : undefined),
  };
};

export const generateTailwindcssBorderKeysPattern = (
  borderKeys: string[],
  additionalOpt?: Pick<AdditionalOptions, 'variants'>
) => {
  const variants = [...new Set([...DEFAULT_BORDER_VARIANTS, ...(additionalOpt?.variants || [])])];
  return {
    pattern: new RegExp(borderKeys.length ? `(${borderKeys.join('|')})` : ''),
    ...(variants.length ? { variants } : undefined),
  };
};

export const generateTailwindSafelist = (): string[] => {
  const classes: string[] = [];

  // Tiny helper to push the base class plus any variant:base combos
  function pushClass(baseClass: string, variants?: string[]) {
    // Always push the unprefixed (base) class itself
    classes.push(baseClass);

    // If variants exist, push variant:baseClass for each
    variants?.forEach(variant => {
      classes.push(`${variant}:${baseClass}`);
    });
  }

  // Another helper for the weird line-clamp variant style:
  // e.g. 'lg:[&>:not(script)]' => 'lg:[&>:not(script)]:line-clamp-1'
  function pushClassWithComplexVariants(baseClass: string, complexVariants?: string[]) {
    // base class
    classes.push(baseClass);
    complexVariants?.forEach(cv => {
      classes.push(`${cv}:` + baseClass);
    });
  }

  //
  // 1) grid-cols-(1[0-2]|[1-9]|none|subgrid) + variants: ['lg', 'md']
  //
  {
    const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'none', 'subgrid'];
    values.forEach(val => {
      pushClass(`grid-cols-${val}`, ['lg', 'md']);
    });
  }

  //
  // 2) gap(?:-(x|y))?-(0(.5)?|1(.5)?|2(.5)?|3(.5)?|[1-9]?[0-9]|px) + variants: ['lg', 'md']
  //
  {
    // Possible prefixes: '', 'x', 'y'  (the (x|y) is optional)
    const prefixVariants = ['', 'x', 'y'];

    // We'll systematically create them without duplicates:
    const halfValues = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5'];
    const integerValues = Array.from({ length: 100 }, (_, i) => String(i)); // 0..99
    const pxValue = ['px'];

    // Merge them, then de-duplicate
    const allGapSuffixes = Array.from(new Set([...halfValues, ...integerValues, ...pxValue])).sort((a, b) => {
      // sort numerically where possible, then 'px' at the end
      // e.g. '0', '0.5', '1', '1.5', ... '99', 'px'
      const floatA = parseFloat(a);
      const floatB = parseFloat(b);
      if (!isNaN(floatA) && !isNaN(floatB)) {
        return floatA - floatB;
      } else if (isNaN(floatA) && isNaN(floatB)) {
        return a.localeCompare(b);
      } else if (isNaN(floatA)) {
        // e.g. a='px' => push it to the end
        return 1;
      } else {
        return -1;
      }
    });

    // Now produce gap-*, gap-x-*, gap-y-* for each suffix
    prefixVariants.forEach(pfx => {
      allGapSuffixes.forEach(val => {
        const baseCls = pfx
          ? `gap-${pfx}-${val}` // gap-x- or gap-y-
          : `gap-${val}`; // just gap-
        pushClass(baseCls, ['lg', 'md']);
      });
    });
  }

  //
  // 3) /flex-(col|row|col-reverse|row-reverse)/ + variants: ['lg', 'md']
  //
  {
    const values = ['col', 'row', 'col-reverse', 'row-reverse'];
    values.forEach(v => pushClass(`flex-${v}`, ['lg', 'md']));
  }

  //
  // 4) /justify-(normal|start|end|center|between|around|evenly|stretch)/ + variants: ['lg','md']
  //
  {
    const vals = ['normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'];
    vals.forEach(v => pushClass(`justify-${v}`, ['lg', 'md']));
  }

  //
  // 5) /items-(start|end|center|baseline|stretch)/ + variants: ['lg','md']
  //
  {
    const vals = ['start', 'end', 'center', 'baseline', 'stretch'];
    vals.forEach(v => pushClass(`items-${v}`, ['lg', 'md']));
  }

  //
  // 6) /self-(start|end|center|baseline|stretch)/ + variants: ['lg','md']
  //
  {
    const vals = ['start', 'end', 'center', 'baseline', 'stretch'];
    vals.forEach(v => pushClass(`self-${v}`, ['lg', 'md']));
  }

  //
  // 7) /(col|row)-start-(1[0-2]|[1-9]|none|subgrid)/ + variants: ['lg','md']
  //
  {
    const prefixes = ['col', 'row'];
    const vals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'none', 'subgrid'];
    prefixes.forEach(pfx => {
      vals.forEach(v => pushClass(`${pfx}-start-${v}`, ['lg', 'md']));
    });
  }

  //
  // 8) /(col|row)-(auto|span-(1[0-2]|[1-9]|full))/ + variants: ['lg','md']
  //
  {
    const prefixes = ['col', 'row'];
    // second group => 'auto' OR 'span-(1..12 or full)'
    // The pattern is (1[0-2]|[1-9]|full) => covers 1..12 + 'full'
    const spanVals = Array.from({ length: 12 }, (_, i) => `span-${i + 1}`); // span-1..span-12
    spanVals.push('span-full');
    const allVals = ['auto', ...spanVals];
    prefixes.forEach(pfx => {
      allVals.forEach(v => pushClass(`${pfx}-${v}`, ['lg', 'md']));
    });
  }

  //
  // 9) /justify-(start|center|end)/ (no variants)
  //
  {
    const vals = ['start', 'center', 'end'];
    vals.forEach(v => pushClass(`justify-${v}`));
  }

  //
  // 10) /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/ + variants: ['lg','md']
  //
  {
    const vals = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
    vals.forEach(v => pushClass(`text-${v}`, ['lg', 'md']));
  }

  //
  // 11) /text-(left|center|right)/ (no variants)
  //
  {
    const vals = ['left', 'center', 'right'];
    vals.forEach(v => pushClass(`text-${v}`));
  }

  //
  // 12) /font-(normal|medium|bold|extrabold)/ + variants: ['lg','md']
  //
  {
    const vals = ['normal', 'medium', 'bold', 'extrabold'];
    vals.forEach(v => pushClass(`font-${v}`, ['lg', 'md']));
  }

  //
  // 13) /line-clamp-(none|[1-6])/ + variants: ['lg:[&>:not(script)]','md:[&>:not(script)]','[&>:not(script)]']
  //
  {
    const possibleClamps = ['none', '1', '2', '3', '4', '5', '6'];
    const clampVariants = ['lg:[&>:not(script)]', 'md:[&>:not(script)]', '[&>:not(script)]'];
    possibleClamps.forEach(val => {
      pushClassWithComplexVariants(`line-clamp-${val}`, clampVariants);
    });
  }

  //
  // 14) /(uppercase|lowercase|capitalize)/ + variants: ['lg','md']
  //
  {
    const vals = ['uppercase', 'lowercase', 'capitalize'];
    vals.forEach(v => pushClass(v, ['lg', 'md']));
  }

  //
  // 15) /(underline|overline|line-through)/ + variants: ['lg','md']
  //
  {
    const vals = ['underline', 'overline', 'line-through'];
    vals.forEach(v => pushClass(v, ['lg', 'md']));
  }

  //
  // 16) /tracking-(tighter|tight|normal|wide|wider|widest)/ + variants: ['lg','md']
  //
  {
    const vals = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'];
    vals.forEach(v => pushClass(`tracking-${v}`, ['lg', 'md']));
  }

  //
  // 17) /aspect-(auto|square|video)/ (no variants)
  //
  {
    const vals = ['auto', 'square', 'video'];
    vals.forEach(v => pushClass(`aspect-${v}`));
  }

  //
  // 18) /shrink-(0|1)/ (no variants)
  //
  {
    const vals = ['0', '1'];
    vals.forEach(v => pushClass(`shrink-${v}`));
  }

  return classes;
};
