import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // 프론트엔드에서 '/api'로 시작하는 요청을 백엔드로 프록시
      '/api': {
        target: 'http://localhost:3000', // 백엔드 서버 URL
        changeOrigin: true, // Origin 헤더를 백엔드로 변경
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api' 경로 제거
      },
    },
  },
})
