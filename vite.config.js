import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Ibra1/', // Caminho correto para deploy no GitHub Pages deste repositório
});
