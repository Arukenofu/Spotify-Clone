import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import Router from 'unplugin-vue-router/vite'

import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression2'
import sassGlobImports from 'vite-plugin-sass-glob-import'
import vueDevTools from 'vite-plugin-vue-devtools'
import Layout from 'vite-plugin-vue-layouts-next'

import FolderTypesConfig from './config/folderTypes.config'
import LayoutConfig from './config/layout.config'
import RouterEnvConfig from './config/routerEnv.config'
import ScssConfig from './config/scss.config'
import ServerConfig from './config/server.config'
import { createTypesByFolder } from './plugins/createTypesByFolder'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    compression(),
    createTypesByFolder(FolderTypesConfig),
    Router(RouterEnvConfig),
    sassGlobImports(),
    Layout(LayoutConfig),
    vueDevTools(),
    vue(),
  ],
  css: ScssConfig,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: ServerConfig,
})
