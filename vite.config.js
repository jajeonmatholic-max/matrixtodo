import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/matrixtodo/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Matrix Todo',
        short_name: 'MatrixTodo',
        description: '아이젠하워 매트릭스 + 지내요 성장 앱',
        theme_color: '#ff69b4',
        background_color: '#1c1c1e',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/matrixtodo/',
        scope: '/matrixtodo/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/matrixtodo-web\.vercel\.app\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'matrixtodo-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
})
