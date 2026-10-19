import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Minimal Vite config: just the React plugin (JSX + fast refresh).
export default defineConfig({
  plugins: [react()],
});
