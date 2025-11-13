import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from "path";
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": resolve(__dirname, "src/components"),
      "@middleware": resolve(__dirname, "src/middleware"),
      "@assets": resolve(__dirname, "src/assets"),
      "@utils": resolve(__dirname, "src/utils"),
      "@pages": resolve(__dirname, "src/pages"),
      "@styles": resolve(__dirname, "src/styles"),
      "@layout": resolve(__dirname, "src/layout"),
      "@context": resolve(__dirname, "src/context"),
      "@hooks" : resolve(__dirname, "src/hooks"),
      "@lang" : resolve(__dirname , "src/lang"),
    },
  },
});
