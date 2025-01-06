import { IMPORTS, THEME_PACK_PARAMETERS_TYPES, UNIFORM_PARAMETERS, UNIFORM_PARAMETERS_TYPES } from './constants';
import { ParameterHandler } from './types';

const uniformTextParameterHandler: ParameterHandler = {
  import: [IMPORTS.UNIFORM_TEXT],
  needsProps: [UNIFORM_PARAMETERS.CONTEXT, UNIFORM_PARAMETERS.COMPONENT],
  supports: UNIFORM_PARAMETERS_TYPES.TEXT,
  type: 'string',
  render: parameter =>
    `<span>Text value: </span><UniformText parameterId="${parameter.canvasId || parameter.id}" placeholder="${parameter.name} goes here" context={context} component={component} />`,
};

const numberParameterHandler: ParameterHandler = {
  supports: UNIFORM_PARAMETERS_TYPES.NUMBER,
  type: 'number',
  render: parameter => `<span>Number value: </span>{${parameter.id}}`,
};

const dateParameterHandler: ParameterHandler = {
  supports: UNIFORM_PARAMETERS_TYPES.DATE,
  type: 'string',
  render: parameter => `<span>Date value: </span>{${parameter.id}}`,
};

const selectParameterHandler: ParameterHandler = {
  supports: UNIFORM_PARAMETERS_TYPES.SELECT,
  type: 'string[]',
  render: parameter => `<span>Selected value: </span>{${parameter.id}}`,
};

const textArrayParameterHandler: ParameterHandler = {
  supports: UNIFORM_PARAMETERS_TYPES.MULTI_SELECT,
  type: 'string[]',
  render: parameter => `<span>Selected values: </span>{${parameter.id}?.join(', ')}`,
};

const dateTimeParameterHandler: ParameterHandler = {
  supports: UNIFORM_PARAMETERS_TYPES.DATETIME,
  type: '{ datetime: string; timeZone: string }',
  render: parameter =>
    `<p>Date value: {${parameter.id}?.datetime}</p><p>Timezone value: {${parameter.id}?.timeZone}</p>`,
};

const linkParameterHandler: ParameterHandler = {
  import: [IMPORTS.LINK_PARAM_VALUE, IMPORTS.NEXT_LINK],
  supports: UNIFORM_PARAMETERS_TYPES.LINK,
  type: 'LinkParamValue',
  render: parameter => `<span>Link value: <Link href={${parameter.id}?.path ?? '#'}>Link Text</Link></span>`,
};

const assetParameterValue: ParameterHandler = {
  import: [IMPORTS.IMAGE, IMPORTS.ASSET_TYPE, IMPORTS.FLATTEN_VALUES],
  supports: UNIFORM_PARAMETERS_TYPES.ASSET,
  type: `Asset[]`,
  render: parameter =>
    // ToDo: have to fix it(never)
    `<div className="flex flex-row gap-2 overflow-x-auto">
      {(flattenValues(${parameter.id} as never) || [])
        .filter(({ url }) => Boolean(url))
        .map(({ title, url }, index) => (
            <Image key={index} src={url} width={200} height={200} alt={title} style={{ objectFit: 'cover' }}  />
          ))}
    </div>`,
};

const checkboxParameterHandler: ParameterHandler = {
  supports: UNIFORM_PARAMETERS_TYPES.CHECKBOX,
  type: 'boolean',
  render: parameter => `<span>Checkbox: {${parameter.id} ? "Marked" : "Unmarked"}</span>`,
};

const richTextParameterHandler: ParameterHandler = {
  import: [IMPORTS.UNIFORM_RICH_TEXT, IMPORTS.RICH_TEXT_NODE],
  needsProps: [UNIFORM_PARAMETERS.CONTEXT, UNIFORM_PARAMETERS.COMPONENT],
  supports: UNIFORM_PARAMETERS_TYPES.RICH_TEXT,
  type: 'RichTextNode',
  render: parameter =>
    `<UniformRichText placeholder="Content goes here..." className="prose max-w-full text-current marker:text-current [&_*:not(pre)]:text-current" parameterId="${parameter.canvasId || parameter.id}" context={context} component={component} />`,
};

const imageParameterHandler: ParameterHandler = {
  import: [IMPORTS.IMAGE],
  supports: UNIFORM_PARAMETERS_TYPES.IMAGE_URL,
  type: 'string',
  render: parameter =>
    `{!!${parameter.id} && <Image src={${parameter.id}} width={200} height={200} alt="example" style={{ objectFit: 'cover' }} />}`,
};

const jsonParameterHandler: ParameterHandler = {
  supports: UNIFORM_PARAMETERS_TYPES.JSON_DATA,
  type: 'Record<string, unknown>',
  render: parameter => `{JSON.stringify(${parameter.id})}`,
};

const colorPaletteParameterHandler: ParameterHandler = {
  import: [IMPORTS.CN],
  supports: THEME_PACK_PARAMETERS_TYPES.COLOR_PALETTE,
  type: 'string',
  render: parameter => `
  <div className="flex items-center gap-2">
    <div className={cn('size-10 rounded-full', { [\`bg-\${${parameter.id}}\`]: !!${parameter.id} })} />
    <span>Color Palette value: {${parameter.id}}</span>
  </div>`,
};

const segmentedSliderParameterHandler: ParameterHandler = {
  import: [IMPORTS.VIEWPORT],
  supports: THEME_PACK_PARAMETERS_TYPES.SEGMENTED_CONTROL,
  type: 'string | ViewPort<string>',
  render: parameter => `
  <span>Selected value: </span>
  <span>
    {typeof ${parameter.id} === 'string' ? ${parameter.id} : JSON.stringify(${parameter.id}, null, 2)}
  </span>`,
};

const sliderParameterHandler: ParameterHandler = {
  import: [IMPORTS.VIEWPORT],
  supports: THEME_PACK_PARAMETERS_TYPES.SLIDER,
  type: 'string | ViewPort<string>',
  render: parameter => `
  <span>Selected value: </span>
  <span>
    {typeof ${parameter.id} === 'string' ? ${parameter.id} : JSON.stringify(${parameter.id}, null, 2)}
  </span>`,
};

const tokenSelectorParameterHandler: ParameterHandler = {
  import: [IMPORTS.VIEWPORT],
  supports: THEME_PACK_PARAMETERS_TYPES.TOKEN_SELECTOR,
  type: 'string | ViewPort<string>',
  render: parameter => `
  <span>Selected value: </span>
  <span>
    {typeof ${parameter.id} === 'string' ? ${parameter.id} : JSON.stringify(${parameter.id}, null, 2)}
  </span>`,
};

const spacerSliderParameterHandler: ParameterHandler = {
  import: [IMPORTS.VIEWPORT, IMPORTS.SPACE_TYPE],
  supports: THEME_PACK_PARAMETERS_TYPES.SPACER_CONTROL,
  type: 'SpaceType | ViewPort<SpaceType>',
  render: parameter => `<span>Spacing value:  {JSON.stringify(${parameter.id}, null, 2)}</span>`,
};

const blockParameterHandler: ParameterHandler = {
  import: [IMPORTS.DATA_WITH_PROPERTIES],
  supports: UNIFORM_PARAMETERS_TYPES.BLOCK,
  type: 'DataWithProperties',
  render: parameter => `<span>Block value:  {JSON.stringify(${parameter.id}, null, 2)}</span>`,
};

export const supportedParameterHandlers: ParameterHandler[] = [
  uniformTextParameterHandler,
  numberParameterHandler,
  dateParameterHandler,
  selectParameterHandler,
  textArrayParameterHandler,
  dateTimeParameterHandler,
  linkParameterHandler,
  assetParameterValue,
  checkboxParameterHandler,
  richTextParameterHandler,
  imageParameterHandler,
  jsonParameterHandler,
  blockParameterHandler,
  colorPaletteParameterHandler,
  segmentedSliderParameterHandler,
  sliderParameterHandler,
  tokenSelectorParameterHandler,
  spacerSliderParameterHandler,
];
