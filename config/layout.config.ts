import type {clientSideOptions} from "vite-plugin-vue-layouts";

export default {
    layoutDir: 'src/app/layouts',
    defaultLayout: 'Default',
    importMode: 'sync'
} satisfies clientSideOptions;