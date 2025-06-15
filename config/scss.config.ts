import type { CSSOptions } from 'vite'

export default {
  preprocessorOptions: {
    scss: {
      api: 'modern-compiler',
    },
  },
} satisfies CSSOptions
