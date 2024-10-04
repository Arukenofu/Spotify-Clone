import { fileURLToPath, URL } from 'node:url'
import Router from 'unplugin-vue-router/vite'
import { ClientSideLayout } from 'vite-plugin-vue-layouts'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import sassGlobImports from "vite-plugin-sass-glob-import";

// @ts-ignore
import createTypesByFolder from "./plugins/createTypesByFolder";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        createTypesByFolder([
            {
                name: 'PanelsName',
                path: 'src/features/InfoPanel/Panels',
                extension: '.vue'
            }
        ]),
        Router({
            dts: '.generated/router.d.ts'
        }),
        sassGlobImports(),
        ClientSideLayout({
            layoutDir: 'src/app/layouts',
            defaultLayout: 'Default',
            importMode: 'sync'
        }),
        vue(),
    ],
    css: {
      preprocessorOptions: {
          scss: {
              api: 'modern-compiler'
          }
      }
    },
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
});