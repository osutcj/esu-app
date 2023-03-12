import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";
import Unocss from "unocss/vite";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },

  plugins: [
    react(),
    Unocss({
      /* unocss.config.ts */
    }),
    VitePWA({
      manifest: {
        short_name: "ESU",
        name: "Engineering Summer University",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "pwa-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "pwa-512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#ffcd29",
        background_color: "#ffffff",
      },
      registerType: "autoUpdate",
    }),
    mkcert(),
  ],
  build: { sourcemap: true },
  resolve: { alias: { "@": resolve(__dirname, "src") } },
});
