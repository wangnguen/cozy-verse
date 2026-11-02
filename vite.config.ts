import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Resolve the `@/` alias from tsconfig.json
  resolve: { tsconfigPaths: true },
  server: { port: 4000 },
});
