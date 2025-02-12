import path from 'node:path';

export const DEFAULT_CUSTOM_CANVAS_FOLDER_PATH = path.join('src', 'components', 'custom-canvas');

export const PATH_TO_CUSTOM_CANVAS_FOLDER = path.join(
  ...(process.env.CUSTOM_CANVAS_FOLDER_PATH ?? DEFAULT_CUSTOM_CANVAS_FOLDER_PATH).split(/[\\/]/).filter(Boolean)
);

export enum THEME_PACK_PARAMETERS_TYPES {
  COLOR_PALETTE = 'tp2-color-palette-parameter',
  SPACER_CONTROL = 'tp2-space-control-parameter',
  SLIDER = 'tp2-slider-control-parameter',
  SEGMENTED_CONTROL = 'tp2-segmented-control-parameter',
  TOKEN_SELECTOR = 'tp2-token-selector-parameter',
}

export enum UNIFORM_PARAMETERS_TYPES {
  TEXT = 'text',
  RICH_TEXT = 'richText',
  CHECKBOX = 'checkbox',
  NUMBER = 'number',
  DATE = 'date',
  SELECT = 'select',
  MULTI_SELECT = 'multi-select',
  DATETIME = 'datetime',
  LINK = 'link',
  ASSET = 'asset',
  JSON_DATA = 'jsonData',
  IMAGE_URL = 'imageUrl',
  COLOR_PALETTE = 'colorPalette',
  BLOCK = '$block',
}

export enum IMPORTS {
  REACT = "import { FC } from 'react';",
  NEXT_LINK = "import NextLink from 'next/link';",
  IMAGE = "import NextImage from 'next/image';",

  ASSET_TYPE = "import type { Asset } from '@uniformdev/assets';",
  LINK_PARAM_VALUE = "import { LinkParamValue } from '@uniformdev/canvas';",
  FLATTEN_VALUES = "import { flattenValues } from '@uniformdev/canvas';",
  COMPONENT_PROPS = "import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';",
  UNIFORM_TEXT = "import { UniformText } from '@uniformdev/canvas-next-rsc/component';",
  UNIFORM_RICH_TEXT = "import { UniformRichText } from '@uniformdev/canvas-next-rsc/component';",
  UNIFORM_SLOT = "import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';",
  RICH_TEXT_NODE = "import { RichTextNode } from '@uniformdev/richtext';",
  DATA_WITH_PROPERTIES = "import { DataWithProperties } from '@uniformdev/canvas';",

  CN = "import { cn } from '@uniformdev/csk-components/utils/styling';",
  VIEWPORT = "import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';",
  SPACE_TYPE = "import { SpaceType } from '@uniformdev/csk-components/types/cskTypes';",
}

export enum UNIFORM_PARAMETERS {
  SLOTS = 'slots',
  COMPONENT = 'component',
  CONTEXT = 'context',
  SLOT_INDEX = 'slotIndex',
  SLOT_NAME = 'slotName',
}

export const MAPPING_REGEX = /\b[a-zA-Z0-9_]+Mapping\s*=\s*{(?:[^{}]*|\{(?:[^{}]*|\{[^{}]*\})*\})*}/g;
export const REGISTER_IMPORT_REGEX = /(import .+;)(?![\s\S]*import .+)/;
export const REGISTER_KEY_REGEX = (key: string) => new RegExp(`\\b${key}\\s*:\\s*[^,]+,?`, 'g');
export const END_MAPPER_REGEX = /}$/;
export const VALID_KEY_REGEX = /^[$_a-zA-Z][$_a-zA-Z0-9]*$/gm;
export const UNDER_STRIKE_REGEX = /_{2,}/;
