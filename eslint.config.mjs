// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// @ts-check
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  ...storybook.configs['flat/recommended'],
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    ignores: ['!.storybook'],
    rules: {
      curly: ['error', 'all'],
    },
  },
  eslintPluginPrettierRecommended,
);
