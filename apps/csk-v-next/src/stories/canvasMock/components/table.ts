import { createUniformParameter } from '../../utils';

export const tableDefault = {
  tableBody: [
    {
      type: 'tableRow',
      slots: {
        tableRowCells: [
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'John Smith',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: '32',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'New York',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'Software Engineer',
            }),
          },
        ],
      },
    },
    {
      type: 'tableRow',
      slots: {
        tableRowCells: [
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'Jane Doe',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: '28',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'Los Angeles',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'Graphic Designer',
            }),
          },
        ],
      },
    },
    {
      type: 'tableRow',
      slots: {
        tableRowCells: [
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'Robert Lee',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: '45',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'Chicago',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'Accountant',
            }),
          },
        ],
      },
    },
    {
      type: 'tableRow',
      slots: {
        tableRowCells: [
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'Sarah Brown',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: '36',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'San Francisco',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'Marketing Manager',
            }),
          },
        ],
      },
    },
  ],
  tableHead: [
    {
      type: 'tableRow',
      slots: {
        tableRowCells: [
          {
            type: 'tableHeaderCell',
            parameters: createUniformParameter({
              value: 'Name',
            }),
          },
          {
            type: 'tableHeaderCell',
            parameters: createUniformParameter({
              value: 'Age',
            }),
          },
          {
            type: 'tableHeaderCell',
            parameters: createUniformParameter({
              value: 'Location',
            }),
          },
          {
            type: 'tableHeaderCell',
            parameters: createUniformParameter({
              value: 'Occupation',
            }),
          },
        ],
      },
    },
  ],
};

export const tableWithCustomCells = {
  tableBody: [
    {
      type: 'tableRow',
      slots: {
        tableRowCells: [
          {
            type: 'tableCustomCell',
            slots: {
              tableCustomCellContent: [
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'span',
                    text: 'John Smith',
                    weight: 'bold',
                  }),
                },
              ],
            },
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: '32',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'New York',
            }),
          },
          {
            type: 'tableCustomCell',
            slots: {
              tableCustomCellContent: [
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'span',
                    text: 'Software Engineer',
                  }),
                },
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'p',
                    size: 'base',
                    text: 'Optimization',
                    color: 'text-grey',
                    weight: 'normal',
                  }),
                },
              ],
            },
          },
          {
            type: 'tableCustomCell',
            slots: {
              tableCustomCellContent: [
                {
                  type: 'badge',
                  parameters: createUniformParameter({
                    size: 'small',
                    text: 'Active',
                    textColor: 'text-light',
                    backgroundColor: 'general-success',
                  }),
                },
              ],
            },
          },
          {
            type: 'tableCustomCell',
            parameters: createUniformParameter({
              alignment: 'ml-auto',
            }),
            slots: {
              tableCustomCellContent: [
                {
                  type: 'button',
                  parameters: createUniformParameter({
                    link: { path: '#', type: 'url' },
                    text: 'Edit',
                    textColor: 'text-light',
                    buttonColor: 'button-primary',
                    size: 'table-small',
                  }),
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: 'tableRow',
      slots: {
        tableRowCells: [
          {
            type: 'tableCustomCell',
            slots: {
              tableCustomCellContent: [
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'span',
                    text: 'Jane Doe',
                    weight: 'bold',
                  }),
                },
              ],
            },
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: '28',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'Los Angeles',
            }),
          },
          {
            type: 'tableCustomCell',
            slots: {
              tableCustomCellContent: [
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'p',
                    text: 'Graphic Designer',
                  }),
                },
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'p',
                    text: 'Intranet',
                    color: 'text-grey',
                    weight: 'normal',
                  }),
                },
              ],
            },
          },
          {
            type: 'tableCustomCell',
            slots: {
              tableCustomCellContent: [
                {
                  type: 'badge',
                  parameters: createUniformParameter({
                    size: 'small',
                    text: 'Active',
                    textColor: 'text-light',
                    backgroundColor: 'general-success',
                  }),
                },
              ],
            },
          },
          {
            type: 'tableCustomCell',
            parameters: createUniformParameter({
              alignment: 'ml-auto',
            }),
            slots: {
              tableCustomCellContent: [
                {
                  type: 'button',
                  parameters: createUniformParameter({
                    link: { path: '#', type: 'url' },
                    text: 'Edit',
                    textColor: 'text-light',
                    buttonColor: 'button-primary',
                    size: 'table-small',
                  }),
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: 'tableRow',
      slots: {
        tableRowCells: [
          {
            type: 'tableCustomCell',
            slots: {
              tableCustomCellContent: [
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'span',
                    text: 'Robert Lee',
                    weight: 'bold',
                  }),
                },
              ],
            },
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: '45',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'Chicago',
            }),
          },
          {
            type: 'tableCustomCell',
            slots: {
              tableCustomCellContent: [
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'p',
                    text: 'Accountant',
                  }),
                },
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'span',
                    text: 'Program',
                    color: 'text-grey',
                    weight: 'normal',
                  }),
                },
              ],
            },
          },
          {
            type: 'tableCustomCell',
            slots: {
              tableCustomCellContent: [
                {
                  type: 'badge',
                  parameters: createUniformParameter({
                    size: 'small',
                    text: 'Offline',
                    textColor: 'text-light',
                    backgroundColor: 'general-error',
                  }),
                },
              ],
            },
          },
          {
            type: 'tableCustomCell',
            parameters: createUniformParameter({
              alignment: 'ml-auto',
            }),
            slots: {
              tableCustomCellContent: [
                {
                  type: 'button',
                  parameters: createUniformParameter({
                    link: { path: '#', type: 'url' },
                    text: 'Edit',
                    textColor: 'text-light',
                    buttonColor: 'button-primary',
                    size: 'table-small',
                  }),
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: 'tableRow',
      slots: {
        tableRowCells: [
          {
            type: 'tableCustomCell',
            slots: {
              tableCustomCellContent: [
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'span',
                    text: 'Sarah Brown',
                    weight: 'bold',
                  }),
                },
              ],
            },
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: '36',
            }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({
              value: 'San Francisco',
            }),
          },
          {
            type: 'tableCustomCell',
            slots: {
              tableCustomCellContent: [
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'p',
                    text: 'Marketing Manager',
                  }),
                },
                {
                  type: 'text',
                  parameters: createUniformParameter({
                    tag: 'span',
                    text: 'Mobility',
                    color: 'text-grey',
                    weight: 'normal',
                  }),
                },
              ],
            },
          },
          {
            type: 'tableCustomCell',
            slots: {
              tableCustomCellContent: [
                {
                  type: 'badge',
                  parameters: createUniformParameter({
                    size: 'small',
                    text: 'Active',
                    textColor: 'text-light',
                    backgroundColor: 'general-success',
                  }),
                },
              ],
            },
          },
          {
            type: 'tableCustomCell',
            parameters: createUniformParameter({
              alignment: 'ml-auto',
            }),
            slots: {
              tableCustomCellContent: [
                {
                  type: 'button',
                  parameters: createUniformParameter({
                    link: { path: '#', type: 'url' },
                    text: 'Edit',
                    textColor: 'text-light',
                    buttonColor: 'button-primary',
                    size: 'table-small',
                  }),
                },
              ],
            },
          },
        ],
      },
    },
  ],
  tableHead: [
    {
      type: 'tableRow',
      slots: {
        tableRowCells: [
          {
            type: 'tableHeaderCell',
            parameters: createUniformParameter({
              value: 'Name',
            }),
          },
          {
            type: 'tableHeaderCell',
            parameters: createUniformParameter({
              value: 'Age',
            }),
          },
          {
            type: 'tableHeaderCell',
            parameters: createUniformParameter({
              value: 'Location',
            }),
          },
          {
            type: 'tableHeaderCell',
            parameters: createUniformParameter({
              value: 'Occupation',
            }),
          },
          {
            type: 'tableHeaderCell',
            parameters: createUniformParameter({
              value: 'Status',
            }),
          },
          {
            type: 'tableHeaderCell',
          },
        ],
      },
    },
  ],
};
