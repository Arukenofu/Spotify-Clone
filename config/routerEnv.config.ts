import type { Options } from 'unplugin-vue-router'

export default {
  dts: '.generated/router.d.ts',
  importMode: (filepath) => {
    const path = filepath.replace(/^.*\/src\/pages/, '').replace(/\.vue$/, '')

    const syncPaths = ['/album/[id]', '/playlist/[id]', '/search']

    syncPaths.forEach((value) => {
      if (path.includes(value)) {
        console.log(`auto-routes: path ${path} was added to synchronous import mode.`)
        return 'sync'
      }
    })

    return 'async'
  },
} satisfies Options
