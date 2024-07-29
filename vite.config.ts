import { fileURLToPath, URL } from 'node:url'
import Router from 'unplugin-vue-router/vite'
import { ClientSideLayout } from 'vite-plugin-vue-layouts'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import sassGlobImports from "vite-plugin-sass-glob-import";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        Router(),
        sassGlobImports(),
        ClientSideLayout({
            layoutDir: 'src/layouts',
            defaultLayout: 'Default',
            importMode: 'sync'
        }),
        vue(),
    ],
    resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        cors: {
            origin: 'http://localhost:5174',
        }
    }
})
