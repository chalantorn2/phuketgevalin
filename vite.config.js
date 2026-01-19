import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.phuketgevalin.com',
        changeOrigin: true,
        secure: true,
        followRedirects: true,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            // ลบ redirect headers เพื่อไม่ให้ browser follow
            delete proxyRes.headers['location'];
          });
        }
      }
    }
  }
});
