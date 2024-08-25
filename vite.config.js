import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills()
  ],
  root: '.',
  resolve: {
    alias: {
      '~bootstrap': '/node_modules/bootstrap',
    }
  },
  server: {
    port: 3000,
    hot: true
  }
})
