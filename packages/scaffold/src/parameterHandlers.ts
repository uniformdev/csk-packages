import { ParameterHandler } from './types';

const uniformTextParameterHandler: ParameterHandler = {
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

const linkParameterHandler: ParameterHandler = {
  supports: ['link'],
  type: 'LinkParamValue',
  render: parameter => `<a href={${parameter.id}?.path ?? '#'}>Link Text</a>`,
};

const assetParameterValue: ParameterHandler = {
  supports: ['asset'],
  type: `Asset[]`,
  render: parameter =>
    // ToDo: have to fix it(never)
    `{(flattenValues(${parameter.id} as never) || [])
          .filter(({ url }) => Boolean(url))
          .map(({title, url }, index) => (
            <Image key={index} src={url} width={100} height={100} alt={title} />
          ))}`,
};

const checkboxParameterHandler: ParameterHandler = {
  supports: ['checkbox'],
  type: 'boolean',
  render: parameter => `{${parameter.id}?.toString()}`,
};

const richTextParameterHandler: ParameterHandler = {
  supports: ['richText'],
  type: 'RichTextNode',
  hide: true,
  render: parameter =>
    `<UniformRichText placeholder="Content goes here..." className="prose max-w-full" parameterId="${parameter.id}" context={context} component={component} />`,
};

const imageParameterHandler: ParameterHandler = {
  supports: ['image'],
  type: 'string',
  render: parameter => `{!!${parameter.id} && <Image src={${parameter.id}} width={100} height={100} alt="example" />}`,
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
  linkParameterHandler,
  assetParameterValue,
  checkboxParameterHandler,
  richTextParameterHandler,
  imageParameterHandler,
  jsonParameterHandler,
];
