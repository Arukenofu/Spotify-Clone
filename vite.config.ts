import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import sassGlobImports from "vite-plugin-sass-glob-import";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      VueRouter({

      }),
      sassGlobImports(),
      vue(),
    ],
    resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
    }
})
