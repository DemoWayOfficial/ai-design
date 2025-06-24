import type { StorybookConfig } from '@storybook-vue/nuxt';

const config: StorybookConfig = {
  stories: [
    '../app/components/**/*.mdx',
    '../app/components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
};
export default config;
