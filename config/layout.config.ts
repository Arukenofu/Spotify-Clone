import type { UserOptions } from 'vite-plugin-vue-layouts-next'

export default {
  layoutsDirs: 'src/app/layouts',
  pagesDirs: 'src/pages',
  defaultLayout: 'Default',
  importMode: () => 'sync',
} satisfies UserOptions
