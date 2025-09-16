import { createUniformParameter } from '@/utils';

export const tableContentCSK = {
  type: 'table',
  parameters: createUniformParameter({
    size: 'table-small',
    displayName: 'Table Default',
  }),
  slots: {
    tableHead: [
      {
        type: 'tableRow',
        parameters: createUniformParameter({ displayName: 'Header' }),
        slots: {
          tableRowCells: [
            {
              type: 'tableHeaderCell',
              parameters: createUniformParameter({ value: 'Feature / Benefit' }),
            },
            {
              type: 'tableHeaderCell',
              parameters: createUniformParameter({ value: 'Description' }),
            },
            {
              type: 'tableHeaderCell',
              parameters: createUniformParameter({ value: 'Impact' }),
            },
          ],
        },
      },
    ],
    tableBody: [
      ['🚀 Rapid Time-to-Market', 'Prebuilt components reduce setup and dev time', 'Cuts delivery time by up to 50%'],
      [
        '🧱 Ready-to-Use Components',
        'Well-designed UI blocks for consistent, scalable design',
        'Faster prototyping & production',
      ],
      [
        '🛠 Built-in Best Practices',
        'Includes performance, accessibility, and layout standards',
        'Fewer bugs, better user UX',
      ],
      ['🎨 Theme Support', 'Easy theming and brand alignment out of the box', 'Consistent look & feel'],
      ['🧪 Tested & Maintained', 'Components are battle-tested and updated regularly', 'Less tech debt over time'],
      [
        '🧭 Opinionated but Flexible',
        'Defaults that work well, but allow overrides when needed',
        'Balances speed and flexibility',
      ],
      [
        '🧩 Seamless Integration',
        'Works with Next.js, Tailwind, and modern tooling',
        'Smooth onboarding into any stack',
      ],
      [
        '📦 Storybook & Previews',
        'Includes documentation and visual previews for each component',
        'Faster adoption across teams',
      ],
    ].map(([title, desc, impact]) => ({
      type: 'tableRow',
      parameters: createUniformParameter({ displayName: title }),
      slots: {
        tableRowCells: [
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({ value: title }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({ value: desc }),
          },
          {
            type: 'tableDataCell',
            parameters: createUniformParameter({ value: impact }),
          },
        ],
      },
    })),
  },
};
