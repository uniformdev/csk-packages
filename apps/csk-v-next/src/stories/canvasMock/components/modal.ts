import { createUniformParameter } from '../../utils';

export const modalDefault = {
  trigger: [
    {
      type: 'button',
      _id: '3a772d6f-a601-45e5-a773-ff2d018dde26',
      parameters: createUniformParameter({
        textColor: 'text-light',
        buttonColor: 'button-primary',
        text: 'Open Modal',
        size: 'button-small',
      }),
    },
  ],
  modalContent: [
    {
      type: 'text',
      _id: '4abc1fe6-63bf-4c9c-b45a-029dd9868f16',
      parameters: createUniformParameter({
        tag: 'h2',
        size: '2xl',
        text: 'Modal title',
        color: 'text-tertiary',
        weight: 'bold',
        letterSpacing: '',
        alignment: 'center',
      }),
    },
    {
      type: 'spacer',
      _id: '25c81ae5-f963-447b-8f82-c86a203e5926',
      parameters: createUniformParameter({ thickness: '20px' }),
    },
    {
      type: 'text',
      _id: 'ad35d609-c6d1-4f21-a71e-c89ecddf484d',
      parameters: createUniformParameter({
        tag: 'p',
        size: 'xl',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        weight: 'normal',
      }),
    },
  ],
};

export const modalWithActionButtons = {
  trigger: [
    {
      type: 'button',
      parameters: createUniformParameter({
        textColor: 'text-light',
        buttonColor: 'button-primary',
        text: 'Open Modal',
        size: 'button-small',
      }),
    },
  ],
  modalActions: [
    {
      type: 'flex',
      parameters: createUniformParameter({
        gap: { desktop: '2' },
        title: 'Actions',
        spacing: {},
        direction: {
          mobile: 'row',
          tablet: 'row',
          desktop: 'row',
        },
        alignItems: 'center',
        fluidContent: true,
        justifyContent: {
          mobile: 'end',
          tablet: 'end',
          desktop: 'end',
        },
      }),
      slots: {
        flexItem: [
          {
            type: 'button',
            parameters: createUniformParameter({
              link: { path: '#', type: 'url' },
              text: 'Discard',
              textColor: 'text-primary',
              size: 'button-small',
            }),
          },
          {
            type: 'button',
            parameters: createUniformParameter({
              link: { path: '#', type: 'url' },
              text: 'See details',
              textColor: 'text-light',
              buttonColor: 'button-primary',
              size: 'button-small',
            }),
          },
        ],
      },
    },
  ],
  modalContent: [
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'h2',
        size: '2xl',
        text: 'Modal title',
        color: 'text-tertiary',
        weight: 'bold',
        letterSpacing: '',
        alignment: 'center',
      }),
    },
    {
      type: 'spacer',
      parameters: createUniformParameter({
        thickness: '20px',
      }),
    },
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'p',
        size: 'xl',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        weight: 'normal',
      }),
    },
  ],
};
