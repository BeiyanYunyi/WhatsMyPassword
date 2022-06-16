import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: 'class',
  safelist: 'transition',
  theme: {},
  plugins: [require('windicss/plugin/typography')],
});
