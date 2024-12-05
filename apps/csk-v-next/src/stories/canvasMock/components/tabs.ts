import { createUniformParameter } from '../../utils';

export const tabsDefault = {
  tabItems: Array.from({ length: 6 }, (_item, index) => ({
    type: 'tab',
    _id: `tab-${index}`,
    parameters: createUniformParameter({
      text: `Tab ${index + 1}`,
    }),
    slots: {
      tabContent: [
        {
          type: 'text',
          parameters: createUniformParameter({
            tag: 'p',
            size: '2xl',
            text: `Tab ${index + 1} content`,
            color: 'text-tertiary',
            weight: 'medium',
          }),
        },
      ],
    },
  })),
};
