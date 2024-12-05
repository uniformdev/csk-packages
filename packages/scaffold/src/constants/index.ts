import path from 'node:path';

export const DEFAULT_CUSTOM_CANVAS_FOLDER_PATH = '/src/components/custom-canvas';

export const PATH_TO_CUSTOM_CANVAS_FOLDER = path.join(
  ...(process.env.CUSTOM_CANVAS_FOLDER_PATH ?? DEFAULT_CUSTOM_CANVAS_FOLDER_PATH).split('/').filter(Boolean)
);

export enum IMPORTS {
  REACT = "import { FC } from 'react';",
  IMAGE = "import Image from 'next/image';",
  ASSET_TYPE = "import type { Asset } from '@uniformdev/assets';",
  LINK_PARAM_VALUE = "import { LinkParamValue } from '@uniformdev/canvas';",
  FLATTEN_VALUES = "import { flattenValues } from '@uniformdev/canvas';",
  COMPONENT_PROPS = "import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';",
  UNIFORM_TEXT = "import { UniformText } from '@uniformdev/canvas-next-rsc/component';",
  UNIFORM_RICH_TEXT = "import { UniformRichText } from '@uniformdev/canvas-next-rsc/component';",
  UNIFORM_SLOT = "import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';",
  RICH_TEXT_NODE = "import { RichTextNode } from '@uniformdev/richtext';",
}

export enum UNIFORM_PARAMETERS {
  SLOTS = 'slots',
  COMPONENT = 'component',
  CONTEXT = 'context',
}

export const MAPPING_REGEX = /\b[a-zA-Z0-9_]+Mapping\s*=\s*{(?:[^{}]*|\{(?:[^{}]*|\{[^{}]*\})*\})*}/g;
export const REGISTER_IMPORT_REGEX = /(import .+;)(?![\s\S]*import .+)/;
export const REGISTER_KEY_REGEX = (key: string) => new RegExp(`\\b${key}\\s*:\\s*[^,]+,?`, 'g');
export const END_MAPPER_REGEX = /}$/;
