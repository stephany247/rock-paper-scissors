import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image", // cache all images
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: ({ url }) => {
              return (
                (url as any).origin === (globalThis as any).location.origin
              );
            }, // cache same-origin stuff
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "app-shell",
            },
          },
        ],
      },
      manifest: {
        name: "Rock Paper Scissors Game",
        short_name: "Rock Paper Scissors",
        start_url: ".",
        display: "standalone",
        background_color: "hsl(229, 25%, 31%)",
        theme_color: "hsl(229, 64%, 46%)",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
