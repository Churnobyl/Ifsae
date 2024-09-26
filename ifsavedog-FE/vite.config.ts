import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@apis',
        replacement: path.resolve(__dirname, 'src/apis'),
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/hooks'),
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, 'src/styles'),
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src/assets'),
      },
      {
        find: '@stores',
        replacement: path.resolve(__dirname, 'src/stores'),
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, 'src/constants'),
      },
      {
        find: '@queries',
        replacement: path.resolve(__dirname, 'src/queries'),
      },
      {
        find: '@routers',
        replacement: path.resolve(__dirname, 'src/routers'),
      },
      {
        find: '@layouts',
        replacement: path.resolve(__dirname, 'src/layouts'),
      },
    ],
  },
});
