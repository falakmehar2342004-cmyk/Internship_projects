import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite uses this config to enable React JSX support during development/build.
export default defineConfig({ plugins: [react()] });
