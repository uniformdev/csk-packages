import { createUniformParameter } from '../../utils';

export const simpleStatsContent = {
  type: 'grid',
  parameters: createUniformParameter({
    gapX: {
      type: 'tp2-slider-control-parameter',
      value: {
        tablet: '8',
        desktop: '8',
      },
    },
    gapY: {
      type: 'tp2-slider-control-parameter',
      value: {
        mobile: '16',
        desktop: '',
      },
    },
    spacing: {
      type: 'tp2-space-control-parameter',
      value: {
        paddingTop: 'container-xlarge',
        paddingBottom: 'container-xlarge',
      },
    },
    displayName: {
      type: 'text',
      value: 'Simple Stat',
    },
    columnsCount: {
      type: 'tp2-slider-control-parameter',
      value: {
        mobile: '1',
        tablet: '3',
        desktop: '3',
      },
    },
  }),
  slots: {
    gridInner: [
      {
        type: 'flex',
        _pattern: '7b0d3fc3-d88f-4259-9650-de58fa6aeca7',
        parameters: {
          gap: {
            type: 'tp2-slider-control-parameter',
            value: {},
          },
          border: {
            type: 'tp2-token-selector-parameter',
            value: '',
          },
          spacing: {
            type: 'tp2-space-control-parameter',
            value: {},
          },
          direction: {
            type: 'tp2-segmented-control-parameter',
            value: {
              mobile: 'col',
              tablet: 'col',
              desktop: 'col',
            },
          },
          alignItems: {
            type: 'tp2-segmented-control-parameter',
            value: 'center',
          },
          displayName: {
            type: 'text',
            value: '44 million transactions every 24 hours',
          },
          fluidContent: {
            type: 'checkbox',
            value: true,
          },
          justifyContent: {
            type: 'tp2-segmented-control-parameter',
            value: {},
          },
        },
        slots: {
          flexItem: [
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    mobile: '5xl',
                    tablet: '5xl',
                    desktop: '5xl',
                  },
                },
                text: {
                  type: 'text',
                  value: '44 million',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'bold',
                },
              },
            },
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    desktop: 'base',
                  },
                },
                text: {
                  type: 'text',
                  value: 'Transactions every 24 hours',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'normal',
                },
              },
            },
          ],
        },
      },
      {
        type: 'flex',
        _pattern: '7b0d3fc3-d88f-4259-9650-de58fa6aeca7',
        parameters: {
          gap: {
            type: 'tp2-slider-control-parameter',
            value: {},
          },
          border: {
            type: 'tp2-token-selector-parameter',
            value: '',
          },
          spacing: {
            type: 'tp2-space-control-parameter',
            value: {},
          },
          direction: {
            type: 'tp2-segmented-control-parameter',
            value: {
              mobile: 'col',
              tablet: 'col',
              desktop: 'col',
            },
          },
          alignItems: {
            type: 'tp2-segmented-control-parameter',
            value: 'center',
          },
          displayName: {
            type: 'text',
            value: '$119 trillion assets under holding',
          },
          fluidContent: {
            type: 'checkbox',
            value: true,
          },
          justifyContent: {
            type: 'tp2-segmented-control-parameter',
            value: {},
          },
        },
        slots: {
          flexItem: [
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    mobile: '5xl',
                    tablet: '5xl',
                    desktop: '5xl',
                  },
                },
                text: {
                  type: 'text',
                  value: '$119 trillion',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'bold',
                },
              },
            },
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    desktop: 'base',
                  },
                },
                text: {
                  type: 'text',
                  value: 'Assets under holding',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'normal',
                },
              },
            },
          ],
        },
      },
      {
        type: 'flex',
        _pattern: '7b0d3fc3-d88f-4259-9650-de58fa6aeca7',
        parameters: {
          gap: {
            type: 'tp2-slider-control-parameter',
            value: {},
          },
          border: {
            type: 'tp2-token-selector-parameter',
            value: '',
          },
          spacing: {
            type: 'tp2-space-control-parameter',
            value: {},
          },
          direction: {
            type: 'tp2-segmented-control-parameter',
            value: {
              mobile: 'col',
              tablet: 'col',
              desktop: 'col',
            },
          },
          alignItems: {
            type: 'tp2-segmented-control-parameter',
            value: 'center',
          },
          displayName: {
            type: 'text',
            value: '46,000 new users annually',
          },
          fluidContent: {
            type: 'checkbox',
            value: true,
          },
          justifyContent: {
            type: 'tp2-segmented-control-parameter',
            value: {},
          },
        },
        slots: {
          flexItem: [
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    mobile: '5xl',
                    tablet: '5xl',
                    desktop: '5xl',
                  },
                },
                text: {
                  type: 'text',
                  value: '46,000',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'bold',
                },
              },
            },
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    desktop: 'base',
                  },
                },
                text: {
                  type: 'text',
                  value: 'New users annually',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'normal',
                },
              },
            },
          ],
        },
      },
    ],
  },
};

export const gridStatsContent = {
  type: 'grid',
  parameters: {
    gapX: {
      type: 'tp2-slider-control-parameter',
      value: {
        mobile: '2',
        tablet: '2',
        desktop: '2',
      },
    },
    gapY: {
      type: 'tp2-slider-control-parameter',
      value: {
        mobile: '4',
        tablet: '2',
        desktop: '2',
      },
    },
    border: {
      type: 'tp2-token-selector-parameter',
      value: 'border-radius-medium',
    },
    spacing: {
      type: 'tp2-space-control-parameter',
      value: {
        marginTop: 'container-xlarge',
        marginLeft: 'container-small',
        paddingTop: '',
        marginRight: 'container-small',
        paddingLeft: '',
        marginBottom: 'container-xlarge',
        paddingRight: '',
        paddingBottom: '',
      },
    },
    displayName: {
      type: 'text',
      value: 'Simple Grid Stat',
    },
    columnsCount: {
      type: 'tp2-slider-control-parameter',
      value: {
        mobile: '1',
        tablet: '2',
        desktop: '4',
      },
    },
    fluidContent: {
      type: 'checkbox',
      value: true,
    },
  },
  slots: {
    gridInner: [
      {
        type: 'flex',
        _pattern: '7b0d3fc3-d88f-4259-9650-de58fa6aeca7',
        parameters: {
          gap: {
            type: 'tp2-slider-control-parameter',
            value: {},
          },
          border: {
            type: 'tp2-token-selector-parameter',
            value: '',
          },
          spacing: {
            type: 'tp2-space-control-parameter',
            value: {
              paddingTop: 'container-small',
              paddingLeft: 'container-small',
              paddingRight: 'container-small',
              paddingBottom: 'container-small',
            },
          },
          direction: {
            type: 'tp2-segmented-control-parameter',
            value: {
              mobile: 'col',
              tablet: 'col',
              desktop: 'col',
            },
          },
          alignItems: {
            type: 'tp2-segmented-control-parameter',
            value: 'center',
          },
          displayName: {
            type: 'text',
            value: '8,000+ Creators on the platform',
          },
          fluidContent: {
            type: 'checkbox',
            value: true,
          },
          justifyContent: {
            type: 'tp2-segmented-control-parameter',
            value: {},
          },
          backgroundColor: {
            type: 'tp2-color-palette-parameter',
            value: 'general-color-2',
          },
        },
        slots: {
          flexItem: [
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    mobile: '3xl',
                    tablet: '3xl',
                    desktop: '3xl',
                  },
                },
                text: {
                  type: 'text',
                  value: '8,000+',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'bold',
                },
                color: {
                  type: 'tp2-color-palette-parameter',
                  value: 'text-secondary',
                },
              },
            },
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    desktop: 'base',
                  },
                },
                text: {
                  type: 'text',
                  value: 'Creators on the platform\n',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'normal',
                },
                color: {
                  type: 'tp2-color-palette-parameter',
                  value: 'text-secondary',
                },
              },
            },
          ],
        },
      },
      {
        type: 'flex',
        _pattern: '7b0d3fc3-d88f-4259-9650-de58fa6aeca7',
        parameters: {
          gap: {
            type: 'tp2-slider-control-parameter',
            value: {},
          },
          border: {
            type: 'tp2-token-selector-parameter',
            value: '',
          },
          spacing: {
            type: 'tp2-space-control-parameter',
            value: {
              paddingTop: 'container-small',
              paddingLeft: 'container-small',
              paddingRight: 'container-small',
              paddingBottom: 'container-small',
            },
          },
          direction: {
            type: 'tp2-segmented-control-parameter',
            value: {
              mobile: 'col',
              tablet: 'col',
              desktop: 'col',
            },
          },
          alignItems: {
            type: 'tp2-segmented-control-parameter',
            value: 'center',
          },
          displayName: {
            type: 'text',
            value: '3% Flat platform fee',
          },
          fluidContent: {
            type: 'checkbox',
            value: true,
          },
          justifyContent: {
            type: 'tp2-segmented-control-parameter',
            value: {},
          },
          backgroundColor: {
            type: 'tp2-color-palette-parameter',
            value: 'general-color-2',
          },
        },
        slots: {
          flexItem: [
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    mobile: '3xl',
                    tablet: '3xl',
                    desktop: '3xl',
                  },
                },
                text: {
                  type: 'text',
                  value: '3%',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'bold',
                },
                color: {
                  type: 'tp2-color-palette-parameter',
                  value: 'text-secondary',
                },
              },
            },
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    desktop: 'base',
                  },
                },
                text: {
                  type: 'text',
                  value: 'Flat platform fee',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'normal',
                },
                color: {
                  type: 'tp2-color-palette-parameter',
                  value: 'text-secondary',
                },
              },
            },
          ],
        },
      },
      {
        type: 'flex',
        _pattern: '7b0d3fc3-d88f-4259-9650-de58fa6aeca7',
        parameters: {
          gap: {
            type: 'tp2-slider-control-parameter',
            value: {},
          },
          border: {
            type: 'tp2-token-selector-parameter',
            value: '',
          },
          spacing: {
            type: 'tp2-space-control-parameter',
            value: {
              paddingTop: 'container-small',
              paddingLeft: 'container-small',
              paddingRight: 'container-small',
              paddingBottom: 'container-small',
            },
          },
          direction: {
            type: 'tp2-segmented-control-parameter',
            value: {
              mobile: 'col',
              tablet: 'col',
              desktop: 'col',
            },
          },
          alignItems: {
            type: 'tp2-segmented-control-parameter',
            value: 'center',
          },
          displayName: {
            type: 'text',
            value: '99.9% Uptime guarantee',
          },
          fluidContent: {
            type: 'checkbox',
            value: true,
          },
          justifyContent: {
            type: 'tp2-segmented-control-parameter',
            value: {},
          },
          backgroundColor: {
            type: 'tp2-color-palette-parameter',
            value: 'general-color-2',
          },
        },
        slots: {
          flexItem: [
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    mobile: '3xl',
                    tablet: '3xl',
                    desktop: '3xl',
                  },
                },
                text: {
                  type: 'text',
                  value: '99.9%\n',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'bold',
                },
                color: {
                  type: 'tp2-color-palette-parameter',
                  value: 'text-secondary',
                },
              },
            },
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    desktop: 'base',
                  },
                },
                text: {
                  type: 'text',
                  value: 'Uptime guarantee',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'normal',
                },
                color: {
                  type: 'tp2-color-palette-parameter',
                  value: 'text-secondary',
                },
              },
            },
          ],
        },
      },
      {
        type: 'flex',
        _pattern: '7b0d3fc3-d88f-4259-9650-de58fa6aeca7',
        parameters: {
          gap: {
            type: 'tp2-slider-control-parameter',
            value: {},
          },
          border: {
            type: 'tp2-token-selector-parameter',
            value: '',
          },
          spacing: {
            type: 'tp2-space-control-parameter',
            value: {
              paddingTop: 'container-small',
              paddingLeft: 'container-small',
              paddingRight: 'container-small',
              paddingBottom: 'container-small',
            },
          },
          direction: {
            type: 'tp2-segmented-control-parameter',
            value: {
              mobile: 'col',
              tablet: 'col',
              desktop: 'col',
            },
          },
          alignItems: {
            type: 'tp2-segmented-control-parameter',
            value: 'center',
          },
          displayName: {
            type: 'text',
            value: '$70M Paid out to creators',
          },
          fluidContent: {
            type: 'checkbox',
            value: true,
          },
          justifyContent: {
            type: 'tp2-segmented-control-parameter',
            value: {},
          },
          backgroundColor: {
            type: 'tp2-color-palette-parameter',
            value: 'general-color-2',
          },
        },
        slots: {
          flexItem: [
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    mobile: '3xl',
                    tablet: '3xl',
                    desktop: '3xl',
                  },
                },
                text: {
                  type: 'text',
                  value: '$70M',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'bold',
                },
                color: {
                  type: 'tp2-color-palette-parameter',
                  value: 'text-secondary',
                },
              },
            },
            {
              type: 'text',
              parameters: {
                tag: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'span',
                },
                size: {
                  type: 'tp2-segmented-control-parameter',
                  value: {
                    desktop: 'base',
                  },
                },
                text: {
                  type: 'text',
                  value: 'Paid out to creators',
                },
                weight: {
                  type: 'tp2-segmented-control-parameter',
                  value: 'normal',
                },
                color: {
                  type: 'tp2-color-palette-parameter',
                  value: 'text-secondary',
                },
              },
            },
          ],
        },
      },
    ],
  },
};
