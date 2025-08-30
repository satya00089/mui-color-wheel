/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    options: {
      showPanel: true,
      panelPosition: 'right',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/ },
    },
  },
};
export default preview;
