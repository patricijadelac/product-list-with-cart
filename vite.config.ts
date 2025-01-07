// https://vite.dev/config/

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// Path to the global SCSS file
const scssPath = path.resolve(__dirname, './src/styles/lib.scss');

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@types': path.resolve(__dirname, 'src/types/'),
    },
  },
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
});
