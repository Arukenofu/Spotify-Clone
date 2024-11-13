import { fileURLToPath, URL } from 'node:url';
import { ClientSideLayout } from 'vite-plugin-vue-layouts';
import { defineConfig } from 'vite';

import Router from 'unplugin-vue-router/vite';
import vue from '@vitejs/plugin-vue';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import createTypesByFolder from './scripts/createTypesByFolder';
import vueDevTools from 'vite-plugin-vue-devtools';

import ScssConfig from "./config/scss.config";
import RouterEnvConfig from "./config/routerEnv.config";
import LayoutConfig from "./config/layout.config";
import FolderTypesConfig from "./config/folderTypes.config";
import ServerConfig from "./config/server.config";
import compression from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    compression(),
    createTypesByFolder(FolderTypesConfig),
    Router(RouterEnvConfig),
    sassGlobImports(),
    ClientSideLayout(LayoutConfig),
    vueDevTools(),
    vue()
  ],
  css: ScssConfig,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: ServerConfig
});
