import type { UserConfig } from 'vite'

export default {
  cors: {
    origin: 'http://localhost:5174',
  },
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    },
  },
} satisfies UserConfig['server']
