// https://vite.dev/config/

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Path to the global SCSS file
const scssPath = path.resolve(__dirname, './src/styles/lib.scss');

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'dashesOnly', // Ensures class names follow the dashes-only convention
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${scssPath}" as *;`,
      },
    },
  },
  plugins: [react()],
});
