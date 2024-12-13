import type { Preview } from '@storybook/react';
import '../src/styles/globals.css'
import '../src/styles/colors.css'
import '../src/styles/dimensions.css'
import '../src/styles/fonts.css'
import '../src/styles/borders.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
