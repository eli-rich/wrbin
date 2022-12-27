import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3001,
    proxy: {
      '/posts': {
        target: 'http://localhost:3000',
      },
      '/api': {
        target: 'http://localhost:3000',
      },
      '/raw': {
        target: 'http://localhost:3000',
      },
      '/auth': {
        target: 'http://localhost:3000',
      },
    },
  },
  build: {
    target: 'esnext',
  },
});
