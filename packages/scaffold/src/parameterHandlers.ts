import { ParameterHandler } from './types';

const uniformTextParameterHandler: ParameterHandler = {
  import: ["import { UniformText } from '@uniformdev/canvas-next-rsc/component';"],
  needsProps: ['context', 'component'],
  supports: ['text'],
  type: 'string',
  hide: true,
  render: parameter =>
    `<UniformText parameterId="${parameter.id}" placeholder="${parameter.name} goes here" context={context} component={component} />`,
};

const numberParameterHandler: ParameterHandler = {
  supports: ['number'],
  type: 'number',
  render: parameter => `{${parameter.id}}`,
};

const textParameterHandler: ParameterHandler = {
  supports: ['select', 'date'],
  type: 'string',
  render: parameter => `{${parameter.id}}`,
};

const textArrayParameterHandler: ParameterHandler = {
  supports: ['multi-select'],
  type: 'string[]',
  render: parameter => `{${parameter.id}?.join(', ')}`,
};

const dateTimeParameterHandler: ParameterHandler = {
  supports: ['datetime'],
  type: '{ datetime: string; timeZone: string }',
  render: parameter => `{${parameter.id}?.datetime} {${parameter.id}?.timeZone}`,
};

const linkParameterHandler: ParameterHandler = {
  import: ["import { LinkParamValue } from '@uniformdev/canvas';"],
  supports: ['link'],
  type: 'LinkParamValue',
  render: parameter => `<a href={${parameter.id}?.path ?? '#'}>Link Text</a>`,
};

const assetParameterValue: ParameterHandler = {
  import: [
    "import Image from 'next/image';",
    "import type { Asset } from '@uniformdev/assets';",
    "import { flattenValues } from '@uniformdev/canvas';",
  ],
  supports: ['asset'],
  type: `Asset[]`,
  render: parameter =>
    // ToDo: have to fix it(never)
    `{(flattenValues(${parameter.id} as never) || [])
          .filter(({ url }) => Boolean(url))
          .map(({title, url }, index) => (
            <Image key={index} src={url} width={200} height={200} alt={title} />
          ))}`,
};

const checkboxParameterHandler: ParameterHandler = {
  supports: ['checkbox'],
  type: 'boolean',
  render: parameter => `{${parameter.id}?.toString()}`,
};

const richTextParameterHandler: ParameterHandler = {
  import: [
    "import { UniformRichText } from '@uniformdev/canvas-next-rsc/component';",
    "import { RichTextNode } from '@uniformdev/richtext';",
  ],
  needsProps: ['context', 'component'],
  supports: ['richText'],
  type: 'RichTextNode',
  hide: true,
  render: parameter =>
    `<UniformRichText placeholder="Content goes here..." className="prose max-w-full" parameterId="${parameter.id}" context={context} component={component} />`,
};

const imageParameterHandler: ParameterHandler = {
  import: ["import Image from 'next/image';"],
  supports: ['image'],
  type: 'string',
  render: parameter => `{!!${parameter.id} && <Image src={${parameter.id}} width={200} height={200} alt="example" />}`,
};

const jsonParameterHandler: ParameterHandler = {
  supports: ['json'],
  type: 'Record<string, unknown>',
  render: parameter => `{JSON.stringify(${parameter.id})}`,
};

export const supportedParameterHandlers: ParameterHandler[] = [
  uniformTextParameterHandler,
  numberParameterHandler,
  textParameterHandler,
  textArrayParameterHandler,
  dateTimeParameterHandler,
  linkParameterHandler,
  assetParameterValue,
  checkboxParameterHandler,
  richTextParameterHandler,
  imageParameterHandler,
  jsonParameterHandler,
];
