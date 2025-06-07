import type {Options} from "unplugin-vue-router";

export default {
    dts: '.generated/router.d.ts',
    importMode: (filepath) => {
        const path = filepath.replace(/^.*\/src\/pages/, '').replace(/\.vue$/, '');

        if (['album', 'playlist'].includes(path)) return 'sync';


        return 'async'
    }
} satisfies Options;