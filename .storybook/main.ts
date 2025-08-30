import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  framework: { name: '@storybook/react-webpack5', options: {} },
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  webpackFinal: async (baseConfig) => {
    baseConfig.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true, // skip type-checking for speed
          },
        },
      ],
    });
    baseConfig.resolve?.extensions?.push('.ts', '.tsx');
    return baseConfig;
  },
};

export default config;
